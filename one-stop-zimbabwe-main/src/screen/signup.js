import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  get_data,
  onFacebookButtonPress,
  onGoogleButtonPress,
  Logout,
  EmailSign_up,
} from '../store/acion/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { Global } from '../assets/Global_Variable';
import { TextInput } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Countries } from '../assets/countries';
import FlagsAll from '../assets/flag';
import auth from '@react-native-firebase/auth';
import { Buffer } from 'buffer';
import firestore, { firebase } from '@react-native-firebase/firestore';

function SignUp(Props) {
  // Mix Variable
  let [response_Valid, setresponse_Valid] = useState('');
  let [loadingS, setLoadingS] = useState(false);

  // First name
  let [firstName, setFirstName] = useState('');
  let [firstName_active, setFirstName_active] = useState('');
  let [firstName_valid, setFirstName_valide] = useState('');
  // last name
  let [LastName, setLastName] = useState('');
  let [LastName_active, setLastName_active] = useState('');
  let [LastName_valid, setLastName_valide] = useState('');
  // Email
  let [email, setEmail] = useState('');
  let [email_active, setEmail_active] = useState(false);
  let [email_valid, setEmail_valid] = useState('');
  // password
  let [pass, setpass] = useState('');
  let [pass_active, setpass_active] = useState(false);
  let [pass_valid, setpass_valid] = useState('');
  let [eye, setEye] = React.useState(true);
  // Date of Birth
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  let [selectDate, setselectDate] = useState(false);

  // City
  let [City, setCity] = useState('');
  let [City_active, setCity_active] = useState(false);
  let [City_valid, setCity_valid] = useState('');
  // Country

  let [Country_valid, setCountry_valid] = useState('');

  // term & Services // privacy policy
  let [select_1, setSelct1] = useState(false);
  let [select_2, setSelct2] = useState(false);
  let [select_Valid, setSelct_Valid] = useState(false);

  // Country Select Filter
  let [countryModal, setCountryModal] = useState(false);

  let [Filter, setFilter] = useState('');
  let FilterData = single => {
    return single.name.toLowerCase().indexOf(Filter.toLowerCase()) !== -1;
  };
  let allCountry = Countries.filter(FilterData);
  let [selectedCountry, setSelectedCountry] = useState([]);
  let renderItem = v => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedCountry.includes(v.item)
            ? Global.color
            : '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCountry([v.item]);
            setCountryModal(false);
            setFilter('');
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Image
            source={{ uri: FlagsAll[v.item.alpha2] }}
            style={{ width: 30, height: 20, resizeMode: 'contain' }}
          />

          <Text
            style={{
              fontSize: 13,
              color: selectedCountry.includes(v.item) ? '#FFFFFF' : '#414141',

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

  // Check validity

  let [validate, setvalidate] = useState(false);
  let Check_validity = () => {
    setvalidate(false);
    setFirstName_valide('');
    setLastName_valide('');
    setEmail_valid('');
    setpass_valid('');
    setresponse_Valid('');
    setCity_valid('');
    setCountry_valid('');
    setSelct_Valid('');
    if (
      firstName == '' ||
      LastName == '' ||
      email == '' ||
      pass == '' ||
      City == '' ||
      selectedCountry.length == 0 ||
      select_1 == false ||
      select_2 == false ||
      pass.length < 6
    ) {
      if (firstName == '') {
        setFirstName_valide('* Required');
      }

      if (LastName == '') {
        setLastName_valide('* Required');
      }

      if (email == '') {
        setEmail_valid('* Required');
      }

      if (pass == '') {
        setpass_valid('* Required');
      }

      if (City == '') {
        setCity_valid('* Required');
      }

      if (selectedCountry.length == 0) {
        setCountry_valid('* Required');
      }

      if (select_1 == false) {
        setSelct_Valid('Agree To Terms First');
      }
      if (select_2 == false) {
        setSelct_Valid('Agree To Terms First');
      }
      if (pass.length < 6) {
        setpass_valid('Password Length Atleast 6 Character');
      }
      return;
    }
    setvalidate(true);
    setLoadingS(true);
    let obj = {
      name: firstName + LastName,
      Email: email,
      Pass: pass,
      City: City,
      Country: selectedCountry[0].name,
      photo: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      Given_Reviews_no: 0,
      Business: false,
      Coustomer: false,
      Check_In: []
    };

    const encodedJsonObject = Buffer.from(JSON.stringify(obj)).toString(
      'base64',
    );

    EmailSign_up('==!Scope' + encodedJsonObject + '==!Final');
  };

  let EmailSign_up = async obj => {
    const actionCodeSettings = {
      url: `https://one-stop-zimbabwe.firebaseapp.com?data=${obj}`,
      // url: `http://localhost:3000/?data=${obj}`,
      handleCodeInApp: true,
    };

    await auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        firestore()
          .collection('App_data')
          .doc('SignUp_delay')
          .update({
            signupdelayArray: firebase.firestore.FieldValue.arrayUnion(email),
          })
          .then(() => {
            setFirstName('');
            setLastName('');
            setEmail('');
            setpass('');
            // setselectDate(false);
            setCity('');
            setSelectedCountry([]);
            setSelct1(false);
            setSelct2(false);
            Props.navigation.navigate('EmailSendConfirmation', {
              value: 'Verify',
            });
            setLoadingS(false);
          })
          .catch(error => {
            setLoadingS(false);
            console.log(error);

            setresponse_Valid('Something Went Wrong! Try Again Later.');
          });
      })
      .catch(error => {
        var errorMessage = error.message;
        // ...
        setLoadingS(false);

        setresponse_Valid(errorMessage);
        console.log(errorMessage);
      });
  };

  return (
    <>
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
            style={{ width: 150, height: 150 }}
          />
        </View>
      </Modal>
      <View style={{ ...styles.nav }}>
        <TouchableOpacity onPress={() => Props.navigation.goBack()}>
          <Icon3
            name="arrow-back-outline"
            size={25}
            style={{
              color: '#333333',
              fontWeight: 'bold',
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 21,
            fontFamily: 'notoserif',
            marginLeft: 15,
            color: '#333333',
          }}>
          Sign Up
        </Text>
      </View>

      <ScrollView>
        <View style={styles.form}>
          <TextInput
            placeholderTextColor={'grey'}
            value={firstName}
            onChangeText={e => setFirstName(e)}
            onFocus={() => setFirstName_active(true)}
            onBlur={() => setFirstName_active(false)}
            style={{
              ...styles.input,
              borderColor: firstName_active ? Global.linkTextColor : 'grey',
            }}
            placeholder="First Name"></TextInput>
          <Text
            style={{
              color: 'red',
              width: '100%',
              textAlign: 'right',
              paddingRight: 5,
              fontSize: 12,
            }}>
            {firstName_valid}
          </Text>
          <TextInput
            placeholderTextColor={'grey'}
            value={LastName}
            onChangeText={e => setLastName(e)}
            onFocus={() => setLastName_active(true)}
            onBlur={() => setLastName_active(false)}
            style={{
              ...styles.input,
              borderColor: LastName_active ? Global.linkTextColor : 'grey',
            }}
            placeholder="Last Name"></TextInput>
          <Text
            style={{
              color: 'red',
              width: '100%',
              textAlign: 'right',
              paddingRight: 5,
              fontSize: 12,
            }}>
            {LastName_valid}
          </Text>

          <TextInput
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={e => setEmail(e)}
            onFocus={() => setEmail_active(true)}
            onBlur={() => setEmail_active(false)}
            style={{
              ...styles.input,
              borderColor: email_active ? Global.linkTextColor : 'grey',
            }}
            placeholder="Email"></TextInput>
          <Text
            style={{
              color: 'red',
              width: '100%',
              textAlign: 'right',
              paddingRight: 5,
              fontSize: 12,
            }}>
            {email_valid}
          </Text>

          <View
            style={{
              ...styles.searchSection,
              borderColor: pass_active ? Global.linkTextColor : 'grey',
              borderWidth: pass_active ? 1.6 : 1.2,
            }}>
            <TextInput
              placeholderTextColor={'grey'}
              value={pass}
              onFocus={() => setpass_active(true)}
              onBlur={() => setpass_active(false)}
              style={{ ...styles.input1 }}
              onChangeText={e => setpass(e)}
              placeholder="Password"
              secureTextEntry={eye}
            />
            {eye ? (
              <TouchableOpacity
                onPress={() => setEye(false)}
                activeOpacity={0.8}>
                <Icon
                  style={styles.searchIcon}
                  name="eye-slash"
                  size={20}
                  color="#8B8C8E"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setEye(true)}
                activeOpacity={0.8}>
                <Icon
                  style={styles.searchIcon}
                  name="eye"
                  size={20}
                  color="#8B8C8E"
                />
              </TouchableOpacity>
            )}
          </View>

          <Text
            style={{
              color: 'red',
              width: '100%',
              textAlign: 'right',
              paddingRight: 5,
              fontSize: 12,
            }}>
            {pass_valid}
          </Text>

          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.input,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              borderColor: open ? Global.linkTextColor : 'grey',
              borderWidth: open ? 1.6 : 1.2,
            }}
            onPress={() => setOpen(true)}>
            <Text style={{fontSize: 15, color: 'grey', fontFamily: 'Roboto'}}>
              {selectDate
                ? date.getDate() +
                  ' - ' +
                  JSON.parse(date.getMonth() + 1) +
                  ' - ' +
                  date.getFullYear()
                : 'Birth Date (Optional)'}
            </Text>
          </TouchableOpacity> */}

          <View style={styles.buttonsDiv}>
            <View style={{ width: '49%' }}>
              <TextInput
                placeholderTextColor={'grey'}
                onChangeText={e => setCity(e)}
                value={City}
                onFocus={() => setCity_active(true)}
                onBlur={() => setCity_active(false)}
                style={{
                  ...styles.buttonHalfOne,
                  borderColor: City_active ? Global.linkTextColor : 'grey',
                }}
                placeholder="Berlin"
                activeOpacity={0.7}></TextInput>
              <Text
                style={{
                  color: 'red',
                  width: '100%',
                  textAlign: 'right',
                  paddingRight: 5,
                  fontSize: 12,
                }}>
                {City_valid}
              </Text>
            </View>

            <View style={{ width: '49%' }}>
              <TouchableOpacity
                onPress={() => setCountryModal(true)}
                activeOpacity={0.7}
                style={styles.buttonHalfTwo}>
                <Text style={{ fontSize: 15, width: '80%', color: 'grey' }}>
                  {selectedCountry.length > 0
                    ? selectedCountry[0].name
                    : 'Coutnry'}
                </Text>
                <Icon3
                  name="chevron-down-outline"
                  size={20}
                  style={{
                    color: '#333333',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'red',
                  width: '100%',
                  textAlign: 'right',
                  paddingRight: 5,
                  fontSize: 12,
                }}>
                {Country_valid}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Check_validity()}
            disabled={
              firstName == '' ||
                LastName == '' ||
                email == '' ||
                pass == '' ||
                City == '' ||
                selectedCountry.length == 0 ||
                select_1 == false ||
                select_2 == false
                ? true
                : false
            }
            style={{
              ...styles.buttonHalfTwo1,
              opacity:
                firstName == '' ||
                  LastName == '' ||
                  email == '' ||
                  pass == '' ||
                  City == '' ||
                  selectedCountry.length == 0 ||
                  select_1 == false ||
                  select_2 == false
                  ? 0.3
                  : 1,
            }}>
            <Text
              style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'notoserif' }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View activeOpacity={0.7} style={styles.content}>
            <BouncyCheckbox
              isChecked={select_1}
              disableBuiltInState
              size={20}
              fillColor={Global.color}
              unfillColor="transparent"
              iconStyle={{
                borderColor: Global.color,
                borderRadius: 5,
                marginTop: 8,
              }}
              innerIconStyle={{ borderWidth: 1, borderRadius: 5 }}
              onPress={e => {
                setSelct1(!select_1);
                console.log(e);
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: '#8B8C8E',
                width: '90%',
                textAlign: 'left',
                marginLeft: -5,
              }}>
              By continuing , I agree to OneStop Zim's{' '}
              <Text
                style={{ color: Global.linkTextColor }}
                onPress={() => {
                  Props.navigation.navigate("TermConditions")
                }}>
                Terms of Services
              </Text>{' '}
              and acknowledge OneStop Zim's{' '}
              <Text
                style={{ color: Global.linkTextColor }}
                onPress={() => {
                  Props.navigation.navigate("PrivacyPolicy")
                }}>
                Privacy Policy
              </Text>{' '}
              , including OneStop Zim's cookie policy!
            </Text>
          </View>

          <View activeOpacity={0.7} style={{ ...styles.content, marginTop: 6 }}>
            <BouncyCheckbox
              isChecked={select_2}
              disableBuiltInState
              size={20}
              fillColor={Global.color}
              unfillColor="transparent"
              iconStyle={{
                borderColor: Global.color,
                borderRadius: 5,
                marginTop: 8,
              }}
              innerIconStyle={{ borderWidth: 1, borderRadius: 5 }}
              onPress={e => {
                setSelct2(!select_2);
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: '#8B8C8E',
                width: '90%',
                textAlign: 'left',
                marginLeft: -5,
              }}>
              Yes, I want OneStop Zim to send me marketing emails about OneStop Zim's products
              , services , and local events . I can unsubscribe at any time.
            </Text>
          </View>
          <Text
            style={{
              color: 'red',
              width: '100%',
              textAlign: 'right',
              paddingRight: 5,
              fontSize: 12,
            }}>
            {select_Valid}
          </Text>

          <Text
            style={{
              color: 'red',
              width: '100%',
              textAlign: 'center',
              fontSize: 10,
              fontSize: 12,
            }}>
            {response_Valid}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setresponse_Valid('');
              (select_1 && select_2)
                ? onGoogleButtonPress(setLoadingS, setresponse_Valid, Props)
                : setresponse_Valid('Agree To Terms & Conditions First!');
            }}
            activeOpacity={0.7}
            style={styles.GoogleButton}>
            <Image
              style={{ width: 25, height: 25, position: 'absolute', left: 15 }}
              source={require('../assets/google.png')}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#8B8C8E',
                fontWeight: '500',
                fontFamily: 'notoserif',
              }}>
              Continue With Google
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#8B8C8E',
            width: '100%',
            textAlign: 'center',
            fontSize: 11,
            marginTop: 0,
            marginBottom: 10,
          }}>
          Don't Worry We Won't Post Without Your Permission
        </Text>
      </ScrollView>

      {/* <DatePicker
        modal
        title={'Select Date of Birth'}
        mode="date"
        open={open}
        date={date}
        onConfirm={e => {
          setDate(e);
          setselectDate(true);
          setOpen(false);
          console.log(e);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}

      <Modal visible={countryModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setCountryModal(false);
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
            Choose Country
          </Text>
        </View>

        <TextInput
          placeholderTextColor={'grey'}
          onChangeText={e => setFilter(e)}
          style={{
            ...styles.input,
            width: '98%',
            marginLeft: '1%',
            borderWidth: 0.3,
            borderColor: 'grey',
            marginBottom: 10,
          }}
          placeholder="Search Countries Here"></TextInput>

        <FlatList
          initialNumToRender={80}
          data={allCountry}
          renderItem={renderItem}></FlatList>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 55,
    paddingLeft: 15,
    elevation: 4,
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // paddingBottom:10
  },
  form: {
    width: '100%',
    padding: 15,
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
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    height: 50,
    marginTop: 10,
  },

  input1: {
    color: '#424242',
    width: '90%',
    fontFamily: 'Roboto',
  },
  buttonsDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonHalfOne: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,

    width: '100%',
    height: 45,
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000',
  },

  buttonHalfTwo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 45,
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    fontFamily: 'Roboto',
    paddingLeft: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  buttonHalfTwo1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Global.color,
    elevation: 1,
    marginTop: 10,
    fontFamily: 'sans-serif-thin',
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  GoogleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: '#8B8C8E',
    marginBottom: 7,
    minHeight: 45,
    marginTop: 10,
  },
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
    get_data: () => dispatch(get_data),
    onFacebookButtonPress: () => dispatch(onFacebookButtonPress),
    onGoogleButtonPress: () => dispatch(onGoogleButtonPress),
    Logout: () => Logout(),
    EmailSign_up: () => EmailSign_up(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
