import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import { Actions } from 'react-native-router-flux';


const Home = () => {

  const [bordercolor1, setBordercolor1] = useState('#E3E3E3')
  const [bordercolor2, setBordercolor2] = useState('#E3E3E3')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const __doSingIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password)
      if (response && response.user) {
        ToastAndroid.show("Authenticated successfully", ToastAndroid.SHORT);
        Actions.Page1();
      }
    } catch (e) {
      console.error(e.message);
      Alert.alert(
        'Error', e.message,
        [
          { text: 'Sign Up', onPress: () => Actions.SignUp() },
        ],
        { cancelable: false }
      )
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./joseph.png')}
        style={styles.BGimage}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}>
          <View style={{ alignItems: 'center', marginVertical: 40, flex: 1 }}>
            <Text style={styles.feazyText}>Feazy</Text>
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins-SemiBold' }}>
              fast and easy
            </Text>
          </View>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 10, flex: 4 }}>
            <Text style={{ fontSize: 30, fontFamily: 'Poppins-SemiBold', textAlign: 'center', margin: 15 }}>Sign in</Text>
            <View style={{ paddingHorizontal: 5 }}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Email ID</Text>
              <TextInput
                autoCapitalize='none'
                onFocus={() => { setBordercolor1('#7F7F7F') }}
                onBlur={() => { setBordercolor1('#E3E3E3') }}
                style={{ borderColor: bordercolor1, borderWidth: 1, height: 40, borderRadius: 3, paddingHorizontal: 15, fontSize: 16 }}
                textAlignVertical={'center'}
                placeholder="Email ID"
                keyboardType="email-address"
                onChangeText={text => {
                  setEmail(text)
                }}
              />
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 16 }}>Password</Text>
              <View style={{}}>
                <TextInput
                  autoCapitalize='none'
                  onFocus={() => { setBordercolor2('#7F7F7F') }}
                  onBlur={() => { setBordercolor2('#E3E3E3') }}
                  style={{ borderColor: bordercolor2, borderWidth: 1, height: 40, borderRadius: 3, paddingHorizontal: 15, fontSize: 16 }}
                  placeholder="Password"
                  textAlignVertical={'center'}
                  keyboardType={'visible-password'}
                  secureTextEntry={false}
                  onChangeText={text => setPassword(text)}
                />
              </View>
              <View style={{ alignItems: "center", margin: 16, marginTop: 60 }}>
                <TouchableOpacity onPress={__doSingIn} style={{ height: 40, width: 130, backgroundColor: '#00CB2C', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="md-arrow-forward-outline" color="white" size={25} />
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#B0B0B0', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>or</Text>
              <View style={{ alignItems: "center", margin: 16, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={{ height: 40, flexDirection: 'row', width: 130, borderRadius: 4, alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 1, borderColor: 'rgba(179, 179, 179, 0.302338)' }}>
                  <Icon name="md-logo-google" color="grey" size={25} />
                  <Text style={{ color: '#525068' }}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 40, flexDirection: 'row', width: 130, backgroundColor: '#1877F2', borderRadius: 4, alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 1, borderColor: '#1877F2' }}>
                  <Icon name="md-logo-facebook" color="white" size={25} />
                  <Text style={{ color: 'white' }}>Facebook</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 70 }}>
                <Text style={{ color: '#BEBEBE', fontWeight: 'bold', fontSize: 17 }}>Not yet a member, </Text>
                <TouchableOpacity><Text style={{ fontWeight: 'bold', color: '#00CB2C', fontSize: 17, textDecorationLine: 'underline' }}>Sign Up</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  BGimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  feazyText: {
    fontFamily: 'Cookie-Regular',
    color: 'white',
    fontSize: 100,
  },
});

export default Home;