import React from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { BingoTicket } from '../types/bingo';
import { checkFullRow, checkCorners, checkUnlucky11 } from '../utils/bingoRules';

interface Props {
  ticket: BingoTicket;
  pickedNumbers: Set<number>;
}

interface ConditionProps {
  title: string;
  isWon: boolean;
  description: string;
}

function Condition({ title, isWon, description }: ConditionProps) {
  return (
    <div className="flex items-center gap-2 p-2">
      {isWon ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-gray-400" />
      )}
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export function WinningConditions({ ticket, pickedNumbers }: Props) {
  const hasFullRow = checkFullRow(ticket.grid, pickedNumbers);
  const hasCorners = checkCorners(ticket.grid, pickedNumbers);
  const isUnlucky11 = checkUnlucky11(ticket.grid, pickedNumbers);

  return (
    <div className="mt-2 bg-gray-50 rounded-md p-2">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="w-4 h-4 text-blue-500" />
        <h3 className="text-sm font-semibold">Winning Conditions</h3>
      </div>
      <Condition
        title="Full Row"
        isWon={hasFullRow}
        description="Complete any horizontal row"
      />
      <Condition
        title="Four Corners"
        isWon={hasCorners}
        description="Match all four corner numbers"
      />
      <Condition
        title="Unlucky 11"
        isWon={isUnlucky11}
        description="No matches after 11 numbers called"
      />
    </div>
  );
}