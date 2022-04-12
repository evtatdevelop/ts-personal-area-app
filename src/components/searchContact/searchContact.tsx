import { IState, IContact, IAction } from '../../ts';
import classes from './searchContact.module.scss';
import Input from '../input';
import { connect } from 'react-redux';
import WithService from '../hoc';
import { contactsFiltred, filtredClean } from '../../redux/actions';

interface PropsType {
  contacts: IContact[];
  contactsFiltred: (contacts:IContact[])=>IAction;
  filtredClean: ()=>IAction;
}

const SearchContact = (props: PropsType) => {

  const {contacts, filtredClean} = props;
  
  return (
    <div className={classes.searchContact}>
      <Input
        id = 'search'
        type = 'text'
        readonly = {false}
        placeholder = 'Search'
        arialabel = 'Search'
        inputHandler = {(value: string) => props.contactsFiltred(filter(value, contacts))}
        clearData = {filtredClean}
        value = ''
        validation = {[]}
        autofocus = {false}
        handlerClick = {()=>{}}
      />
    </div>
  )
}

const filter = (value: string, contacts: IContact[]) => {
  return [...contacts].filter(item => 
    item.name.toUpperCase().includes(value.toUpperCase())
    || item.phone.toUpperCase().includes(value.toUpperCase())
    || item.email.toUpperCase().includes(value.toUpperCase())
  )
}

const mapStateToProps = (state: IState) => {
  return {
    contacts: state.contacts,
  }
}

const mapDispatchToProps = {
  contactsFiltred,
  filtredClean
}

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(SearchContact));