import { IState, IContact } from '../../ts';
import React, {Component} from 'react'
import classes from './editContactForm.module.scss';
import Button from '../button';
import Input from '../input';
import { connect } from 'react-redux';
import WithService from '../hoc/withService';
import { formsClean, contactsLoaded, editContact, loadingOn } from '../../redux/actions';


interface PropsType {
  contact: any;
  formsClean: Function;
  contactsLoaded: Function;
  editContact: Function;
  loadingOn: Function;
  Service: any
}

class EditContactForm extends Component<PropsType, {}> {

  state = {
    id: null,
    name: '',
    phone: '',
  }

  componentDidMount() {
    this.setState({...this.props.contact})
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    if (!this.state.name) return;
    const {Service, editContact, contactsLoaded, loadingOn} = this.props;
    loadingOn()
    Service.update(this.state)
    .then(() =>{
      editContact();
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
    const {contact:{name, phone, email}, formsClean} = this.props;

    return (
      <div className={classes.editContactForm}>
        <form onSubmit={e=>this.onSubmit(e)}>
            <Input
              id = 'name'
              type = 'text'
              readonly = {false}
              placeholder = 'Name'
              arialabel = {'Name'}
              inputHandler = {this.inputNamelHandler}
              clearData = {this.clearName}
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
              inputHandler = {this.inputPhoneHandler}
              clearData = {this.clearPhone}
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
              inputHandler = {this.inputEmailHandler}
              clearData = {this.clearEmail}
              value = {email}
              validation = {['email']}
              autofocus = {false}
              handlerClick = {()=>{}}
            />

          <div className={classes.butttons}>
            <Button
                label = "Accept"
                type = "submit"
                handlerClick={()=>null}
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