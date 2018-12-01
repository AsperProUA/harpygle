import React, { Component } from 'react';
import './App.css';

import MainFrame from './components/MainFrame';

class App extends Component {
  constructor() {
    super();

    let appState = {};

    if (localStorage['appState']) {
      appState = JSON.parse(localStorage['appState']);
      if (new Date() - Date.parse(appState.user.timestamp) > (7 * 24 * 60 * 60 * 1000)) {
        appState = {
          isLoggedIn: false,
          user: {},
        };
      }

    } else {
      appState = {
        isLoggedIn: false,
        user: {},
      }
    }

    appState.isLoad = false;
    appState.success = true;
    this.state = appState;
  }
  render() {
    return (
      <MainFrame />
    );
  }
}

export default App;
