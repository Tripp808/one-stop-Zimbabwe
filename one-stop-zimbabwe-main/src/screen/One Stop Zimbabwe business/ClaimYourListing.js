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
import { get_event } from '../../store/acion/index';
import storage from "@react-native-firebase/storage";
import SweetAlert from "react-native-sweet-alert";
import Icon3 from 'react-native-vector-icons/Ionicons';
import { Global } from '../../assets/Global_Variable';
import FilePickerManager from 'react-native-file-picker';
import firestore, { firebase } from "@react-native-firebase/firestore";

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import More from '../More';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ClaimYourListing(Props) {

  // All other States
  let [random, setRandom] = useState(0)
  let claim_Business = Props.route.params.Business
let [user,setUser]=useState(undefined)
  console.log("uni", Props.route.params.Business);





  const isFocused = useIsFocused();
  let [loadingS, setLoadingS] = useState(false);








  useEffect(() => {
    getData();
  });
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    if (user != undefined) {
      setUser(user)
      // if(user.Business){
      //   alert('You have Already one Registered Business as a Owner!')
      //   Props.navigation.navigate('Search');
      // }
    } else {
    }
    // if (user.Business == true && user.Business != undefined) {


    // } else {
    //   alert('You have no any register business')
    //   Props.navigation.navigate('More');
    // }

  };



  // select PlaceMent





  // Document Section
  let [Document, setDocument] = useState([undefined, undefined, undefined, undefined]);
  let [headings, setHeadings] = useState(['Certificate of incorporation', 'Attach CR6 (former CR14- which lists company directors and secretary)', 'Attach CR5 (which lists the company & email address)', 'Attach ID of Director 1', 'Attach ID of Director 2'])
  let [Validation, setValidation] = useState(['', '', '', '', '']);

  let [Image_Validity, setImage_Validity] = useState('');
  // const chooseFile = (type,state) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 500,
  //     maxHeight: 550,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode == 'permission') {
  //       alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode == 'others') {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     state({
  //       fileName: response.assets[0].fileName,
  //       uri: response.assets[0].uri
  //     });
  //   });
  // };


  // Document1 Section
  const chooseFile = (state) => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {


        let all = Document
        all[state] = {
          fileName: response.fileName,
          uri: response.path
        }


        setDocument(all)

        setRandom(Math.random() * 100)
      }
    });

  };




  let ResetValidity = () => {
    setValidation(['', '', '', '', ''])
  };

  let ClearFields = () => {
    setDocument(undefined, undefined, undefined, undefined, undefined)
  };
  let Check_validity = () => {
    ResetValidity();
    if (Document[0] == undefined || Document[1] == undefined || Document[2] == undefined || Document[3] == undefined) {
      let a = ['', '', '', '', '']
      if (Document[0] == undefined) {

        a[0] = 'Required'

      }

      if (Document[1] == undefined) {

        a[1] = 'Required'

      }


      if (Document[2] == undefined) {

        a[2] = 'Required'

      }


      if (Document[3] == undefined) {

        a[3] = 'Required'

      }


      setValidation(a)

      return;
    }




    UploadFiles(Document)
  };





  let UploadFiles = async (Images_Data) => {



    console.log(">>>>>>>>>>>>>.",Images_Data);
    let total = Images_Data.length;
    let urls = [];
    let check = 0;
    if (Images_Data.length == 0) {
      alert('Please Select  First to Upload');
      return;
    }

    setLoadingS(true);
    Images_Data.map(async (v, i) => {
      if (v !== undefined) {
        await storage()
          .ref(`Claim_Your_Listing/${v.fileName}`)
          .putFile(v.uri)
          .then(async snapshot => {
            console.log(`${v.fileName} has been successfully uploaded.`);
            let imageRef = storage().ref(`Claim_Your_Listing/${v.fileName}`);
            await imageRef
              .getDownloadURL()
              .then(async url => {
                //from url you can fetched the uploaded image easil
                urls.push(url);
                check++;
                console.log(check, total);



                if (check == total) {
                  console.log('Uploaded All images', urls);

                  firestore()
                    .collection('Claim_requests')
                    .doc(claim_Business.uid).set({
                      title: claim_Business.name,
                      Profile_type: claim_Business.Profile_Type,
                      phone: claim_Business.phone,
                      user_uid: claim_Business.user_uid,
                      Business_uid: claim_Business.uid,
                      Documents: urls,
                      Submit_By:user.uid
                    }).then(() => {
                      firestore()
                        .collection('All_Business')
                        .doc(claim_Business.uid).update({
                          claimRequestProgess: true
                        }).then(() => {
                          setLoadingS(false)
                          Props.navigation.navigate('Main_tab')
                          SweetAlert.showAlertWithOptions(
                            {
                              title: 'Sucess',
                              subTitle: 'Your request has been submitted successfully. We will approve your business within 48-72hours once we have verified your documents. Kindly contact us for any queries.',
                              confirmButtonTitle: 'OK',
                              confirmButtonColor: '#000',
                              otherButtonTitle: 'Cancel',
                              otherButtonColor: '#dedede',
                              style: 'success',
                              cancellable: true,
                            },
                            callback => {
                              ClearFields();

                            },
                          );
                        })
                    })

                }
              })
              .catch(e => {
                alert(e);
                setLoadingS(false);
              });
          })
          .catch(e => {
            console.log('uploading image error => ', e)
            setLoadingS(false)
          }

          );
      }

    });
  };



  return (

    claim_Business !== {} ?
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
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

            <View
              style={{
                ...styles.nav,
                backgroundColor: Global.color,
              }}>
              <Icon3
                onPress={() => Props.navigation.goBack()}

                // MyownSelect", {
                //   navigate: "Edit_AdvertizeSelected"
                // }
                name="close-outline"
                size={30}
                style={{
                  color: '#FFFFFF',
                }}
              />

              <Text style={styles.navHeading}>Claim your listing</Text>

              <TouchableOpacity
                onPress={() => Check_validity()}
                activeOpaBusiness={0.8}
                style={styles.sendTouch}>
                <Text style={styles.sendNav}>Submit</Text>
              </TouchableOpacity>
            </View>



            <TouchableOpacity
              onChangeText={e => setTitle(e)}
              // onPress={() =>
              //   Props.navigation.navigate("MyownSelect", {
              //     navigate: "Edit_AdvertizeSelected"
              //   })}
              style={{
                ...styles.input1,
                marginTop: 10,
              }}
            // defaultValue={business_show.name}

            >

              <Text style={{ color: '#000', fontSize: 15 }}>
                {claim_Business.name}
              </Text>

            </TouchableOpacity>

           

            <View style={styles.mainBox}>

              {headings.map((v, i) => {
                return (


                  <TouchableOpacity
                    onPress={() => chooseFile(i)}
                    style={{ width: '49%', height: 140, ...styles.center }}>
                    <Image
                      style={{ width: '100%', height: 90, resizeMode: 'contain' }}
                      source={{
                        // uri: '',
                        uri: Document[i] == undefined ? 'https://i.pinimg.com/originals/e2/6f/33/e26f33f35d71a5c5c23b8291d7a2b212.png' : 'https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png'
                      }}
                    />
                    <Text style={{ fontSize: 11, color: Validation[i] == '' ? 'grey' : 'red', textAlign: 'center', width: '90%' }}>{v}</Text>
                  </TouchableOpacity>
                )
              })}



            </View>
           



            <View style={styles.bullets}>
              <Text style={{ color: 'grey', fontSize: 14 }}>
                ●
              </Text>
              <Text style={{ ...styles.Validation, color: 'grey' ,marginTop:0}}>
                Attach company documents such as CR14 and ID – to show that you are the owner of the company
              </Text>
            </View>


          </>
        </View>


      </ScrollView>
      :
      Props.navigation.goBack()
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

  input1: {
    width: '96%',
    marginLeft: '2%',

    marginBottom: 10,
    height: 40,

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
    textAlign: 'left',
    fontSize: 13,
    marginLeft: '2%'
  },
  bullets: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '5%'
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
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10

  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
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
    business_data: state.business,


  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_event: (setLoadingS, user, business) => dispatch(get_event(setLoadingS, user, business)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClaimYourListing);
