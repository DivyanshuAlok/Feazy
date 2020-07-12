import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";

import Page1 from './Page1';
import DineOut from './DineOut';
import Shop from './Shop';
import Profile from './Profile';

export default class HomeTabs extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">

          <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#00CB2C', color: 'white' }} title="tabber_101" hideNavBar>

            <Scene key="Page1"
              component={Page1}
              title="Explore"
              hideNavBar={true}
              icon={() => <Icon name="md-compass-outline" color="white" size={25} />}

            />


            <Scene key="DineOut"
              component={DineOut}
              title="DineOut"
              hideNavBar={true}
              icon={() => <Icon name="md-restaurant-outline" color="white" size={25} />}
            />

            <Scene key="Shop"
              component={Shop}
              title="Shop"
              hideNavBar={true}
              icon={() => <Icon name="md-basket-outline" color="white" size={25} />}
            />

            <Scene key="Profile"
              component={Profile}
              title="Profile"
              hideNavBar={true}
              icon={() => <Icon name="md-person-circle-outline" color="white" size={25} />}
            />

          </Scene>


        </Scene>
      </Router>
    )
  }
}
