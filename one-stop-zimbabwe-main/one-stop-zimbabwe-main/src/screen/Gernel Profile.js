import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import {arr, Global} from '../assets/Global_Variable';
function GernelProfile(Props) {
  let MainProps=Props.route==undefined? Props.props:Props
  let [random, setRandom] = useState(0);
  let [user, setUser] = useState({});
  // console.log(props.route.params.Edit);
let editProfile=Props.route==undefined?false:Props.route.params.Edit
  let logout = async () => {
    await AsyncStorage.removeItem('@user_data');
    getData();
    MainProps.navigation.navigate('LoginCheckRestict');
  };

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 5));
    getData();
  }, []);

  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    if (user != undefined) {
      console.log(user);
      setUser(user);
      setname(user.name);
      setMyname(user.name);
      setemail(user.Email);
      if (user.photo !== undefined) {
        setImage(user.photo);
      }
      if (user.City !== undefined) {
        setCity(user.City);
      }
    }
  };

  let [image, setImage] = useState(
    'https://wallpaperaccess.com/full/5637194.jpg',
  );
  let [myName, setMyname] = useState('');
  let [Email, setemail] = useState('');
  let [name, setname] = useState('');
  let [City, setCity] = useState('');

  let [modelVisible, setModalVisible] = useState(false);
  const [loadingS, setLoadingS] = useState(false);
  let [imageData, setImageData] = useState({});

  let [nameErr, setNameErr] = useState('');
  let [CityErr, setCityErr] = useState('');

  const chooseFile = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, async response => {
      console.log('Response = ');
      setImage(response.assets[0].uri);
      setImageData(response);
      //   setLoadingS(true)
    });
  };

  let UpdateNode = async () => {
    setNameErr('');
    setCityErr('');
    if (myName == '' || City == '') {
      if (myName == '') {
        setNameErr('*Required');
      }

      if (City == '') {
        setCityErr('*Required');
      }
      return;
    }
    setLoadingS(true);

    if (imageData.assets) {
      await storage()
        .ref(`Dp/${imageData.assets[0].fileName}`)
        .putFile(imageData.assets[0].uri)
        .then(snapshot => {
          console.log(
            `${imageData.assets[0].fileName} has been successfully uploaded.`,
          );
        })
        .catch(e => console.log('uploading image error => ', e));
      let imageRef = storage().ref(`Dp/${imageData.assets[0].fileName}`);
      await imageRef
        .getDownloadURL()
        .then(async url => {
          //from url you can fetched the uploaded image easil

          setImage(url);
          let user1 = user;

          user1.photo = url;
          user1.name = myName;
          user1.City = City;
          firebase
            .firestore()
            .collection('Authuntication')
            .doc(user1.uid)
            .update(user1);

          AsyncStorage.setItem('@user_data', JSON.stringify(user1));
          setLoadingS(false);
          getData();
          setModalVisible(!modelVisible);
          if(editProfile){
            MainProps.navigation.navigate('Main_tab')
          }
        })
        .catch(e => {
          setLoadingS(false);
          alert(e);
          if(editProfile){
            MainProps.navigation.navigate('Main_tab')
          }
        });

      setLoadingS(false);

      return;
    }

    if (name !== myName) {
      let user1 = user;

      user1.name = myName;
      AsyncStorage.setItem('@user_data', JSON.stringify(user1));

      firebase
        .firestore()
        .collection('Authuntication')
        .doc(user1.uid)
        .update(user1)
        .then(() => 
        {setLoadingS(false)
        
        getData();
        setModalVisible(!modelVisible);
        if(editProfile){
          MainProps.navigation.navigate('Main_tab')
        }}
        
        );
    }

    let user1 = user;
    user1.City = City;
    AsyncStorage.setItem('@user_data', JSON.stringify(user1));

    firebase
      .firestore()
      .collection('Authuntication')
      .doc(user1.uid)
      .update(user1)
      .then(() =>
      { setLoadingS(false)
      if(editProfile){
        MainProps.navigation.navigate('Main_tab')
      }
    
      getData();
      setModalVisible(!modelVisible);
    }
      );

  };

  if (modelVisible === true || (editProfile !==undefined && editProfile==true )) {
    return (
      <View style={{flex: 1}}>
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
        <ScrollView>
          <View style={{flex: 1, display: 'flex', alignContent: 'center'}}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '90%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{marginTop: 10, fontSize: 20, color: Global.color}}>
                  Manage Your Profile
                </Text>
              </View>
              <Icon
                onPress={() => {
                  editProfile?
                  MainProps.navigation.goBack()
                  :
                  setModalVisible(false)
                }}
                name="times"
                size={20}
                style={{marginTop: 20, marginRight: 20}}
                color={Global.color}
              />
            </View>

            <Image style={styles.avatar1} source={{uri: image}} />

            <Icon
              name="user-edit"
              onPress={() => chooseFile('photo')}
              size={20}
              style={{marginLeft: '60%', marginTop: -40, marginBottom: 20}}
              color="#000"
            />

            <View
              style={{
                width: '80%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginLeft: '11%',
                marginTop: 30,
              }}>
              <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>
                Name
              </Text>
            </View>

            <TextInput
              style={styles.edit}
              onChangeText={code => setMyname(code)}
              underlineColorAndroid="#f000"
              placeholder={myName}
              placeholderTextColor="#000"
              blurOnSubmit={true}
              keyboardType="name-phone-pad"
              defaultValue={myName}
              maxLength={40}
            />
            <Text style={{marginLeft: 40, color: 'red', marginTop: 0}}>
              {nameErr}
            </Text>
            <View
              style={{
                width: '80%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginLeft: '11%',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>
                City
              </Text>
            </View>

            <TextInput
              style={styles.edit}
              onChangeText={code => setCity(code)}
              underlineColorAndroid="#f000"
              placeholder={City}
              placeholderTextColor="#000"
              blurOnSubmit={true}
              keyboardType="name-phone-pad"
              defaultValue={City}
              maxLength={40}
            />

            <Text style={{marginLeft: 40, color: 'red', marginTop: 0}}>
              {CityErr}
            </Text>

            <TouchableOpacity
              style={styles.Update}
              activeOpacity={0.5}
              onPress={() => {
                UpdateNode();
              }}>
              <Text style={{color: '#FFFFFF'}}>Updated</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      // </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        // translucent
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.251)"
      />
      <ImageBackground
        style={{width: '100%', height: 200}}
        source={{uri: `${arr[random].image}`}}>
        <View style={styles.header}></View>
      </ImageBackground>

      <Image style={styles.avatar} source={{uri: image}} />

      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#000',
          width: '100%',
          textAlign: 'center',
          marginTop: 75,
        }}>
        {name}
      </Text>

      <Text
        style={{
          fontSize: 13,
          fontWeight: 'bold',
          color: '#000',
          width: '100%',
          textAlign: 'center',
          marginTop: 5,
        }}>
        {Email}
      </Text>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          {/* <Text style={styles.name}>{myName}</Text> */}
          <View style={{marginTop: 0, width: '100%'}}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                setModalVisible(true);
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="edit"
                  size={17}
                  style={{padding: 10}}
                  color="#000"
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    padding: 10,
                    marginLeft: -9,
                  }}>
                  Edit Profile
                </Text>
              </View>

              {/* <Icon
                name="arrow-right"
                size={18}
                style={{padding: 10}}
                color="#000"
              /> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                logout();
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="sign-out-alt"
                  size={17}
                  style={{padding: 10}}
                  color="#000"
                />
                <Text style={{fontSize: 15, color: '#000'}}>Logout</Text>
              </View>

              {/* <Icon
                name="arrow-right"
                size={18}
                style={{padding: 10}}
                color="#000"
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "#00BFFF",
    height: 200,
    display: 'flex',
    alignItems: 'flex-end',

    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  header1: {
    // backgroundColor: "#00BFFF",
    // height:200,
    display: 'flex',
    alignItems: 'flex-end',

    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 140,
    elevation: 4,
  },

  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    // flex: 1,
    alignItems: 'center',
    padding: 0,
    marginTop: 0,
  },
  name: {
    fontSize: 28,
    color: '#00BFFF',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    width: '100%',
    // backgroundColor: "#00BFFF",
    paddingHorizontal: 10,
    borderBottomWidth: 0.2,
    borderColor: 'grey',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#000',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },

  buttonStyle1: {
    width: 140,
    backgroundColor: '#841584',
    color: '#FFFFFF',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  buttonTextStyle: {
    color: '#000',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#f8f8ff',
    borderColor: '#000',
  },
  inputStyle2: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    backgroundColor: '#f8f8ff',
    borderColor: '#000',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  edit: {
    width: '80%',
    height: 55,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#BB171C',
    marginTop: 30,
    fontSize: 15,
    paddingLeft: 10,
    marginHorizontal: '10%',
    color: '#000',
    marginTop: 5,
  },
  editAbout: {
    marginTop: 4,
    marginHorizontal: '10%',
    width: '80%',
    backgroundColor: '#a6a6a6',
    color: '#FFFFFF',
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10,
  },
  editLocation: {
    marginTop: 4,
    marginHorizontal: '10%',
    width: '80%',
    backgroundColor: '#a6a6a6',
    // color:'#FFFFFF',
    borderRadius: 10,
    minHeight: 100,
    padding: 10,
  },
  edit_2: {
    marginTop: 7,
    marginHorizontal: '5%',
    height: 90,
    width: '90%',
    backgroundColor: '#a6a6a6',
    color: '#FFFFFF',
    borderRadius: 10,
  },
  Update: {
    backgroundColor: Global.color,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#000',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    width: '80%',
    height: 40,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    // marginHorizontal: '30%',
    marginTop: 20,
    marginHorizontal: '10%',
  },
  avatar1: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 50,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GernelProfile);
