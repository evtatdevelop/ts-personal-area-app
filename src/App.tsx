import { IState } from './ts';
import React, {Component} from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import Header from './components/header';
import { autoLogin } from './redux/actions';
import LoginPage from './pages/loginPage';
import Logout from './pages/logout';
import ContactPage from './pages/contactPage'

interface PropsType {
  idToken: boolean
  autoLogin: Function
}

// interface IRoute {
//   path: string;
//   name: string;
//   exact: boolean;
//   element: any;
//   props?: any
// }
class App extends Component<PropsType, {}> {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          {this.props.idToken ? <Route path='/contacts' element={<ContactPage/>} /> : null}
          {this.props.idToken ? <Route path='/logout' element={<Logout/>} /> : null}
        </Routes>
      </div>
    );
  }
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
