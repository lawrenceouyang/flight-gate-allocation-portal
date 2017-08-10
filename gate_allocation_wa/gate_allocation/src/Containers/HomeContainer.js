import { connect } from 'react-redux';
import { changeTab } from '../Redux/actions';
import Home from '../Components/Home';


const mapStateToProps = state => {
  return {username: state.login.username, fullname: state.login.fullname};
};

const mapDispatchToProps = dispatch => {
  return {
    changeTab: (index) => {
      dispatch(changeTab(index))
    }
  }
};

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default LayoutContainer;