import { IState, IContact } from '../../ts';
import React, {Component} from 'react'
import classes from './addContactForm.module.scss';
import Button from '../button';
import Input from '../input';
import { connect } from 'react-redux';
import WithService from '../hoc/withService';
import { formsClean, contactsLoaded, addContact, loadingOn } from '../../redux/actions';


interface PropsType {
  formsClean: Function;
  contactsLoaded: Function;
  addContact: Function;
  loadingOn: Function;
  Service: any
}

class AddContactForm extends Component<PropsType, {}> {

  state = {
    name: '',
    phone: '',
    email: '',
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    if (!this.state.name) return;
    const {Service, addContact, contactsLoaded, loadingOn} = this.props;
    loadingOn();
    Service.add(this.state)
    .then(() =>{
      addContact();
      Service.getContacts()
      .then((contacts: IContact[]) => {
        contactsLoaded(contacts)
      })
    })
  }


  inputNamelHandler = (name: string) => this.setState({name});
  inputPhoneHandler = (phone: string) => this.setState({phone});
  inputEmailHandler = (email: string) => this.setState({email});
  clearName = () => this.setState({name: ''});
  clearPhone = () => this.setState({phone: ''});
  clearEmail = () => this.setState({email: ''});

  render() {
    const {formsClean} = this.props;

    return (
      <div className={classes.addContactForm}>
        <form onSubmit={e=>this.onSubmit(e)}>
            <Input
              id = 'name'
              type = 'text'
              readonly = {false}
              placeholder = 'Name'
              arialabel = {'Name'}
              inputHandler = {this.inputNamelHandler}
              clearData = {this.clearName}
              validation = {['required']}
              // validation = {[]}
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
              inputHandler = {this.inputPhoneHandler}
              clearData = {this.clearPhone}
              
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
              inputHandler = {this.inputEmailHandler}
              clearData = {this.clearEmail}
              validation = {['email']}
              value = ''
              autofocus = {false}
              handlerClick = {()=>{return}}
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