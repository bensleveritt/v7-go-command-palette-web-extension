export type Command = {
  label: string;
  fn: (payload: any) => Promise<any>;
  payload?: any;
};
