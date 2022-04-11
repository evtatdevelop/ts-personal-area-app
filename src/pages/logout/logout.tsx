import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from '../../redux/actions';

interface PropsType { logout: Function }

const Logout = (props: PropsType) => {
  useEffect( () => {props.logout()} )
  return <Navigate to={'/'}/>
}

const mapDispatchToProps = { logout }

export default connect(null, mapDispatchToProps)(Logout);