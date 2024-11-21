import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  TextInput,
  Modal,
  Share,
  ActivityIndicator,
} from 'react-native';
import {Get_relevant_review} from '../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {arr, Global, navi} from '../assets/Global_Variable';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modalize} from 'react-native-modalize';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import {useIsFocused} from '@react-navigation/native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import SweetAlert from 'react-native-sweet-alert';
import dynamicLinks from '@react-native-firebase/dynamic-links';

function BusinessAllDetails(Props) {
  let [DaysList, setDaysList] = useState([
    {
      name: 'Monday',
    },
    {
      name: 'Tuesday',
    },
    {
      name: 'Wednesday',
    },
    {
      name: 'Thursday',
    },
    {
      name: 'Friday',
    },
    {
      name: 'Saturday',
    },
    {
      name: 'Sunday',
    },
  ]);
  let Business = Props.All_Business_Nodes_newOld.filter(
    e => e.uid == Props.route.params.Details,
  )[0];
  let [All_Business, setAll_Business] = useState([]);
  const isFocused = useIsFocused();
  let [Notify_Text, setNotify_Text] = useState(
    "You Can't Perform this action with your own Business",
  );
  let [loadingS, setLoadingS] = useState(false);
  let [play_me, setPlay_me] = useState('');
  let [video_Modal, setvideo_Modal] = useState(false);
  let [Reveiw_Loading, setReview_loading] = useState(false);
  let [Notify, setNotify] = useState(false);
  let [user, setUser] = useState();
  let [paused, setPaused] = useState(false);
  let [ShuffledReviews, setShuffledReviews] = useState([]);
  let [loginCheck, setLoginCheck] = useState(undefined);
  let [Today_Slot, setTodaySlot] = useState(undefined);
  let [Random, setRandom] = useState(0);
  console.log('video_Modal', video_Modal);
  useEffect(() => {
    Business = Props.All_Business_Nodes_newOld.filter(
      e => e.uid == Props.route.params.Details,
    )[0];
  }, [Business]);
  let [today, setToday] = useState({
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  });
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    if (user != undefined) {
      setUser(user);
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  // // Show Image Gallery

  const [images, setImages] = useState([]);

  useEffect(() => {
    let image = [];
    if (Business.Images.length > 0) {
      Business.Images.map((v, i) => {
        image.push({
          uri: v,
        });
      });
    }

    setImages(image);
    let sortedBusiness = Props.All_Business_Nodes_newOld.filter(
      e => e !== Props.route.params.Details,
    )
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value);

    let catagoriesBusines = [];
    for (let i = 0; i < sortedBusiness.length; i++) {
      Business.categories.map((v, index) => {
        if (
          JSON.stringify(sortedBusiness[i].categories).includes(
            JSON.stringify(v),
          )
        ) {
          console.log(sortedBusiness[i].name);
          catagoriesBusines.push(sortedBusiness[i]);
        }
      });
    }

    setAll_Business(catagoriesBusines.filter(e => e.uid !== Business.uid));

    getData();

    Business.Availaibility !== undefined
      ? Business.Availaibility.filter(e => {
          return new Date().getDay() == today[e.selectedDays]
            ? setTodaySlot(e)
            : '';
        })
      : '';

    // 3600000
  }, [isFocused]);

  let [sortedReviews, setSortedReviews] = useState([]);
  useEffect(() => {
    Props.Get_relevant_review(Business.uid, setReview_loading);
  }, []);
  useEffect(() => {
    let sor = Props.Relevant_Reveiws;
    setSortedReviews(
      sor.sort(function (a, b) {
        return parseFloat(b.data.Rating) - parseFloat(a.data.Rating);
      }),
    );

    setShuffledReviews(
      Props.Relevant_Reveiws.map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value),
    );
  }, [Props.Relevant_Reveiws]);
  const [visible, setIsVisible] = useState(false);

  let [scrollValue, setScrollValue] = useState(0);

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const modalizeRef1 = useRef(null);

  const onOpen1 = () => {
    modalizeRef1.current?.open();
  };

  const modalizeRef2 = useRef(null);

  const onOpen2 = () => {
    modalizeRef2.current?.open();
  };
  let [tabActive, settabActive] = useState(false);

  const onShare = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://onestopzimbabuehac.page.link/Business/^#@${Business.uid}`,
      domainUriPrefix: 'https://onestopzimbabuehac.page.link',
      android: {
        packageName: 'com.onestopzimbabuehac',
      },
      analytics: {
        campaign: 'banner',
      },
    });
    link;

    try {
      const result = await Share.share({
        title: 'OneStop Zim Event',
        message: `Hi, check this Wonderfull Business.You should need to visit it here ${link}`,
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

  var stars = Business ? Business.OverAll_Rating : [0, 0, 0, 0, 0];
  (count = 0),
    (sum = stars.reduce(function (sum, item, index) {
      count += item;
      return sum + item * (index + 1);
    }, 0));

  let final_Star = Math.floor(sum / count);

  let Check_In = async () => {
    setLoadingS(true);
    let user_me = JSON.parse(await AsyncStorage.getItem('@user_data'));
    console.log('>>>>>>>', Business.CheckIns, user_me.Check_In);
    let updateUser = user_me.Check_In;
    let my_obj = Business.CheckIns.filter(e => e.uid !== Business.uid);
    let othersThenthis = updateUser.filter(e => e !== Business.uid);

    if (!updateUser.includes(Business.uid)) {
      updateUser.push(Business.uid);

      firestore()
        .collection('All_Business')
        .doc(Business.uid)
        .update({
          CheckIns: firebase.firestore.FieldValue.arrayUnion({
            uid: user.uid,
            time: new Date().getTime() + 3600000 * 4,
          }),
        })
        .then(() => {
          firestore()
            .collection('Authuntication')
            .doc(user.uid)
            .update({
              Check_In: firebase.firestore.FieldValue.arrayUnion(Business.uid),
            });
        })
        .catch(() => {
          setLoadingS(true);
        });

      SweetAlert.showAlertWithOptions(
        {
          title: 'Sucess',
          subTitle: 'Added to Check-In Sucessfully!',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Cancel',
          otherButtonColor: '#dedede',
          style: 'success',
          cancellable: true,
        },
        callback => {
          setRandom(Math.random() * 1000);
        },
      );

      user_me.Check_In = updateUser;

      await AsyncStorage.setItem('@user_data', JSON.stringify(user_me));
    } else {
      user_me.Check_In = othersThenthis;

      Remove_Check_In(my_obj[0]);
      await AsyncStorage.setItem('@user_data', JSON.stringify(user_me));
    }

    setLoadingS(false);
  };

  let Remove_Check_In = my_obj => {
    console.log('Remove OBJ>>>>>', my_obj);
    firestore()
      .collection('All_Business')
      .doc(Business.uid)
      .update({
        CheckIns: firebase.firestore.FieldValue.arrayRemove(my_obj),
      })
      .then(() => {
        firestore()
          .collection('Authuntication')
          .doc(user.uid)
          .update({
            Check_In: firebase.firestore.FieldValue.arrayRemove(Business.uid),
          })
          .then(() => {
            SweetAlert.showAlertWithOptions(
              {
                title: 'Sucess',
                subTitle: 'Removed Check-In Sucessfully!',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                otherButtonColor: '#dedede',
                style: 'success',
                cancellable: true,
              },
              callback => {},
            );
          })
          .catch(() => {
            setLoadingS(true);
          });
      })
      .catch(() => {
        setLoadingS(true);
      });
  };

  let Change_Notify = e => {
    setNotify_Text(
      `You Can't Perform this action with this Business! Because ${e}`,
    );
    setNotify(true);
  };

  const openMap = (latitude, longitude) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=', // if device is ios
      android: 'geo:0,0?q=', // if device is android
    });
    const latLng = `${latitude},${longitude}`;
    const label = Business.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  let [footerCompoent, setFooterComponent] = useState({
    name: '',
    date: '',
    Rating: '',
    feedback: '',
  });

  if (Business !== undefined) {
    return (
      <>
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <StatusBar
            // translucent
            barStyle="light-content"
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
          <View
            style={{
              ...styles.nav,
              backgroundColor: scrollValue > 200 ? Global.color : 'transparent',
            }}>
            <Icon3
              onPress={() =>
                Props.route.params.from === 'search'
                  ? Props.navigation.goBack()
                  : Props.navigation.navigate('Main_tab')
              }
              name="chevron-back-outline"
              size={25}
              style={{
                color: '#FFFFFF',
                position: 'absolute',
                top: 20,
                left: 10,
              }}
            />

            {/* <Icon3
            // onPress={() => Props.navigation.goBack()}
            name="bookmark-outline"
            size={25}
            style={{
              color: '#FFFFFF',
              position: 'absolute',
              top: 20,
              right: 60,
            }}
          /> */}

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
            style={{flex: 1}}
            onScroll={event =>
              setScrollValue(event.nativeEvent.contentOffset.y)
            }>
            {Business.Images.length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  let image = [];
                  if (Business.Images.length > 0) {
                    Business.Images.map((v, i) => {
                      image.push({
                        uri: v,
                      });
                    });
                  }

                  setImages(image);
                  setFooterComponent({
                    name: '',
                    date: '',
                    Rating: '',
                    feedback: '',
                  });
                  setIsVisible(true);
                }}>
                <Image
                  source={{uri: Business.Images[0]}}
                  style={{width: '100%', height: 350, resizeMode: 'cover'}}
                />
              </TouchableOpacity>
            ) : (
              <Image
                source={{
                  uri: 'https://cornwallwithkids.co.uk/wp-content/uploads/2020/11/Coming-soon.jpg',
                }}
                style={{width: '100%', height: 350, resizeMode: 'cover'}}
              />
            )}

            <Text
              style={{
                fontSize: 20,
                color: '#FFFFFF',
                fontWeight: 'bold',
                left: 15,
                width: '90%',
                textAlign: 'left',
                position: 'absolute',
                top: 270,
                left: 15,
              }}
              numberOfLines={1}>
              {Business.name}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'absolute',
                top: 300,
                left: 15,
              }}>
              {[0, 1, 2, 3, 4].map((v, i) => {
                // console.log(final_Star);
                if (i < final_Star) {
                  return <Icon1 name="star-box" size={20} color={'#FFA500'} />;
                } else {
                  return <Icon1 name="star-box" size={20} color={'#fff'} />;
                }
              })}

              <Text
                style={{
                  fontSize: 15,
                  color: '#FFFFFF',
                  marginLeft: 7,
                  marginRight: 7,
                  fontWeight: 'bold',
                }}>
                {Business.Received_Reviews_no}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  loginCheck
                    ? Business.user_uid == user.uid
                      ? Props.navigation.navigate('Edit_Business', {
                          Business: Business,
                          video: true,
                        })
                      : Change_Notify('Its Not Your Business')
                    : Props.navigation.navigate('LoginCheckRestict');
                }}
                activeOpacity={0.8}
                style={{
                  width: 80,
                  height: 20,
                  backgroundColor: 'red',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
                  Add Video
                </Text>
              </TouchableOpacity>
            </View>
            {Business.claimed !== undefined && Business.claimed ? (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: 60,
                    height: 20,
                    backgroundColor: '#2B91F7',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 325,
                    left: 18,
                  }}>
                  <Icon1
                    name="check-circle"
                    style={{}}
                    size={10}
                    color={'#fff'}></Icon1>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 'bold',
                      marginLeft: -5,
                    }}>
                    Verified
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: 75,
                  height: 20,
                  backgroundColor: '#D3D3D3',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  position: 'absolute',
                  top: 325,
                  left: 18,
                }}>
                <Icon1
                  name="check-circle"
                  style={{}}
                  size={10}
                  color={'#5A5A5A'}></Icon1>
                <Text
                  style={{
                    color: '#5A5A5A',
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: -9,
                  }}>
                  Unverified
                </Text>
              </TouchableOpacity>
            )}

            <Text
              style={{
                fontSize: 14,
                color: '#000',
                fontWeight: 'bold',
                left: 15,
                width: '90%',
                textAlign: 'left',
                marginTop: 20,
              }}>
              {Business.city}
            </Text>
            {Business.Availaibility !== undefined ? (
              <>
                {Today_Slot !== undefined ? (
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'grey',
                      // fontWeight: 'bold',
                      left: 15,
                      width: '90%',
                      textAlign: 'left',
                      marginTop: 5,
                    }}>
                    {Today_Slot.start_Time} - {Today_Slot.End_Time}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      color: Global.color,
                      fontWeight: 'bold',
                      left: 15,
                      width: '90%',
                      textAlign: 'left',
                      marginTop: 5,
                    }}>
                    Closed Today!
                  </Text>
                )}
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    // fontWeight: 'bold',
                    left: 15,
                    width: '90%',
                    textAlign: 'left',
                    marginTop: 5,
                  }}>
                  No Time Slots Available
                </Text>
              </>
            )}

            {Business.Availaibility !== undefined ? (
              <TouchableOpacity
                onPress={() => onOpen()}
                activeOpacity={0.8}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  marginLeft: 15,
                }}>
                <Text
                  style={{
                    color: Global.linkTextColor,
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  See All Hours
                </Text>

                <Icon3
                  name="return-up-forward-outline"
                  size={25}
                  style={{marginLeft: 10}}
                  color={Global.linkTextColor}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}

            <View
              style={{
                width: '100%',
                borderWidth: 0.2,
                marginBottom: 20,
                height: 0.1,
                backgroundColor: 'grey',
                marginTop: 4,
                opacity: 0.1,
              }}></View>

            <View style={styles.iconDiv}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    loginCheck
                      ? Business.user_uid == user.uid &&
                        Business.type == 'business'
                        ? setNotify(true)
                        : Props.navigation.navigate('Rating', {
                            SelectedBusiness: Business,
                          })
                      : Props.navigation.navigate('LoginCheckRestict')
                  }
                  activeOpacity={0.6}
                  style={styles.iconCard}>
                  <Icon1 name="star-box" size={25} color={'#000'} />
                </TouchableOpacity>
                <Text style={styles.iconText}>Add a Review</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`tel:+263${Number(Business.phone)}`)
                  }
                  activeOpacity={0.6}
                  style={styles.iconCard}>
                  <Icon3 name="call-outline" size={25} color={'#000'} />
                </TouchableOpacity>
                <Text style={styles.iconText}>Call Us</Text>
              </View>

              {Business.Business_Street_Hs == '' &&
              Business.Business_city == '' &&
              Business.address == '' ? (
                <></>
              ) : (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '33%',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      Props.navigation.navigate('MapView', {
                        Map_value: Business.Map_value,
                        Business_name: Business.name,
                      })
                    }
                    activeOpacity={0.6}
                    style={styles.iconCard}>
                    <Icon3 name="map-outline" size={25} color={'#000'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>View Map</Text>
                </View>
              )}

              {Business.website !== '' ? (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '33%',
                  }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(Business.website)}
                    activeOpacity={0.6}
                    style={styles.iconCard}>
                    <Icon3 name="link-outline" size={25} color={'#000'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>Visit Us</Text>
                </View>
              ) : (
                <></>
              )}

              {Business.Menu !== '' ? (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '33%',
                  }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(Business.Menu)}
                    activeOpacity={0.6}
                    style={styles.iconCard}>
                    <Icon3 name="megaphone-outline" size={25} color={'#000'} />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>
                    Menu/Business Catalogue URL
                  </Text>
                </View>
              ) : (
                <></>
              )}

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    loginCheck
                      ? Business.user_uid == user.uid
                        ? Props.navigation.navigate('Edit_Business', {
                            Business: Business,
                            photo: true,
                          })
                        : Change_Notify('Its Not Your Business')
                      : Props.navigation.navigate('LoginCheckRestict');
                  }}
                  activeOpacity={0.6}
                  style={styles.iconCard}>
                  <Icon3 name="add-circle-outline" size={25} color={'#000'} />
                </TouchableOpacity>
                <Text style={styles.iconText}>Add Photo</Text>
              </View>
            </View>

            {!Business.claimed ? (
              // && Business.Profile_Type !== 'Basic'
              <TouchableOpacity
                onPress={() => {
                  console.log(user.Business);
                  loginCheck
                    ? !user.Business
                      ? // ? Business.Profile_Type !== 'Basic'
                        Business.claimed
                        ? SweetAlert.showAlertWithOptions(
                            {
                              title: 'Already Claimed',
                              subTitle:
                                'Your Business is Already Sucessfully Claimed!',
                              confirmButtonTitle: 'OK',
                              confirmButtonColor: '#000',
                              otherButtonTitle: 'Cancel',
                              otherButtonColor: '#dedede',
                              cancellable: true,
                              style: 'success',
                            },
                            callback => {},
                          )
                        : Business.claimRequestProgess
                        ? SweetAlert.showAlertWithOptions(
                            {
                              title: 'Already Submit',
                              subTitle:
                                'Your Request already submit yet no response from admin side if any response came you will be able to submit again request',
                              confirmButtonTitle: 'OK',
                              confirmButtonColor: '#000',
                              otherButtonTitle: 'Cancel',
                              otherButtonColor: '#dedede',
                              cancellable: true,
                            },
                            callback => {},
                          )
                        : Props.navigation.navigate('ClaimYourListing', {
                            Business: Business,
                          })
                      : // : Change_Notify('This Business Profile is Basic')
                        Change_Notify(
                          'You Have Already Registered Business as Owner',
                        )
                    : Props.navigation.navigate('LoginCheckRestict');
                }}
                activeOpacity={1}
                style={{...styles.inputDiv}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'sans-serif',
                    color: '#000',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Claim the Business
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

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

            {/* <View style={styles.menuDiv}>
            <View style={styles.mainDivi}>
              <Text style={{ ...styles.iconText, fontSize: 18, color: '#000' }}>
                Menu
              </Text>

              <Icon3
                name="return-up-forward-outline"
                size={30}
                style={{ marginRight: 15 }}
                color={'#000'}
              />
            </View>

            <Text
              style={{
                ...styles.iconText,
                fontSize: 15,
                color: '#000',
                width: '100%',
                textAlign: 'left',
                marginTop: 20,
              }}>
              Popular Dishes
            </Text>

            <View
              style={{
                width: '100%',
                paddingTop: 10,
                paddingLeft: 0,
              }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}
                style={{ width: '100%' }}>
                {arr.map((v, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={i}
                      style={{
                        ...styles.showImage,
                        marginLeft: i == 0 ? 0 : 20,
                      }}>

                      <View
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                        }}>
                        <Image
                          key={i}
                          source={{ uri: v.image }}
                          style={{
                            width: '100%',
                            height: 150,

                            resizeMode: 'contain',
                            borderRadius: 4,
                          }}
                        />

                        <View
                          style={{
                            width: '100%',
                            height: 150,

                            resizeMode: 'contain',
                            borderRadius: 4,
                            position: 'absolute',
                            backgroundColor: 'rgba(0, 0, 0, 0.227)',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontWeight: 'bold',
                              fontSize: 15,
                              width: 200,
                              textAlign: 'left',
                              padding: 10,
                            }}>
                            10 $
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: 15,
                            width: 200,
                            textAlign: 'left',
                            marginTop: 5,
                            marginLeft: 3,
                          }}>
                          Title
                        </Text>
                        <Text
                          numberOfLines={3}
                          style={{
                            color: 'grey',
                            fontSize: 12,
                            width: 150,
                            textAlign: 'justify',
                            marginTop: 5,
                            marginLeft: 3,
                          }}>
                          30 Photo . 28 Review{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.buttonHalfTwo1}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#FFFFFF',
                    fontFamily: 'notoserif',
                  }}>
                  See Full Menu
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onOpen2()}
                activeOpacity={0.9}
                style={styles.buttonHalfTwo2}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'notoserif',
                  }}>
                  Order Or Take Delivery
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: '100%',
                  borderWidth: 0.2,
                  marginBottom: 10,
                  height: 0.1,
                  backgroundColor: 'grey',
                  marginTop: 20,
                  opacity: 0.1,
                  marginLeft: -15,
                }}></View>
            </View>
          </View> */}

            <View style={styles.menuDiv}>
              <View style={styles.mainDivi}>
                <Text
                  style={{
                    ...styles.iconText,
                    fontSize: 20,
                    color: '#000',
                    textAlign: 'left',
                  }}>
                  Info
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{marginTop: 10, marginBottom: 10, ...styles.timeCard2}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  Gallery
                </Text>

                <Icon2
                  name="photo-video"
                  size={15}
                  style={{marginRight: 15}}
                  color={'grey'}
                />
              </TouchableOpacity>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}
                style={{width: '100%'}}>
                {Business.Videos !== undefined &&
                  Business.Videos.map((v, i) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setvideo_Modal(true);
                          setPlay_me(v);
                        }}
                        key={i}
                        style={{
                          ...styles.showImage,
                          marginLeft: i == 0 ? 0 : 20,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <Image
                            key={i}
                            source={{uri: v.thumbnail}}
                            style={{
                              width: '100%',
                              height: 150,

                              resizeMode: 'contain',
                              borderRadius: 4,
                            }}
                          />

                          <View
                            style={{
                              width: '100%',
                              height: 150,

                              resizeMode: 'contain',
                              borderRadius: 4,
                              position: 'absolute',
                              backgroundColor: 'rgba(0, 0, 0, 0.327)',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-end',
                            }}>
                            <Icon2
                              name="youtube"
                              size={20}
                              style={{padding: 15}}
                              color={'#fff'}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}

                {Business.Images !== undefined &&
                  Business.Images.map((v, i) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          let image = [];
                          if (Business.Images.length > 0) {
                            Business.Images.map((v, index) => {
                              if (index == i) {
                                image.unshift({
                                  uri: v,
                                });
                              } else {
                                image.push({
                                  uri: v,
                                });
                              }
                            });
                          }

                          setImages(image);
                          setFooterComponent({
                            name: '',
                            date: '',
                            Rating: '',
                            feedback: '',
                          });

                          setIsVisible(true);
                        }}
                        key={i}
                        style={{
                          ...styles.showImage,
                          marginLeft: i == 0 ? 10 : 20,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <Image
                            key={i}
                            source={{uri: v}}
                            style={{
                              width: '100%',
                              height: 150,

                              resizeMode: 'contain',
                              borderRadius: 4,
                            }}
                          />

                          <View
                            style={{
                              width: '100%',
                              height: 150,

                              resizeMode: 'contain',
                              borderRadius: 4,
                              position: 'absolute',
                              backgroundColor: 'rgba(0, 0, 0, 0.327)',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-end',
                            }}>
                            <Icon3
                              name="image-outline"
                              size={20}
                              style={{padding: 15}}
                              color={'#fff'}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>

              {Business.Availaibility !== undefined ? (
                Business.Availaibility.map((v, i) => {
                  if (new Date().getDay() == today[v.selectedDays]) {
                    return (
                      <TouchableOpacity
                        onPress={() => onOpen()}
                        activeOpacity={0.8}
                        style={styles.timeCard}>
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontWeight: 'bold',
                            }}>
                            Hours
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#000',
                              fontWeight: '400',
                            }}>
                            <Text
                              style={{
                                color: Global.linkTextColor,
                                fontWeight: 'bold',
                              }}>
                              Open
                            </Text>{' '}
                            {v.start_Time} - {v.End_Time}
                          </Text>
                        </View>

                        <Icon3
                          name="chevron-forward-outline"
                          size={20}
                          style={{marginRight: 15}}
                          color={'#000'}
                        />
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: 'bold',
                      }}>
                      No Slot Available
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontWeight: '400',
                      }}>
                      <Text style={{color: Global.color, fontWeight: 'bold'}}>
                        Closed
                      </Text>{' '}
                    </Text>
                  </View>

                  <Icon3
                    name="chevron-forward-outline"
                    size={20}
                    style={{marginRight: 15}}
                    color={'#000'}
                  />
                </TouchableOpacity>
              )}

              {Business.website !== '' ? (
                <TouchableOpacity
                  onPress={() => Linking.openURL(Business.website)}
                  activeOpacity={0.8}
                  style={styles.timeCard}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: 'bold',
                      }}>
                      Website
                    </Text>

                    <Text
                      style={{
                        color: Global.linkTextColor,
                        fontWeight: 'bold',
                        maxWidth: '100%',
                      }}>
                      {Business.website}
                    </Text>
                  </View>

                  <Icon3
                    name="link-outline"
                    size={20}
                    style={{marginRight: 15}}
                    color={'#000'}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}

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
                onPress={() =>
                  Linking.openURL(`tel:+263${Number(Business.phone)}`)
                }
                activeOpacity={0.8}
                style={styles.timeCard}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontWeight: 'bold',
                    }}>
                    Call
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: '400',
                    }}>
                    <Text
                      style={{color: Global.linkTextColor, fontWeight: 'bold'}}>
                      +263{Number(Business.phone)}
                    </Text>{' '}
                  </Text>
                </View>

                <Icon3
                  name="call-outline"
                  size={20}
                  style={{marginRight: 15}}
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

              {loginCheck ? (
                <TouchableOpacity
                  onPress={() => {
                    loginCheck
                      ? Business.user_uid == user.uid
                        ? setNotify(true)
                        : Props.navigation.navigate('SubChat', {
                            BusienssUID: Business.user_uid,
                            pic_url: Business.Business_Dp,
                            BusinessName: Business.name,
                            pic: Business.Business_Dp,
                            final_id: user.uid + Business.user_uid,
                          })
                      : Props.navigation.navigate('LoginCheckRestict');
                  }}
                  activeOpacity={0.8}
                  style={styles.timeCard}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: 'bold',
                      }}>
                      Message
                    </Text>
                  </View>

                  <Icon3
                    name="chatbox-outline"
                    size={20}
                    style={{marginRight: 15}}
                    color={'#000'}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}

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
                onPress={() => Check_In()}
                activeOpacity={0.8}
                style={styles.timeCard}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontWeight: 'bold',
                    }}>
                    Check In
                  </Text>
                </View>

                <Icon3
                  name="shield-checkmark-outline"
                  size={25}
                  style={{marginRight: 15}}
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

              {Business.Business_Street_Hs == '' &&
              Business.Business_city == '' &&
              Business.address == '' ? (
                <></>
              ) : (
                <>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Map
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '100%',
                      height: 250,
                      marginLeft: -20,
                      marginTop: 20,
                      marginBottom: 10,
                    }}>
                    <MapView
                      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                      style={{width: '100%', height: 250}}
                      region={Business.Map_value}>
                      <Marker
                        // key={index}
                        coordinate={{
                          latitude: Business.Map_value.latitude,
                          longitude: Business.Map_value.longitude,
                        }}
                        title={'Business'}
                        description={'Shop Details will be there'}
                      />
                    </MapView>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: 'bold',
                      width: '100%',
                      textAlign: 'left',
                    }}>
                    {Business.Business_Street_Hs} {'\n'}
                    {Business.Business_city} {'\n'}
                    {Business.address}
                    {/* {Business.city} */}
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
                  <TouchableOpacity
                    onPress={() =>
                      openMap(
                        Business.Map_value.latitude,
                        Business.Map_value.longitude,
                      )
                    }
                    activeOpacity={0.8}
                    style={styles.timeCard}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Get Direction
                      </Text>
                    </View>

                    <Icon3
                      name="compass-outline"
                      size={25}
                      style={{marginRight: 15}}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/*
          <View style={styles.menuDiv}>
            <View
              style={{
                ...styles.mainDivi,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text style={{ ...styles.iconText, fontSize: 20, color: '#000' }}>
                Payment
              </Text>

              <Text style={{ fontSize: 12, color: '#000', marginTop: 10 }}>
                Accept Credit Card
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                borderWidth: 0.2,
                marginBottom: 10,
                height: 0.1,
                backgroundColor: 'grey',
                marginTop: 10,
                opacity: 0.1,
                marginLeft: -15,
              }}></View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpen1()}
              style={{
                ...styles.mainDivi,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text style={{ ...styles.iconText, fontSize: 20, color: '#000' }}>
                Features
              </Text>

              <Text style={{ fontSize: 12, color: '#000', marginTop: 10 }}>
                Outdoor Seating
              </Text>

              <Text style={{ fontSize: 12, color: '#000', marginTop: 10 }}>
                Offer Caring
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                borderWidth: 0.2,
                marginBottom: 10,
                height: 0.1,
                backgroundColor: 'grey',
                marginTop: 10,
                opacity: 0.1,
                marginLeft: -15,
              }}></View>

            <View
              style={{
                ...styles.mainDivi,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text style={{ ...styles.iconText, fontSize: 20, color: '#000' }}>
                You Might Also Consider For
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 13, color: '#000' }}>Sponsored</Text>
                <Icon3
                  name="alert-circle-outline"
                  size={14}
                  style={{ marginLeft: 5, marginTop: 2 }}
                  color={'#000'}
                />
              </View>
            </View>

            {[0, 1].map((v, i) => {
              return (
                <View key={i} style={styles.ReviewCard}>
                  <View style={styles.header}>
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                      source={{ uri: arr[0].user }}
                    />

                    <View style={styles.imageContent}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#000',
                          }}>
                          Title of Business
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />

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

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 12,
                        textAlign: 'justify',
                        width: '100%',
                        color: 'grey',
                      }}>
                      A+ experience second time working with Hassan, would
                      highly recommend. Will go the extra mile to help and
                      definitely one of the best on Fiverr. A+ experience second
                      time working with Hassan, would highly recommend. Will go
                      the extra mile to help and definitely one of the best on
                      Fiverr.
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      borderWidth: 0.2,
                      marginBottom: 5,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 5,
                      opacity: 0.1,
                    }}></View>
                </View>
              );
            })}
          </View> */}

            <View
              style={{
                width: '100%',
                borderWidth: 0.2,
                marginBottom: 20,
                height: 12,
                backgroundColor: 'grey',
                marginTop: 20,
                opacity: 0.1,
              }}></View>

            {user !== undefined ? (
              <>
                <View style={styles.menuDiv}>
                  <View
                    style={{
                      ...styles.mainDivi,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{...styles.iconText, fontSize: 20, color: '#000'}}>
                      Leave a Review
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        loginCheck
                          ? Business.user_uid == user.uid &&
                            Business.type == 'business'
                            ? setNotify(true)
                            : Props.navigation.navigate('Rating', {
                                SelectedBusiness: Business,
                              })
                          : Props.navigation.navigate('LoginCheckRestict')
                      }
                      style={styles.reviewCardmain}>
                      <View style={styles.header}>
                        <Image
                          style={{width: 40, height: 40, borderRadius: 50}}
                          source={{
                            uri:
                              user !== undefined
                                ? user.photo
                                : 'https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?k=20&m=1016744034&s=612x612&w=0&h=kjCAwH5GOC3n3YRTHBaLDsLIuF8P3kkAJc9RvfiYWBY=',
                          }}
                        />

                        <View style={styles.imageContent}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: '#000',
                              }}>
                              {user !== undefined ? user.name : ''}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              marginTop: 3,
                            }}>
                            {/* <Icon3 name="person-outline" size={14} color="grey" />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'grey',
                          marginLeft: 3,
                          marginRight: 7,
                        }}>
                        0
                      </Text>

                      <Icon3 name="star-outline" size={14} color="grey" />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'grey',
                          marginLeft: 3,
                          marginRight: 7,
                        }}>
                        0
                      </Text>

                      <Icon3 name="camera-outline" size={14} color="grey" />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'grey',
                          marginLeft: 3,
                          marginRight: 7,
                        }}>
                        0
                      </Text> */}
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '100%',
                        }}>
                        <Icon1 name="star-box" size={20} color={Global.color} />
                        <Icon1 name="star-box" size={20} color={Global.color} />
                        <Icon1 name="star-box" size={20} color={Global.color} />
                        <Icon1 name="star-box" size={20} color={Global.color} />
                        <Icon1 name="star-box" size={20} color={Global.color} />
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            textAlign: 'justify',
                            width: '100%',
                            color: Global.linkTextColor,
                          }}>
                          Tap to Add Review
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* <View style={styles.buttonsDiv}>
                <TouchableOpacity
                  onPress={() => chooseFile('photo')}
                  activeOpacity={0.7}
                  style={styles.buttonHalfOne}>
                  <Icon3
                    name="camera-outline"
                    size={20}
                    color="#000"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 14, color: '#000' }}>Add a Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Props.navigation.navigate('CheckIn')}
                  activeOpacity={0.7}
                  style={styles.buttonHalfOne}>
                  <Icon3
                    name="shield-checkmark-outline"
                    size={20}
                    color="#000"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 14, color: '#000' }}>Check In</Text>
                </TouchableOpacity>
              </View> */}
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    borderWidth: 0.2,
                    marginBottom: 20,
                    height: 12,
                    backgroundColor: 'grey',
                    marginTop: 20,
                    opacity: 0.1,
                  }}></View>
              </>
            ) : (
              <></>
            )}

            <View style={styles.menuDiv}>
              <View
                style={{
                  ...styles.mainDivi,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text style={{...styles.iconText, fontSize: 20, color: '#000'}}>
                  Recommended Review
                </Text>
              </View>
              {/* {console.log("Total Reviews", Props.Relevant_Reveiws)} */}
              {count > 0 ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 120,
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      width: '35%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#000',
                        marginLeft: 7,
                        marginRight: 7,
                        fontWeight: 'bold',
                      }}>
                      Overall Rating
                    </Text>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}>
                      {[0, 1, 2, 3, 4].map((v, i) => {
                        // console.log(final_Star);
                        if (i < final_Star) {
                          return (
                            <Icon1
                              name="star-box"
                              size={20}
                              color={Global.color}
                            />
                          );
                        } else {
                          return (
                            <Icon1
                              name="star-box"
                              size={20}
                              color={'#DDDDDD'}
                            />
                          );
                        }
                      })}
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#000',
                        marginLeft: 7,
                        marginRight: 7,
                        fontWeight: 'bold',
                      }}>
                      {Business.Received_Reviews_no} Review
                    </Text>
                  </View>

                  <View style={{width: '60%'}}>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 7,
                      }}>
                      <Text
                        style={{fontSize: 16, color: '#000', marginRight: 10}}>
                        5
                      </Text>

                      <View
                        style={{
                          width: '88%',
                          backgroundColor: '#DDDDDD',
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            width:
                              Math.floor(
                                (Business.OverAll_Rating[4] * 100) /
                                  Business.Received_Reviews_no,
                              ) + '%',
                            height: 8,
                            backgroundColor: Global.color,
                            borderRadius: 5,
                          }}></View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 7,
                      }}>
                      <Text
                        style={{fontSize: 16, color: '#000', marginRight: 10}}>
                        4
                      </Text>
                      <View
                        style={{
                          width: '88%',
                          backgroundColor: '#DDDDDD',
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            width:
                              Math.floor(
                                (Business.OverAll_Rating[3] * 100) /
                                  Business.Received_Reviews_no,
                              ) + '%',
                            height: 8,
                            backgroundColor: '#FD5335',
                            borderRadius: 5,
                          }}></View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 7,
                      }}>
                      <Text
                        style={{fontSize: 16, color: '#000', marginRight: 10}}>
                        3
                      </Text>
                      <View
                        style={{
                          width: '88%',
                          backgroundColor: '#DDDDDD',
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            width:
                              Math.floor(
                                (Business.OverAll_Rating[2] * 100) /
                                  Business.Received_Reviews_no,
                              ) + '%',
                            height: 8,
                            backgroundColor: '#FC7F47',
                            borderRadius: 5,
                          }}></View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 7,
                      }}>
                      <Text
                        style={{fontSize: 16, color: '#000', marginRight: 10}}>
                        2
                      </Text>
                      <View
                        style={{
                          width: '88%',
                          backgroundColor: '#DDDDDD',
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            width:
                              Math.floor(
                                (Business.OverAll_Rating[1] * 100) /
                                  Business.Received_Reviews_no,
                              ) + '%',
                            height: 8,
                            backgroundColor: '#f4887a',
                            borderRadius: 5,
                          }}></View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 7,
                      }}>
                      <Text
                        style={{fontSize: 16, color: '#000', marginRight: 10}}>
                        1
                      </Text>
                      <View
                        style={{
                          width: '88%',
                          backgroundColor: '#DDDDDD',
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            width:
                              Math.floor(
                                (Business.OverAll_Rating[0] * 100) /
                                  Business.Received_Reviews_no,
                              ) + '%',
                            height: 8,
                            backgroundColor: 'orange',
                            borderRadius: 5,
                          }}></View>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <Text style={{padding: 10}}>No Review At all</Text>
              )}
            </View>

            <View
              style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  Props.navigation.navigate('AllRatingsHistory_Search', {})
                }
                activeOpacity={0.7}
                style={{...styles.buttonHalfOne1, width: 190}}>
                <Icon3
                  name="search-outline"
                  size={20}
                  color="#000"
                  style={{marginRight: 8}}
                />
                <Text style={{fontSize: 14, color: '#000'}}>
                  Search From Review
                </Text>
              </TouchableOpacity>
            </View>

            {count > 0 ? (
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.2,
                  marginBottom: 20,
                  height: 12,
                  backgroundColor: 'grey',
                  marginTop: 20,
                  opacity: 0.1,
                }}></View>
            ) : (
              <></>
            )}

            {count > 0 ? (
              <>
                <Text
                  style={{
                    ...styles.iconText,
                    fontSize: 20,
                    color: '#000',
                    textAlign: 'left',
                    paddingLeft: 15,
                    marginTop: 0,
                  }}>
                  Top Reviews
                </Text>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={false}
                  style={{width: '100%', marginTop: 20, paddingLeft: 15}}>
                  {sortedReviews.map((v, i) => {
                    if (v.data.Images.length > 2 && i < 10) {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          key={i}
                          onPress={() => {
                            setFooterComponent({
                              name: v.data.name,
                              date: v.data.time,
                              Rating: v.data.Rating,
                              feedback: v.data.feedback,
                            });
                            let image = [];
                            v.data.Images.map((v, i) => {
                              image.push({
                                uri: v,
                              });
                            });
                            setImages(image);

                            setIsVisible(true);
                          }}
                          style={{
                            ...styles.showImage1,
                            marginLeft: i == 0 ? 0 : 10,
                            marginRight: i !== v.data.Images.length ? 10 : 0,
                          }}>
                          {/* */}

                          <View
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                            }}>
                            <Image
                              key={i}
                              source={{uri: v.data.Images[0]}}
                              style={{
                                width: '65%',
                                height: 200,

                                resizeMode: 'contain',
                                borderTopLeftRadius: 8,
                              }}
                            />

                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '35%',
                                height: 200,
                              }}>
                              <Image
                                source={{uri: v.data.Images[1]}}
                                style={{
                                  width: '100%',
                                  minHeight: 100,
                                  resizeMode: 'cover',
                                  borderTopRightRadius: 8,
                                }}
                              />

                              <Image
                                source={{uri: v.data.Images[2]}}
                                style={{
                                  width: '100%',
                                  minHeight: 100,
                                  resizeMode: 'cover',
                                }}
                              />

                              <View
                                activeOpacity={0.8}
                                style={{
                                  width: '100%',
                                  minHeight: 100,
                                  position: 'absolute',
                                  backgroundColor: 'rgba(0, 0, 0, 0.427)',
                                  bottom: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Icon3
                                  name="images-outline"
                                  size={30}
                                  color="#fff"></Icon3>
                                <Text style={{color: '#FFFFFF', fontSize: 15}}>
                                  {v.data.Images.length - 3}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View>
                            <Text
                              numberOfLines={3}
                              style={{
                                color: '#000',
                                fontSize: 12,
                                width: 290,
                                textAlign: 'justify',
                                marginLeft: 2,
                                paddingRight: 10,
                              }}>
                              {v.data.feedback}
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                              }}>
                              {[0, 1, 2, 3, 4].map((vi, i) => {
                                rating = Math.floor(v.data.Rating);
                                if (i < rating) {
                                  return (
                                    <Icon1
                                      name="star-box"
                                      size={20}
                                      color={Global.color}
                                    />
                                  );
                                } else {
                                  return (
                                    <Icon1
                                      name="star-box"
                                      size={20}
                                      color={'#DDDDDD'}
                                    />
                                  );
                                }
                              })}
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'grey',
                                  marginLeft: 7,
                                  marginRight: 7,
                                }}>
                                {v.data.time}
                              </Text>
                            </View>

                            <Text
                              numberOfLines={3}
                              style={{
                                color: '#000',
                                fontSize: 14,
                                width: 300,
                                textAlign: 'justify',
                                marginLeft: 2,
                                marginTop: 2,
                                fontWeight: 'bold',
                              }}>
                              {v.data.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                    if (i < 10 && v.data.Images.length > 0) {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          key={i}
                          onPress={() => {
                            setFooterComponent({
                              name: v.data.name,
                              date: v.data.time,
                              Rating: v.data.Rating,
                              feedback: v.data.feedback,
                            });

                            let image = [];
                            v.data.Images.map((v, i) => {
                              image.push({
                                uri: v,
                              });
                            });
                            setImages(image);

                            setIsVisible(true);
                          }}
                          style={{
                            ...styles.showImage1,
                            marginLeft: i == 0 ? 0 : 20,
                            marginRight: i == 9 ? 20 : 0,
                          }}>
                          {/* */}

                          <View
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                            }}>
                            <Image
                              key={i}
                              source={{uri: v.data.Images[0]}}
                              style={{
                                width: '100%',
                                height: 200,

                                resizeMode: 'contain',
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                              }}
                            />
                          </View>
                          <View>
                            <Text
                              numberOfLines={3}
                              style={{
                                color: '#000',
                                fontSize: 12,
                                width: 290,
                                textAlign: 'justify',
                                marginLeft: 2,
                              }}>
                              {v.data.feedback}
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                              }}>
                              {[0, 1, 2, 3, 4].map((vi, i) => {
                                rating = Math.floor(v.data.Rating);
                                if (i < rating) {
                                  return (
                                    <Icon1
                                      name="star-box"
                                      size={20}
                                      color={Global.color}
                                    />
                                  );
                                } else {
                                  return (
                                    <Icon1
                                      name="star-box"
                                      size={20}
                                      color={'#DDDDDD'}
                                    />
                                  );
                                }
                              })}
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'grey',
                                  marginLeft: 7,
                                  marginRight: 7,
                                }}>
                                {v.data.time}
                              </Text>
                            </View>

                            <Text
                              numberOfLines={3}
                              style={{
                                color: '#000',
                                fontSize: 14,
                                width: 300,
                                textAlign: 'justify',
                                marginLeft: 2,
                                marginTop: 2,
                                fontWeight: 'bold',
                              }}>
                              {v.data.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </ScrollView>
                <View
                  style={{
                    width: '100%',
                    borderWidth: 0.2,
                    marginBottom: 10,
                    height: 0.4,
                    backgroundColor: 'grey',
                    marginTop: 0,
                    opacity: 0.3,
                  }}></View>
                <Text
                  style={{
                    ...styles.iconText,
                    fontSize: 20,
                    color: '#000',
                    textAlign: 'left',
                    marginLeft: 15,
                    marginTop: 0,
                    marginBottom: 20,
                  }}>
                  All Reviews
                </Text>
              </>
            ) : (
              <></>
            )}
            {count > 0 &&
              ShuffledReviews.map((v, i) => {
                // console.log(v.data.Rating);

                if (i < 3) {
                  return (
                    <View
                      key={i}
                      style={{...styles.ReviewCard, marginLeft: 15}}>
                      <View style={styles.header}>
                        <Image
                          style={{width: 50, height: 50, borderRadius: 50}}
                          source={{uri: v.data.User_Dp}}
                        />

                        <View style={styles.imageContent}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: '#000',
                              }}>
                              {v.data.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              marginTop: 3,
                            }}>
                            <Icon3 name="star-outline" size={14} color="grey" />
                            <Text
                              style={{
                                fontSize: 12,
                                color: 'grey',
                                marginLeft: 7,
                                marginRight: 7,
                              }}>
                              {v.data.Given_Reviews_no}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}>
                        {[0, 1, 2, 3, 4].map((vi, i) => {
                          rating = Math.floor(v.data.Rating);
                          if (i < rating) {
                            return (
                              <Icon1
                                name="star-box"
                                size={20}
                                color={Global.color}
                              />
                            );
                          } else {
                            return (
                              <Icon1
                                name="star-box"
                                size={20}
                                color={'#DDDDDD'}
                              />
                            );
                          }
                        })}
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'grey',
                            marginLeft: 7,
                            marginRight: 7,
                          }}>
                          {v.data.time}
                        </Text>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}>
                        <Text
                          numberOfLines={3}
                          style={{
                            fontSize: 14,
                            textAlign: 'justify',
                            width: '98%',
                            color: '#000',
                            marginLeft: 2,
                          }}>
                          {v.data.feedback}
                        </Text>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          width: '100%',
                        }}></View>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={false}
                        style={{width: '100%', marginTop: 7, marginBottom: 7}}>
                        {v.data.Images.map((vi, i) => {
                          return (
                            <TouchableOpacity
                              activeOpacity={0.8}
                              key={i}
                              onPress={() => {
                                setImages([{uri: vi}]);
                                setFooterComponent({
                                  name: '',
                                  date: '',
                                  Rating: '',
                                  feedback: '',
                                });

                                setIsVisible(true);
                              }}>
                              <Image
                                key={i}
                                source={{uri: vi}}
                                style={{
                                  width: 90,
                                  minHeight: 90,
                                  borderRadius: 3,
                                  resizeMode: 'cover',
                                  marginLeft: i == 0 ? 0 : 5,
                                }}
                              />
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                      <View
                        style={{
                          width: '100%',
                          borderWidth: 0.2,
                          marginBottom: 10,
                          height: 0.1,
                          backgroundColor: 'grey',
                          marginTop: 4,
                          opacity: 0.1,
                        }}></View>
                    </View>
                  );
                }
              })}

            {count > 3 ? (
              <TouchableOpacity
                onPress={() =>
                  Props.navigation.navigate('AllRatingsHistory_Search')
                }
                activeOpacity={0.7}
                style={{
                  ...styles.buttonHalfOne,
                  width: '94%',
                  marginLeft: '3%',
                  marginBottom: 10,
                }}>
                <Icon3
                  name="camera-outline"
                  size={20}
                  color="#000"
                  style={{marginRight: 8}}
                />
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                  {count - 3} More Reveiw
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            <View
              style={{
                width: '100%',
                borderWidth: 0.2,
                marginBottom: 0,
                height: 12,
                backgroundColor: 'grey',
                marginTop: 20,
                opacity: 0.1,
              }}></View>
            {Business.Profile_Type == 'Basic' ? (
              <View style={styles.menuDiv}>
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
                      People Also Viewed
                    </Text>
                  </View>

                  {All_Business.map((v, i) => {
                    if (i < 4) {
                      return (
                        <TouchableOpacity
                          key={i}
                          style={styles.ReviewCard1}
                          onPress={() => {
                            Props.navigation.push('BusinessAllDetails', {
                              Details: v.uid,
                              from: 'other',
                            });

                            Props.Get_relevant_review(v.uid, setReview_loading);
                          }}>
                          <View style={styles.header}>
                            <Image
                              style={{width: 60, height: 60, borderRadius: 3}}
                              source={{uri: v.Business_Dp}}
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
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#000',
                                  }}>
                                  {v.name}
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
                                    size={15}
                                    color={'grey'}
                                  />

                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: 'grey',
                                      marginLeft: 3,
                                      marginRight: 7,
                                    }}>
                                    {v.Received_Reviews_no}
                                  </Text>

                                  <Icon3
                                    name="image-outline"
                                    size={15}
                                    color={'grey'}
                                  />

                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: 'grey',
                                      marginLeft: 3,
                                      marginRight: 7,
                                    }}>
                                    {v.Images.length}
                                  </Text>
                                </View>

                                <Text
                                  style={{
                                    fontSize: 13,
                                    color: 'grey',
                                  }}
                                  numberOfLines={1}>
                                  {v.address}
                                </Text>
                              </View>
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
                              // marginLeft:'10%',
                              marginRight: 15,
                            }}></View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              </View>
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
        <Modalize ref={modalizeRef} modalHeight={500}>
          <View style={styles.navBar}>
            <View style={styles.navig}>
              <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
                Hours
              </Text>

              {/* <Icon3 onPress={()=> modalizeRef.current.Close()} name="close-outline" size={30} style={{position:'absolute',right:0,top:10}} color={'#000'} /> */}
            </View>

            {Business.Availaibility !== undefined &&
              DaysList.map((v, i) => {
                if (
                  Business.Availaibility.filter(e => e.selectedDays == v.name)
                    .length > 0
                )
                  return (
                    <View key={i} style={styles.timeCard}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'grey',
                          fontWeight: '400',
                        }}>
                        {v.name}
                      </Text>

                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'grey',
                            fontWeight: '400',
                          }}>
                          {
                            Business.Availaibility.filter(
                              e => e.selectedDays == v.name,
                            )[0].start_Time
                          }{' '}
                          -{' '}
                          {
                            Business.Availaibility.filter(
                              e => e.selectedDays == v.name,
                            )[0].End_Time
                          }
                        </Text>
                      </View>
                    </View>
                  );
                else {
                  return (
                    <View key={i} style={styles.timeCard}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'grey',
                          fontWeight: '400',
                        }}>
                        {v.name}
                      </Text>

                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'grey',
                            fontWeight: '400',
                          }}>
                          {/* {v.start_Time} - {v.End_Time} */} Closed
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
          </View>
        </Modalize>

        <Modalize ref={modalizeRef1} modalHeight={350}>
          <View style={styles.navBar}>
            <View style={styles.navig}>
              <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
                Features
              </Text>
            </View>

            {[
              'Outdoor Seating',
              'Offer Caring ',
              'Outdoor Seating',
              'Offer Caring ',
              'Offer Caring ',
              'Outdoor Seating',
              'Offer Caring ',
              'Offer Caring ',
              'Outdoor Seating',
              'Offer Caring ',
            ].map((v, i) => {
              return (
                <View key={i} style={styles.timeCard1}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'grey',
                      fontWeight: '400',
                    }}>
                    {v}
                  </Text>
                </View>
              );
            })}
          </View>
        </Modalize>

        <Modalize ref={modalizeRef2} modalHeight={400}>
          <View style={styles.tabs}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => settabActive(false)}
              style={{
                width: '48%',
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: tabActive ? 'transparent' : Global.color,
                borderBottomWidth: tabActive ? 0 : 4,
              }}>
              <Text
                style={{fontSize: 18, color: Global.color, fontWeight: 'bold'}}>
                Takeout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => settabActive(true)}
              style={{
                width: '48%',
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: tabActive ? Global.color : 'transparent',
                borderBottomWidth: tabActive ? 4 : 0,
              }}>
              <Text
                style={{fontSize: 18, color: Global.color, fontWeight: 'bold'}}>
                Delivery
              </Text>
            </TouchableOpacity>
          </View>

          {tabActive ? (
            <View
              style={{...styles.bottomDiv3, justifyContent: 'space-between'}}>
              <TextInput
                style={{
                  ...styles.input,
                }}
                placeholder="First Name"></TextInput>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText}>Start Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{...styles.button1, marginTop: 10}}>
                  <Text style={styles.buttonText1}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{...styles.bottomDiv3, justifyContent: 'space-between'}}>
              <Image
                source={require('../assets/wellcome.png')}
                style={{
                  height: 150,
                  width: 150,
                  marginTop: '10%',
                  resizeMode: 'contain',
                  // position:'absolute'
                }}
              />

              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: -15,
                }}>
                Takeout Address
              </Text>
              <Text
                style={{
                  width: '100%',
                  fontSize: 12,
                  color: '#000',
                  textAlign: 'center',
                  marginTop: -15,
                }}>
                Street no 20 uk main city
              </Text>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText}>Start Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{...styles.button1, marginTop: 10}}>
                  <Text style={styles.buttonText1}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modalize>
        {/* {console.log(footerCompoent)} */}
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          FooterComponent={() => {
            if (footerCompoent.name !== '') {
              return (
                <View>
                  <View
                    style={{
                      ...styles.footerNav,
                      marginBottom: 20,
                      marginTop: 20,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      marginLeft: '4%',
                    }}>
                    <Text
                      style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
                      {footerCompoent.name}
                    </Text>
                    <Text
                      // numberOfLines={5}
                      style={{
                        fontSize: 14,
                        color: '#FFFFFF',
                        marginRight: 7,
                        paddingRight: 10,
                      }}>
                      {footerCompoent.feedback}
                    </Text>
                    <Text
                      style={{fontSize: 13, fontWeight: '500', color: '#fff'}}>
                      {footerCompoent.date}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '98%',
                      borderWidth: 1,
                      marginBottom: 5,
                      height: 1,
                      backgroundColor: '#FFFFFF',
                      marginTop: 4,
                      opacity: 0.3,
                      marginLeft: '1%',
                    }}></View>

                  <View style={styles.like}>
                    <TouchableOpacity activeOpacity={0.8}>
                      <Icon3
                        name="star-outline"
                        size={20}
                        color="#fff"
                        style={{marginLeft: 10}}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontSize: 12,
                        color: '#FFFFFF',
                        marginLeft: 7,
                        marginRight: 7,
                      }}>
                      {footerCompoent.Rating}
                    </Text>
                  </View>
                </View>
              );
            }
          }}
          onRequestClose={() => setIsVisible(false)}
        />

        <Modal transparent={true} visible={Notify}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(4, 4, 4, 0.474)',
            }}>
            <View
              style={{
                width: '80%',
                minHeight: 170,
                borderRadius: 4,
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{fontSize: 20, color: Global.color, fontWeight: 'bold'}}>
                Notification
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: 'grey',
                  width: '70%',
                  textAlign: 'center',
                }}>
                {Notify_Text}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setNotify(false);
                  setNotify_Text(
                    "You Can't Perform this action with your own Business",
                  );
                }}
                style={{
                  width: '50%',
                  height: 40,
                  backgroundColor: Global.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 16, color: '#fff'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={video_Modal}
          onRequestClose={() => setvideo_Modal(false)}>
          <View style={{...styles.nav1}}>
            <Icon3
              onPress={() => {
                setvideo_Modal(false);
              }}
              name="chevron-back-outline"
              size={25}
              style={{
                color: '#FFFFFF',
                marginLeft: 2,
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <VideoPlayer source={{uri: play_me.url}} repeat={true} />
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  footerNav: {
    width: '100%',
    // height: 20,
    paddingLeft: '2%',
    elevation: 5,
    // backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  like: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 6,
  },
  inputDiv: {
    width: '92%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 50,
    elevation: 2,
    borderRadius: 5,
    flexDirection: 'row',
    marginLeft: '4%',
    marginTop: 15,
    // marginTop:scrollValue>200 && scrollValue<180? 50 :0
  },
  videoplay: {
    position: 'absolute',
    top: '50%',
    left: '49%',
    zIndex: 1,
  },
  line: {
    width: '100%',
    // backgroundColor:'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginLeft: '2%',
    fontSize: 15,
  },
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
  showImage1: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 290,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor:'red',
    // marginLeft: 30,
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
    position: 'absolute',
    top: 0,
    zIndex: 1,
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
  timeCard2: {
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
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
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
    marginTop: 10,
    // backgroundColor:'red'
  },
  iconText: {
    fontSize: 11,
    fontWeight: 'bold',
    // marginLeft: 10,
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'sans-serif',
    // width: 100,
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
    height: 150,
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
  nav1: {
    width: '100%',
    height: 60,
    paddingLeft: '3%',
    elevation: 5,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

const mapStateToProps = state => {
  return {
    name1: state.name,
    Relevant_Reveiws: state.Relevant_Reveiws,
    All_Business_Nodes_newOld: state.All_Business_Nodes_newOld,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    Get_relevant_review: (uid, setReview_loading) =>
      dispatch(Get_relevant_review(uid, setReview_loading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessAllDetails);
