import React, { useState, useEffect, useRef } from 'react';
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
import { Update_Event } from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../../assets/Global_Variable';
import Geocoder from 'react-native-geocoder';
import Cities from '../../assets/cities';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import More from '../More';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from "react-native-dropdown-picker";



function EditEventForm(Props) {
  // All other States
  let [Title, setTitle] = useState('');
  let [Title_validty, setTitle_validty] = useState('');

  let [EentTheme, setEentTheme] = useState('');
  let [EentTheme_validty, setEentTheme_validty] = useState('');

  let [MoreInfo, setMoreInfo] = useState('');
  let [MoreInfo_validty, setMoreInfo_validty] = useState('');

  let [Address, setAddress] = useState('');
  let [Address_modal, setAddress_modal] = useState('');
  let [Business_Street_Hs, setBusiness_Street_Hs] = useState("");
  let [Business_city, setBusiness_city] = useState("");
  let [Address_validty, setAddress_validty] = useState('');
  const [region, setRegion] = useState({
    latitude: -17.824858
    , longitude: 31.053028,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState({
    latitude: -17.824858, longitude: 31.053028,

  })
  let [ticketUrlLabel1, setticketUrlLabel1] = useState('');
  let [ticketUrlLabel1_validty, setticketUrlLabel1_validty] = useState('');

  let [ticketUrl1, setticketUrl1] = useState('');
  let [ticketUrl1_validty, setticketUrl1_validty] = useState('');

  let [ticketUrl2, setticketUrl2] = useState('');
  let [ticketUrl2_validty, setticketUrl2_validty] = useState('');

  let [ticketUrlLabel2, setticketUrlLabel2] = useState('');
  let [ticketUrlLabel2_validty, setticketUrlLabel2_validty] = useState('');
  let [Gernel, setGernel] = useState(undefined);
  let [button_show, setbutton_show] = useState(false);
  let [loadingS, setLoadingS] = useState(false);

  // let [Gernel, setGernel] = useState(undefined);


  // Date Ranges

  // Start Date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  let [start_Date, setStartDate] = useState(undefined);
  let [start_Date_Validity, setStartDate_Validity] = useState(undefined);
  let [loginCheck, setLoginCheck] = useState(undefined);
  let [user, setUser] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [value_Valid, setValue_Valid] = useState(null);
  const [items, setItems] = useState([
    { label: "Face to Face", value: "Face to Face" },
    { label: "Virtual Event", value: "Virtual Event" },
  ]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
    set_Data();
  }, [isFocused]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    console.log(user);
    if (user != undefined) {

      setUser(user);
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
      Props.navigation.navigate('LoginCheckRestict');
    }
    if (user.Business == true && user.Business != undefined) {
      setGernel(true);
    } else {
      setGernel(false);
      alert('You have no any register business')
    }
  };

  let set_Data = () => {
    let event = Props.route.params.Event_Details
    setTitle(event.title)
    setEentTheme(event.EventTheme)
    setMoreInfo(event.Details)
    setAddress(event.Address)
    setBusiness_Street_Hs(event.Business_Street_Hs)
    setBusiness_city(event.Business_city)
    setRegion(event.Region)
    setticketUrlLabel1(event.ticketUrlLabel1)
    setticketUrl1(event.ticketUrl1)
    setticketUrl2(event.ticketUrl2)
    setticketUrlLabel2(event.ticketUrlLabel2)
    setValue(event.Event_Type)
    setStartDate(event.UTCPicked.startDate.toDate())
    setEndDate(event.UTCPicked.endDate.toDate())
    setStartTime(event.start_Time)
    setEndTime(event.End_Time)
    setSelectedCity([{ city: event.selectedCity }])
    setImage({ uri: event.url })
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('A date has been picked: ',);
    hideDatePicker();
    setStartDate(date);
    handleConfirmTime(date)
  };

  // End Date

  let [End_Date, setEndDate] = useState(undefined);
  let [End_Date_Validity, setEndDate_Validity] = useState(undefined);

  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
    console.log('open');
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = date => {

    setEndDate(date);
    handleConfirmTime1(date)

    hideDatePicker1();
  };
  let My_Owner_Business = Props.Relevant_Business.filter(
    (e) => e.uid.toLowerCase().indexOf(Props.route.params.myBuiness_uid.toLowerCase()) !== -1
  );

  // console.log("My owner business", My_Owner_Business);
  // Time Ranges
  function tConvert(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
  // Start time
  const [is_TimePickerVisible, set_TimePickerVisibility] = useState(false);
  let [start_Time, setStartTime] = useState(undefined);
  let [start_Time_Validity, setStartTime_Validity] = useState(undefined);

  const show_TimePicker = () => {
    set_TimePickerVisibility(true);
  };

  const hide_TimePicker = () => {
    set_TimePickerVisibility(false);
  };

  const handleConfirmTime = date => {
    var dt = date
    var hours = dt.getHours(); // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var minutes = dt.getMinutes();
    let finalHour = hours < 10 ? `0${hours}` : hours
    let finalMinute = minutes < 10 ? `0${minutes}` : minutes
    var finalTime = finalHour + ":" + finalMinute + " " + AmOrPm;
    setStartTime(finalTime);
    console.log('A date has been picked: ', hours, hours.length);
  };





  // End Time

  let [End_Time, setEndTime] = useState(undefined);
  let [End_Time_Validity, setEndTime_Validity] = useState(undefined);

  const [is_TimePickerVisible1, set_TimePickerVisibility1] = useState(false);

  const show_TimePicker1 = () => {
    set_TimePickerVisibility1(true);
    console.log('open');
  };

  const hide_TimePicker1 = () => {
    set_TimePickerVisibility1(false);
  };

  const handleConfirmTime1 = date => {
    var dt = date
    var hours = dt.getHours(); // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var minutes = dt.getMinutes();
    let finalHour = hours < 10 ? `0${hours}` : hours
    let finalMinute = minutes < 10 ? `0${minutes}` : minutes
    var finalTime = finalHour + ":" + finalMinute + " " + AmOrPm;
    setEndTime(finalTime);
    // hide_TimePicker1();
  };



  let [random, setRandom] = useState(3);

  // City Select Filter
  let [CityModal, setCityModal] = useState(false);
  let [CityValidation, setCityValidation] = useState('');
  let [Filter, setFilter] = useState('');
  let FilterData = single => {
    return single.city.toLowerCase().indexOf(Filter.toLowerCase()) !== -1;
  };
  let allCity = Cities.filter(FilterData);
  let [selectedCity, setSelectedCity] = useState([]);
  let renderItem = v => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedCity.includes(v.item)
            ? Global.color
            : '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCity([v.item]);
            setCityModal(false);
            setFilter('');
            setCityValidation('');
            setRandom(Math.random() * 100);
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Text
            style={{
              fontSize: 13,
              color: selectedCity.includes(v.item) ? '#FFFFFF' : '#414141',

              fontFamily: 'sans-serif-normal',
              fontWeight: 'bold',
              marginLeft: 15,
            }}>
            {v.item.city}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Images Section
  let [Images, setImage] = useState(undefined);
  let [Select_image, setSelectImage] = useState(false);

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
      setSelectImage(true)
    });
  };

  let ResetValidity = () => {
    setTitle_validty('');
    setEentTheme_validty('');
    setMoreInfo_validty('');
    setAddress_validty('');
    setValue_Valid("");
    setCityValidation('');
    setStartDate_Validity('');
    setEndDate_Validity('');
    setImage_Validity('');
    setStartTime_Validity('');
    setEndTime_Validity('');
  };

  let ClearFields = () => {
    setTitle('');
    setEentTheme('');
    setMoreInfo('');
    setAddress('');
    setValue_Valid("");
    setSelectedCity([]);
    setStartDate(undefined);
    setEndDate(undefined);
    setStartTime(undefined);
    setEndTime(undefined);
    setImage(undefined);
    setticketUrlLabel1('');
    setticketUrlLabel2('');
    setticketUrl1('');
    setticketUrl2('');
  };
  let Check_validity = async () => {

    ResetValidity();
    if (
      Title == '' ||
      EentTheme == '' ||
      MoreInfo == '' ||
      Address == '' ||
      selectedCity.length == 0 ||
      start_Date == undefined ||
      End_Date == undefined ||
      start_Time == undefined ||
      End_Time == undefined ||
      value == null ||
      Images == undefined

    ) {
      if (Title == '') {
        setTitle_validty('* Required');
      }
      if (EentTheme == '') {
        setEentTheme_validty('* Required');
      }
      if (MoreInfo == '') {
        setMoreInfo_validty('* Required');
      }
      if (Address == '') {
        setAddress_validty('* Required');
      }
      if (selectedCity.length == 0) {
        setCityValidation('* Required');
      }
      if (start_Date == undefined) {
        setStartDate_Validity('* Required');
      }
      if (End_Date == undefined) {
        setEndDate_Validity('* Required');
      }

      if (value == null) {
        setValue_Valid("* Required");
      }

      if (start_Time == undefined) {
        setStartTime_Validity('* Required');
      }
      if (End_Time == undefined) {
        setEndTime_Validity('* Required');
      }
      if (Images == undefined) {
        setImage_Validity('* Required');
      }

      return;
    }


    let obj = {
      title: Title,
      EventTheme: EentTheme,
      Details: MoreInfo,
      Address: Address,
      Business_Street_Hs: Business_Street_Hs,
      Business_city: Business_city,
      selectedCity: selectedCity[0].city,
      start_Date: start_Date.getMonth() + 1 + '/' + start_Date.getDate() + '/' + start_Date.getFullYear(),
      End_Date: End_Date.getMonth() + 1 + '/' + End_Date.getDate() + '/' + End_Date.getFullYear(),
      UTCPicked: {
        startDate: start_Date,
        endDate: End_Date
      },
      ticketUrlLabel1: ticketUrlLabel1,
      ticketUrl1: ticketUrl1,
      ticketUrlLabel2: ticketUrlLabel2,
      ticketUrl2: ticketUrl2,
      start_Time: start_Time,
      End_Time: End_Time,
      Region: region,
      organize_By: {
        person: user.name,
        Business: My_Owner_Business[0].name
      },
      Event_Type: value,
      url:Props.route.params.Event_Details.url,
      BusinessID:Props.route.params.myBuiness_uid,
      going: Props.route.params.Event_Details.going,
      intrested:Props.route.params.Event_Details.intrested,
      uniqueID:Props.route.params.Event_Details.uniqueID
    };

 
    setLoadingS(true)
    setbutton_show(true)
    
    await Update_Event(setLoadingS, setbutton_show, Images, obj, Props.route.params.myBuiness_uid,Select_image,Props)

    // applied success message 

    console.log("no<<<<<<<<<<<<<<<<<<<<<");
    ClearFields();
  };


  const onChangeValue = async (region) => {
    setRegion(region)
    await Geocoder.fallbackToGoogle('AIzaSyB-49hZCMMZ9_AHaDEmTAdXswwXgEB899w')
    let lat = await region.latitude
    let lng = await region.longitude
    setMarker({
      latitude: lat,
      longitude: lng,
      title: 'OneStop Zim',
      subtitle: '1234 Foo Drive'
    })
    try {
      let res = await Geocoder.geocodePosition({ lat, lng })
      // console.log("re",res[0].formattedAddress);
      setAddress(res[0].formattedAddress)
      // mark.showCallout()
    }

    catch (err) {
      console.log(err);
    }
    // console.log("region",region);
  }

  return (
    <View>
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
        <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
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

            <Text style={styles.navHeading}>Update Events</Text>

            <TouchableOpacity
              //   onPress={() => Check_validity()}
              activeOpacity={0.8}
              style={styles.sendTouch}>
              <Text style={styles.sendNav}></Text>
            </TouchableOpacity>
          </View>

          <TextInput
            onChangeText={e => setTitle(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
              marginTop: 30,
            }}
            value={Title}
            placeholder="Event Name"></TextInput>

          <Text style={{ ...styles.Validation, color: 'red' }}>
            {Title_validty}
          </Text>

          <TextInput
            onChangeText={e => setEentTheme(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
            }}
            value={EentTheme}
            placeholder="Event Theme"></TextInput>

          <Text style={{ ...styles.Validation, color: 'red' }}>
            {EentTheme_validty}
          </Text>

          <TextInput
            onChangeText={e => setMoreInfo(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
            }}
            value={MoreInfo}
            placeholder="More Info"></TextInput>

          <Text style={{ ...styles.Validation, color: 'red' }}>
            {MoreInfo_validty}
          </Text>

          <TouchableOpacity
            onPress={async () => {

              setAddress_modal(true)

            }}
            activeOpacity={0.9}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            <Text
              style={{
                ...styles.countryName,
                color: "grey",

              }}
            >
              {(Business_Street_Hs !== "" || Business_city !== "" || Address !== "") ? Business_Street_Hs + " " + Business_city + " " + Address : "Address"}

            </Text>

          </TouchableOpacity>

          {/* <TextInput
            onChangeText={e => setAddress(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
            }}
            value={Address}
            placeholder="Address"></TextInput> */}

          <Text style={{ ...styles.Validation, color: 'red' }}>
            {Address_validty}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCityModal(true)}
            style={{ ...styles.inputBox, marginTop: 15 }}>
            {selectedCity.length > 0 ? (
              <View style={styles.row}>
                <Text style={styles.CityName}>{selectedCity[0].city}</Text>
              </View>
            ) : (
              <Text
                style={{
                  ...styles.CityName,
                  color: 'grey',

                }}>
                Select City
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
            {CityValidation}
          </Text>






          <Text style={{ ...styles.formHeading, fontSize: 12 }}>
            Select Date & Time Range
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
                  start_Date.getFullYear()} {"   :  "}

                {start_Time}
              </Text>
            ) : (
              <Text style={styles.title}>Select Start Date & Time</Text>
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
                {"   :  "}

                {End_Time}
              </Text>
            ) : (
              <Text style={styles.title}>Select End Date & Time</Text>
            )}
          </TouchableOpacity>

          <Text style={{ ...styles.Validation, color: 'red' }}>
            {End_Date_Validity}
          </Text>



          <DropDownPicker
            placeholder="Event Type"
            placeholderStyle={{
              color: value_Valid === "* Required" ? "red" : "grey",
              // marginLeft: 10,
              fontSize: 16,
            }}
            ArrowDownIconComponent={({ style }) => (
              <Icon3
                name="chevron-down-outline"
                size={20}
                color={value_Valid === "* Required" ? "red" : "grey"}
              />
            )}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              borderWidth: 0,
              height: 60,
              ...styles.inputBox
            }}
          />
          <Text style={{ ...styles.Validation, color: 'red', marginTop: 8 }}>
            {value_Valid}
          </Text>


          {/* <Text style={{ ...styles.formHeading, fontSize: 12 }}>
            Select Time Range
          </Text>

          <TouchableOpacity
            onPress={() => show_TimePicker()}
            style={{
              ...styles.input1,
            }}>
            {start_Time !== undefined ? (
              <Text style={styles.title}>
                {start_Time}
              </Text>
            ) : (
              <Text style={styles.title}>Select Start Time</Text>
            )}
          </TouchableOpacity>

          <Text style={{ ...styles.Validation, color: 'red' }}>
            {start_Time_Validity}
          </Text>

          <TouchableOpacity
            onPress={() => {
              show_TimePicker1();
            }}
            style={{
              ...styles.input1,
            }}>
            {End_Time !== undefined ? (
              <Text style={styles.title}>
                {End_Time}
              </Text>
            ) : (
              <Text style={styles.title}>Select End Time</Text>
            )}
          </TouchableOpacity>

          <Text style={{ ...styles.Validation, color: 'red' }}>
            {End_Time_Validity}
          </Text> */}



          <View style={styles.mainBox}>
            {Images !== undefined ? (
              <TouchableOpacity
                onPress={() => chooseFile('photo')}
              >
                <Image style={styles.image} source={{ uri: Images.uri }} />
              </TouchableOpacity>

            ) : (
              <TouchableOpacity
                onPress={() => chooseFile('photo')}
                style={{ width: 100, height: 140, ...styles.center }}>
                <Image
                  style={{ width: '100%', height: 100, resizeMode: 'cover' }}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png',
                  }}
                />
                <Text style={{ fontSize: 11, color: 'grey' }}>Add Image</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ ...styles.Validation, color: 'red' }}>
            {Image_Validity}
          </Text>
          <Text style={styles.formHeading}>Optional Information</Text>

          <TextInput
            onChangeText={e => setticketUrlLabel1(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
            }}
            value={ticketUrlLabel1}
            placeholder="Add ticket link"></TextInput>

          <TextInput
            onChangeText={e => setticketUrl1(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
            }}
            value={ticketUrl1}
            placeholder="Ticket Url"></TextInput>

          <TextInput
            onChangeText={e => setticketUrlLabel2(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
            }}
            value={ticketUrlLabel2}
            placeholder="Add ticket link 2"></TextInput>

          <TextInput
            onChangeText={e => setticketUrl2(e)}
            placeholderTextColor={'grey'}
            style={{
              ...styles.input1,
              marginBottom: 80
            }}
            value={ticketUrl2}
            placeholder="Ticket Url"></TextInput>

        </ScrollView>
        <View style={styles.buttonFl}>
          <TouchableOpacity
            disabled={button_show}
            onPress={() => Check_validity()}
            activeOpacity={0.7}
            style={{
              ...styles.buttonHalfTwo1,
              opacity: 1,
            }}>
            <Text
              style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'notoserif' }}>
              Update Event
            </Text>
          </TouchableOpacity>
        </View>

        <Modal visible={CityModal}>
          <View style={styles.nav1}>
            <Icon3
              onPress={() => {
                setCityModal(false);
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
              Choose City
            </Text>
          </View>

          <TextInput
            placeholderTextColor={'grey'}
            onChangeText={e => setFilter(e)}
            style={{
              ...styles.input,
            }}
            placeholder="Search City Here"></TextInput>

          <FlatList
            initialNumToRender={20}
            data={allCity}
            renderItem={renderItem}></FlatList>
        </Modal>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible1}
          mode="datetime"
          onConfirm={handleConfirm1}
          onCancel={hideDatePicker1}
        />


        {/* <DateTimePickerModal
          isVisible={is_TimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hide_TimePicker}
        />

        <DateTimePickerModal
          isVisible={is_TimePickerVisible1}
          mode="time"
          onConfirm={handleConfirmTime1}
          onCancel={hide_TimePicker1}
        /> */}



      </>

      <Modal visible={Address_modal}>
        <StatusBar
          // translucent
          barStyle="dark-content"
          backgroundColor="#000"
        />
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setAddress_modal(false)


            }}
            name="chevron-back-outline"
            size={20}
            style={{
              color: "#FFFFFF",
              marginLeft: 2,
            }}
          />
          <Text
            style={{
              fontSize: 19,
              fontFamily: "notoserif",
              marginLeft: 15,
              color: "#FFFFFF",
            }}
          >
            Event Address
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setAddress_modal(false);
            }}
            disabled={Address !== "" ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: Address !== "" ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>


        <TextInput
          onChangeText={(e) => setBusiness_Street_Hs(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
            height: 45,
            marginTop: 0
          }}
          value={Business_Street_Hs}
          placeholder="Type House No# Street Here...."
        ></TextInput>



        <TextInput
          onChangeText={(e) => setBusiness_city(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
            height: 45,
            marginTop: 0
          }}
          value={Business_city}
          placeholder="Type City Here...."
        ></TextInput>

        <TextInput
          onChangeText={(e) => setAddress(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
            height: 45,
            marginTop: 0
          }}
          value={Address}
          placeholder="Type Address Here...."
        ></TextInput>


        <View style={{ width: '100%', height: '100%', display: 'flex', marginTop: 0, backgroundColor: 'white' }}>

          <MapView

            style={{ width: '100%', height: '90%' }}
            region={region}

            onRegionChangeComplete={(region) => { onChangeValue(region) }}
            zoomEnabled={true}
            zoomControlEnabled={false}
            showsMyLocationButton={true}
            showsUserLocation={true}
            followsUserLocation={true}
            scrollDuringRotateOrZoomEnabled={false}

          >

          </MapView>
          <View
            style={{ position: 'absolute', top: '45%', width: '50%', left: '51%', marginTop: -48, marginLeft: -24 }}
          >


            <Icon2 name="map-pin" size={33} style={{ padding: 10 }} color='red' />

          </View>


          <View>

          </View>


        </View>


      </Modal>
    </View>
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
  countryName: {
    fontSize: 16,
    color: "grey",
    // marginLeft: 5,
    fontWeight: "400",
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
  CityName: {
    fontSize: 16,
    color: '#000',
    // marginLeft: 5,
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
    width: '100%',
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
  },
  buttonFl: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width: '100%'

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

    Relevant_Business: state.Relevant_Business,
    Relevant_Business_type: state.Relevant_Business_type,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    Update_Event: (setLoadingS, setbutton_show, Images, obj, myBuiness_uid,Select_image) => (Update_Event(setLoadingS, setbutton_show, Images, obj, myBuiness_uid,Select_image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEventForm);
