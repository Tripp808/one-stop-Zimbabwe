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
  Share,
  Linking,
  Modal
} from 'react-native';
import { get_data, Add_Intrested_People } from '../../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global, navi } from '../../assets/Global_Variable';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import ImageView from 'react-native-image-viewing';
import { useIsFocused } from "@react-navigation/native";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';

function EventDetails(Props) {
  let [loadingS, setLoadingS] = useState(false);



  const [images, setImages] = useState([{
    uri: arr[0].image
  }]);
  const isFocused = useIsFocused();

  const [detail, setdetail] = useState('');
  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>", Props.route.params.detail.EventTheme);
    setdetail(Props.route.params.detail)
    setImages([{
      uri: Props.route.params.detail.url
    }])
  }, [isFocused])


  const onShare = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://onestopzimbabuehac.page.link/Events/^#@${detail.uniqueID}`,
      domainUriPrefix: 'https://onestopzimbabuehac.page.link',
      android: {
        packageName: 'com.onestopzimbabuehac',
      },
      analytics: {
        campaign: 'banner',
      },
    });
    link;

    console.log(link);

    try {
      const result = await Share.share({
        title: 'OneStop Zim Event',
        message: `Hi, check this Wonderfull Event.You should need to check ${link}`,
        dialogTitle: 'Event Share',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const openMap = (latitude, longitude) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=", // if device is ios
      android: "geo:0,0?q=", // if device is android
    });
    const latLng = `${latitude},${longitude}`;
    const label = detail.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  let AddEventToCalender = () => {

    const eventConfig = {
      "title": detail.title,
      'startDate': detail.UTCPicked.startDate.toDate().toISOString(),
      'endDate': detail.UTCPicked.endDate.toDate().toISOString()
      // and other options
    };



    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(() => {

        Add_Intrested_Going('going')


      })
      .catch((error) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  }


  let Add_Intrested_Going = async (intrested) => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));
    try {
      if (user != undefined) {
        if (Props.route.params.detail[intrested].includes(user.uid)) {
          alert(`You are Already Added as ${intrested}`)
        }
        else
         {
          setLoadingS(true)
          Props.Add_Intrested_People(detail.BusinessID, Props.route.params.detail, intrested, setLoadingS,user.uid)
  
         }
      } else {

        Props.navigation.navigate("LoginCheckRestict");
      }
    } catch (error) {

    }
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar
          barStyle={loadingS ? "dark-content" : "light-content"}
          backgroundColor="#000"
        />
        <Modal transparent={true} visible={loadingS}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(4, 4, 4, 0.474)",
            }}
          >
            <Image
              source={require("../../assets/loadingS.gif")}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </Modal>



        {
          detail != ''
            ?
            <>

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

                <Text
                  style={{
                    fontSize: 19,
                    fontFamily: 'notoserif',
                    marginLeft: 15,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}>
                  Event Details
                </Text>

                <Icon3
                  onPress={() => onShare()}
                  name="share-social-outline"
                  size={25}
                  style={{
                    color: '#FFFFFF',
                    position: 'absolute',
                    top: 20,
                    right: 15,
                  }}
                />
              </View>

              <ScrollView
                style={{ flex: 1 }}
              // onScroll={event => setScrollValue(event.nativeEvent.contentOffset.y)}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
                    <Image
                      source={{ uri: detail.url }}
                      style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                        marginLeft: 15,
                        borderRadius: 10,
                        marginBottom: 10,
                        marginTop: 10,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ width: '60%' }}>

                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 20,
                        color: '#000',
                        fontWeight: 'bold',
                        left: 15,
                        width: '100%',
                        textAlign: 'left',
                        marginTop: 20,
                      }}>
                      {detail.title}
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 14,
                        color: Global.color,
                        fontWeight: 'bold',
                        left: 15,
                        width: '100%',
                        textAlign: 'left',

                      }}>
                      {detail.selectedCity}
                    </Text>
                  </View>
                  {/* {console.log('ccccccccccccc', detail)} */}
                </View>
                <View
                  style={{
                    width: '100%',
                    borderWidth: 0.2,
                    marginBottom: 10,
                    height: 0.1,
                    backgroundColor: 'grey',
                    marginTop: 14,
                    opacity: 0.1,
                  }}></View>

                <Text
                  style={{
                    fontSize: 13,
                    color: '#000',
                    fontWeight: 'bold',
                    left: 15,
                    width: '90%',
                    textAlign: 'left',
                    marginBottom: 20,
                  }}>
                  Are you intrested?
                </Text>

                <View style={styles.iconDiv}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => AddEventToCalender()}
                      activeOpacity={0.6}
                      style={styles.iconCard}>
                      <Icon3 name="man-outline" size={25} color={'#000'} />

                    </TouchableOpacity>
                    <Text style={{ ...styles.iconText, textAlign: 'left' }}>I’m going
                      {"\n"}
                      {detail.going.length}
                    </Text>

                  </View>

                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => Add_Intrested_Going('intrested')}
                      activeOpacity={0.6}
                      style={styles.iconCard}>
                      <Icon3 name="snow-outline" size={25} color={'#000'} />
                    </TouchableOpacity>
                    <Text style={{ ...styles.iconText, textAlign: 'left' }}>I’m interested
                      {"\n"}
                      {detail.intrested.length}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    borderWidth: 0.2,
                    marginBottom: 10,
                    height: 0.1,
                    backgroundColor: 'grey',
                    marginTop: 20,
                    opacity: 0.1,
                  }}></View>

                <View style={styles.menuDiv}>
                  <View style={styles.mainDivi}>
                    <Text style={{ ...styles.iconText, fontSize: 20, color: '#000' }}>
                      Info
                    </Text>
                  </View>

                  <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Time
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#000',
                          fontWeight: '400',
                        }}>
                        <Text
                          style={{ color: Global.linkTextColor, fontWeight: 'bold' }}>
                          Open
                        </Text>{' '}
                        {detail.start_Time} - {detail.End_Time}
                      </Text>
                    </View>

                    <Icon3
                      name="chevron-forward-outline"
                      size={20}
                      style={{ marginRight: 15 }}
                      color={'#000'}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>


                  {detail.start_Date !== undefined && detail.End_Date !== undefined ?


                    <>
                      <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontWeight: 'bold',
                            }}>
                            Date
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#000',
                              fontWeight: '400',
                            }}>
                            {detail.start_Date} -
                            <Text
                              style={{ color: Global.linkTextColor, fontWeight: 'bold' }}>
                              {" "}To{" "}
                            </Text>
                            - {detail.End_Date}
                          </Text>
                        </View>

                        <Icon3
                          name="chevron-forward-outline"
                          size={20}
                          style={{ marginRight: 15 }}
                          color={'#000'}
                        />
                      </TouchableOpacity>

                      <View
                        style={{
                          width: '90%',
                          borderWidth: 0.2,
                          marginBottom: 10,
                          height: 0.1,
                          backgroundColor: 'grey',
                          marginTop: 20,
                          opacity: 0.1,
                          // marginLeft:'10%',
                          marginRight: 15,
                        }}></View></>


                    :
                    <></>}


                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Details
                      </Text>

                      <Text
                        numberOfLines={3}
                        style={{ color: Global.linkTextColor, fontWeight: 'bold', paddingRight: 10 }}>
                        {detail.Details}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>


                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Event Theme
                      </Text>

                      <Text
                        numberOfLines={3}
                        style={{ color: Global.linkTextColor, fontWeight: 'bold', paddingRight: 10 }}>
                        {detail.EventTheme}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>


                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Event Type
                      </Text>

                      <Text
                        numberOfLines={3}
                        style={{ color: Global.linkTextColor, fontWeight: 'bold', paddingRight: 10 }}>
                        {detail.Event_Type}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>





                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Event Managed By
                      </Text>

                      <Text
                        numberOfLines={3}
                        style={{ color: Global.linkTextColor, fontWeight: 'bold', paddingRight: 10 }}>
                        {detail.organize_By.person}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>






                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Event Organized by
                      </Text>

                      <Text
                        numberOfLines={3}
                        style={{ color: Global.linkTextColor, fontWeight: 'bold', paddingRight: 10 }}>
                        {detail.organize_By.Business}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>




                  <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Address
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '100%',
                      height: 250,
                      marginLeft: -20,
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    <MapView
                      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                      style={{ width: '100%', height: 250 }}
                      region={detail.Region}>
                      <Marker
                        // key={index}
                        coordinate={{ latitude: detail.Region.latitude, longitude: detail.Region.longitude }}
                        title={detail.title}
                      />
                    </MapView>
                  </View>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: 'bold',
                      width: '100%',
                      textAlign: 'left',
                      color: Global.linkTextColor,
                      marginLeft: 3,
                      paddingRight: 10
                    }}>
                    {detail.Business_Street_Hs + " " + detail.Business_city + " " + detail.Address}
                  </Text>

                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>

                  <TouchableOpacity onPress={() => openMap(detail.Region.latitude, detail.Region.longitude)} activeOpacity={0.8} style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#000",
                          fontWeight: "bold",
                        }}
                      >
                        Get Direction
                      </Text>
                    </View>

                    <Icon3 name="compass-outline" size={25} style={{ marginRight: 15 }} color={"#000"} />
                  </TouchableOpacity>




                  <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 20,
                      opacity: 0.1,
                      // marginLeft:'10%',
                      marginRight: 15,
                    }}></View>

                  {detail.ticketUrl1 !== '' && detail.ticketUrlLabel1 !== '' ?
                    <TouchableOpacity
                      onPress={() => Linking.openURL(detail.ticketUrl1)}
                      activeOpacity={0.8}
                      style={styles.timeCard}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            fontWeight: 'bold',
                          }}>

                          {detail.ticketUrlLabel1}

                        </Text>

                        <Text
                          numberOfLines={3}
                          style={{ color: Global.linkTextColor, fontWeight: 'bold', paddingRight: 10 }}>
                          {detail.ticketUrl1}
                        </Text>
                      </View>
                    </TouchableOpacity>


                    :

                    <></>}





                  {detail.ticketUrl2 !== '' && detail.ticketUrlLabel2 !== '' ?
                    <TouchableOpacity
                      onPress={() => Linking.openURL(detail.ticketUrl2)}

                      activeOpacity={0.8}
                      style={styles.timeCard}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            fontWeight: 'bold',
                          }}>
                          {detail.ticketUrlLabel2}
                        </Text>

                        <Text
                          numberOfLines={3}
                          style={{ color: Global.linkTextColor, fontWeight: 'bold', paddingRight: 10 }}>

                          {detail.ticketUrl2}
                        </Text>
                      </View>
                    </TouchableOpacity>


                    :

                    <></>}

                </View>

                {/* <View style={styles.menuDiv}>
            <View
              style={{
                ...styles.mainDivi,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  ...styles.mainDivi,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    ...styles.iconText,
                    fontSize: 20,
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  People Also intrested
                </Text>
              </View>

              {navi.map((v, i) => {
                return (
                  <View key={i} style={styles.ReviewCard1}>
                    <View style={styles.header}>
                      <Image
                        style={{width: 35, height: 35, borderRadius: 3}}
                        source={{uri: v.user}}
                      />

                      <View style={styles.imageContent}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              color: '#000',
                            }}>
                            Title of Business
                          </Text>

                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}>
                            <Icon1
                              name="star-box"
                              size={10}
                              color={Global.color}
                            />
                            <Icon1
                              name="star-box"
                              size={10}
                              color={Global.color}
                            />
                            <Icon1
                              name="star-box"
                              size={10}
                              color={Global.color}
                            />
                            <Icon1
                              name="star-box"
                              size={10}
                              color={Global.color}
                            />
                            <Icon1
                              name="star-box"
                              size={10}
                              color={Global.color}
                            />

                            <Text
                              style={{
                                fontSize: 12,
                                color: 'grey',
                                marginLeft: 7,
                                marginRight: 7,
                              }}>
                              1231
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 13,
                              color: 'grey',
                            }}>
                            14th Floor Main Branch
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        borderWidth: 0.2,
                        marginBottom: 0,
                        height: 0.1,
                        backgroundColor: 'grey',
                        marginTop: 10,
                        opacity: 0.1,
                      }}></View>
                  </View>
                );
              })}
            </View>
          </View> */}


              </ScrollView>
            </>
            :
            ''
        }
      </View>


      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonsDiv: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '3.5%',
  },
  tabs: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomDiv3: {
    width: '100%',
    height: 350,
    // backgroundColor:'#000',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    paddingBottom: 10,
  },
  buttonsDiv1: {
    width: '93%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '3.5%',
    marginTop: 0,
  },
  timeCard: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 3,
    marginTop: 10,
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
    flexDirection: 'row',
  },

  buttonHalfOne1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',

    borderRadius: 20,
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    width: 100,
    marginLeft: 15,
    marginTop: 20,
  },
  reviewCardmain: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 4,
    marginLeft: '3.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    marginBottom: 50,
    // marginLeft:-15
  },
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 70,
    // backgroundColor:'red',
    // position: 'absolute',
    top: 0,
    justifyContent: 'center',
  },
  buttonHalfTwo1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Global.color,
    elevation: 1,
    marginTop: -10,
    fontFamily: 'sans-serif-thin',
    marginLeft: '4%',
  },
  buttonHalfTwo2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    borderRadius: 5,
    // borderColor: Global.color,
    marginTop: 10,
    fontFamily: 'sans-serif-thin',
    marginLeft: '4%',
    borderColor: '#000',
    borderWidth: 1,
  },
  navBar: {
    width: '100%',
    padding: 15,
  },
  navig: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  timeCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 3,
    marginTop: 10,

  },
  timeCard1: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 3,
    // marginTop: 10,
  },
  iconDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconCard: {
    width: 50,
    backgroundColor: 'rgba(192, 192, 192, 0.236)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  iconText: {
    fontSize: 12,
    fontWeight: 'bold',
    // marginLeft: 10,
    color: 'grey',
    textAlign: 'center',
    // marginTop: 10,
    fontFamily: 'sans-serif',
  },
  iconText1: {
    fontSize: 14,
    // fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'sans-serif',
  },
  menuDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  mainDivi: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showImage: {
    display: 'flex',
    flexDirection: 'column',
    width: 160,
    height: 250,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor:'red',
    // marginLeft: 30,
  },
  ReviewCard: {
    width: '95%',
    minHeight: 100,
  },

  ReviewCard1: {
    width: '95%',
    minHeight: 80,
  },
  input: {
    height: 45,
    width: '90%',
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    marginTop: 15,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
  },

  imageContent: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  button1: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 7,
  },
  buttonText1: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Roboto',
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
    Add_Intrested_People: (uid, detail, intrested, setLoadingS,user_id) => dispatch(Add_Intrested_People(uid, detail, intrested, setLoadingS,user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
