export interface IContact {
  id: number,
  name: string,
  email: string,
  phone: string,
}

export interface IAction {
  type: string,
  payload: any
}

export interface IState {
  contacts: IContact[],
  filtered: IContact[],
  currentContact: IContact | {},
  delForm: boolean,
  editForm: boolean,
  addForm: boolean,
  loading: boolean,
  idToken: string
}