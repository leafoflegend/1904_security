import { post, get } from './utils';

const SET_USERNAME = Symbol('SET_USERNAME');
const SET_PASSWORD = Symbol('SET_PASSWORD');
const SET_USER = Symbol('SET_USER');

const setUsername = username => ({
  type: SET_USERNAME,
  username,
});

const setPassword = password => ({
  type: SET_PASSWORD,
  password,
});

const setUser = user => ({
  type: SET_USER,
  user,
});

const signup = () => (dispatch, getState) => {
  const { username, password } = getState();

  return post('/api/signup', { username, password })
    .then(user => {
      console.log('Successfully signed up!');
      dispatch(setUser(user));
    })
    .catch(e => console.error('Error signing up.', e));
};

const login = () => (dispatch, getState) => {
  const { username, password } = getState();

  return post('/api/login', { username, password })
    .then(res => dispatch(setUser(res)))
    .catch(e => console.error('Error logging in.', e));
};

const logout = () => dispatch => {
  return post('/api/logout')
    .then(() => dispatch(setUser(null)))
    .catch(e => console.error('Error logging out.', e));
};

const whoAmI = () => dispatch => {
  return get('/api/whoami')
    .then(res => dispatch(setUser(res)))
    .catch(e => console.error('Error fetching user credentials.', e));
};

const actions = {
  types: {
    SET_USERNAME,
    SET_PASSWORD,
    SET_USER,
  },
  creators: {
    setUsername,
    setPassword,
    signup,
    login,
    logout,
    whoAmI,
  },
};

export default actions;
