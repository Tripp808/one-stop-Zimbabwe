import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image
} from 'react-native';
import {get_data} from '../store/acion/index';

import Icon3 from 'react-native-vector-icons/Ionicons';
import {Global} from '../assets/Global_Variable';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

function Forgotpassword(Props) {
  let [email, setEmail] = useState('');
  let [email_active, setEmail_active] = useState('');
  let [response_Valid, setresponse_Valid] = useState('');
  let [loadingS, setLoadingS] = useState(false);
  let [email_valid, setEmail_valid] = useState('');
  let Check_validity = () => {
    setEmail_valid('');
    setresponse_Valid('');
    if (email == '') {
      setEmail_valid('*Required');
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmail_valid('Invalid Format!');
      return;
    }
    setLoadingS(true);
    var emailAddress = email;
    auth()
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        // Email sent.
        setLoadingS(false);

        Props.navigation.navigate('EmailSendConfirmation', {
          value: 'Password Reset',
        });
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        setLoadingS(false);

        setresponse_Valid(error.message);
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
            style={{width: 150, height: 150}}
          />
        </View>
      </Modal>
      <View style={styles.nav}>
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
          Forgot Password
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={{
            ...styles.input,
            borderColor: email_active ? Global.linkTextColor : 'grey',
          }}
          onChangeText={e => setEmail(e)}
          placeholder="Email Address"
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
          onPress={() => Check_validity()}
          activeOpacity={0.7}
          disabled={email.length > 0 ? false : true}
          style={{
            ...styles.buttonHalfTwo1,
            opacity: email.length > 0 ? 1 : 0.4,
          }}>
          <Text style={{fontSize: 18, color: '#FFFFFF', fontFamily: 'notoserif'}}>
            Resend Password
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 13,
            color: '#8B8C8E',
            width: '80%',
            textAlign: 'center',
            marginLeft: '10%',
            marginTop: 10,
          }}>
          Please enter your email adddress we will notify you via info how to
          Reset Password
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);
