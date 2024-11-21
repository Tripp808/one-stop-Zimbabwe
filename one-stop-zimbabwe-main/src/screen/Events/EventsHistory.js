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
  TextInput,
  FlatList,
} from 'react-native';
import {get_data} from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../../assets/Global_Variable';

function EventsHistory(Props) {
  let renderItem = v => {
    return (
      <View
        // key={}

        style={{
          ...styles.linkDiv,
          // backgroundColor: '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            Props.navigation.navigate('EventDetails');
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Image
            source={{uri: arr[2].image}}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              borderRadius: 3,
            }}
          />

          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                fontWeight: 'bold',
                marginLeft: 15,
                textAlign: 'justify',
                width: '55%',
              }}>
              {v.item.details} {v.item.details} {v.item.details}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 11,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 15,
                width: '65%',
              }}>
              October 11 , 2021 Morning 03:30pm
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                color: 'green',

                fontFamily: 'sans-serif-normal',
                marginLeft: 15,
                width: '65%',
              }}>
              Accepted
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                color: 'red',

                fontFamily: 'sans-serif-normal',
                marginLeft: 15,
                width: '65%',
              }}>
              Rejected
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <View style={styles.nav1}>
        <Icon3
          onPress={() => {
            Props.navigation.goBack();
          }}
          name="chevron-back-outline"
          size={20}
          style={{
            color: '#FFFFFF',
            marginLeft: 2,
          }}
        />
        <Text
          style={{
            fontSize: 19,
            fontFamily: 'notoserif',
            marginLeft: 15,
            color: '#FFFFFF',
          }}>
          Events History
        </Text>
      </View>

      <Text
        style={{
          fontSize: 14,
          fontFamily: 'notoserif',
          marginLeft: 15,
          color: '#000',
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Registered Events
      </Text>
      <FlatList
        initialNumToRender={80}
        data={arr}
        renderItem={renderItem}></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  nav1: {
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
  linkDiv: {
    width: '100%',
    // paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.184)',
  },
  card: {
    width: '94%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '3%',
  },
  addEvent: {
    width: 60,
    height: 60,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 80,
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

export default connect(mapStateToProps, mapDispatchToProps)(EventsHistory);
