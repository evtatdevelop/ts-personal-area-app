export interface IContact {
  id: number;
  name: string;
  email: string;
  phone: string;
}
export interface IAction {
  type: string;
  payload?: IContact | number | string | IContact[];
}

export interface IState {
  contacts: IContact[];
  filtered: IContact[];
  currentContact: IContact;
  delForm: boolean;
  editForm: boolean;
  addForm: boolean;
  loading: boolean;
  idToken: string;
}

export interface IServerLoginResponse {
  idToken: string;
  expiresIn: number;
}