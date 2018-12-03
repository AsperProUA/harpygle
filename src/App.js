import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import MainFrame from './components/MainFrame';
import Intro from './components/intro'

window.myOwnProps = { apiPath: 'http://api.asper.pro/api' };

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
  loginUser = (email, password, remember) => {
    document.querySelector('#login-form button')
      .setAttribute('disabled', 'disabled');
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("rember_me", remember);

    axios.post(window.myOwnProps.apiPath + "/auth/login", formData, { headers: {} })
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          console.log(json);
          let userData = {
            auth_token: json.data.auth_token,
            expires_at: json.data.expires_at
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
        } else alert("Login Failed!");

      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
        document.querySelector("#login-form button")
          .removeAttribute("disabled");
      });
  }

  render() {
    if (this.state.isLoggedIn) {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage['appState']).user.auth_token;
      return (

        <MainFrame />

      );
    } else {
      return (
        <Intro />
      );
    }
  }
}

export default App;
