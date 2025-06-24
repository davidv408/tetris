export type Board = Array<Array<Cell>>;

export interface Cell {
  id: string;
  color: string;
  value: number;
}