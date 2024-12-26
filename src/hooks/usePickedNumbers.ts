import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function usePickedNumbers(userId: string | undefined) {
  const [pickedNumbers, setPickedNumbers] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchPickedNumbers = async () => {
      const { data, error } = await supabase
        .from('picked_numbers')
        .select('numbers')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
        console.error('Error fetching picked numbers:', error);
        return;
      }

      if (data) {
        setPickedNumbers(new Set(data.numbers));
      }
      setLoading(false);
    };

    fetchPickedNumbers();
  }, [userId]);

  const updatePickedNumbers = async (numbers: Set<number>) => {
    if (!userId) return;

    const { error } = await supabase
      .from('picked_numbers')
      .upsert({
        user_id: userId,
        numbers: Array.from(numbers),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating picked numbers:', error);
      return;
    }

    setPickedNumbers(numbers);
  };

  const addNumber = async (number: number) => {
    if (!userId || pickedNumbers.has(number)) return;
    const newNumbers = new Set([...pickedNumbers, number]);
    await updatePickedNumbers(newNumbers);
  };

  const deleteNumber = async (number: number) => {
    if (!userId) return;
    const newNumbers = new Set(pickedNumbers);
    newNumbers.delete(number);
    await updatePickedNumbers(newNumbers);
  };

  return { pickedNumbers, loading, addNumber, deleteNumber };
}