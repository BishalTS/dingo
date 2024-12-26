import { BingoCell, BingoTicket } from '../types/bingo';

export function checkFullRow(grid: BingoCell[][], pickedNumbers: Set<number>): boolean {
  return grid.some(row => {
    const numbersInRow = row.filter(cell => cell.number !== null);
    return numbersInRow.length > 0 && 
           numbersInRow.every(cell => pickedNumbers.has(cell.number!));
  });
}

export function checkCorners(grid: BingoCell[][], pickedNumbers: Set<number>): boolean {
  const firstRow = grid[0];
  const lastRow = grid[grid.length - 1];
  
  const corners = [
    firstRow[0],
    firstRow[firstRow.length - 1],
    lastRow[0],
    lastRow[lastRow.length - 1]
  ].filter(cell => cell.number !== null);

  return corners.length > 0 && corners.every(cell => pickedNumbers.has(cell.number!));
}

export function checkUnlucky11(grid: BingoCell[][], pickedNumbers: Set<number>): boolean {
  if (pickedNumbers.size < 11) return false;

  const ticketNumbers = grid
    .flat()
    .filter(cell => cell.number !== null)
    .map(cell => cell.number!);

  return ticketNumbers.length > 0 && 
         !ticketNumbers.some(num => pickedNumbers.has(num));
}