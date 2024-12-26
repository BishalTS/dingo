import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref?: React.Ref<HTMLInputElement>;
}

export const GridCell = React.forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, onKeyDown }, ref) => (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={(e) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 90)) {
          onChange(val);
        }
      }}
      onKeyDown={onKeyDown}
      className="w-12 h-12 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      maxLength={2}
    />
  )
);