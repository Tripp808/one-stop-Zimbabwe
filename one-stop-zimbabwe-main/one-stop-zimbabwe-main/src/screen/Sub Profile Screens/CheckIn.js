import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, StatusBar, Text, Image} from 'react-native';
import {get_data} from '../../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import {arr, Global} from '../../assets/Global_Variable';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

function CheckInME(Props) {
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

        <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: 'bold'}}>
          CheckIn
        </Text>
      </View>

      <ScrollView>
        <View style={styles.allContent}>
          {arr.map((v, i) => {
            return (
              <TouchableOpacity activeOpacity={0.8} key={i}>
                <View style={styles.card}>
                  <Image source={{uri: v.user}} style={styles.image} />

                  <View style={styles.cardText}>
                    <View style={styles.heading}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        {v.title}
                      </Text>

                      <Text style={{fontSize: 11, color: 'grey'}}>
                        4 Days Ago
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: '100%',
                      }}>
                      <Icon1 name="star-box" size={15} color={Global.color} />
                      <Icon1 name="star-box" size={15} color={Global.color} />
                      <Icon1 name="star-box" size={15} color={Global.color} />
                      <Icon1 name="star-box" size={15} color={Global.color} />
                      <Icon1 name="star-box" size={15} color={Global.color} />

                      <Text
                        style={{
                          fontSize: 12,
                          color: 'grey',
                          marginLeft: 7,
                          marginRight: 7,
                        }}>
                        3 Reveiew
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: '100%',
                      }}>
                      <Icon3
                        name="shield-checkmark-outline"
                        size={15}
                        color={Global.linkBlueColor}
                      />

                      <Text
                        style={{
                          fontSize: 12,
                          color: 'grey',
                          marginLeft: 7,
                          marginRight: 7,
                        }}>
                        1 Check In
                      </Text>
                    </View>
                    <View style={styles.bottomButton}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.likeComplimant}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: '#000',
                          }}>
                          Like OR Compliment
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.likeComplimant1}>
                        <Icon3
                          name="chatbubble-outline"
                          size={20}
                          style={{
                            color: '#000',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.bar}></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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

    justifyContent: 'center',
  },
  allContent: {
    width: '100%',
    // display:'flex',
    // flexDirection:'column',
    // alignItems:'center',
    // justifyContent:'center',
    marginHorizontal: 5,
  },
  card: {
    width: '100%',
    // backgroundColor:'#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 5,
  },
  cardText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',

    flexDirection: 'column',
    paddingLeft: 10,
    // paddingRight:10
    // backgroundColor:'red'
  },
  heading: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  likeComplimant: {
    minWidth: '50%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    height: 30,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  likeComplimant1: {
    minWidth: 50,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    height: 30,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    marginLeft: 5,
  },
  bottomButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  bar: {
    width: '98%',
    height: 1,
    backgroundColor: 'grey',
    opacity: 0.2,
    marginTop: 10,
    paddingRight: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckInME);
