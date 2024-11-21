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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

function AddCheckInForm(Props) {
let [Images,setImage]=useState(undefined)
let [checkin,setCheckIn]=useState('')
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
      setImage(response.assets[0])
    });
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
            Props.navigation.goBack()
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
          Add Check In to .....
        </Text>
      </View>
      <View style={styles.mainBox}>

        {Images!==undefined?

        <Image style={styles.image} source={{uri:Images.uri}} />
      
      
      
      :
        <TouchableOpacity
          onPress={() => chooseFile('photo')}
          style={{width: 100, height: 140,...styles.center}}>
          <Image
            style={{width: '100%', height: 100, resizeMode: 'cover'}}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png',
            }}
          />
          <Text style={{fontSize:11,color:'grey'}}>Add Image</Text>
        </TouchableOpacity>
      }




        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={(e)=>setCheckIn(e)}

          placeholder="Add Check-In Text here "></TextInput>
      </View>




      <TouchableOpacity
          onPress={() => Check_validity()}
          activeOpacity={0.7}
          disabled={(Images!==undefined && checkin !=='')? false : true}
          style={{
            ...styles.buttonHalfTwo1,
            opacity:(Images!==undefined && checkin !=='')? 1 : 0.4,
            
          }}>
          <Text style={{fontSize: 18, color: '#FFFFFF', fontFamily: 'notoserif'}}>
            Add Check-In
          </Text>
        </TouchableOpacity>
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
  mainBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 150,
    textAlignVertical:'top',
    paddingTop:30
  },
  center:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
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
    marginLeft:'5%'
  },
  image:{
    width:100,
    height:120,
    resizeMode:'cover'
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCheckInForm);
