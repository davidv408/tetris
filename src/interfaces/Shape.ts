export interface Shape {
  shape: number[][];
  color: string;
}

export interface ActiveShape extends Shape {
  position: Position;
}

export interface Position {
  r0: number;
  c0: number;
}
