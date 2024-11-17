import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import {
  get_data,
  onFacebookButtonPress,
  onGoogleButtonPress,
  Logout,
  EmailSign_up,
} from '../store/acion/index';

import Icon3 from 'react-native-vector-icons/Ionicons';
import { Global } from '../assets/Global_Variable';
import { TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login(Props) {
  let [SignUp_delay, setSignUp_delay] = useState([]);
  useEffect(() => {
    getSignupDelay();
  }, []);
  let getSignupDelay = async () => {
    setSignUp_delay([]);
    firestore()
      .collection('App_data')
      .doc('SignUp_delay')
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setSignUp_delay(documentSnapshot.data().signupdelayArray);
        }
      });
  };
  let [loadingS, setLoadingS] = useState(false);
  let [select_1, setSelct1] = useState(false);
  let [email, setEmail] = useState('');
  let [email_active, setEmail_active] = useState(false);
  let [email_valid, setEmail_valid] = useState('');
  let [pass, setpass] = useState('');
  let [pass_active, setpass_active] = useState(false);
  let [pass_valid, setpass_valid] = useState('');
  let [response_Valid, setresponse_Valid] = useState('');

  let Check_validity = () => {
    setEmail_valid('');
    setpass_valid('');
    setresponse_Valid('');
    if (email == '' || pass == '') {
      if (email == '') {
        setEmail_valid('* Required');
      }

      if (pass == '') {
        setpass_valid('* Required');
      }
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmail_valid('Invalid Format!');
      return;
    }
    setLoadingS(true);
    SignInMe();
  };
  let SignInMe = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(user => {
        console.log(user);
        firestore()
          .collection('Authuntication')
          .doc(user.user.uid)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              const storeData = async value => {
                try {
                  const jsonValue = JSON.stringify(value);
                  await AsyncStorage.setItem('@user_data', jsonValue).then(
                    () => {
                      setLoadingS(false);
                      Props.navigation.navigate('Main_tab');
                    },
                  );
                } catch (e) {
                  // saving error
                  setresponse_Valid(e);
                }
              };

              storeData(documentSnapshot.data());
            }
          });
      })
      .catch(function (error) {
        if (error.code == 'auth/user-not-found') {
          SignUp_delay.includes(email)
            ? setresponse_Valid(
              'Your Email is Register but verification in Process. if you face difficulty Please Signup again and verify',
            )
            : setresponse_Valid(error.message);
        } else {
          setresponse_Valid(error.message);
        }
        console.log(error.code, SignUp_delay.includes(email));
        // Handle Errors here.
        setLoadingS(false);
      });
  };
  return (
    <>
      <StatusBar
        barStyle={loadingS ? 'dark-content' : 'light-content'}
        backgroundColor="#000"
      />

      <Modal transparent={true} visible={loadingS}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(4, 4, 4, 0.474)',
          }}>
          <Image
            source={require('../assets/loadingS.gif')}
            style={{ width: 150, height: 150 }}
          />
        </View>
      </Modal>
      <View style={{ ...styles.nav }}>
        <TouchableOpacity onPress={() => Props.navigation.goBack()}>
          <Icon3
            name="arrow-back-outline"
            size={25}
            style={{
              color: '#333333',
              fontWeight: 'bold',
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 21,
            fontFamily: 'notoserif',
            marginLeft: 15,
            color: '#333333',
          }}>
          Login
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholderTextColor={'grey'}
          style={{
            ...styles.input,
            borderColor: email_active ? Global.linkTextColor : 'grey',
          }}
          onChangeText={e => setEmail(e)}
          placeholder="Email"
          onFocus={() => setEmail_active(true)}
          onBlur={() => setEmail_active(false)}></TextInput>
        <Text
          style={{
            color: 'red',
            width: '100%',
            textAlign: 'right',
            paddingRight: 5,
            fontSize: 12,
          }}>
          {email_valid}
        </Text>
        <TextInput
          placeholderTextColor={'grey'}
          style={{
            ...styles.input,
            borderColor: pass_active ? Global.linkTextColor : 'grey',
          }}
          onChangeText={e => setpass(e)}
          onFocus={() => setpass_active(true)}
          onBlur={() => setpass_active(false)}
          placeholder="Password"></TextInput>
        <Text
          style={{
            color: 'red',
            width: '100%',
            textAlign: 'right',
            paddingRight: 5,
            fontSize: 12,
          }}>
          {pass_valid}
        </Text>
        <Text
          style={{
            color: 'red',
            width: '100%',
            textAlign: 'center',
            paddingRight: 5,
            fontSize: 12,
          }}>
          {response_Valid}
        </Text>
        <TouchableOpacity
          onPress={() => Props.navigation.navigate('Forgotpassword')}
          activeOpacity={0.8}>
          <Text
            style={{
              color: Global.linkTextColor,
              width: '100%',
              textAlign: 'right',
              paddingRight: 5,
              fontWeight: '500',
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Check_validity()}
          activeOpacity={0.7}
          disabled={email.length > 0 && pass.length > 0 ? false : true}
          style={{
            ...styles.buttonHalfTwo1,
            opacity: email.length > 0 && pass.length > 0 ? 1 : 0.4,
          }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'notoserif' }}>
            Login With Email
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#8B8C8E',
          width: '84%',
          textAlign: 'center',
          fontSize: 12,
          marginTop: 0,
          marginBottom: 10,
          marginLeft: '8%',
          fontWeight: '500',
        }}>
        By continuing you agree to OneStop Zim's{' '}
        <Text
          style={{ color: Global.linkTextColor }}
          onPress={() => {
            Props.navigation.navigate("TermConditions")
          }}>
          Terms of Services
        </Text>{' '}
        and acknowledge of{' '}
        <Text
          style={{ color: Global.linkTextColor }}
          onPress={() => {
            Props.navigation.navigate("PrivacyPolicy")
          }}>
          Privacy Policy
        </Text>{' '}
      </Text>

      <View style={styles.flexBottom}>
        <TouchableOpacity
          onPress={() =>
            onFacebookButtonPress(setLoadingS, setresponse_Valid, Props)
          }
          activeOpacity={0.7}
          style={styles.facebookButton}>
          <Image
            style={{ width: 25, height: 25, position: 'absolute', left: 15 }}
            source={require('../assets/facebook.png')}
          />
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '500' }}>
            Continue With Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress(setLoadingS, setresponse_Valid, Props)
          }
          activeOpacity={0.7}
          style={styles.GoogleButton}>
          <Image
            style={{ width: 25, height: 25, position: 'absolute', left: 15 }}
            source={require('../assets/google.png')}
          />
          <Text style={{ fontSize: 16, color: 'grey', fontWeight: '500' }}>
            Continue With Google
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#8B8C8E',
            width: '100%',
            textAlign: 'center',
            fontSize: 12,
            marginTop: 0,
            marginBottom: 10,
          }}>
          Don't Have Account Yet?{' '}
          <Text
            style={{ color: Global.linkTextColor, fontWeight: 'bold' }}
            onPress={() => Props.navigation.navigate('Signup')}>
            Sign Up
          </Text>{' '}
          <Text></Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 2,
    padding: 20,
  },

  flexBottom: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    padding: 15,
  },
  buttonsDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonHalfOne: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    width: '48%',
    height: 45,
    borderRadius: 5,
  },
  nav: {
    width: '100%',
    height: 55,
    paddingLeft: 15,
    elevation: 4,
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 0,
  },
  form: {
    width: '100%',
    padding: 15,
  },
  input: {
    height: 45,
    width: '100%',
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.6,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    height: 50,
    marginTop: 10,
  },

  buttonsDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  buttonHalfTwo1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Global.color,
    elevation: 1,
    marginTop: 20,
    fontFamily: 'sans-serif-thin',
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  GoogleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: '#8B8C8E',
    marginBottom: 7,
    minHeight: 45,
    marginTop: 5,
  },
  facebookButton: {
    backgroundColor: '#4167B2',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

    marginBottom: 5,
    height: 45,
  },
});

const mapStateToProps = state => {
  return {
    name1: state.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
    onFacebookButtonPress: () => dispatch(onFacebookButtonPress),
    onGoogleButtonPress: () => dispatch(onGoogleButtonPress),
    Logout: () => Logout(),
    EmailSign_up: () => EmailSign_up(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
