import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
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

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Global } from '../assets/Global_Variable';


function WellCome(Props) {
  const scrollViewRef = useRef();
  let [loadingS, setLoadingS] = useState(false);
  let [response_Valid, setresponse_Valid] = useState('');
  let [select_1, setSelct1] = useState(false);

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
      <View style={{ ...styles.flex }}>
        <TouchableOpacity
          onPress={() => Props.navigation.navigate('Main_tab')}
          activeOpacity={0.8}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <Text style={styles.welcomeHeading}>Welcome To OneStop Zim</Text>

        <Text style={styles.welcomePara}>
          There's So much to explore. Let's Get Started!
        </Text>

        <Image
          source={require('../assets/wellcome.png')}
          style={{
            height: '65%',
            width: '100%',
            marginTop: '10%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
        <View style={styles.flexBottom}>
          <View activeOpacity={0.7} style={styles.content}>
            <BouncyCheckbox
              isChecked={select_1}
              disableBuiltInState
              size={20}
              fillColor={Global.color}
              unfillColor="transparent"
              iconStyle={{
                borderColor: Global.color,
                borderRadius: 5,
                marginTop: 8,
              }}
              innerIconStyle={{ borderWidth: 1, borderRadius: 5 }}
              onPress={e => {
                setSelct1(!select_1);
              }}
            />
            <Text
              style={{
                fontSize: 13,
                color: 'grey',
                width: '90%',
                textAlign: 'left',
                marginLeft: -5,
              }}>
              By continuing , I agree to OneStop Zim's
              <Text onPress={() => {
                Props.navigation.navigate("TermConditions")
              }} style={{ color: Global.linkTextColor }}>
                Terms of Service{" "}
              </Text>
              and acknowledge
              OneStop Zim's <Text onPress={() => {
                Props.navigation.navigate("PrivacyPolicy")
              }} style={{ color: Global.linkTextColor }}>
                Privacy Policy</Text> , including OneStop Zim's cookie policy!
            </Text>
          </View>
          <Text
            style={{
              color: 'red',
              width: '100%',
              textAlign: 'left',
              fontSize: 12,
              marginBottom: 4,
            }}>
            {response_Valid}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setresponse_Valid('');
              select_1
                ? onFacebookButtonPress(setLoadingS, setresponse_Valid, Props)
                : setresponse_Valid('Agreed To Terms & Conditions First!');
            }}
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
            onPress={() => {
              setresponse_Valid('');
              select_1
                ? onGoogleButtonPress(setLoadingS, setresponse_Valid, Props)
                : setresponse_Valid('Agreed To Terms & Conditions First!');
            }}
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

          <View style={styles.buttonsDiv}>
            <TouchableOpacity
              onPress={() => Props.navigation.navigate('Login')}
              activeOpacity={0.7}
              style={styles.buttonHalfOne}>
              <Text style={{ fontSize: 18, color: '#000' }}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Props.navigation.navigate('Signup')}
              activeOpacity={0.7}
              style={styles.buttonHalfTwo}>
              <Text style={{ fontSize: 18, color: '#FFFFFF' }}>I'm New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 2,
    padding: 20,
  },
  skip: {
    fontSize: 17,
    color: Global.linkTextColor,
    width: '100%',
    textAlign: 'right',
    marginTop: -5,
    fontWeight: '500',
  },
  welcomeHeading: {
    fontSize: 26,
    color: '#333333',
    fontWeight: 'bold',
    marginTop: '7%',
  },
  welcomePara: {
    fontSize: 14,
    color: '#333333',
    marginTop: '2%',
  },
  flexBottom: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    padding: 20,
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

  buttonHalfTwo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 45,
    borderRadius: 5,
    backgroundColor: Global.color,
    elevation: 1,
  },
  GoogleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: 'grey',
    marginBottom: 7,
    height: 45,
  },
  facebookButton: {
    backgroundColor: '#4167B2',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

    marginBottom: 7,
    height: 45,
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(WellCome);
