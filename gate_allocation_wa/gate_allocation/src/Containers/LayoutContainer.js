import { connect } from 'react-redux';
import { logoutDjango, storeLogin, fileUploaded, changeTab } from '../Redux/actions';
import Layout from '../Components/Layout';


const mapStateToProps = state => {
  return {
    username: state.login.username,
    fullname: state.login.fullname,
    index: state.tab.index
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleUpload: (state) => {
      dispatch(fileUploaded(state))
    },
    onLogout: history => {
      dispatch(logoutDjango(history))
    },
    alreadyLoggedIn: (username, fullname) => {
      dispatch(storeLogin(username, fullname))
    },
    changeTab: (index) => {
      dispatch(changeTab(index))
    }
  }
};
const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default LayoutContainer;