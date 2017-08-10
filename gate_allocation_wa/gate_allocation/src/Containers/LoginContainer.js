import { connect } from 'react-redux';
import { storeLogin, postAD } from '../Redux/actions';
import Login from '../Components/Login';

const mapStateToProps = state => {
  return {authorized: state.login.authorized};
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmit: (username, password, history) => {
      dispatch(postAD({username, password}, history))
    },
    alreadyLoggedIn: (username, fullname) => {
      dispatch(storeLogin(username, fullname))
    }
  }
};
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;