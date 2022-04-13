import { IState, IContact, IAction } from '../../ts';
import classes from './delContactForm.module.scss';
import Button from '../button';
import { connect } from 'react-redux';
import WithService from '../hoc/withService';
import { formsClean, contactsLoaded, delContact, loadingOn } from '../../redux/actions';


interface PropsType {
  contact: IContact;
  formsClean(): IAction;
  contactsLoaded(contacts:IContact[]): IAction;
  delContact(): IAction;
  loadingOn(): IAction;
  Service: any
}

const DelContactForm = (props:PropsType) => {
  const { contact: {id, name, email, phone }, formsClean, Service, delContact, contactsLoaded, loadingOn} = props;
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    loadingOn();
    Service.delete(id)
    .then(() =>{
      delContact();
      Service.getContacts()
      .then((contacts: IContact[]) => {
        contactsLoaded(contacts)
      })
    })
  }
  
  return (
    <div className={classes.delContactForm}>
      <form onSubmit={e=>onSubmit(e, id)}>
        <h2 className={classes.name}>{name}</h2>
        <p className={classes.phone}><span>Pone: </span><a href={`tel:${phone}`}>{phone}</a></p>
        <p className={classes.email}><span>Email: </span><a href={`mailto:${email}`}>{email}</a></p>
        <div className={classes.butttons}>
          <Button
              label = "Delete"
              type = "submit"
              handlerClick={()=>{}}
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
  delContact,
  loadingOn
}

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(DelContactForm));