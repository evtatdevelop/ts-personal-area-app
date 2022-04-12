import { IContact, IAction, IServerLoginResponse} from '../../ts';

const contactsLoaded: (contacts:IContact[])=>IAction = (contacts: IContact[]): IAction => ({type: 'CONTACTS_LOADED', payload: contacts})

const contactsFiltred: (contacts:IContact[])=>IAction = (filtred: IContact[]): IAction => ({type: 'CONTACTS_FILTRED', payload: filtred})

const filtredClean: ()=>IAction = (): IAction => ({type: 'FILTER_CLEAN'})

const delForm: (id: number)=>IAction = (id: number): IAction => ({type: 'DEL_FORM', payload: id})

const editForm: (id: number)=>IAction = (id: number): IAction => ({type: 'EDIT_FORM', payload: id})

const addForm: ()=>IAction = (): IAction => ({type: 'ADD_FORM'})

const formsClean: ()=>IAction = (): IAction=> ({type: 'FORMS_CLEAN'})

const delContact: ()=>IAction = (): IAction => ({type: 'DEL_CONTACT'})

const editContact: ()=>IAction = (): IAction => ({type: 'EDIT_CONTACT'})

const addContact: ()=>IAction = (): IAction => ({type: 'ADD_CONTACT'})

const loadingOn: ()=>IAction = (): IAction => ({type: 'LOADING'})

const login: ({idToken, expiresIn}: IServerLoginResponse)=>IAction = ({idToken, expiresIn}: {idToken: string, expiresIn: number}): IAction => {
  const expDate = new Date(new Date().getTime() + expiresIn * 1000)
  localStorage.setItem('idToken', idToken)
  localStorage.setItem('expDate', String(expDate))
  return {type: 'LOGIN', payload: idToken}
}

const autoLogin: ()=>IAction = (): IAction => {
  const idToken: string = localStorage.getItem('idToken') || '';
  if ( !idToken ) return {type: 'LOGOUT'}
  else {
    const expDate: Date = new Date(localStorage.getItem('expDate') || "")
    if ( expDate <= new Date() ) return {type: 'LOGOUT'}
    else {
      localStorage.setItem('idToken', idToken)
      localStorage.setItem('expDate', String(expDate))
      return {type: 'LOGIN', payload: idToken}
    }
  }  
}

const logout: ()=>IAction = (): IAction => {
  localStorage.removeItem('idToken')
  localStorage.removeItem('expDate')
  return {type: 'LOGOUT'}
}

export {
  contactsLoaded,
  contactsFiltred,
  filtredClean,
  delForm,
  editForm,
  addForm,
  formsClean,
  delContact,
  editContact,
  addContact,
  loadingOn,
  login,
  logout,
  autoLogin
}