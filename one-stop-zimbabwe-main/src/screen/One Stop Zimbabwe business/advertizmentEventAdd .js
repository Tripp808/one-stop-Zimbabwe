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
  TextInput,
  FlatList,
} from 'react-native';
import { get_data, promotion_event, get_event } from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../../assets/Global_Variable';
import allSubcategories from '../../assets/filter';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import More from '../More';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AdvertizmentEvent(Props) {
  // All other States
  let [Title, setTitle] = useState('');
  let [Title_validty, setTitle_validty] = useState('');

  let [ticketUrlLabel1, setticketUrlLabel1] = useState('');
  let [ticketUrlLabel1_validty, setticketUrlLabel1_validty] = useState('');

  let [ticketUrl1, setticketUrl1] = useState('');
  let [ticketUrl1_validty, setticketUrl1_validty] = useState('');


  let [ticketUrlLabel2, setticketUrlLabel2] = useState('');
  let [ticketUrlLabel2_validty, setticketUrlLabel2_validty] = useState('');

  let [ticketUrl2, setticketUrl2] = useState('');
  let [ticketUrl2_validty, setticketUrl2_validty] = useState('');

  // Date Ranges

  // Start Date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  let [start_Date, setStartDate] = useState(undefined);
  let [start_Date_Validity, setStartDate_Validity] = useState(undefined);
  const isFocused = useIsFocused();
  let [loadingS, setLoadingS] = useState(false);
  let [button_show, setbutton_show] = useState(false);

  let [user, setUser] = useState();
  let [loginCheck, setLoginCheck] = useState(undefined);
  let [event_show, setevent_show] = useState([]);


  useEffect(() => {

    async function fetchuser() {

      let user = JSON.parse(await AsyncStorage.getItem('@user_data'));
      setUser(user)

    }
    fetchuser();

    // if(Props.route.params!==undefined && Props.route.params.model){
    //   setBusinessModal(Props.route.params.model)
    // }
  }, [isFocused]);

  useEffect(() => {
    getData();
  });
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));
    // setUser(user)
    if (user != undefined) {

      if (user.Business == true && user.Business != undefined) {

        if (Props.get_event_data == 'fail') {

          setLoadingS(true)
          await Props.get_event(setLoadingS,Props.Relevant_Business_type.uid)
        } else {

          setevent_show(Props.get_event_data)


        }

      } else {
        alert('You have no any register business')
        // Props.navigation.navigate('More');

      }
    } else {
      // setLoginCheck(false);
      Props.navigation.navigate('LoginCheckRestict');
    }

  };



  // console.log("GET ALL EVENTS>>>>>>>", Props.get_event_data);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    setStartDate(date);
  };

  // End Date

  let [End_Date, setEndDate] = useState(undefined);
  let [End_Date_Validity, setEndDate_Validity] = useState(undefined);

  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  var day = 60 * 60 * 24 * 1000;

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
    console.log('open');
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = date => {
    console.warn(
      'A date has been picked: ',
      date.getDate() + '-' + date.getMonth() + 1 + date.getFullYear(),
    );
    setEndDate(date);
    hideDatePicker1();
  };

  let [random, setRandom] = useState(3);

  // Business Select Filter
  let [BusinessModal, setBusinessModal] = useState(false);
  let [BusinessValidation, setBusinessValidation] = useState('');
  let [Filter, setFilter] = useState('');
  let FilterData = single => {
    return single.title.toLowerCase().indexOf(Filter.toLowerCase()) !== -1;
  };
  let allBusiness = event_show.length > 0 ? event_show.filter(FilterData) : []

  let [selectedBusiness, setSelectedBusiness] = useState([]);
  let renderItem = v => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedBusiness.includes(v.item)
            ? Global.color
            : '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log("jjjjjjjjjjjjjj", v.item);
            setTitle(v.item.title)
            setticketUrlLabel1(v.item.ticketUrlLabel1);
            setticketUrl1(v.item.ticketUrl1);
            setticketUrlLabel2(v.item.ticketUrlLabel2);
            setticketUrl2(v.item.ticketUrl2);
            setImage(v.item.url)
            setSelectedBusiness([v.item]);
            setBusinessModal(false);
            setFilter('');
            setBusinessValidation('');
            setRandom(Math.random() * 100);
          }}
          activeOpaBusiness={0.5}
          style={styles.card}>
          <Text
            style={{
              fontSize: 13,
              color: selectedBusiness.includes(v.item) ? '#FFFFFF' : '#414141',

              fontFamily: 'sans-serif-normal',
              fontWeight: 'bold',
              marginLeft: 15,
            }}>
            {v.item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // select PlaceMent
  let [Places, setPlaces] = useState([
    {
      name: 'Homepage',
    }
  ]);

  // AdvertPlace Select Filter
  let [AdvertPlaceModal, setAdvertPlaceModal] = useState(false);
  let [AdvertPlaceValidation, setAdvertPlaceValidation] = useState('');
  let [Filter1, setFilter1] = useState('');
  let FilterData1 = single => {
    return single.name.toLowerCase().indexOf(Filter1.toLowerCase()) !== -1;
  };
  let allAdvertPlace = Places.filter(FilterData1);
  let [selectedAdvertPlace, setSelectedAdvertPlace] = useState([]);
  let renderItem1 = v => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedAdvertPlace.includes(v.item)
            ? Global.color
            : '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedAdvertPlace([v.item]);
            setAdvertPlaceModal(false);
            setFilter1('');
            setAdvertPlaceValidation('');
            setRandom(Math.random() * 100);
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Text
            style={{
              fontSize: 13,
              color: selectedAdvertPlace.includes(v.item) ? '#FFFFFF' : '#414141',

              fontFamily: 'sans-serif-normal',
              fontWeight: 'bold',
              marginLeft: 15,
            }}>
            {v.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Images Section
  let [Images, setImage] = useState(undefined);
  let [Image_Validity, setImage_Validity] = useState('');
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setImage(response.assets[0]);
    });
  };

  let ResetValidity = () => {
    setTitle_validty('');

    setBusinessValidation('');
    setStartDate_Validity('');
    setEndDate_Validity('');
    setImage_Validity('');
    setticketUrl1_validty('');
    setticketUrl2_validty('');
    setticketUrlLabel1_validty('');
    setAdvertPlaceValidation('');
  };

  let ClearFields = () => {
    setTitle('');
    setSelectedBusiness([]);
    setSelectedAdvertPlace([]);
    setStartDate(undefined);
    setEndDate(undefined);
    setImage(undefined);
    setticketUrlLabel1('');
    setticketUrl1('');
    setticketUrlLabel2('');
    setticketUrl2('');
  };
  let Check_validity = async () => {
    ResetValidity();
    if (

      selectedBusiness.length == 0 ||
      start_Date == undefined ||
      End_Date == undefined ||
      Images == undefined ||
      selectedAdvertPlace.length == 0
    ) {


      if (selectedBusiness.length == 0) {
        setBusinessValidation('* Required');
      }

      if (selectedAdvertPlace.length == 0) {
        setAdvertPlaceValidation('* Required');
      }
      if (start_Date == undefined) {
        setStartDate_Validity('* Required');
      }
      if (End_Date == undefined) {
        setEndDate_Validity('* Required');
      }

      return;
    }

    if (start_Date > End_Date) {
      alert("Attention:Start Date Must less then End Date")
      return
    }
    let obj = {

      Montize_Start: start_Date,
      Montize_Finish: End_Date,
      Business_id: Props.Relevant_Business_type.uid,
      user_uid: user.uid,
      Event_Details: selectedBusiness[0],
      unique_Event_ID: selectedBusiness[0].uniqueID

    };

    setLoadingS(true)
    setbutton_show(true)

    await promotion_event(setLoadingS, setbutton_show, obj, Props.Relevant_Business_type.uid)

    ClearFields();
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
        <View style={{ paddingBottom: 100 }}>
          <>
            <StatusBar
              // translucent
              barStyle="dark-content"
              backgroundColor="transparent"
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
                  source={require('../../assets/loadingS.gif')}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            </Modal>
            <View
              style={{
                ...styles.nav,
                backgroundColor: Global.color,
              }}>
              <Icon3
                onPress={() => Props.navigation.goBack()}
                name="close-outline"
                size={30}
                style={{
                  color: '#FFFFFF',
                }}
              />

              <Text style={styles.navHeading}>Advertize Event</Text>

              <TouchableOpacity
                disabled={button_show}
                onPress={() => Check_validity()}
                activeOpaBusiness={0.8}
                style={styles.sendTouch}>
                <Text style={styles.sendNav}>Publish Event</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpaBusiness={0.9}
              onPress={() => setBusinessModal(true)}
              style={styles.inputBox}>
              {selectedBusiness.length > 0 ? (
                <View style={styles.row}>
                  <Text style={styles.BusinessName}>
                    {selectedBusiness[0].title}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    ...styles.BusinessName,
                    color: 'grey',
                  }}>
                  Select Event
                </Text>
              )}

              <Icon3
                name="chevron-down-outline"
                size={20}
                style={{
                  color: 'grey',
                }}
              />
            </TouchableOpacity>
            <Text style={{ ...styles.Validation, color: 'red', marginTop: 8 }}>
              {BusinessValidation}
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setAdvertPlaceModal(true)}
              style={styles.inputBox}>
              {selectedAdvertPlace.length > 0 ? (
                <View style={styles.row}>
                  <Image
                    source={{ uri: FlagsAll[selectedAdvertPlace[0].alpha2] }}
                    style={styles.flag}
                  />

                  <Text style={{
                    ...styles.AdvertPlaceName,
                    color: 'grey'
                  }}>
                    {selectedAdvertPlace[0].name}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    ...styles.AdvertPlaceName,
                    color: 'grey',
                  }}>
                  Select Advert Place
                </Text>
              )}

              <Icon3
                name="chevron-down-outline"
                size={20}
                style={{
                  color: 'grey',
                }}
              />
            </TouchableOpacity>
            <Text style={{ ...styles.Validation, color: 'red' }}>
              {AdvertPlaceValidation}
            </Text>

            <TextInput
              onChangeText={e => setTitle(e)}
              placeholderTextColor={'grey'}
              style={{
                ...styles.input1,
                marginTop: 10,
              }}
              defaultValue={Title}
              value={Title}
              editable={false}
              placeholder="Event Name"></TextInput>

            <Text style={{ ...styles.Validation, color: 'red' }}>
              {Title_validty}
            </Text>

            <TextInput
              onChangeText={e => setticketUrlLabel1(e)}
              placeholderTextColor={'grey'}
              style={{
                ...styles.input1,
              }}
              editable={false}

              value={ticketUrlLabel1}
              placeholder="Add ticket link"></TextInput>
            <Text style={{ ...styles.Validation, color: 'red' }}>
              {ticketUrlLabel1_validty}
            </Text>

            <TextInput
              onChangeText={e => setticketUrl1(e)}
              placeholderTextColor={'grey'}
              style={{
                ...styles.input1,
              }}
              editable={false}

              value={ticketUrl1}
              placeholder="Ticket Url"></TextInput>

            <Text style={{ ...styles.Validation, color: 'red' }}>
              {ticketUrl1_validty}
            </Text>


            <TextInput
              onChangeText={e => setticketUrlLabel2(e)}
              placeholderTextColor={'grey'}
              style={{
                ...styles.input1,
              }}
              editable={false}

              value={ticketUrlLabel2}
              placeholder="Add ticket link"></TextInput>
            <Text style={{ ...styles.Validation, color: 'red' }}>
              {ticketUrlLabel2_validty}
            </Text>

            <TextInput
              onChangeText={e => setticketUrl2(e)}
              placeholderTextColor={'grey'}
              style={{
                ...styles.input1,
              }}
              editable={false}

              defaultValue={ticketUrl2}
              placeholder="Ticket Url"></TextInput>

            <Text style={{ ...styles.Validation, color: 'red' }}>
              {ticketUrl2_validty}
            </Text>



            <Text style={{ ...styles.formHeading, fontSize: 12 }}>
              Select Advertize Date Range:
            </Text>

            <TouchableOpacity
              onPress={() => showDatePicker()}
              style={{
                ...styles.input1,
              }}>
              {start_Date !== undefined ? (
                <Text style={styles.title}>
                  {start_Date.getDate() +
                    '-' +
                    JSON.stringify(JSON.parse(start_Date.getMonth()) + 1) +
                    '-' +
                    start_Date.getFullYear()}
                </Text>
              ) : (
                <Text style={styles.title}>Select Start Date</Text>
              )}
            </TouchableOpacity>

            <Text style={{ ...styles.Validation, color: 'red' }}>
              {start_Date_Validity}
            </Text>

            <TouchableOpacity
              onPress={() => {
                showDatePicker1();
              }}
              style={{
                ...styles.input1,
              }}>
              {End_Date !== undefined ? (
                <Text style={styles.title}>
                  {End_Date.getDate() +
                    '-' +
                    JSON.stringify(JSON.parse(End_Date.getMonth()) + 1) +
                    '-' +
                    End_Date.getFullYear()}
                </Text>
              ) : (
                <Text style={styles.title}>Select End Date</Text>
              )}
            </TouchableOpacity>

            <Text style={{ ...styles.Validation, color: 'red' }}>
              {End_Date_Validity}
            </Text>
            <View style={styles.mainBox}>
              {selectedBusiness.length != 0 ? (
                <TouchableOpacity
                  // onPress={() => chooseFile('photo')}
                  style={{ width: '100%' }}>
                  <Image
                    style={{
                      width: '96%',
                      marginLeft: '2%',
                      height: 200,
                      resizeMode: 'contain',
                    }}
                    source={{ uri: selectedBusiness[0].url }}
                  />
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
            <Text style={{ ...styles.Validation, color: 'red' }}>

              {Image_Validity}

            </Text>
            {/* 
          <TouchableOpacity
            onPress={() => Check_validity()}
            activeOpaBusiness={0.7}
            style={{
              ...styles.buttonHalfTwo1,
              opaBusiness: 1,
            }}>
            <Text
              style={{fontSize: 18, color: '#FFFFFF', fontFamily: 'notoserif'}}>
              Advertize Events
            </Text>
          </TouchableOpacity> */}

            <Modal visible={BusinessModal}>
              <View style={styles.nav1}>
                <Icon3
                  onPress={() => {
                    setBusinessModal(false);
                    setFilter('');
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
                  Choose Event
                </Text>
              </View>

              <TextInput
                placeholderTextColor={'grey'}
                onChangeText={e => setFilter(e)}
                style={{
                  ...styles.input,
                }}
                placeholder="Search Event Here"></TextInput>

              <FlatList
                initialNumToRender={20}
                data={allBusiness}
                renderItem={renderItem}></FlatList>
            </Modal>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={new Date(new Date().getTime() )}

              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="date"
              minimumDate={new Date(new Date().getTime() + day)}

              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
          </>
        </View>

        <Modal visible={AdvertPlaceModal}>
          <View style={styles.nav1}>
            <Icon3
              onPress={() => {
                setAdvertPlaceModal(false);
                setFilter1('');
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
              Choose AdvertPlace
            </Text>
          </View>

          <TextInput
            placeholderTextColor={'grey'}
            onChangeText={e => setFilter1(e)}
            style={{
              ...styles.input,
            }}
            placeholder="Search Advert Place Here"></TextInput>

          <FlatList
            initialNumToRender={80}
            data={allAdvertPlace}
            renderItem={renderItem1}></FlatList>
        </Modal>



      </ScrollView>
      {selectedBusiness.length > 0 ?
        <TouchableOpacity onPress={() => Props.navigation.navigate('EditEventForm', { myBuiness_uid: Props.Relevant_Business_type.uid ,Event_Details:selectedBusiness[0]})} style={styles.addEvent}>
          <Icon3

            name="pencil-outline"
            size={30}
            style={{
              color: '#FFFFFF',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity> :
        <></>}


    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    // backgroundColor:'red',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  navHeading: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  sendNav: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sendTouch: {
    position: 'absolute',
    right: 10,
    top: 20,
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
    borderRadius: 80
  },
  input1: {
    width: '96%',
    marginLeft: '2%',

    marginBottom: 10,
    height: 50,

    marginTop: 10,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: 'grey',
    borderBottomColor: Global.color,
    borderBottomWidth: 1,
    padding: 10,
  },
  Validation: {
    width: '96%',
    textAlign: 'right',
    fontSize: 12,
  },
  input: {
    width: '98%',
    marginLeft: '1%',
    borderWidth: 0.3,
    borderColor: 'grey',
    marginBottom: 10,
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: 'grey',
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
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '5%',
  },
  input: {
    width: '98%',
    marginLeft: '1%',
    borderWidth: 0.3,
    borderColor: 'grey',
    marginBottom: 10,
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
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
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  BusinessName: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    fontWeight: '400',
  },
  inputBox: {
    width: '96%',

    minHeight: 60,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
    borderBottomColor: Global.color,
    borderBottomWidth: 1,
    marginLeft: '2%',
  },
  formHeading: {
    fontSize: 16,
    color: '#363636',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },
  mainBox: {
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },

  center: {
    display: 'flex',
    alignItems: 'center',
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
    marginTop: 20,
    fontFamily: 'sans-serif-thin',
    marginLeft: '5%',
    marginBottom: 10,
    position: 'absolute',
    bottom: 60
  },
  buttonFl: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
  },
});

const mapStateToProps = state => {
  return {
    name1: state.name,
    get_event_data: state.get_event,
    Relevant_Business_type: state.Relevant_Business_type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
    get_event: (setLoadingS, user) => dispatch(get_event(setLoadingS, user)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertizmentEvent);
