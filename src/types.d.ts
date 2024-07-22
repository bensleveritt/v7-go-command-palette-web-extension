export type Command = {
  label: string;
  fn: (payload: any) => void;
};
