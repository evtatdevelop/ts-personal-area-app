import { IState, IContact } from '../../ts';
import {Component} from 'react'
import classes from './searchContact.module.scss';
import Input from '../input';
import { connect } from 'react-redux';
import WithService from '../hoc';
import { contactsFiltred, filtredClean } from '../../redux/actions';

interface PropsType {
  contacts: IContact[]
  contactsFiltred: Function 
  filtredClean: Function 
}

class SearchContact extends Component<PropsType, {}> {

  filterHandler = (value: string) => {
    const cleanData = [...this.props.contacts];
    const filtered = cleanData.filter(item => 
      item.name.toUpperCase().includes(value.toUpperCase())
      || item.phone.toUpperCase().includes(value.toUpperCase())
      || item.email.toUpperCase().includes(value.toUpperCase())
    )
    this.props.contactsFiltred(filtered)
  }

  render(){
    return (
      <div className={classes.searchContact}>
      <Input
        id = 'search'
        type = 'text'
        readonly = {false}
        placeholder = 'Search'
        arialabel = 'Search'
        inputHandler = {this.filterHandler}
        clearData = {this.props.filtredClean}
      
        value = ''
        validation = {[]}
        autofocus = {false}
        handlerClick = {()=>{return}}
      />
      </div>
    
    )
  }
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