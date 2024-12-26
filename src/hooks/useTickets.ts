import { useEffect, useState } from 'react';
import { BingoTicket } from '../types/bingo';
import { supabase } from '../lib/supabase';

export function useTickets(userId: string | undefined) {
  const [tickets, setTickets] = useState<BingoTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchTickets = async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tickets:', error);
        return;
      }

      setTickets(data.map(ticket => ({
        id: ticket.id,
        grid: ticket.grid,
        imageUrl: ticket.image_url
      })));
      setLoading(false);
    };

    fetchTickets();
  }, [userId]);

  const addTicket = async (ticket: BingoTicket) => {
    if (!userId) return;

    const { error } = await supabase
      .from('tickets')
      .insert([{
        user_id: userId,
        grid: ticket.grid,
        image_url: ticket.imageUrl
      }]);

    if (error) {
      console.error('Error adding ticket:', error);
      return;
    }

    setTickets(prev => [ticket, ...prev]);
  };

  const deleteTicket = async (id: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting ticket:', error);
      return;
    }

    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  return { tickets, loading, addTicket, deleteTicket };
}