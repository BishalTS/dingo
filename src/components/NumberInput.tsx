import React, { useState } from 'react';

interface Props {
  onNumberPicked: (number: number) => void;
}

export function NumberInput({ onNumberPicked }: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const number = parseInt(inputValue);
    if (!isNaN(number) && number >= 1 && number <= 90) {
      onNumberPicked(number);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="number"
        min="1"
        max="90"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter number (1-90)"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Number
      </button>
    </form>
  );
}