import { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from '../../redux/actions';

interface PropsType {
  logout: Function
}

class Logout extends Component<PropsType, {}> {

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Navigate to={'/'}/>
  }

}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Logout);