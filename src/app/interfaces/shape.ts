export type Shape = number[][];

export interface ActiveShape {
  shape: Shape;
  position: {r0: number, c0: number};
  color: string;
}
