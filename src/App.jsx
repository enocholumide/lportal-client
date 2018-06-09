import React, { Component } from 'react'
import './App.css';
import Navigator from './navigator/Navigator'
import ApplicationFooter from './shared/Footer'
import firebase from 'firebase/app'
import 'firebase/storage'
import { storageConfig } from './shared/config'
import { Layout } from 'antd';
const { Footer, Content } = Layout;

class App extends Component {

  componentDidMount() {
    firebase.initializeApp(storageConfig)
  }

  render() {
    return (
      <Layout>
        <Content><Navigator /></Content>
        <Footer style={{margin: 0, padding: 0}}><ApplicationFooter /></Footer>
      </Layout>
    );
  }
}

export default App;
