import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import MainFrame from './components/MainFrame';
import Intro from './components/intro'

window.myOwnProps = { apiPath: 'http://192.168.0.92:4500/' };

class App extends Component {
  constructor() {
    super();

    let appState = {};

    // console.log(localStorage['appState'])

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

    window.myOwnProps.getData = (data) => {
      this.setState({ isLoad: true });
      return new Promise((resolve) => {
        axios.get(window.myOwnProps.apiPath + data.url).then((response) => {

          if (response.data.auth) {
            this.setState({ success: response.data.success, isLoad: false });
            return resolve(response);
          }
        }).catch((error) => {
          if (error.response) {
            if (error.response.status == '401') {
              this.logoutUser();
            }
            if (error.response.status == '403') {
              this.setState({
                success: false,
                isError: true,
                isLoading: false,
              });
            }
          } else {
            console.log(error);
          }
        });
      });
    }

    window.myOwnProps.getData = (data) => {
      this.setState({ isLoad: true });
      return new Promise((resolve) => {
        axios.get(window.myOwnProps.apiPath + data.url).then((response) => {

          if (/*response.data.auth*/true) {
            this.setState({ success: response.data.success, isLoad: false });
            return resolve(response);
          }
        }).catch((error) => {
          if (error.response) {
            if (error.response.status == '401') {
              this.logoutUser();
            }
            if (error.response.status == '403') {
              this.setState({
                success: false,
                isError: true,
                isLoading: false,
              });
            }
          } else {
            console.log(error);
          }
        });
      });
    }

    window.myOwnProps.loginUser = (email, password, type) => {

      return new Promise((resolve, reject) => {
        axios.post(window.myOwnProps.apiPath + "login", {
          userType: type,
          email: email,
          password: password,
        })
          .then(response => {
            return response;
          })
          .then(json => {
            if ('bOwner logged in successfully' == json.data.msg) {

              let userData = {
                id: json.data.businessOwnerID,
                token: json.data.accessToken,
                expireAt: json.data.expires_at
              };
              let appState = {
                isLoggedIn: true,
                user: userData
              };
              // save app state with user date in local storage
              localStorage["appState"] = JSON.stringify(appState);
              this.setState({
                isLoggedIn: appState.isLoggedIn,
                user: appState.user
              });
              return resolve(true);
            } else alert("Login Failed!");

          })
          .catch(error => {
            if (error.response.data.error) {
              return reject(error.response.data.msg);
            }
          });
      })
    }
  }

  logoutUser = () => {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    // save app state with user date in local storage
    console.log(new Date() - Date.parse(JSON.parse(localStorage["appState"]).user.timestamp));
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);

  };


  render() {
    if (this.state.isLoggedIn) {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage['appState']).user.token;
      return (

        <MainFrame role={this.state.user.role} />

      );
    } else {
      return (
        <Intro />
      );
    }
  }
}

export default App;
