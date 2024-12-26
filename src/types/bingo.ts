export interface BingoCell {
  number: number | null;
  marked: boolean;
}

export interface BingoTicket {
  id: string;
  grid: BingoCell[][];
  imageUrl?: string;
}

export type BingoNumbers = Set<number>;