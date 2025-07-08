export type Shape = number[][];

export interface ActiveShape {
  shape: Shape;
  position: Position;
  color: string;
}

export interface Position {
  r0: number;
  c0: number;
}
