import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './App.css';

import MainFrame from './components/MainFrame';
import Intro from './components/intro'

class App extends Component {
  constructor(props) {

    super(props);

    let appState = {};

    appState.success = true;
    this.state = appState;
  }

  

  render() {
    const { isLoggedIn, user, isLoad } = this.props.loginData;

    // console.log(isLoad);

    if (isLoggedIn) {
      user.token && (axios.defaults.headers.common['Authorization'] = user.token);
      return (
        
        <MainFrame role={user.role} isLoad={isLoad}/>

      );
    } else {
      return (
        <Intro />
      );
    }
  }
}

export default connect(
  state => ({
    loginData: state.loginData,
  }),
)(App);

