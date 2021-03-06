import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/Ionicons";
import database from '@react-native-firebase/database';


export default class Page1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topC: [],
    };
  }

  componentWillMount() {
    database().ref('/topCategories/').once('value').then(snapshot => {
      console.log('User data: ', snapshot.val());
    });
  }

  render() {
    return (
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginRight: 10, flex: 1, height: 40, width: 40, borderRadius: 3, backgroundColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="md-location-outline" color="black" size={25} />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 5, flex: 1, height: 40, borderRadius: 3, backgroundColor: '#E6E6E6', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <TextInput
              placeholder="Search for food items"
              textAlignVertical={'center'} />
            <Icon name="md-search-outline" color="black" size={25} />
          </View>
        </View>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, marginTop: 20 }}>Welcome to McDonald's</Text>
        <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>Top Categories</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center" }}>
            <Icon name="md-funnel-outline" color="black" size={17} />
            <Text style={{ fontSize: 14, marginHorizontal: 5 }}>Filter</Text>
          </View>
        </View>
        <View>
          {TopC ? (<ScrollView horizontal >
            {TopC.map((content) => (
              <Text>{content}</Text>
            ))}
          </ScrollView>) : null
          }
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>Popular Items</Text>
          <View style={{ backgroundColor: '#f0f0f0', borderRadius: 3, paddingHorizontal: 7, padding: 3 }}>
            <Text>View all</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>Trending Deals</Text>
          <View style={{ backgroundColor: '#f0f0f0', borderRadius: 3, paddingHorizontal: 7, padding: 3 }}>
            <Text>View all</Text>
          </View>
        </View>
      </View >
    )
  }
}
