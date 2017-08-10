import { connect } from 'react-redux';
import GateAssignmentUploadForm from '../Components/GateAssignmentUploadForm';
import { fileUploaded, uploadError, changeTab } from '../Redux/actions';

const mapStateToProps = state => {
  return {
    username: `${state.login.username}@flysfo.com`,
    uploadedFile: state.upload.uploadedFile,
    uploadError: state.upload.uploadError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleUpload: (state) => {
      dispatch(fileUploaded(state))
    },
    uploadFailed: (err) => {
      dispatch(uploadError(err))
    },
    changeTab: index => {
      dispatch(changeTab(index))
    }
  }
};

const GateAssignmentFormContainer = connect(mapStateToProps, mapDispatchToProps)(GateAssignmentUploadForm);
export default GateAssignmentFormContainer;