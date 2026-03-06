export interface IId {
  id: string;
}

export enum EFormMode {
  Add = 'add',
  Edit = 'edit',
}

export interface IOptions<T> {
  label: string;
  value: T;
}

export interface IStringOptions extends IOptions<string> {}
