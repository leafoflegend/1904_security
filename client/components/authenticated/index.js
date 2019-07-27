import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import redux from '../../redux';

const {
  actions: {
    creators: { logout, whoAmI },
  },
} = redux;

class Authenticated extends Component {
  componentDidMount() {
    const { username, getUser } = this.props;

    if (!username) {
      getUser();
    }
  }

  render() {
    const { username, onLogout } = this.props;
    return (
      <div style={styles.container}>
        {username ? (
          <>
            <h3> You are logged in as {username}! </h3>
            <button onClick={onLogout} style={styles.logout}>
              {' '}
              Logout{' '}
            </button>
          </>
        ) : (
          <h3> Loading... </h3>
        )}
      </div>
    );
  }
}

Authenticated.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  username: state.user ? state.user.name : '',
});

const mapDispatchToProps = (dispatch, { history: { push } }) => ({
  getUser: () => dispatch(whoAmI()),
  onLogout: () => {
    return dispatch(logout()).then(() => {
      push('/');
    });
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Authenticated),
);
