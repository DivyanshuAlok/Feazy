
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import auth, { firebase } from "@react-native-firebase/auth"
import { Actions } from 'react-native-router-flux';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    //  this.register("said1292@gmail.com", "123456");
    this.__isTheUserAuthenticated();
  }

  __isTheUserAuthenticated = async () => {
    console.log('start');
    let user = await firebase.auth().currentUser;
    if (user) {
      console.log(user);
      console.log('yes');
      Actions.HomeTabs();
    } else {
      console.log('not');
      Actions.Home();
    }
  };


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    )
  }
}
