import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import Home from './src/Home.js';
import SignUp from './src/SignUp.js';
import Main from './src/Main.js';
import Page1 from './src/Page1.js';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Main" component={Main} hideNavBar={true} initial />
          <Scene key="Home" component={Home} hideNavBar={true} />
          <Scene key="SignUp" component={SignUp} hideNavBar={true} />
          <Scene key="Page1" component={Page1} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}