import { IState } from '../../ts';
import React, {Component} from 'react'
import { Navigate } from 'react-router-dom'
import classes from './loginPage.module.scss';
import Input from '../../components/input';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import { connect } from 'react-redux';
import WithService from '../../components/hoc';
import { loadingOn, login } from '../../redux/actions';

interface IStateLP {
  mail: string,
  pass: string
}

interface PropsType {
  loading: boolean
  idToken: string
  loadingOn: Function
  login: Function
}

class LoginPage extends Component<PropsType, {}> {
  
  mailInp: any = React.createRef();
  passInp: any = React.createRef();
  
  state: IStateLP = { mail: '', pass: '', }

  auth = ({mail, pass}: IStateLP) => {
    const {Service, login, loadingOn}: any = this.props;
    loadingOn();
    Service.auth(mail, pass) 
    .then((response: any) => {
      login(response);
    })
  } 

  inputMailHandler = (mail: string) => this.setState({mail});
  inputPassHandler = (pass: string) => this.setState({pass});
  clearMail = () => this.setState({mail: ''});
  clearPass = () => this.setState({pass: ''});

  onSubmit = (e: any) => {
    e.preventDefault();
    const {loadingOn}: any = this.props;
    loadingOn();
    this.auth(this.state);
    this.clearMail();
    this.clearPass();
    this.mailInp.current.onClrHandler();
    this.passInp.current.onClrHandler(); 
  };

  render() {
    const loading: boolean = this.props.loading;
    const idToken: string = this.props.idToken;

    const form = (
      <form 
        className={classes.form} 
        onSubmit={this.onSubmit}
      >
        <Input
          ref = {this.mailInp}
          id = 'email'
          type = 'text'
          readonly = {false}
          placeholder = 'Email'
          arialabel = 'Email'
          inputHandler = {this.inputMailHandler}
          clearData = {this.clearMail}

          value = ''
          validation = {[]}
          autofocus = {false}
          handlerClick = {()=>{return}}
        />

        <Input
          ref = {this.passInp}
          id = 'password'
          type = 'password'
          readonly = {false}
          placeholder = 'Password'
          arialabel = {'Password'}
          inputHandler = {this.inputPassHandler}
          clearData = {this.clearPass}

          value = ''
          validation = {[]}
          autofocus = {false}
          handlerClick = {()=>{return}}
        />
        
        <Button
          label = "Login"
          type = "submit"
        />

        { loading ? <Spinner/> : null }
      </form>
    )

    return(
      <>{
        idToken ? <Navigate to={'/contacts'}/> : form
      }</>

           
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    loading: state.loading,
    idToken: state.idToken
  }
}

const mapDispatchToProps = {
  loadingOn,
  login
}

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(LoginPage));