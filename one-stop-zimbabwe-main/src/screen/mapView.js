import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Linking } from 'react-native';
import { get_data } from '../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../assets/Global_Variable';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Dimensions } from 'react-native';


function mapViewing(Props) {

  const openMap = (latitude, longitude) => {

    const scheme = Platform.select({
      ios: "maps:0,0?q=",  // if device is ios 
      android: "geo:0,0?q=", // if device is android 
    });
    const latLng = `${latitude},${longitude}`;
    const label = Props.route.params.Business_name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };
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

        <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}>
          Details of Map View
        </Text>

      </View>
      <MapView
        zoomEnabled={true}
        // zoomControlEnabled={true}
        // showsCompass          
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, marginTop: 50 }}
        region={Props.route.params.Map_value}>
        <Marker
          // key={index}
          coordinate={{ latitude: Props.route.params.Map_value.latitude, longitude: Props.route.params.Map_value.longitude }}
          title={Props.route.params.Business_name}
        />
      </MapView>


      <TouchableOpacity
        onPress={() => openMap(Props.route.params.Map_value.latitude, Props.route.params.Map_value.longitude)}
        activeOpacity={0.7}
        style={{ ...styles.inputDiv }}
      >

        <Text
          numberOfLines={1}
          style={{ fontFamily: "sans-serif", color: "#fff", fontSize: 16, fontWeight: 'bold' }}
        >
          Get the Direction
        </Text>
        <Icon3 name="compass-outline" size={25} style={{ marginRight: 15, position: 'absolute', right: 6 }} color={"#fff"} />

      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 70,
    backgroundColor: Global.color,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    justifyContent: 'center'
  },
  inputDiv: {
    width: "92%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Global.color,
    height: 45,
    elevation: 2,
    borderRadius: 5,
    flexDirection: "row",
    marginLeft: '4%',
    marginTop: 15,
    position: 'absolute',
    bottom: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(mapViewing);
