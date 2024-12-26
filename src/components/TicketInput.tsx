import React, { useState } from 'react';
import { BingoCell, BingoTicket } from '../types/bingo';
import { GridInput } from './GridInput';
import { ImageUpload } from './ImageUpload';

interface Props {
  onTicketAdd: (ticket: BingoTicket) => void;
}

export function TicketInput({ onTicketAdd }: Props) {
  const [values, setValues] = useState<string[][]>(
    Array(3).fill(null).map(() => Array(9).fill(''))
  );
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    const grid: BingoCell[][] = values.map(row =>
      row.map(cell => ({
        number: cell === '' ? null : parseInt(cell),
        marked: false
      }))
    );

    const ticket: BingoTicket = {
      id: Date.now().toString(),
      grid,
      imageUrl
    };
    
    onTicketAdd(ticket);
    setValues(Array(3).fill(null).map(() => Array(9).fill('')));
    setImageUrl('');
  };

  return (
    <div className="flex flex-col items-center">
      <GridInput
        values={values}
        onChange={setValues}
        onSubmit={handleSubmit}
      />
      <ImageUpload 
        onImageUploaded={setImageUrl}
        currentImageUrl={imageUrl}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add Ticket
      </button>
    </div>
  );
}