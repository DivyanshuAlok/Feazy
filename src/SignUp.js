import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import { Actions } from 'react-native-router-flux';

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const SignUp = () => {

  const [bordercolor1, setBordercolor1] = useState('#E3E3E3')
  const [bordercolor2, setBordercolor2] = useState('#E3E3E3')
  const [bordercolor3, setBordercolor3] = useState('#E3E3E3')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [error, setError] = useState("")
  const forceUpdate = useForceUpdate();

  const __doSignUp = () => {

    if (email === "") {
      setError("Email required *")
      console.log('error');
      return
    } else if (password === "" && password.length < 6) {
      setError("Weak password, minimum 5 chars")
      console.log('error');
      return
    }
    else if (password != rePassword) {
      setError("Passwords do not match")
      console.log('error');
      return
    }

    __doCreateUser(email, password)
  }

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password
      )
      if (response && response.user) {
        Alert.alert(
          "Success ✅", "Account created successfully",
          [
            {
              text: 'Ok',
              onPress: () => Actions.Page1(),
            }
          ],
          { cancelable: false }
        )
      }
    } catch (e) {
      console.error(e.message)
      Alert.alert(
        'Error', e.message,
        [
          { text: 'Sign In', onPress: () => Actions.Home() },
          { text: 'OK', onPress: () => { setEmail(""); setPassword(""); setRePassword(""); } },
        ],
        { cancelable: false }
      )
    }
  }

  return (
    <View style={{ margin: 10, flex: 1 }}>
      {
        error ? (<Text style={{ backgroundColor: 'red', color: 'white', textAlign: 'center', padding: 3 }}>{error}</Text>) : null
      }
      <Text style={{ fontSize: 40, fontFamily: 'Poppins-SemiBold', textAlign: 'center', margin: 15 }}>Sign Up</Text>
      <View style={{ paddingHorizontal: 5, }}>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>Email ID</Text>
        <TextInput
          onFocus={() => { setBordercolor1('#7F7F7F') }}
          onBlur={() => { setBordercolor1('#E3E3E3') }}
          autoCapitalize='none'
          style={{ borderColor: bordercolor1, borderWidth: 1, height: 40, borderRadius: 3, paddingHorizontal: 15, fontSize: 16 }}
          textAlignVertical={'center'}
          placeholder="Email ID"
          keyboardType="email-address"
          onChangeText={text => {
            setEmail(text)
          }}
          value={email}
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
            secureTextEntry={false}
            keyboardType={'visible-password'}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 16 }}>Re-enter Password</Text>
        <View style={{}}>
          <TextInput
            autoCapitalize='none'
            onFocus={() => { setBordercolor3('#7F7F7F') }}
            onBlur={() => { setBordercolor3('#E3E3E3') }}
            style={{ borderColor: bordercolor3, borderWidth: 1, height: 40, borderRadius: 3, paddingHorizontal: 15, fontSize: 16 }}
            placeholder="Password"
            textAlignVertical={'center'}
            keyboardType={'visible-password'}
            secureTextEntry={false}
            onChangeText={text => setRePassword(text)}
            value={rePassword}
          />
        </View>
        <TouchableOpacity onPress={__doSignUp} style={{ marginTop: 30, height: 40, backgroundColor: '#00CB2C', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="md-arrow-forward-outline" color="white" size={25} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SignUp
