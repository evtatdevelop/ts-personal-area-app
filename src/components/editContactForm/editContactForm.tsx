import { IState, IContact, IAction } from '../../ts';
import { useState } from 'react'
import classes from './editContactForm.module.scss';
import Button from '../button';
import Input from '../input';
import { connect } from 'react-redux';
import WithService from '../hoc/withService';
import { formsClean, contactsLoaded, editContact, loadingOn } from '../../redux/actions';

interface PropsType {
  contact: IContact;
  formsClean: ()=>IAction;
  contactsLoaded: (contacts:IContact[])=>IAction;
  editContact: ()=>IAction;
  loadingOn: ()=>IAction;
  Service: any;
}

const EditContactForm: React.FC<PropsType> = props => {

  const {contact:{id: locId, name: locName, phone: locPhone, email: locEmail}, formsClean} = props;

  const [id, setId] = useState(locId);
  const [name, setName] = useState(locName);
  const [email, setEmail] = useState(locEmail);
  const [phone, setPhone] = useState(locPhone);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    const {Service, editContact, contactsLoaded, loadingOn} = props;
    loadingOn()
    Service.update({id, name, email, phone})
    .then(() =>{
      editContact();
      Service.getContacts()
      .then((contacts: IContact[]) => {
        contactsLoaded(contacts)
      })
    })
  }

  return (
    <div className={classes.editContactForm}>
      <form onSubmit = { onSubmit }>
          <Input
            id = 'name'
            type = 'text'
            readonly = {false}
            placeholder = 'Name'
            arialabel = {'Name'}
            inputHandler = { (name: string) => setName(name) }
            clearData = { () => setName('') }
            value = {name}
            validation = {['required']}
            autofocus = {false}
            handlerClick = {()=>{}}
          />

          <Input
            id = 'phone'
            type = 'tel'
            readonly = {false}
            placeholder = 'Phone'
            arialabel = {'Phone'}
            inputHandler = { (phone: string) => setPhone(phone) }
            clearData = { () => setPhone('') }
            value = {phone}
            validation = {[]}
            autofocus = {false}
            handlerClick = {()=>{}}
          />            

          <Input
            id = 'email'
            type = 'email'
            readonly = {false}
            placeholder = 'Email'
            arialabel = {'Email'}
            inputHandler = { (email: string) => setEmail(email) }
            clearData = { () => setEmail('') }
            value = {email}
            validation = {['email']}
            autofocus = {false}
            handlerClick = {()=>{}}
          />

        <div className={classes.butttons}>
          <Button
              label = "Accept"
              type = "submit"
            />
          <Button
              label = "Cancel"
              type = "button"
              handlerClick={formsClean}
            />          
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    contact: state.currentContact
  }
}

const mapDispatchToProps = {
  formsClean,
  contactsLoaded,
  editContact,
  loadingOn
}

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(EditContactForm));