import { IAction } from '../../ts';
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from '../../redux/actions';

const Logout = (props: {logout(): IAction }) => {
  useEffect( () => {props.logout()} )
  return <Navigate to={'/'}/>
}

const mapDispatchToProps = { logout }

export default connect(null, mapDispatchToProps)(Logout);