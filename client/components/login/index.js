import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FormBox from '../form-box/index';
import redux from '../../redux/index';
import styles from './styles';

const {
  actions: {
    creators: { setPassword, setUsername, login },
  },
} = redux;

class Login extends Component {
  componentWillUnmount() {
    const { clear } = this.props;

    clear();
  }

  render() {
    const { username, password, onChangePassword, onChangeUsername, onSubmit, goBack } = this.props;

    const SubmitButton = () => (
      <button style={styles.button} onClick={onSubmit}>
        Login
      </button>
    );

    return (
      <FormBox SubmitButton={SubmitButton}>
        <h2>Login</h2>
        <div>
          <button style={styles.goBack} onClick={goBack}>
            Go Back
          </button>
        </div>
        <div>
          <label htmlFor={'login-username'}>Username</label>
          <input type={'text'} id={'login-username'} onChange={onChangeUsername} value={username} />
        </div>
        <div>
          <label htmlFor={'login-password'}>Password</label>
          <input
            type={'password'}
            id={'login-password'}
            onChange={onChangePassword}
            value={password}
          />
        </div>
      </FormBox>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapStateToProps = ({ username, password }) => ({
  username,
  password,
});
const mapDispatchToProps = (dispatch, { history: { push } }) => ({
  onChangeUsername: ({ target: { value } }) => dispatch(setUsername(value)),
  onChangePassword: ({ target: { value } }) => dispatch(setPassword(value)),
  onSubmit: () => {
    return dispatch(login()).then(() => {
      push('/authenticated');
    });
  },
  goBack: () => push('/'),
  clear: () => {
    dispatch(setUsername(''));
    dispatch(setPassword(''));
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
