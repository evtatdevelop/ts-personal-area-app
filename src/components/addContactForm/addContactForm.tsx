import { IState, IContact, IAction } from '../../ts';
import React, { useState } from 'react'
import classes from './addContactForm.module.scss';
import Button from '../button';
import Input from '../input';
import { connect } from 'react-redux';
import WithService from '../hoc/withService';
import { formsClean, contactsLoaded, addContact, loadingOn } from '../../redux/actions';

interface IAddForm {
  formsClean: ()=>IAction;
  contactsLoaded: (contacts:IContact[])=>IAction;
  addContact: ()=>IAction;
  loadingOn: ()=>IAction;
  Service: any
}

const AddContactForm: React.FC<IAddForm> = props => {

  const {Service, addContact, contactsLoaded, loadingOn, formsClean} = props;
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;  
    loadingOn();
    Service.add({name, phone, email})
    .then(() =>{
      addContact();
      Service.getContacts()
      .then((contacts: IContact[]) => {
        contactsLoaded(contacts)
      })
    })
  }
 
  return (
    <div className={classes.addContactForm}>
      <form onSubmit = {onSubmit} >
        <Input
          id = 'name'
          type = 'text'
          readonly = {false}
          placeholder = 'Name'
          arialabel = {'Name'}
          inputHandler = { (name: string) => setName(name) }
          clearData = { () => setName('') }
          validation = {['required']}
          value = ''
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
          
          validation = {[]}
          value = ''
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
          validation = {['email']}
          value = ''
          autofocus = {false}
          handlerClick = {()=>{}}
        />

        <div className={classes.butttons}>
          <Button
              label = "Accept"
              type = "submit"
              handlerClick={()=>{}}
            />
          <Button
              label = "Cancel"
              type = "button"
              handlerClick={ formsClean }
            />          
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  formsClean,
  contactsLoaded,
  addContact,
  loadingOn
}

export default WithService()(connect(null, mapDispatchToProps)(AddContactForm));