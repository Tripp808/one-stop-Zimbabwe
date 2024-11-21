import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {
  get_data,
  get_promotion_event,
  Refrel_Event,
  get_More_info,
  Refrel_Business,
  check_user,
} from '../store/acion/index';

import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Global, arr} from '../assets/Global_Variable';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';
import obj from '../assets/SubCatagories';
import Categories from './catagores_SubCatagories';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import Carousel from 'react-native-reanimated-carousel';
const width = Dimensions.get('window').width;
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 20;
function Home(Props) {
  const scrollViewRef = useRef();

  // return
  let [loadingS, setLoadingS] = useState(false);
  let [promotion_show_e, setpromotion_show_e] = useState([]);
  let [subCatagorieModal, setSubCatagoriesModal] = useState(false);
  let [filterText, setFilterText] = useState('');
  let total_concat = Props.All_Business_Nodes_newOld.concat(
    Props.Home_Monitize,
  ).concat(Props.Categories_Monitize);
  let final_me = total_concat.filter(
    (item, pos) =>
      total_concat.indexOf(item) === pos &&
      item.Tag_line.toLowerCase().indexOf(filterText.toLowerCase()) !== -1,
  );
  final_me.sort(
    (x, y) => Number(y.Categories_Monitize) - Number(x.Categories_Monitize),
  );

  let [Monitize_place, set_Monitize_place] = useState('home');
  let All_Business =
    filterText == 'All Businesses'
      ? Props.All_Business_Nodes_newOld
      : Monitize_place == 'home'
      ? Props.Home_Monitize
      : final_me;

  let [Modal1, setModal] = useState(false);

  let [subCatagories, setSubCatagories] = useState([]);
  let selectSubCatagories = e => {
    setSubCatagories([]);
    switch (e) {
      case 'Active Life':
        setSubCatagories(obj.activeLife);
        setModal(true);
        break;
      case 'Art & Entertainment':
        setSubCatagories(obj.ArtsEntertainment);
        setModal(true);
        break;
      case 'Motor Vehicle Services':
        setSubCatagories(obj.MotorVehicleServices);
        setModal(true);
        break;
      case 'Beauty & Spas':
        setSubCatagories(obj.BeautySpas);
        setModal(true);
        break;
      case 'Education':
        setSubCatagories(obj.Education);
        setModal(true);
        break;
      case 'Event Management Services':
        setSubCatagories(obj.EventManagementServices);
        setModal(true);
        break;
      case 'Financial & Insurance Services':
        setSubCatagories(obj.FinancialInsuranceServices);
        setModal(true);
        break;
      case 'Food':
        setSubCatagories(obj.Food);
        setModal(true);
        break;
      case 'Government & Public Service':
        setSubCatagories(obj.GovernmentPublicServices);
        setModal(true);
        break;
      case 'Health & Medical Services':
        setSubCatagories(obj.HealthMedicalService);
        setModal(true);
        break;
      case 'Home Commercial Services':
        setSubCatagories(obj.HomeCommercialServices);
        setModal(true);
        break;
      case 'Hotel & Lodges':
        setSubCatagories(obj.HotelsandLodges);
        setModal(true);
        break;
      case 'Local Services':
        setSubCatagories(obj.LocalServices);
        setModal(true);
        break;
      case 'Mass Media':
        setSubCatagories(obj.MassMedia);
        setModal(true);
        break;
      case 'Pets':
        setSubCatagories(obj.Pets);
        setModal(true);
        break;
      case 'Professional Services':
        setSubCatagories(obj.ProfessionalServices);
        setModal(true);
        break;
      case 'Religious Institutions':
        setSubCatagories(obj.ReligiousInstitude);
        setModal(true);
        break;
      case 'Shopping':
        setSubCatagories(obj.Shopping);
        setModal(true);
        break;
      case 'Tourism Services':
        setSubCatagories(obj.TourismService);
        setModal(true);
        break;

      default:
        break;
    }
  };

  const onPressTouch = v => {
    scrollViewRef.current?.scrollTo({
      y: v,
      animated: true,
    });
  };
  let setFilterLoading = (v, i) => {
    onPressTouch(1000);
    setModal(false);
    setSubCatagoriesModal(false);
    setLoadingS(true);
    setTimeout(() => {
      setFilterText(v);
      set_Monitize_place(i == undefined ? 'Catagories' : i);
      setLoadingS(false);
    }, 300);
  };

  useEffect(() => {
    Props.get_data(setLoadingS);
    Props.check_user();
    Props.get_More_info();
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });
  }, []);
  useEffect(() => {
    const listen_DynamicLink = dynamicLinks().onLink(handleDynamicLink);
    return () => listen_DynamicLink();
  }, []);

  let handleDynamicLink = link => {
    if (link.url.indexOf('Events/^#@') > 0) {
      setLoadingS(true);
      Props.navigation.navigate('Main_tab');
      let uid = link.url.slice(
        link.url.indexOf('Events/^#@') + 10,
        link.url.length,
      );
      Props.Refrel_Event(setLoadingS, uid, Props);
      console.log('FINAL JKD', uid);
      // ...navigate to your offers screen
    }
    if (link.url.indexOf('Business/^#@') > 0) {
      setLoadingS(true);
      Props.navigation.navigate('Main_tab');
      let uid = link.url.slice(
        link.url.indexOf('Business/^#@') + 12,
        link.url.length,
      );
      Props.Refrel_Business(setLoadingS, uid, Props);
      console.log('FINAL JKD', uid);
      // ...navigate to your offers screen
    }
  };
  const get_event_A = async () => {
    if (Props.get_promotion_event_data == 'fail') {
      setLoadingS(true);
      Props.get_promotion_event(setLoadingS);
    } else {
      setpromotion_show_e(Props.get_promotion_event_data);
    }
  };
  // console.log(Props.get_promotion_event_data);
  useEffect(() => {
    get_event_A();
  });
  // console.log('Home Data', Props.Business_Nodes);

  // Animation sticky
  let [refreshing, setRefreshing] = useState(false);
  let [Scroll, setScrollY] = useState(
    new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
  );
  // let [scrollValue,setScrollValue]=useState(0)

  const scrollY = Animated.add(
    Scroll,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
  );
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE - 10],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  let newBusinessCards = vi => {
    let v = vi.item;
    let check_in_count = v.CheckIns.filter(e => e.time > new Date().getTime());

    return (
      <TouchableOpacity
        onPress={() => {
          Props.navigation.navigate('BusinessAllDetails', {
            Details: v.uid,
            from: 'other',
          });
        }}
        activeOpacity={0.7}
        style={styles.newBusinessCards}>
        {v.Images.length > 0 ? (
          <Image
            source={{uri: v.Images[0]}}
            style={{width: 100, height: 100, borderRadius: 10}}
          />
        ) : (
          <Image
            source={{
              uri: 'https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193060544?k=20&m=1193060544&s=612x612&w=0&h=MI8y2q1HsY4TEAZD3tNCJN3bmc39N3pnFKC2KKNDUmE=',
            }}
            style={{width: 100, height: 100, borderRadius: 10}}
          />
        )}

        <View style={{width: '80%'}}>
          <Text
            style={{
              fontSize: 12,
              color: 'green',
              fontWeight: 'bold',
              width: '80%',
              marginLeft: 10,
              textAlign: 'left',
              fontFamily: 'sans-serif',
            }}
            numberOfLines={1}>
            New
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: '#000',
              fontWeight: 'bold',
              width: '80%',
              marginLeft: 10,
              textAlign: 'left',
              fontFamily: 'sans-serif',
            }}
            numberOfLines={1}>
            {v.name}
          </Text>

          <Text
            style={{
              fontSize: 10,
              color: 'grey',
              fontWeight: 'bold',
              width: '90%',
              marginLeft: 10,
              textAlign: 'left',
              fontFamily: 'sans-serif',
            }}
            numberOfLines={3}>
            {v.categories.map((vi, i) => {
              return (
                <>
                  {vi.subCatagorie}
                  {v.categories.length - 1 == i ? '' : ','}{' '}
                </>
              );
            })}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: Global.color,
              fontWeight: 'bold',
              width: '90%',
              textAlign: 'left',
              fontFamily: 'sans-serif',
              marginLeft: 10,
            }}
            numberOfLines={1}>
            <Icon3 name="man-outline" size={15} color={Global.color} />
            {v.CheckIns !== undefined ? check_in_count.length : 0} || {v.city}
          </Text>
          {v.claimed !== undefined && v.claimed ? (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 50,
                height: 15,
                backgroundColor: '#2B91F7',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 5,
              }}>
              <Icon2
                name="check-circle"
                style={{}}
                size={8}
                color={'#fff'}></Icon2>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 8,
                  fontWeight: 'bold',
                  marginLeft: -9,
                }}>
                Verified
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 58,
                height: 15,
                backgroundColor: '#D3D3D3',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 5,
              }}>
              <Icon2
                name="check-circle"
                style={{}}
                size={8}
                color={'#5A5A5A'}></Icon2>
              <Text
                style={{
                  color: '#5A5A5A',
                  fontSize: 8,
                  fontWeight: 'bold',
                  marginLeft: -6,
                }}>
                Unverified
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  let promotionEvents = vi => {
    let v = vi.item;
    return (
      <TouchableOpacity
        // key={i}
        activeOpacity={0.8}
        onPress={() =>
          Props.navigation.navigate('EventDetails', {detail: v.Event_Details})
        }
        style={styles.eventsCard}>
        <Image
          source={{uri: v.Event_Details.url}}
          style={{width: 130, height: 148, borderRadius: 5, marginLeft: 20}}
        />

        <View style={{width: 200}}>
          <Text
            style={{
              ...styles.eventText,
            }}
            numberOfLines={1}>
            {v.Event_Details.title}
          </Text>
          <Text
            style={{
              ...styles.event_Datils,
              color: Global.linkBlueColor,
              fontSize: 10,
            }}
            numberOfLines={1}>
            {v.Event_Details.start_Date} - {v.Event_Details.End_Date}
          </Text>
          <Text
            style={{
              ...styles.event_Datils,
            }}
            numberOfLines={1}>
            {v.Event_Details.Event_Type}
          </Text>
          <Text
            style={{
              ...styles.event_Datils,
              color: 'grey',
              fontSize: 11,
            }}
            numberOfLines={1}>
            <Icon3 name="man-outline" size={11} color={'#000'} />
            {v.Event_Details.going.length}{' '}
            <Icon3 name="snow-outline" size={11} color={'#000'} />
            {v.Event_Details.intrested.length}
          </Text>

          <Text
            style={{
              ...styles.eventText,
              fontSize: 10,
            }}
            numberOfLines={3}>
            Organized By : {v.Event_Details.organize_By.Business}
          </Text>

          <Text
            style={{
              ...styles.eventText,
              fontSize: 10,
            }}
            numberOfLines={3}>
            Location : {v.Event_Details.Address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.fill}>
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
      <Animated.ScrollView
        ref={scrollViewRef}
        style={{
          ...styles.fill,
          marginTop: 20,
          marginBottom: 65,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: Scroll}}}],
          // {
          //   listener: (event)=>{
          //     setScrollValue(event.nativeEvent.contentOffset.y)
          //       //do something here like Keyboard.dismiss() or this.props.onScroll(event)
          //   }},
          {useNativeDriver: true},
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              Props.get_data(setLoadingS, setRefreshing);
              Props.check_user();
              Props.get_promotion_event(setLoadingS);
            }}
            // Android offset for RefreshControl
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
        // iOS offset for RefreshControl
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}>
        <View style={{width: '100%', marginTop: 280}}>
          <View
            style={{height: 250, backgroundColor: '#FFFFFF', paddingTop: 50}}>
            <View style={styles.iconDiv}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconCard}
                onPress={() => setFilterLoading('Delivery')}>
                <Image
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                  source={require('../assets/fsd.png')}
                />
                <Text style={{...styles.iconText, marginTop: 0}}>Delivery</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconCard}
                onPress={() => setFilterLoading("Restaurants")}
              >
                <Image
                  style={{ width: 45, height: 45, resizeMode: "contain" }}
                  source={require("../assets/cut.png")}
                />
                <Text style={styles.iconText}>Restaurants</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconCard}
                onPress={() => setFilterLoading('Food')}>
                <Image
                  style={{
                    width: 50,
                    height: 45,
                    resizeMode: 'contain',
                    marginTop: 5,
                    marginLeft: 8,
                  }}
                  source={require('../assets/bread.png')}
                />
                <Text style={{...styles.iconText, marginTop: 0}}>Food</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconCard}
                onPress={() => setFilterLoading('BeautySpas')}>
                <Image
                  style={{width: 40, height: 40, resizeMode: 'contain'}}
                  source={require('../assets/hair.png')}
                />
                <Text style={styles.iconText}>Hairdresser</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconCard}
                onPress={() => setFilterLoading("plumber")}
              >
                <Image
                  style={{
                    width: 50,
                    height: 45,
                    resizeMode: "contain",
                    marginTop: 5,
                    marginLeft: 8,
                  }}
                  source={require("../assets/technician.png")}
                />
                <Text style={{ ...styles.iconText, marginTop: 0 }}>
                Plumber
                </Text>
              </TouchableOpacity> */}
            </View>

            <View style={{...styles.iconDiv, marginTop: 15}}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconCard}
                onPress={() => setFilterLoading('outdoor')}>
                <Image
                  style={{
                    width: 40,
                    height: 45,
                    resizeMode: 'contain',
                    marginTop: 5,
                    marginLeft: 8,
                  }}
                  source={require('../assets/fastfood.png')}
                />
                <Text style={{...styles.iconText, marginTop: 0}}>Outdoor</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconCard}
                onPress={() => setFilterLoading('hotel')}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    marginTop: 15,
                  }}
                  source={require('../assets/hotel.png')}
                />
                <Text style={{...styles.iconText, marginTop: 5}}>Hotel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSubCatagoriesModal(true)}
                activeOpacity={0.6}
                style={styles.iconCard}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    marginTop: 15,
                  }}
                  source={require('../assets/application.png')}
                />
                <Text style={{...styles.iconText, marginTop: 5, marginLeft: 0}}>
                  More
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.allCardDiv}>
            <Text
              style={{
                fontSize: 19,
                color: '#000',
                fontWeight: 'bold',
                width: '92%',
                marginLeft: '4%',
                textAlign: 'left',
                fontFamily: 'sans-serif',
                marginTop: 20,
                marginBottom: 10,
              }}>
              Events
            </Text>

            <Carousel
              loop
              width={width}
              height={200}
              autoPlay={true}
              data={promotion_show_e}
              scrollAnimationDuration={5000}
              // onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={vi => promotionEvents(vi)}
            />
          </View>

          {Props.Business_New_Data.length > 0 ? (
            <View style={styles.allCardDiv}>
              <Text
                style={{
                  fontSize: 19,
                  color: '#000',
                  fontWeight: 'bold',
                  width: '92%',
                  marginLeft: '4%',
                  textAlign: 'left',
                  fontFamily: 'sans-serif',
                  marginTop: 20,
                }}>
                New Business
              </Text>

              <Carousel
                loop
                width={width}
                height={180}
                autoPlay={true}
                data={Props.Business_New_Data}
                scrollAnimationDuration={4000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={vi => newBusinessCards(vi)}
              />
            </View>
          ) : (
            ''
          )}

          <View style={{...styles.allCardDiv, minHeight: 800}}>
            <View style={styles.topScrollFilterBar}>
              <Text
                style={{
                  fontSize: 19,
                  color: '#000',
                  fontWeight: 'bold',

                  textAlign: 'left',
                  fontFamily: 'sans-serif',
                  marginTop: 20,
                }}>
                {filterText == '' ? 'Sponsored' : 'Filtered Results'}
                {filterText !== '' ? (
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#000',
                      fontWeight: 'bold',

                      fontFamily: 'sans-serif',
                      marginTop: 20,
                    }}>
                    {' > '}
                    {filterText}
                  </Text>
                ) : (
                  <></>
                )}
              </Text>

              {filterText !== '' ? (
                <TouchableOpacity
                  activeOpacity={7}
                  onPress={() => {
                    setFilterLoading('', 'home');
                    onPressTouch(0);
                  }}
                  style={{height: 30}}>
                  <View
                    style={{
                      ...styles.sortButton,
                      borderWidth: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                    activeOpacity={0.8}>
                    <Image
                      style={{width: 20, height: 20, marginRight: 5}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/6159/6159296.png',
                      }}
                    />
                    <Text
                      style={{
                        ...styles.sortText,
                        textDecorationColor: '#000',
                        textDecorationLine: 'underline',
                      }}>
                      clear filter
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
            {All_Business.length > 0 ? (
              <>
                {All_Business.map((v, i) => {
                  let check_in_count = v.CheckIns.filter(
                    e => e.time > new Date().getTime(),
                  );
                  return (
                    // <TouchableOpacity onPress={()=>Math.random()*1000>500?Props.navigation.navigate('BusinessDetails'):Props.navigation.navigate('ImageDetailsMain')} key={i} activeOpacity={0.7} style={styles.card}>
                    <TouchableOpacity
                      onPress={() => {
                        Props.navigation.navigate('BusinessAllDetails', {
                          Details: v.uid,
                          from: 'other',
                        });
                      }}
                      key={i}
                      activeOpacity={0.7}
                      style={{
                        ...styles.card,
                        marginBottom: i == All_Business - 1 ? 90 : 0,
                      }}>
                      <View style={styles.navCard}>
                        <Image
                          source={{uri: v.Business_Dp}}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            resizeMode: 'contain',
                          }}
                        />

                        <View style={{width: '80%'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontWeight: 'bold',
                              width: '60%',
                              marginLeft: 10,
                              textAlign: 'left',
                              fontFamily: 'sans-serif',
                            }}
                            numberOfLines={1}>
                            {v.name}.
                          </Text>
                          {v.Categories_Monitize &&
                          Monitize_place !== 'home' &&
                          filterText !== 'All Businesses' ? (
                            <TouchableOpacity
                              activeOpacity={1}
                              style={{
                                width: 75,
                                height: 20,
                                borderColor: Global.color,
                                borderWidth: 1,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                position: 'absolute',
                                right: 0,
                                bottom: -5,
                              }}>
                              <Icon2
                                name="information-outline"
                                size={13}
                                color={Global.color}></Icon2>
                              <Text
                                style={{
                                  color: Global.color,
                                  fontSize: 10,
                                  fontWeight: 'bold',
                                  marginLeft: -5,
                                }}>
                                Sponsored
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            ''
                          )}
                          {v.claimed !== undefined && v.claimed ? (
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
                                right: 0,
                                top:
                                  v.Categories_Monitize &&
                                  Monitize_place !== 'home'
                                    ? 0
                                    : 10,
                              }}>
                              <Icon2
                                name="check-circle"
                                style={{}}
                                size={10}
                                color={'#fff'}></Icon2>
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
                                right: 0,
                                top:
                                  v.Categories_Monitize &&
                                  Monitize_place !== 'home'
                                    ? 0
                                    : 10,
                              }}>
                              <Icon2
                                name="check-circle"
                                style={{}}
                                size={10}
                                color={'#5A5A5A'}></Icon2>
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
                              fontSize: 13,
                              color: '#000',
                              fontWeight: '400',
                              width: '80%',
                              textAlign: 'left',
                              fontFamily: 'sans-serif',
                              marginLeft: 10,
                            }}
                            numberOfLines={1}>
                            {v.status}
                          </Text>
                        </View>
                      </View>

                      {v.Images.length > 0 ? (
                        <Image
                          source={{
                            uri:
                              Monitize_place == 'home'
                                ? v.Home_Monitize_image !== '' &&
                                  v.Home_Monitize_image !== undefined
                                  ? v.Home_Monitize_image
                                  : v.Images[0]
                                : v.Categories_Monitize_image !== '' &&
                                  v.Categories_Monitize_image !== undefined
                                ? v.Categories_Monitize_image
                                : v.Images[0],
                          }}
                          style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                          }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: 'https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193060544?k=20&m=1193060544&s=612x612&w=0&h=MI8y2q1HsY4TEAZD3tNCJN3bmc39N3pnFKC2KKNDUmE=',
                          }}
                          style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                          }}
                        />
                      )}

                      <View style={styles.navBottom}>
                        {v.Received_Reviews_no > 0 ? (
                          <Text
                            style={{
                              fontSize: 13,
                              color: Global.color,
                              fontWeight: 'bold',
                              width: '100%',
                              textAlign: 'left',
                              fontFamily: 'sans-serif',
                            }}
                            numberOfLines={1}>
                            <Icon4 name="star" color={Global.color} size={12} />{' '}
                            {Math.floor(
                              (v.OverAll_Rating[0] * 1 +
                                v.OverAll_Rating[1] * 2 +
                                v.OverAll_Rating[2] * 3 +
                                v.OverAll_Rating[3] * 4 +
                                v.OverAll_Rating[4] * 5) /
                                v.Received_Reviews_no,
                            )}
                            {''}({v.Received_Reviews_no})
                            <Icon3
                              name="man-outline"
                              size={15}
                              color={Global.color}
                            />
                            {v.CheckIns !== undefined
                              ? check_in_count.length
                              : 0}{' '}
                            || {v.city}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 13,
                              color: Global.color,
                              fontWeight: 'bold',
                              width: '100%',
                              textAlign: 'left',
                              fontFamily: 'sans-serif',
                            }}
                            numberOfLines={1}>
                            No Reviews ||
                            <Icon3
                              name="man-outline"
                              size={15}
                              color={Global.color}
                            />
                            {v.CheckIns !== undefined
                              ? check_in_count.length
                              : 0}{' '}
                            || {v.city}
                          </Text>
                        )}

                        <Text
                          style={{
                            fontSize: 11,
                            color: 'grey',
                            fontWeight: '400',
                            width: '100%',
                            textAlign: 'left',
                            fontFamily: 'sans-serif',
                            // marginTop: 6,
                          }}
                          numberOfLines={3}>
                          {v.categories.map((vi, i) => {
                            return (
                              <>
                                {vi.subCatagorie}
                                {v.categories.length - 1 == i ? '' : ','}{' '}
                              </>
                            );
                          })}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#000',
                    fontWeight: 'bold',
                    width: '92%',
                    marginLeft: '4%',
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                    marginBottom: 40,
                    marginTop: 40,
                  }}>
                  No Data Found
                </Text>
              </>
            )}
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslate}],
            },
          ]}
          source={require('../assets/back.png')}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [{translateY: headerTranslate}],
          },
        ]}>
        <View style={styles.topDiv}>
          <Text style={{fontSize: 30, color: '#FFFFFF', fontWeight: 'bold'}}>
            Find open {'\n'}restaurants near you.
          </Text>

          <TouchableOpacity
            onPress={() => Props.navigation.navigate('Search1')}
            activeOpacity={0.7}
            style={styles.button}>
            <Icon
              name="search-outline"
              style={{marginLeft: 15}}
              size={20}
              color="#fff"></Icon>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 10,
                color: '#FFFFFF',
              }}>
              Outdoor dining
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            ...styles.line,
            // backgroundColor:scrollValue>220?'red':'transparent'
          }}>
          <TouchableOpacity
            onPress={() => Props.navigation.navigate('Search1')}
            activeOpacity={1}
            style={{...styles.inputDiv}}>
            <Icon
              name="search-outline"
              style={{marginLeft: 15}}
              size={20}
              color="#000"></Icon>
            <View style={styles.input}>
              <Text
                numberOfLines={1}
                style={{fontFamily: 'sans-serif', color: '#000'}}>
                Search businesses, categories etc...
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Modal
        visible={subCatagorieModal}
        transparent={false}
        style={{
          flex: 1,
          width: '100%',
          margin: 0,
          backgroundColor: '#FFFFFF',
        }}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.nav}>
            <Icon3
              onPress={() => setSubCatagoriesModal(false)}
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
              All Categories
            </Text>
          </View>

          {/* <Text
          style={{
            width: '100%',
            fontSize: 16,
            color: '#414141',

            fontFamily: 'sans-serif-normal',
            paddingTop: 20,
            paddingBottom: 10,
            marginLeft: '5%',
            fontWeight: 'bold',
          }}>
          Popular Catagories
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkCatagories}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.CardCatagories}>
            <Icon3
              name="flame-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Hot New Business
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkCatagories}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.CardCatagories}>
            <Icon3
              name="bicycle-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Delivery
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkCatagories}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.CardCatagories}>
            <Icon3
              name="shield-checkmark-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Check-In-offer
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkCatagories}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.CardCatagories}>
            <Icon3
              name="fast-food-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Resturant
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkCatagories}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.CardCatagories}>
            <Icon3
              name="wine-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Bars
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkCatagories}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.CardCatagories}>
            <Icon3
              name="snow-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Everything
            </Text>
          </TouchableOpacity>
        </TouchableOpacity> */}

          <Text
            style={{
              width: '100%',
              fontSize: 16,
              color: '#414141',

              fontFamily: 'sans-serif-normal',
              paddingTop: 20,
              paddingBottom: 10,
              marginLeft: '5%',
              fontWeight: 'bold',
            }}>
            All Categories
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              setFilterLoading('All Businesses');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="grid-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                All Businesses
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Active Life');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="flash-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Active Life
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Art & Entertainment');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="musical-notes-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Art & Entertainment
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Motor Vehicle Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="car-sport-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Motor Vehicle Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              setFilterLoading('bars');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="wine-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Bars
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Beauty & Spas');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="cut-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Beauty & Spas
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Education');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="book-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Education
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Event Management Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="calendar-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Event Management Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Financial & Insurance Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="cash-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Financial & Insurance Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Food');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="fast-food-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Food
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories, marginBottom: 0}}
            onPress={() => {
              selectSubCatagories('Government & Public Service');
            }}>
            <View style={styles.CardCatagories}>
              <Icon3
                name="football-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Government & Public Service
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Health & Medical Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="medkit-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Health & Medical Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Home Commercial Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="home-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Home Commercial Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Hotel & Lodges');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="business-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Hotel & Lodges
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Local Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="file-tray-full-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Local Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Mass Media');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="desktop-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Mass Media
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Pets');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="paw-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Pets
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Professional Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="earth-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Professional Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Religious Institutions');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="ribbon-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Religious Institutions
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Shopping');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="cart-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Shopping
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.linkCatagories}}
            onPress={() => {
              selectSubCatagories('Tourism Services');
            }}>
            <View activeOpacity={0.7} style={styles.CardCatagories}>
              <Icon3
                name="happy-outline"
                size={20}
                style={{
                  color: '#000',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Tourism Services
              </Text>
            </View>
            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: '#000',
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <Modal
        visible={Modal1}
        transparent={false}
        style={{
          flex: 1,
          width: '100%',
          margin: 0,
          backgroundColor: '#FFFFFF',
        }}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />

        <ScrollView style={{flex: 1}}>
          <View style={styles.nav}>
            <Icon3
              onPress={() => setModal(false)}
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
              Sub-categories
            </Text>
          </View>

          {subCatagories.map((v, i) => {
            // console.log(v);
            return (
              <View key={i} style={styles.linkCatagories}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.CardCatagories}
                  onPress={() => {
                    setFilterLoading(v);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#414141',

                      fontFamily: 'sans-serif-normal',
                      marginLeft: 10,
                      // fontWeight:'bold'
                    }}>
                    {v}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {/* <View style={styles.linkCatagories}>
            <TouchableOpacity activeOpacity={0.7} style={styles.CardCatagories}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Check-In-offer
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  event_Datils: {
    fontSize: 12,
    color: Global.color,
    width: '80%',
    textAlign: 'left',
    fontFamily: 'sans-serif',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    // backgroundColor: 'red',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 290,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topDiv: {
    height: 200,
    // backgroundColor:'red',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '92%',
    flexDirection: 'column',
    marginLeft: '4%',
  },
  button: {
    width: 180,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
  },
  inputDiv: {
    width: '92%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    height: 50,
    elevation: 9,
    borderRadius: 5,
    flexDirection: 'row',
    // marginTop:scrollValue>200 && scrollValue<180? 50 :0
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
  iconDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconCard: {
    width: '23%',
    //  backgroundColor:'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  iconText: {
    fontSize: 12,
    // fontWeight: 'bold',
    marginLeft: 10,
    color: 'grey',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'sans-serif',
  },
  allCardDiv: {
    width: '100%',
    display: 'flex',
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '92%',
    // marginLeft:'4%',

    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    // marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  navCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    height: 80,
  },
  navBottom: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    height: 80,
  },
  eventsCard: {
    width: 330,
    height: 170,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },

  newBusinessCards: {
    width: 340,
    height: 140,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingLeft: 30,
  },
  nav: {
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
  linkCatagories: {
    width: '100%',
    // paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.184)',
    paddingRight: '5%',
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  CardCatagories: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '5%',
  },
  eventText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    width: '80%',
    marginLeft: 10,
    textAlign: 'left',
    fontFamily: 'sans-serif',
  },
  topScrollFilterBar: {
    width: '92%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginLeft: '2.5%',
  },
  sortButton: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    name1: state.name,
    Business_Nodes: state.Business_Nodes,
    get_promotion_event_data: state.promotion_event,
    Business_New_Data: state.Business_New,
    All_Business_Nodes_newOld: state.All_Business_Nodes_newOld,
    Home_Monitize: state.Home_Monitize,
    Categories_Monitize: state.Categories_Monitize,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: (setLoadingS, setRefreshing) =>
      dispatch(get_data(setLoadingS, setRefreshing)),
    get_promotion_event: setLoadingS =>
      dispatch(get_promotion_event(setLoadingS)),
    get_More_info: () => dispatch(get_More_info()),
    Refrel_Event: (setLoadingS, uid, Props) =>
      dispatch(Refrel_Event(setLoadingS, uid, Props)),
    Refrel_Business: (setLoadingS, uid, Props) =>
      dispatch(Refrel_Business(setLoadingS, uid, Props)),
    check_user: () => dispatch(check_user()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
