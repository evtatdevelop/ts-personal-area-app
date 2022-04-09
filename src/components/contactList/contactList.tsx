import { IState, IContact } from '../../ts';
import {Component} from 'react'
import classes from './contactList.module.scss';
import ContactItem from './contactIItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import WithService from '../hoc';
import { contactsLoaded, addForm, loadingOn } from '../../redux/actions';


interface PropsType {
  contacts: IContact[]
  filtered: IContact[]
  Service: any
  contactsLoaded: Function
  addForm: any
  loadingOn: Function
}

class ContactList extends Component<PropsType, {}> {
 
  componentDidMount() {
    const {Service, loadingOn, contactsLoaded} = this.props;
    loadingOn();
    Service.getContacts()
    .then((contacts: IContact[]) => {
      contactsLoaded(contacts)
    })
  }
 
  render() {
    const {filtered, addForm} = this.props;

    return (
      <ul className={classes.contactList}>
        <button type="button" 
          className = {classes.addButton}
          onClick = {addForm}
        ><FontAwesomeIcon icon={faCirclePlus} /></button>
        
        {filtered.map((item: IContact) => 
          <ContactItem
            key = {item.id}
            data = {item}
          />
        )}
      </ul>
    )    
  }
 }

 const mapStateToProps = (state: IState) => {
   return {
     contacts: state.contacts,
     filtered: state.filtered
   }
 }

 const mapDispatchToProps = {
  contactsLoaded,
  addForm,
  loadingOn
 }

 export default WithService()(connect(mapStateToProps, mapDispatchToProps)(ContactList));