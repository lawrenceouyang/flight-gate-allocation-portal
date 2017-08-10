import { createActions } from 'redux-actions';

/*
* login: pass username and password to an authenticator and store the results in state
* storeLogin: pass username and fullname for an already authenticated user
* */
export const { storeLogin, unauthorize, logout } = createActions({
  STORE_LOGIN: (username, fullname) => ({username, fullname}),
  UNAUTHORIZE: payload => ({payload}),
  LOGOUT: payload => ({payload})
});

/*
 * Fetch action and action creators.
 */
export const { fetchRequest, fetchSuccess, fetchError } = createActions({
  FETCH_REQUEST: payload => payload,
  FETCH_SUCCESS: payload => payload,
  FETCH_ERROR: err => err,
});

export const { fileUploaded, uploadError } = createActions({
  FILE_UPLOADED: payload => payload,
  UPLOAD_ERROR: err => err
});

export const { changeTab } = createActions({
  CHANGE_TAB: index => index
});

function statusHelper (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response.statusText)
  }
}

function fetchPostAD(username, password) {
  return fetch("/login/",
    {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
     })
    })
}

export function postAD(credentials, history) {
  return function (dispatch) {
    dispatch(fetchRequest());
    return fetchPostAD(credentials.username, credentials.password)
    .then(statusHelper)
    .then(response => response.json())
    .then(payload => {
            dispatch(fetchSuccess());
            dispatch(storeLogin(payload.username, payload.fullname));
            history.push('/home')
          })
    .catch(err => {
      console.log(err);
      dispatch(fetchError(err));
      dispatch(unauthorize());
    })
  }
}

function fetchLogout() {
  window.userName = '';
  window.fullName = '';
  return fetch("/logout/", {credentials: 'same-origin'})
}

export function logoutDjango(history) {
  return function(dispatch) {
    return fetchLogout()
    .then(statusHelper)
    .then(() => {
        dispatch(logout());
        history.push('/');
      })
    .catch(err => {
        dispatch(logout());
        history.push('/');
      })
  }
}