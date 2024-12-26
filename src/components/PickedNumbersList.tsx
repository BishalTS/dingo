import React from 'react';
import { NumberTag } from './NumberTag';

interface Props {
  numbers: Set<number>;
  onNumberDelete: (number: number) => void;
}

export function PickedNumbersList({ numbers, onNumberDelete }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {Array.from(numbers).sort((a, b) => a - b).map(number => (
        <NumberTag
          key={number}
          number={number}
          onDelete={onNumberDelete}
        />
      ))}
    </div>
  );
}