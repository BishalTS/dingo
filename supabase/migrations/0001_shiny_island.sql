/*
  # Create Bingo Game Tables

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `grid` (jsonb, stores the ticket grid)
      - `created_at` (timestamp)
    
    - `picked_numbers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `numbers` (integer[], stores picked numbers)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  grid jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create picked numbers table
CREATE TABLE IF NOT EXISTS picked_numbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  numbers integer[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE picked_numbers ENABLE ROW LEVEL SECURITY;

-- Tickets policies
CREATE POLICY "Users can manage their own tickets"
  ON tickets
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Picked numbers policies
CREATE POLICY "Users can manage their picked numbers"
  ON picked_numbers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);