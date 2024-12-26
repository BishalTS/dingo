import React from 'react';
import { Ticket } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Ticket className="w-8 h-8 text-blue-500" />
      <h1 className="text-3xl font-bold text-gray-900">Bingo Manager</h1>
    </div>
  );
}