import { IState } from '../../ts';
import classes from './header.module.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';

const Header = (props: any) => {
  const {idToken} = props;
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <h1>Personal Area</h1>
        <nav className={classes.headerNav}>
        {idToken
          ? <ul>
              <li><Link to='/logout'>Logout</Link></li>
            </ul>
          : null
        }
        </nav>
      </div>

    </header>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    idToken: !!state.idToken
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);