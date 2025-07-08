export type Board = Array<Array<Cell>>;

export interface Cell {
  color: string;
  value: number;
}