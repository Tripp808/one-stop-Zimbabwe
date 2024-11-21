import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SweetAlert from "react-native-sweet-alert";
import { log } from 'react-native-reanimated';
import { CardAnimationContext } from '@react-navigation/stack';

//*********************************************************************************

// ================================================================

const onFacebookButtonPress = async (setLoadingS, setresponse_Valid, Props) => {
  // setLoadingS(true)
  // Logout();
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  setLoadingS(true);
  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  auth()
    .signInWithCredential(facebookCredential)
    .then(user => {
      firestore()
        .collection('Authuntication')
        .doc(user.user.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            console.log('Already Exist ', documentSnapshot.data());

            const storeData = async value => {
              try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem('@user_data', jsonValue).then(() => {
                  setLoadingS(false);
                  Props.navigation.navigate('Main_tab');
                });
              } catch (e) {
                // saving error
                alert(e);
              }
            };

            storeData(documentSnapshot.data());
          } else {
            let obj = {
              name: user.user.displayName,
              Email: user.user.email,
              City: '',
              Country: '',
              photo: user.user.photoURL,
              uid: user.user.uid,
              Given_Reviews_no: 0,
              Business: false,
              Coustomer: false,
              Check_In: []
            };
            console.log('Store Firestore', obj);

            firestore()
              .collection('Authuntication')
              .doc(user.user.uid)
              .set(obj)
              .then(() => {
                const storeData = async value => {
                  try {
                    const jsonValue = JSON.stringify(value);
                    await AsyncStorage.setItem('@user_data', jsonValue).then(
                      () => {
                        setLoadingS(false);
                        Props.navigation.navigate('Main_tab');
                      },
                    );
                  } catch (e) {
                    // saving error
                    alert(e);
                    console.log(e);
                  }
                };

                storeData(obj);
              })
              .catch(error => {
                alert(error);
                // setresponse_Valid(error);
              });
          }
        });
    });
};

//*********************************************************************************

// ================================================================
GoogleSignin.configure({
  webClientId:
    '5848750872-r90vlat8fuutt2vbv37etnni4a766sl3.apps.googleusercontent.com',
});

async function onGoogleButtonPress(setLoadingS, setresponse_Valid, Props) {
  try {
    await GoogleSignin.revokeAccess();

    await GoogleSignin.signOut();
  } catch (error) {
    console.log(error);
  }

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  setLoadingS(true);
  return auth()
    .signInWithCredential(googleCredential)
    .then(user => {
      firestore()
        .collection('Authuntication')
        .doc(user.user.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            console.log('Already Exist ', documentSnapshot.data());
            const storeData = async value => {
              try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem('@user_data', jsonValue).then(() => {
                  setLoadingS(false);
                  Props.navigation.navigate('Main_tab');
                });
              } catch (e) {
                // saving error
                alert(e);
              }
            };

            storeData(documentSnapshot.data());
          } else {
            let obj = {
              name: user.user.displayName,
              Email: user.user.email,
              City: '',
              Country: '',
              photo: user.user.photoURL,
              uid: user.user.uid,
              Given_Reviews_no: 0,
              Business: false,
              Coustomer: false,
              Check_In: []
            };
            console.log('Store Firestore', obj);
            firestore()
              .collection('Authuntication')
              .doc(user.user.uid)
              .set(obj)
              .then(() => {
                const storeData = async value => {
                  try {
                    const jsonValue = JSON.stringify(value);
                    await AsyncStorage.setItem('@user_data', jsonValue).then(
                      () => {
                        setLoadingS(false);
                        Props.navigation.navigate('Main_tab');
                      },
                    );
                  } catch (e) {
                    // saving error
                    alert(e);
                    console.log(e);
                  }
                };

                storeData(obj);
              })
              .catch(error => {
                alert(error);
                // setresponse_Valid(error);
              });
          }
        });
    });
}

//  *********************************************************************************

// ================================================================

let Logout = async () => {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

const get_data = (setLoadingS, setRefreshing) => {
  return dispatch => {
    if (setRefreshing !== undefined) {
      setRefreshing(true)
    } else {

      setLoadingS(true);
    }
    let All_Business = []

    let Home_Monitize = []
    let Categories_Monitize = []
    let New_business = [];

    firestore()
      .collection('All_Business')
      .onSnapshot(querySnapshot => {

        if (setRefreshing !== undefined) {
          setRefreshing(false)
        } else {
          setLoadingS(false);

        }
        All_Business.length = 0
        Home_Monitize.length = 0
        Categories_Monitize.length = 0
        New_business.length = 0
        querySnapshot.forEach(documentSnapshot => {
          All_Business.push(documentSnapshot.data())

          // let updated_checkIns=documentSnapshot.data().CheckIns.filter(e=>e.time>= e.time+14400000)

          // console.log("UPDATED>>>>>>>>",updated_checkIns);
          // if(updated_checkIns.length>0){
          //   firestore()
          // .collection('All_Business')
          // .doc(documentSnapshot.data().uid)
          // .update({
          //   CheckIns:updated_checkIns
          // })
          // }



          if (documentSnapshot.data().new == false) {
            // console.log("Updated Data", documentSnapshot.data().name, documentSnapshot.data().new);


          } else {

            if (new Date().getTime() < documentSnapshot.data().exp) {
              New_business.push(documentSnapshot.data());

            } else {

              firestore()
                .collection('All_Business')
                .doc(documentSnapshot.data().uid)
                .update({
                  new: false,
                }).then(() => {


                })
            }

          }



          if (documentSnapshot.data().Home_Monitize || documentSnapshot.data().Categories_Monitize) {
            let start_Date_Home = documentSnapshot.data().Home_Monitize_Start_Time
            let End_Date_Home = documentSnapshot.data().Home_Monitize_End_Time
            let today = new Date().getTime()

            let start_Date_Categories = documentSnapshot.data().Categories_Monitize_Start_Time
            let End_Date_Categories = documentSnapshot.data().Categories_Monitize_End_Time


            console.log(today > start_Date_Categories && today < End_Date_Categories, documentSnapshot.data().name);
            if (today > start_Date_Home && today < End_Date_Home) {

              Home_Monitize.push(documentSnapshot.data());

            }
            else {
              firestore()
                .collection('All_Business')
                .doc(documentSnapshot.data().uid)
                .update({
                  Home_Monitize: false,
                  Home_Monitize_image: ''
                }).then(() => {


                }).catch((e) => {

                })

            }



            if (today > start_Date_Categories && today < End_Date_Categories) {

              Categories_Monitize.push(documentSnapshot.data());

            } else {
              firestore()
                .collection('All_Business')
                .doc(documentSnapshot.data().uid)
                .update({
                  Categories_Monitize: false,
                  Categories_Monitize_image: ''
                }).then(() => {

                }).catch((e) => {
                })

            }


          }








        });




        // Sort Alphabatically 
        Home_Monitize.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
        Categories_Monitize.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);

        // Monitize_Business.sort((x, y) => Number(y.Categories_Monitize) - Number(x.Categories_Monitize));



        // Sort Monitize
        // All_Business.sort((x, y) => Number(y.Monitize) - Number(x.Monitize));
        All_Business.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);



        // New_business.sort(function (a, b) { return b.exp - a.exp });

        // sort by date
        New_business.sort(function (a, b) { return b.Registered_date.toDate() - a.Registered_date.toDate() });

        // dispatch({
        //   type: 'Business_Nodes',
        //   payload: Monitize_Business,
        // });

        dispatch({
          type: 'Home_Monitize',
          payload: Home_Monitize,
        });

        dispatch({
          type: 'Categories_Monitize',
          payload: Categories_Monitize,
        });


        dispatch({
          type: 'Business_New',
          payload: New_business,
        });

        dispatch({
          type: 'All_Business_Nodes_newOld',
          payload: All_Business,
        });





      });
  };
};


const check_user = () => {

  return async dispatch => {


    let user = JSON.parse(await AsyncStorage.getItem('@user_data'))
    if (user !== undefined) {
      firestore()
        .collection('Authuntication').doc(user.uid)
        .onSnapshot((a) => {
          console.log("Check update>>>>>>>>>>", a.data());
          if (a.data() !== user) {
            AsyncStorage.setItem('@user_data', JSON.stringify(a.data()))
          }
        })
    }

  }
}


const add_event = async (setLoadingS, setbutton_show, v, obj, uid) => {
  console.log(uid);
  try {

    await storage()
      .ref(`Add_event/${v.fileName}`)
      .putFile(v.uri)
      .then(async snapshot => {


        let imageRef = storage().ref(`Add_event/${v.fileName}`);
        await imageRef
          .getDownloadURL()
          .then(async url => {
            obj.url = url

            firestore()
              .collection('All_Business')
              .doc(uid)
              .update({
                events: firebase.firestore.FieldValue.arrayUnion(obj),
              }).then(() => {

                setLoadingS(false)
                setbutton_show(false)

              })




          })
      })




  } catch (error) {
    alert("Error", error)
    console.log(error);
    setLoadingS(false)
    setbutton_show(false)
  }

}





const Update_Event = async (setLoadingS, setbutton_show, v, obj, uid, select_image, Props) => {
  try {
    console.log(">>>>>>>>>", select_image);

    firestore()
      .collection('All_Business')
      .doc(uid)
      .update({
        events: firebase.firestore.FieldValue.arrayRemove(Props.route.params.Event_Details),
      }).then(async () => {


        if (select_image) {
          await storage()
            .ref(`Add_event/${v.fileName}`)
            .putFile(v.uri)
            .then(async snapshot => {


              let imageRef = storage().ref(`Add_event/${v.fileName}`);
              await imageRef
                .getDownloadURL()
                .then(async url => {
                  obj.url = url

                  firestore()
                    .collection('All_Business')
                    .doc(uid)
                    .update({
                      events: firebase.firestore.FieldValue.arrayUnion(obj),
                    }).then(async () => {
                      setLoadingS(false)
                      setbutton_show(false)
                      Props.navigation.navigate('More')
                    })
                })
            })

        }
        else {
          firestore()
            .collection('All_Business')
            .doc(uid)
            .update({
              events: firebase.firestore.FieldValue.arrayUnion(obj),
            }).then(async () => {
              setLoadingS(false)
              setbutton_show(false)
              Props.navigation.navigate('More')

            })
        }



      })





  } catch (error) {
    alert("Error", error)
    console.log(error);
    setLoadingS(false)
    setbutton_show(false)
  }

}





const get_event = (setLoadingS, uid, type) => {
  console.log("GEt uid>>>>>>>>.", uid);
  return dispatch => {

    try {

      console.log("TRY RESPONSE>>>>>>>>>>>");
      let arr = [];
      let arr1 = [];
      firestore()
        .collection('All_Business')
        .where('uid', '==', uid)
        .onSnapshot(function (querySnapshot) {
          arr = []
          arr1 = []
          console.log(querySnapshot);
          querySnapshot.forEach((a) => {
            if (type == 'business') {
              arr.push(a.data())
            }
            else {
              arr1 = a.data().events
            }

          });
          dispatch({
            type: 'business',
            payload: arr,
          });

          dispatch({
            type: 'get_event',
            payload: arr1,
          });


          console.log(">>", arr1);
          setLoadingS(false);

        })



    } catch (error) {

      alert("Error", error)
      console.log(error);
      setLoadingS(false)

    }


  };
};





const promotion_event = async (setLoadingS, setbutton_show, obj, uid) => {

  try {


    console.log(obj)
    const usersRef = firestore().collection('promotion_event').where("unique_Event_ID", "==", obj.unique_Event_ID)

    usersRef.get()
      .then(function (querySnapshot) {
        let Already_Promoted = [];
        querySnapshot.forEach((a) => {
          console.log("Check Already Montitized>>>>>>>>", a.data());
          Already_Promoted.push({ data: a.data(), id: a.id });
        });
        if (Already_Promoted.length > 0) {
          alert("This Event is already Advertized!")
          setLoadingS(false)
          setbutton_show(false)
          return
        }
        else {
          firestore()
            .collection('promotion_event').doc(obj.unique_Event_ID)
            .set(obj)
            .then(() => {
              setLoadingS(false)
              setbutton_show(false)
            })

        }
      }).catch((e) => {
        alert("Error", e)
        setLoadingS(false)
        setbutton_show(false)
      })




  } catch (error) {
    alert("Error", error)
    console.log(error);
    setLoadingS(false)
    setbutton_show(false)
  }



}




const get_promotion_event = (setLoadingS) => {
  return dispatch => {




    firestore()
      .collection('promotion_event')
      .onSnapshot(function (querySnapshot) {

        let arr1 = [];
        querySnapshot.forEach((a) => {
          let start_Date = a.data().Montize_Start.toDate().getTime()
          let End_Date = a.data().Montize_Finish.toDate().getTime()
          let today = new Date().getTime()
          if (today > start_Date && today < End_Date) {

            arr1.push(a.data())
          }
          else {
            firestore()
              .collection('promotion_event').doc(a.id).delete()
          }


        });
        dispatch({
          type: 'get_promotion_event',
          payload: arr1
        });
        setLoadingS(false);
      })



  };
};





const Send_feedback = (
  RatingObj,
  Images,
  setLoadingS,
  Props,
  Received_Reviews_no,
  old_rating
) => {
  return async (dispatch) => {




    let total = Images.length;
    let urls = [];
    let check = 0;
    setLoadingS(true);
    if (Images.length == 0) {
      // alert("Please Select Image First to Upload");

      let Buser = JSON.parse(await AsyncStorage.getItem("@user_data"));
      let OldRatings = old_rating;
      RatingObj.Images = urls
      OldRatings[Math.floor(RatingObj.Rating) - 1] =
        OldRatings[Math.floor(RatingObj.Rating) - 1] + 1;

      firestore()
        .collection("Feedback")
        .add(RatingObj)
        .then(() => {
          firestore()
            .collection("Authuntication")
            .doc(RatingObj.Sender)
            .update({
              Given_Reviews_no: Buser.Given_Reviews_no + 1,
            })
            .then(() => {
              Buser.Given_Reviews_no = Buser.Given_Reviews_no + 1;
              //   // Store udpated Data to Everywhere

              firestore()
                .collection("All_Business")
                .doc(RatingObj.Receiver)
                .update({
                  Received_Reviews_no:
                    JSON.parse(Received_Reviews_no) + 1,
                  OverAll_Rating: OldRatings,
                })
                .then(async () => {


                  await AsyncStorage.setItem(
                    "@user_data",
                    JSON.stringify(Buser)).then(() => {

                      setLoadingS(false);
                      SweetAlert.showAlertWithOptions(
                        {
                          title: "Sucess",
                          subTitle: "Uploaded Sucessfully!",
                          confirmButtonTitle: "OK",
                          confirmButtonColor: "#000",
                          otherButtonTitle: "Cancel",
                          otherButtonColor: "#dedede",
                          style: "success",
                          cancellable: true,
                        },
                        (callback) => {
                          console.log(urls);
                          Props.navigation.navigate("Main_tab");
                        })
                    })
                })
            });
        });

      return;
    } else {


      Images.map(async (v, i) => {
        console.log("Vfu>>>>>>>>>>", v);
        await storage()
          .ref(`Feedback/${v.fileName}`)
          .putFile(v.uri)
          .then((snapshot) => {
            console.log(`${v.fileName} has been successfully uploaded.`);
          })
          .catch((e) => console.log("uploading image error => ", e));
        let imageRef = storage().ref(`Feedback/${v.fileName}`);
        await imageRef
          .getDownloadURL()
          .then(async (url) => {
            urls.push(url);
            check++;


            console.log("Uploaded All images", check, total);
            if (check == total) {
              let Buser = JSON.parse(await AsyncStorage.getItem("@user_data"));
              let OldRatings = old_rating;
              RatingObj.Images = urls
              OldRatings[Math.floor(RatingObj.Rating) - 1] =
                OldRatings[Math.floor(RatingObj.Rating) - 1] + 1;

              firestore()
                .collection("Feedback")
                .add(RatingObj)
                .then(() => {
                  firestore()
                    .collection("Authuntication")
                    .doc(RatingObj.Sender)
                    .update({
                      Given_Reviews_no: Buser.Given_Reviews_no + 1,
                    })
                    .then(() => {
                      Buser.Given_Reviews_no = Buser.Given_Reviews_no + 1;
                      //   // Store udpated Data to Everywhere

                      firestore()
                        .collection("All_Business")
                        .doc(RatingObj.Receiver)
                        .update({
                          Received_Reviews_no:
                            JSON.parse(Received_Reviews_no) + 1,
                          OverAll_Rating: OldRatings,
                        })
                        .then(async () => {


                          await AsyncStorage.setItem(
                            "@user_data",
                            JSON.stringify(Buser)).then(() => {

                              setLoadingS(false);
                              SweetAlert.showAlertWithOptions(
                                {
                                  title: "Sucess",
                                  subTitle: "Uploaded Sucessfully!",
                                  confirmButtonTitle: "OK",
                                  confirmButtonColor: "#000",
                                  otherButtonTitle: "Cancel",
                                  otherButtonColor: "#dedede",
                                  style: "success",
                                  cancellable: true,
                                },
                                (callback) => {
                                  console.log(urls);
                                  Props.navigation.navigate("Main_tab");
                                })
                            })
                        })
                    });
                });

            }
          })
          .catch((e) => {
            alert("Error", e);
            console.log(e);
            setLoadingS(false);
          });
      });
    }
  };
};

const Get_relevant_review = (uid, setLoadingS) => {
  return (dispatch) => {



    firestore()
      .collection("Feedback")
      .where("Receiver", "==", uid)
      .where("approved", "==", true)
      .get()
      .then(function (querySnapshot) {
        let Reviews = [];
        querySnapshot.forEach((a) => {
          Reviews.push({ data: a.data(), id: a.id });
          console.log("snapshoot>>>>..", a.data());
        });

        var Business = new Object();
        firestore()
          .collection("Authuntication")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((a) => {
              Business[[a.id]] = a.data();
            });
            ``
            let modified = [];
            Reviews.map((v, i) => {
              console.log(v);
              v.data.name = Business[v.data.Sender].name;
              v.data.User_Dp = Business[v.data.Sender].photo;
              v.data.Given_Reviews_no = Business[v.data.Sender].Given_Reviews_no;
              modified.push(v);
            });

            // console.log("Modified>>>>>>>", Reviews);

            dispatch({
              type: "Relevant_Reveiws",
              payload: modified,
            });

            setLoadingS(false);
          });
      });
  };
};




const get_business = (user, setLoadingS) => {
  return (dispatch) => {

    try {
      let arr = [];
      let Relevant_Business_type;
      let review = 0;
      let photos = 0;
      if (setLoadingS !== undefined) {
        setLoadingS(true)
      }
      firestore()
        .collection('All_Business')
        .where('user_uid', '==', user.uid)
        .onSnapshot(function (querySnapshot) {
          arr.length = 0
          review = 0
          photos = 0
          Relevant_Business_type = {}
          querySnapshot.forEach((a) => {

            arr.push(a.data())
            review = review + a.data().Received_Reviews_no
            photos = photos + a.data().Images.length


            if (a.data().type == 'business') {
              Relevant_Business_type = a.data()
            }
          });
          // setLoadingS(false)
          dispatch({
            type: "Relevant_Business",
            payload: arr,
          })


          dispatch({
            type: "Business_Info_review_photos",
            payload: {
              photo: photos,
              review: review
            },
          })

          dispatch({
            type: "Relevant_Business_type",
            payload: Relevant_Business_type,
          })
          if (setLoadingS !== undefined) {
            setLoadingS(false)

          }
        })
    } catch (error) {
      alert(error)
    }

  }
}







const Empty_store = (Props) => {
  return (dispatch) => {
    AsyncStorage.removeItem("@user_data");


    dispatch({
      type: 'Empty_store',
      payload: {

      }
    });
  };
};
//  *********************************************************************************



// ******************************************************************************************
const get_More_info = () => {
  console.log("get more infor >>>>>>>>");
  return (dispatch) => {

    firestore()
      .collection('App_data').doc('Limits').get().then((snapshot) => {
        dispatch({
          type: 'Limits',
          payload: snapshot.data()
        })
      })


  };
};
// ================================================================





// ******************************************************************************************
const Add_Intrested_People = (uid, Event, intrested, setLoadingS, user_id) => {

  return (dispatch) => {

    firestore()
      .collection('All_Business')
      .doc(uid)
      .update({
        events: firebase.firestore.FieldValue.arrayRemove(Event),
      }).then(async () => {
        Event[intrested].push(user_id)

        firestore()
          .collection('All_Business')
          .doc(uid)
          .update({
            events: firebase.firestore.FieldValue.arrayUnion(Event),
          }).then(async () => {
            firestore()
              .collection('promotion_event').doc(Event.uniqueID)
              .update({ Event_Details: Event })
              .then(() => {
                setLoadingS(false)
              }).catch((e) => {
                console.log(e)
                setLoadingS(false)
              })

          }).catch((e) => {
            setLoadingS(false)

          })



      }).catch((e) => {
        setLoadingS(false)

      })




  };
};
// ================================================================



const Refrel_Event = (setLoadingS, uid, Props) => {
  return (dispatch) => {

    try {


      const usersRef = firestore().collection('promotion_event').doc(uid)

      usersRef.get()
        .then(function (querySnapshot) {
          console.log("AD>>>>>>", querySnapshot);
          if (querySnapshot.exists) {
            Props.navigation.navigate("EventDetails", { detail: querySnapshot.data().Event_Details })
            setLoadingS(false)
          }

        }).catch((e) => {
          alert("Error", e)
          console.log(e);
          setLoadingS(false)
        })




    } catch (error) {
      alert("Error", error)
      console.log(error);
      setLoadingS(false)
    }
  }
}

// ================================================================



const Refrel_Business = (setLoadingS, uid, Props) => {
  return (dispatch) => {

    try {


      const usersRef = firestore().collection('All_Business').doc(uid)

      usersRef.get()
        .then(function (querySnapshot) {
          console.log("AD>>>>>>", querySnapshot);
          if (querySnapshot.exists) {

            Props.navigation.navigate("BusinessAllDetails", {
              Details: uid,
              from: "other"
            });
            setLoadingS(false)
          }

        }).catch((e) => {
          alert("Error", e)
          console.log(e);
          setLoadingS(false)
        })




    } catch (error) {
      alert("Error", error)
      console.log(error);
      setLoadingS(false)
    }
  }
}

export {
  get_data,
  onFacebookButtonPress,
  onGoogleButtonPress,
  Logout,
  add_event,
  get_event,
  promotion_event,
  get_promotion_event,
  Send_feedback,
  Get_relevant_review,
  get_business,
  Empty_store,
  get_More_info,
  Add_Intrested_People,
  Update_Event,
  Refrel_Event,
  Refrel_Business,
  check_user
};
