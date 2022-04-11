import { IState, IAction } from './ts';
import { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import Header from './components/header';
import { autoLogin } from './redux/actions';
import LoginPage from './pages/loginPage';
import Logout from './pages/logout';
import ContactPage from './pages/contactPage'

interface PropsType {
  idToken: boolean;
  autoLogin: () => IAction;
}

const App = (props: PropsType) => {

  useEffect( () => {props.autoLogin()} )

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        {props.idToken ? <Route path='/contacts' element={<ContactPage/>} /> : null}
        {props.idToken ? <Route path='/logout' element={<Logout/>} /> : null}
      </Routes>
    </div>
  );

}

const mapStateToProps = (state: IState) => {
  return {
    idToken: !!state.idToken
  }
}

const mapDispatchToProps = {
  autoLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
