import { IAction, IContact, IState} from '../../ts';

const initialState: IState = {
  contacts: [],
  filtered: [],
  currentContact: {},
  delForm: false,
  editForm: false,
  addForm: false,
  loading: false,
  idToken: ''
}

const reducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case 'CONTACTS_LOADED':
      return {
        ...state,
        contacts: action.payload,
        filtered: action.payload,
        loading: false
      };

    case 'CONTACTS_FILTRED':
      return {
        ...state,
        filtered: action.payload
      };

    case 'FILTER_CLEAN':
      return {
        ...state,
        filtered: [...state.contacts]
      };

    case 'DEL_FORM':
      return {
        ...state,
        delForm: true,
        currentContact: state.contacts.find((item: IContact) => item.id === action.payload)
      };

    case 'EDIT_FORM':
      return {
        ...state,
        editForm: true,
        currentContact: state.contacts.find((item: IContact) => item.id === action.payload)
      };

    case 'ADD_FORM':
      return {
        ...state,
        addForm: true,
      };

    case 'FORMS_CLEAN':
      return {
        ...state,
        delForm: false,
        editForm: false,
        addForm: false,
        currentContact: {}
      };

    case 'DEL_CONTACT':
      return {
        ...state,
        delForm: false,
        currentContact: {}
      };

    case 'EDIT_CONTACT':
      return {
        ...state,
        editForm: false,
        currentContact: {}
      };

    case 'ADD_CONTACT':
      return {
        ...state,
        addForm: false
      };

    case 'LOADING':
      return {
        ...state,
        loading: true
      };

    case 'LOGIN':
      return {
        ...state,
        idToken: action.payload,
        loading: false
      };

    case 'LOGOUT':
      return {
        ...state,
        idToken: null,
      };
  
    default:
      return state;
  }
}

export default reducer;