import React, { Component } from 'react';
import styles from './styles';

class Home extends Component {
  push = url => {
    const {
      history: { push },
    } = this.props;

    return push(url);
  };

  goToLogin = () => this.push('/login');
  goToSignup = () => this.push('/signup');

  render() {
    return (
      <>
        <h2 style={styles.header}>A Great Site</h2>
        <button style={styles.button()} onClick={this.goToLogin}>
          Login
        </button>
        <button style={styles.button('yellow')} onClick={this.goToSignup}>
          Signup
        </button>
      </>
    );
  }
}

export default Home;
