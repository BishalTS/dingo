import React from 'react';
import { BingoCell, BingoTicket as IBingoTicket } from '../types/bingo';
import { WinningConditions } from './WinningConditions';
import { Image } from 'lucide-react';

interface Props {
  ticket: IBingoTicket;
  pickedNumbers: Set<number>;
}

export function BingoTicket({ ticket, pickedNumbers }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="grid grid-cols-9 gap-1">
        {ticket.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square flex items-center justify-center
                border rounded-md text-sm font-medium
                ${cell.number === null ? 'bg-gray-100' : ''}
                ${
                  cell.number !== null && pickedNumbers.has(cell.number)
                    ? 'bg-green-100 border-green-500'
                    : 'border-gray-200'
                }
              `}
            >
              {cell.number}
            </div>
          ))
        )}
      </div>
      
      {ticket.imageUrl && (
        <div className="mt-4">
          <img 
            src={ticket.imageUrl} 
            alt="Physical ticket" 
            className="max-w-xs rounded-lg shadow-sm"
          />
        </div>
      )}

      {!ticket.imageUrl && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md flex items-center gap-2 text-gray-500 text-sm">
          <Image className="w-4 h-4" />
          <span>No image attached</span>
        </div>
      )}

      <WinningConditions ticket={ticket} pickedNumbers={pickedNumbers} />
    </div>
  );
}