import React, { Component } from 'react';
import './App.css';
import Navigator from './navigator/Navigator';
import { Container } from 'semantic-ui-react';
import Footer from './shared/Footer'
import firebase from 'firebase/'
import { storageConfig } from './shared/config';

class App extends Component {

  componentDidMount() {
    firebase.initializeApp(storageConfig)
  }

  render() {
    return (
      <div>
          <Navigator />
        <Footer />
      </div>
    );
  }
}

export default App;
