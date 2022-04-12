import { IState, IAction, IServerLoginResponse } from '../../ts';
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import classes from './loginPage.module.scss';
import Input from '../../components/input';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import { connect } from 'react-redux';
import WithService from '../../components/hoc';
import { loadingOn, login } from '../../redux/actions';

interface PropsType {
  loading: boolean;
  idToken: string;
  loadingOn: () => IAction;
  login: ({idToken, expiresIn}: IServerLoginResponse) => IAction;
  Service: any;
}

const LoginPage = (props:PropsType) => {
  
  const {loading, idToken, Service, login, loadingOn} = props;

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const auth = ({mail, pass}: {mail: string, pass: string}) => {
    Service.auth(mail, pass) 
    .then((response: IServerLoginResponse) => login(response))
  } 

  const clearMail = () => setMail('');
  const clearPass = () => setPass('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingOn();
    auth({mail, pass});
    clearMail();
    clearPass(); 
  };

  const form = (
    <form 
      className={classes.form} 
      onSubmit={onSubmit}
    >
      <Input
        id = 'email'
        type = 'text'
        readonly = {false}
        placeholder = 'Email'
        arialabel = 'Email'
        inputHandler = { (mail: string) => setMail(mail) }
        clearData = {clearMail}
        value = ''
        validation = {[]}
        autofocus = {false}
        handlerClick = {()=>{}}
      />

      <Input
        id = 'password'
        type = 'password'
        readonly = {false}
        placeholder = 'Password'
        arialabel = {'Password'}
        inputHandler = { (pass: string) => setPass(pass) }
        clearData = {clearPass}
        value = ''
        validation = {[]}
        autofocus = {false}
        handlerClick = {()=>{}}
      />
      
      <Button
        label = "Login"
        type = "submit"
        handlerClick={()=>{}}
      />

      { loading ? <Spinner/> : null }
    </form>
  )

  return(<>
    { idToken ? <Navigate to={'/contacts'}/> : form }
  </>)

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