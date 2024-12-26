import React, { useRef, useEffect } from 'react';
import { GridCell } from './GridCell';

interface Props {
  values: string[][];
  onChange: (values: string[][]) => void;
  onSubmit: () => void;
}

export function GridInput({ values, onChange, onSubmit }: Props) {
  const refs = useRef<(HTMLInputElement | null)[][]>(
    Array(3).fill(null).map(() => Array(9).fill(null))
  );

  const updateValue = (rowIndex: number, colIndex: number, value: string) => {
    const newValues = values.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? value : cell))
    );
    onChange(newValues);

    // Auto-advance to next cell if 2 digits entered
    if (value.length === 2) {
      const nextCell = getNextCell(rowIndex, colIndex);
      if (nextCell) {
        refs.current[nextCell.row][nextCell.col]?.focus();
      }
    }
  };

  const getNextCell = (row: number, col: number) => {
    if (col === 8) {
      return row < 2 ? { row: row + 1, col: 0 } : null;
    }
    return { row, col: col + 1 };
  };

  const getPrevCell = (row: number, col: number) => {
    if (col === 0) {
      return row > 0 ? { row: row - 1, col: 8 } : null;
    }
    return { row, col: col - 1 };
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    rowIndex: number,
    colIndex: number
  ) => {
    switch (e.key) {
      case 'Tab':
        if (!e.shiftKey) {
          e.preventDefault();
          const next = getNextCell(rowIndex, colIndex);
          if (next) {
            refs.current[next.row][next.col]?.focus();
          }
        } else {
          e.preventDefault();
          const prev = getPrevCell(rowIndex, colIndex);
          if (prev) {
            refs.current[prev.row][prev.col]?.focus();
          }
        }
        break;
      case 'Enter':
        e.preventDefault();
        onSubmit();
        break;
    }
  };

  // Focus first cell on mount
  useEffect(() => {
    refs.current[0][0]?.focus();
  }, []);

  return (
    <div className="inline-block bg-white p-4 rounded-lg">
      {values.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 mb-1">
          {row.map((cell, colIndex) => (
            <GridCell
              key={colIndex}
              ref={(el) => (refs.current[rowIndex][colIndex] = el)}
              value={cell}
              onChange={(value) => updateValue(rowIndex, colIndex, value)}
              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}