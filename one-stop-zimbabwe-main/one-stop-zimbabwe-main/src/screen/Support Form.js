import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Global } from '../assets/Global_Variable';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import SweetAlert from "react-native-sweet-alert";


function Support_Form(Props) {

  // console.log(Props.route.params.id);
  let [name, setName] = React.useState('')
  let [Business_name, setBusiness_name] = React.useState('')
  let [Email, setEmail] = React.useState('')
  let [Phone, setPhone] = React.useState('')
  let [Question, setQuestion] = React.useState('')
  let [user, setUser] = useState();



  let [name_validation, setName_validation] = React.useState('')
  let [Business_name_validation, setBusiness_name_validation] = React.useState('')
  let [Email_validation, setEmail_validation] = React.useState('')
  let [Phone_validation, setPhone_validation] = React.useState('')
  let [Question_validation, setQuestion_validation] = React.useState('')

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));

    if (user != undefined) {
      setUser(user);
    } else {
      Props.navigation.navigate("LoginCheckRestict");
    }
  };


  let reset_validity = () => {
    setName_validation('')
    setBusiness_name_validation('')
    setEmail_validation('')
    setPhone_validation('')
    setQuestion_validation('')

  }
  let check_validity = () => {
    reset_validity()
    if (name == '' || Business_name == '' || Email == '' || Phone == '' || Question == '') {
      if (name == '') {
        setName_validation('* Required')
      }
      if (Business_name == '') {
        setBusiness_name_validation('* Required')
      }
      if (Email == '') {
        setEmail_validation('* Required')
      }

      if (Phone == '') {
        setPhone_validation('* Required')
      }
      if (Question == '') {
        setQuestion_validation('* Required')
      }
      return
    }

    let obj = {
      name: name,
      Business_name: Business_name,
      Email: Email,
      Phone: Phone,
      Question: Question,
      user_uid: user.uid,
      time:new Date().getTime()
    }

    console.log(obj);
    firestore()
      .collection("Quries").add(obj).then(() => {

        SweetAlert.showAlertWithOptions(
          {
            title: "Sucess",
            subTitle: "Your query has been submitted successfully. We will get in touch soon",
            confirmButtonTitle: "OK",
            confirmButtonColor: "#000",
            otherButtonTitle: "Cancel",
            otherButtonColor: "#dedede",
            style: "success",
            cancellable: true,
          },
          (callback) => {

            Props.navigation.goBack()
          }
        );
      })


  }



  return (
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

        <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}>
          Have Any Query?
        </Text>
      </View>
      <ScrollView
        style={{

          flex: 1,
          width: '100%',

        }}>
        <Text style={{
          color: '#000', fontSize: 15, fontWeight: '400', marginLeft: '10%'
        }}>
          Have Any Question Ask Us Freely
        </Text>


        <TextInput
          onChangeText={e => setName(e)}
          placeholderTextColor="grey"
          style={{
            ...styles.singleline
          }}
          placeholder="Enter your Full Name "></TextInput>
        <Text style={styles.validity}>
          {name_validation}
        </Text>


        <TextInput
          onChangeText={e => setBusiness_name(e)}
          placeholderTextColor="grey"
          style={{
            ...styles.singleline
          }}
          placeholder="Enter Name of Business"></TextInput>

        <Text style={styles.validity}>
          {Business_name_validation}
        </Text>




        <TextInput
          onChangeText={e => setEmail(e)}
          placeholderTextColor="grey"
          style={{
            ...styles.singleline
          }}
          placeholder="Enter Email Address"></TextInput>

        <Text style={styles.validity}>
          {Email_validation}
        </Text>




        <TextInput
          onChangeText={e => setPhone(e)}
          placeholderTextColor="grey"
          style={{
            ...styles.singleline
          }}
          placeholder="Enter Phone Number"></TextInput>
        <Text style={styles.validity}>
          {Phone_validation}
        </Text>
        <TextInput
          onChangeText={e => setQuestion(e)}
          placeholderTextColor="grey"
          style={{
            ...styles.multiline
          }}
          multiline
          placeholder="Type your Detailed Question here...."></TextInput>
        <Text style={styles.validity}>
          {Question_validation}
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: 'red',
            width: '80%',
            textAlign: 'left',
            paddingVertical: 10,
          }}>
          {/* {FeedbackVali} */}
        </Text>


        <TouchableOpacity
          onPress={() => {
            check_validity();
          }}
          activeOpacity={0.6}
          style={styles.button}>
          <Text style={styles.ButtonText}>Submit</Text>
        </TouchableOpacity>




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
    // backgroundColor:'red',
    // position: 'absolute',
    // top: 0,
    // zIndex: 1,
    justifyContent: 'center',
    marginBottom: 40
  },
  button: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Global.color,
    borderRadius: 4,
    height: 40,
    marginLeft: '10%'

  },

  button1: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: Global.color,
    borderRadius: 4,
    height: 40,

    marginBottom: 10,
    flexDirection: 'row',
    padding: 0,

  },
  ButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  multiline: {
    width: '80%',
    height: 130,
    borderColor: '#000',
    borderWidth: 0.5,
    // textAlign: 'left',
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    marginLeft: '10%'

  },
  singleline: {
    width: '80%',
    height: 45,
    borderColor: '#000',
    borderWidth: 0.5,
    // textAlign: 'left',
    // textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginLeft: '10%'
  },
  validity: {
    fontSize: 11,
    color: 'red',
    textAlign: 'right',
    width: '90%'
  }
});

export default Support_Form;
