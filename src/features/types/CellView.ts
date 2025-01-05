export type CellView = {
  row: number;
  col: number;
  figure: { type: string; color: string } | null;
  color: string;
};