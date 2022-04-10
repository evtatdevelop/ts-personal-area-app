import { IState, IContact } from '../../ts';
import React, { useState } from 'react'
import classes from './addContactForm.module.scss';
import Button from '../button';
import Input from '../input';
import { connect } from 'react-redux';
import WithService from '../hoc/withService';
import { formsClean, contactsLoaded, addContact, loadingOn } from '../../redux/actions';


interface IAddForm {
  formsClean: Function;
  contactsLoaded: Function;
  addContact: Function;
  loadingOn: Function;
  Service: any
}

const AddContactForm: React.FC<IAddForm> = props => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // const {formsClean} = props;


  const onSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (!!!name) return;
    const {Service, addContact, contactsLoaded, loadingOn} = props;
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
  
  
  const inputNamelHandler = (name: string) => setName(name);
  const inputPhoneHandler = (phone: string) => setPhone(phone);
  const inputEmailHandler = (email: string) => setEmail(email);
  const clearName = () => setName('');
  const clearPhone = () => setPhone('');
  const clearEmail = () => setEmail('');


  return (
    <div className={classes.addContactForm}>
      <form 
        onSubmit = {(e: any) => onSubmit(e)}
      >
          <Input
            id = 'name'
            type = 'text'
            readonly = {false}
            placeholder = 'Name'
            arialabel = {'Name'}
            inputHandler = {inputNamelHandler}
            clearData = {clearName}
            validation = {['required']}
            value = ''
            autofocus = {false}
            handlerClick = {()=>{return}}
          />
          <Input
            id = 'phone'
            type = 'tel'
            readonly = {false}
            placeholder = 'Phone'
            arialabel = {'Phone'}
            inputHandler = {inputPhoneHandler}
            clearData = {clearPhone}
            
            validation = {[]}
            value = ''
            autofocus = {false}
            handlerClick = {()=>{return}}
          />            
          <Input
            id = 'email'
            type = 'email'
            readonly = {false}
            placeholder = 'Email'
            arialabel = {'Email'}
            inputHandler = {inputEmailHandler}
            clearData = {clearEmail}
            validation = {['email']}
            value = ''
            autofocus = {false}
            handlerClick = {()=>{}}
          />
        <div className={classes.butttons}>
          <Button
              label = "Accept"
              type = "submit"
              handlerClick={()=>false}
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
    
  }
}

const mapDispatchToProps = {
  formsClean,
  contactsLoaded,
  addContact,
  loadingOn
}

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(AddContactForm));