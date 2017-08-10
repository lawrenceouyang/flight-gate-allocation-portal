import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { routerReducer as routing} from 'react-router-redux';

const tabState = {
  index: 0
};

const loginState = {
  username: "",
  fullname: "",
  authorized: true
};

const fetchState = {
  isFetching: false,
  fetchError: ""
};

const uploadState = {
  uploadedFile: false,
  uploadError: ""
};

const tab = handleActions({
  CHANGE_TAB: (state, action) => ({
    index: action.payload
  })
}, tabState);

const login = handleActions({
  STORE_LOGIN: (state, action) => ({
    username: action.payload.username,
    fullname: action.payload.fullname,
    authorized: state.authorized
  }),
  UNAUTHORIZE: (state, action) => ({
    authorized: false
  }),
  LOGOUT: (state, action) => ({
    username: "",
    fullname: "",
    authorized: true
  })
}, loginState);

const fetch = handleActions({
  FETCH_REQUEST: (state, action) => ({
    isFetching: true
  }),
  FETCH_SUCCESS: (state, action) => ({
    isFetching: false,
    payload: action.payload
  }),
  FETCH_ERROR: (state, action) => ({
    isFetching: false,
    fetchError: action.payload
  })
}, fetchState);

const upload = handleActions({
  FILE_UPLOADED: (state, action) => ({
    uploadedFile: action.payload,
    uploadError: ""
  }),
  UPLOAD_ERROR: (state, action) => ({
    uploadedFile: false,
    uploadError: action.payload
  })
}, uploadState);

// function login(state = loginState, action) {
//   switch (action.type) {
//     case LOGIN:
//       return Object.assign({}, state, {username: action.username, fullname: action.fullname});
//     case STORE_LOGIN:
//       return Object.assign({}, state, {username: action.username, fullname: action.fullname});
//     default:
//       return state;
//   }
// }

const appReducer = combineReducers({
  login, fetch, upload, tab, routing
});

export default appReducer;