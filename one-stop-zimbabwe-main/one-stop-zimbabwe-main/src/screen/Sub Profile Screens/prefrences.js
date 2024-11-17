import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {get_data} from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../../assets/Global_Variable';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dietry from './Dietry';
import Food from './food';
const Tab = createMaterialTopTabNavigator();

function Prefrences(Props) {
  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <View
        style={{
          ...styles.nav,
          backgroundColor: Global.color,
        }}>
        <Icon3
          onPress={() => Props.navigation.goBack()}
          name="chevron-back-outline"
          size={25}
          style={{
            color: '#FFFFFF',
            position: 'absolute',
            top: 20,
            left: 10,
          }}
        />

        <Text style={styles.navText}>Your Preferences</Text>
      </View>

      <View style={styles.header}>
        <Image
          source={require('../../assets/prefrence.png')}
          style={styles.image}
        />

        <View>
          <Text style={styles.helpingDef}>Make Your Help Own</Text>

          <Text style={styles.helpingpara}>
            Set Your Own Preferences For Set it easy For us to show related
            things to you.
          </Text>
        </View>
      </View>

      <View style={styles.headingBox}>
        <Text style={{...styles.helpingDef,fontWeight:'bold'}}>Saved Preferences</Text>

       {/* <TouchableOpacity activeOpacity={0.7}>
       <Text style={{...styles.helpingDef,fontWeight:'bold',color:Global.color}}>
          Clear Changes
        </Text>
       </TouchableOpacity> */}
      </View>



      <Tab.Navigator
      
      screenOptions={
        {
            tabBarPressColor: '#FFFFFF',
            tabBarLabelStyle: {
                fontSize: 14,
                color: Global.linkBlueColor,
              fontWeight:'bold',
              textTransform:'capitalize'
              },
              tabBarIndicatorStyle: {
                backgroundColor: Global.linkBlueColor,
                height: 4,
              },
        }
      }>
      <Tab.Screen name="Dietry" component={Dietry} />
      <Tab.Screen name="Food" component={Food} />
    </Tab.Navigator>










      
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
  },
  navText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // flex:1,
    padding: 15,
  },
  image: {
    width: 100,
    resizeMode: 'contain',
    height: 100,
  },
  helpingDef: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  helpingpara: {
    fontSize: 12,
    color: 'grey',
    width: '60%',
  },
  headingBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'rgba(191, 191, 191, 0.274)',
  },
  button:{
    width:'96%',
    height:40,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:10,
    backgroundColor:Global.linkBlueColor,
    borderRadius:5,
    marginLeft:'2%'
  },
  buttonText:{
    fontSize:15,
    color:'#FFFFFF'
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Prefrences);
