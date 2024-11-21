import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Linking,
  StatusBar
} from 'react-native';

import Icon3 from 'react-native-vector-icons/Ionicons';
import { Global } from '../assets/Global_Variable';

const Setting = (Props) => {
  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.nav}>
          <Icon3
            onPress={() => Props.navigation.goBack()}
            name="chevron-back-outline"
            size={20}
            style={{
              color: '#FFFFFF',
              marginLeft: 2
            }}
          />
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'notoserif',
              marginLeft: 15,
              color: '#FFFFFF',
            }}>
            Setting
          </Text>
        </View>




        <View style={styles.linkDiv}>



        </View>



        <View style={styles.linkDiv}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}
            onPress={() => {
              Props.navigation.navigate("PrivacyPolicy")
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                fontWeight: 'bold'

              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>



        <View style={styles.linkDiv}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}
            onPress={() => {
              Props.navigation.navigate("TermConditions")
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                fontWeight: 'bold'

              }}>
             Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>





        <View style={styles.linkDiv}>
          {/* <TouchableOpacity activeOpacity={0.7} style={styles.card}>
           
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                
                fontFamily: 'sans-serif-normal',
                fontWeight:'bold'

              }}>
           Privacy Setting
            </Text>
          </TouchableOpacity> */}


        </View>

        <Text style={{ width: '90%', fontSize: 12, textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: '#000' }}>

          <Text
            style={{ color: Global.linkTextColor }}
            onPress={() => {
              Props.navigation.navigate("TermConditions")
            }}>
            Terms of Services
          </Text>

          {""}  & {""}
          <Text
            style={{ color: Global.linkTextColor }}
            onPress={() => {
              Props.navigation.navigate("PrivacyPolicy")
            }}>
            Privacy Policy
          </Text>


        </Text>


        {/* <Text style={{ marginLeft: '5%', width: '90%', fontSize: 12, textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: '#000' }}>

          OneStop Zim
        </Text> */}

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 60,
    paddingLeft: '5%',
    elevation: 5,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  linkDiv: {
    width: '100%',
    // paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',


    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.184)'
  },
  card: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '5%',
  },

});

export default Setting;
