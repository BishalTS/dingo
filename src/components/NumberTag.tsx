import React from 'react';
import { X } from 'lucide-react';

interface Props {
  number: number;
  onDelete: (number: number) => void;
}

export function NumberTag({ number, onDelete }: Props) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm group">
      {number}
      <button
        onClick={() => onDelete(number)}
        className="p-0.5 rounded-full hover:bg-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove number ${number}`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}