import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import {  get_business } from "../store/acion/index";
import Icon3 from 'react-native-vector-icons/Ionicons';
import {  Global } from '../assets/Global_Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const More = Props => {
  const isFocused = useIsFocused();
  let [loadingS, setLoadingS] = useState(false);

  let [Notify, setNotify] = useState(false);
  let [notify_text, setNotify_Text] = useState(
    " You don't have any Registered Business as a owner!"
  );
  let [loginCheck, setLoginCheck] = useState(undefined);

  let [user, setUser] = useState(undefined);
  useEffect(() => {
    getData();
    Get_Businesses();
  }, [isFocused]);
 
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    // console.log(">>>>>>>>>>>",user);

    if (user != undefined) {
      setUser(user);
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }  
  
  };


  let Get_Businesses = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));
    if (
      (user !== undefined &&
        user.Business == true &&
        user.Business != undefined) 
    ) {
      Props.get_business(user,setLoadingS);
    }
  };




  // console.log("Props.<<<<<<>>>>>>...",Props.Relevant_Business_type);

  return (
    <>
       <StatusBar
        barStyle={Notify  ? "dark-content" : "light-content"}
        backgroundColor="#000"
      />

       
      <Modal transparent={true} visible={Notify}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(4, 4, 4, 0.474)",
          }}
        >
          <View
            style={{
              width: "80%",
              minHeight: 170,
              borderRadius: 4,
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{ fontSize: 20, color: Global.color, fontWeight: "bold" }}
            >
              Notification
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: "grey",
                width: "70%",
                textAlign: "center",
              }}
            >
              {notify_text}
            </Text>

            <TouchableOpacity
              onPress={() => setNotify(false)}
              style={{
                width: "50%",
                height: 40,
                backgroundColor: Global.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "#fff" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.nav}>
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'notoserif',
              // marginLeft: 15,
              color: '#FFFFFF',
            }}>
            More
          </Text>
        </View>

        {loginCheck !== undefined ? (
          <>
            <TouchableOpacity
              onPress={() => Props.navigation.navigate('WellCome')}
              activeOpacity={0.9}
              style={styles.profile}>
              {loginCheck ? (
                <>
                  <TouchableOpacity
                    onPress={() => Props.navigation.navigate('Me')}
                    style={styles.profileImageDiv}>
                    <Image
                      source={{ uri: user.photo }}
                      style={{ width: 45, height: 45, borderRadius: 5 }}
                    />

                    <Icon3
                      name="chevron-forward-outline"
                      size={20}
                      style={{
                        color: '#414141',
                      }}
                    />
                  </TouchableOpacity>

                  <View style={styles.linkDiv1}>

                    <TouchableOpacity activeOpacity={0.7} style={styles.card}
                      onPress={() => Props.navigation.navigate('BusinessSelect', { navigate: 'Rating' })}
                    >
                      <Icon
                        name="star"
                        size={20}
                        style={{
                          color:Global.linkBlueColor,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: Global.linkBlueColor,
                          marginLeft: 30,
                        }}>
                        Add a Review
                      </Text>
                    </TouchableOpacity>

                    {/* 
              <TouchableOpacity activeOpacity={0.7} style={styles.card}>
                <Icon3
                  name="camera"
                  size={20}
                  style={{
                    color: Global.linkBlueColor,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: Global.linkBlueColor,
                    marginLeft: 30,
                  }}>
                  Add a photo Or Video
                </Text>
              </TouchableOpacity> */}

                    {/* <TouchableOpacity
                      onPress={() => Props.navigation.navigate('EnableLocation')}
                      activeOpacity={0.7}
                      style={styles.card}>
                      <Icon3
                        name="shield-checkmark-outline"
                        size={20}
                        style={{
                          color: Global.linkBlueColor,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: Global.linkBlueColor,
                          marginLeft: 30,
                        }}>
                        EnableLocation
                      </Text>
                    </TouchableOpacity> */}
                  </View></>


              ) : (
                <TouchableOpacity
                  onPress={() => Props.navigation.navigate('LoginCheckRestict')}
                  style={{
                    ...styles.buttonHalfTwo1,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#FFFFFF',
                      fontFamily: 'notoserif',
                    }}>
                    Sign up / Login
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>

          </>
        ) : (
          ''
        )}



        <View style={styles.linkDiv}>
          {/* <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="pulse-outline"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
              Activity
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="timer-outline"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
              Recently Viewed
            </Text>
          </TouchableOpacity> */}
{user!==undefined?

<TouchableOpacity onPress={() => user.Business!==undefined && user.Business==true  ? Props.navigation.navigate('EventsShow',{myBuiness_uid:Props.Relevant_Business_type.uid}):setNotify(true)} activeOpacity={0.7} style={styles.card}>
<Icon3
  name="calendar-outline"
  size={20}
  style={{
    color: '#414141',
  }}
/>
<Text
  style={{
    fontSize: 15,
    color: '#414141',
    marginLeft: 30,
  }}>
  Events
</Text>
</TouchableOpacity>:<></>}

          <TouchableOpacity onPress={() => Props.navigation.navigate('FriendCheciIn')} activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="shield-checkmark-outline"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
               Check In
            </Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => Props.navigation.navigate('ChatsUserShow')} activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="chatbubble-outline"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
              Messages
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.linkDiv, borderBottomWidth: 0 }}>
          <TouchableOpacity
            onPress={() => Props.navigation.navigate('Addbusiness')}
            activeOpacity={0.7}
            style={styles.card}>
            <Icon
              name="building"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
              Add Business
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Props.navigation.navigate('Setting')}
            activeOpacity={0.7}
            style={styles.card}>
            <Icon3
              name="settings-outline"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
              Setting
            </Text>
          </TouchableOpacity>
         {user!==undefined?
          <TouchableOpacity onPress={() => user.Business!==undefined && user.Business==true?Props.navigation.navigate('OneStopBusiness'):setNotify(true)} activeOpacity={0.7} style={styles.card}>
          <Icon3
            name="megaphone-outline"
            size={20}
            style={{
              color: '#414141',
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: '#414141',
              marginLeft: 30,
            }}>
            OneStop Business
          </Text>
        </TouchableOpacity>:
        <></>}
          <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={()=>Props.navigation.navigate("SupportUs")}>
            <Icon
              name="headset"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
              Support
            </Text>
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={()=>Props.navigation.navigate("Faq")}>
            <Icon1
              name="progress-question"
              size={20}
              style={{
                color: '#414141',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#414141',
                marginLeft: 30,
              }}>
FAQs (Frequently Asked Questions)             </Text>
          </TouchableOpacity>


        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 60,
    paddingLeft: '5%',
    elevation: 4,
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

    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.355)',
  },
  linkDiv1: {
    width: '100%',
    // paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.355)',
    // borderTopWidth: 1,
    // borderTopColor: 'rgba(106, 105, 105, 0.355)',
  },
  card: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: '5%',
  },
  profile: {
    width: '100%',

    paddingBottom: 10,
    // height: 120,
  },
  buttonHalfTwo1: {
    backgroundColor: Global.linkBlueColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 10,
    width: '90%',
    fontFamily: 'sans-serif-thin',
    marginLeft: '5%',
    borderRadius: 5,
  },
  profileImageDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    paddingRight: 5,
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    Relevant_Business_type: state.Relevant_Business_type,
   
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
   
    get_business: (user,setLoadingS) =>
      dispatch(get_business(user,setLoadingS)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(More);