import React from 'react';
import { Trash2 } from 'lucide-react';
import { BingoTicket } from '../types/bingo';

interface Props {
  tickets: BingoTicket[];
  onDeleteTicket: (id: string) => void;
}

export function TicketManager({ tickets, onDeleteTicket }: Props) {
  if (tickets.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Manage Tickets</h2>
      <div className="space-y-2">
        {tickets.map((ticket, index) => (
          <div
            key={ticket.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <span className="font-medium">Ticket #{index + 1}</span>
            <button
              onClick={() => onDeleteTicket(ticket.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Delete ticket"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}