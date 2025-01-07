export type CellView = {
  row: number;
  col: number;
  figure: {id:number, type: string; color: string } | null;
  color: string;
};