import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/Ionicons";
import database from '@react-native-firebase/database';
import auth, { firebase } from "@react-native-firebase/auth"
import { Actions } from 'react-native-router-flux';

export default class Page1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topC: [],
      popularItems: [],
      trendingDeals: [],
    };
  }

  componentWillMount() {
    database().ref('/topCategories/').once('value').then(snapshot => {
      snapshot.val().forEach(element => {
        this.setState({ topC: [...this.state.topC, element] })
      });
    });

    database().ref('/popularItems/').once('value').then(snapshot => {
      var stores = snapshot.val();
      stores.forEach(element => {
        this.setState({ popularItems: [...this.state.popularItems, element] })
      })
    });

    database().ref('/trendingDeals/').once('value').then(snapshot => {
      var stores = snapshot.val();
      stores.forEach(element => {
        this.setState({ trendingDeals: [...this.state.trendingDeals, element] })
      })
    });
  }

  async signOut() {
    await firebase.auth().signOut();
    Actions.Home();
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
        <View style={{ flexDirection: 'row', marginVertical: 8, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>Top Categories</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center" }}>
            <Icon name="md-funnel-outline" color="black" size={17} />
            <Text style={{ fontSize: 14, marginHorizontal: 5 }}>Filter</Text>
          </View>
        </View>


        <ScrollView
          horizontal>
          {this.state.topC.map((content, key) => (
            <View style={{ marginRight: 17, alignItems: "center" }}>
              <Image style={{ height: 70, width: 115, borderRadius: 5 }} source={require('./pizza.jpeg')} />
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 17, marginTop: 5 }}>{content}</Text>
            </View>
          ))}
        </ScrollView>


        <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>Popular Items</Text>
          <View style={{ backgroundColor: '#f0f0f0', borderRadius: 3, paddingHorizontal: 7, padding: 3 }}>
            <Text>View all</Text>
          </View>
        </View>

        <ScrollView
          horizontal>
          {this.state.popularItems.map((content, key) => (
            <View style={{ marginRight: 17, alignItems: "center", flexDirection: 'row', padding: 5, borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 5 }}>
              <Image style={{ height: 90, width: 70, borderRadius: 5 }} source={require('./pizza.jpeg')} />
              <View style={{ marginLeft: 5, alignItems: 'flex-start' }}>

                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 17 }}>{content.name}</Text>
                <Text style={{ color: 'grey', fontSize: 17, marginBottom: 10 }}>By {content.store}</Text>
                <View
                  style={{
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 1,
                    width: 110, marginBottom: 10
                  }}
                />

                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 17 }}>Rs. {content.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>Trending Deals</Text>
          <View style={{ backgroundColor: '#f0f0f0', borderRadius: 3, paddingHorizontal: 7, padding: 3 }}>
            <Text>View all</Text>
          </View>
        </View>
        <ScrollView
          horizontal>
          {this.state.trendingDeals.map((content, key) => (
            <View style={{ marginRight: 17, padding: 5, borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 5 }}>
              <Image style={{ height: 100, width: 180, borderRadius: 5 }} source={require('./pizza.jpeg')} />
              <View style={{ marginLeft: 5 }}>

                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20 }}>{content.store}</Text>
                <Text style={{ color: 'grey', fontFamily: 'Poppins-SemiBold', fontSize: 15, marginBottom: 10 }}>{content.name}</Text>

                <Text style={{ backgroundColor: 'red', color: 'white', paddingHorizontal: 10, padding: 5, fontWeight: 'bold', width: 70, borderRadius: 5 }}>{content.offer}% OFF</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#00CB2C', alignItems: 'center', justifyContent: 'center', height: 40, marginTop: 20 }}>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 20 }}>Sign Out</Text>
        </TouchableOpacity>
      </View >
    )
  }
}
