/*
  # Add image support to tickets

  1. Changes
    - Add `image_url` column to tickets table for storing ticket images
*/

ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS image_url text;