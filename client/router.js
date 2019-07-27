import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Signup, Authenticated } from './components/index';
import styles from './styles';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div style={styles.container}>
          <Switch>
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/authenticated'} component={Authenticated} />
            <Route exact path={'/signup'} component={Signup} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
