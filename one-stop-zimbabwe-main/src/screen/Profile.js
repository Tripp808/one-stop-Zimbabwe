import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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
} from "react-native";
import { get_data, get_business, Empty_store } from "../store/acion/index";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { arr, Global } from "../assets/Global_Variable";
import GernelProfile from "./Gernel Profile";
import LoginChekScree from "./LoginChekScree";
import { useIsFocused } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import SweetAlert from "react-native-sweet-alert";


function Profile(Props) {
  const isFocused = useIsFocused();
  let [random, setRandom] = useState(0);
  let [tab, setTab] = useState(false);
  let [loginCheck, setLoginCheck] = useState(undefined);
  let [Business_is, setBussiness_is] = useState(undefined);
  let [Coustomer_is, setCoustomer_is] = useState(undefined);
  let [user, setUser] = useState();
  let [PhotoModal, SetPhotoModal] = useState(false);
  let [Images, setImages] = useState([]);
  let [loadingS, setLoadingS] = useState(false);
  let [Goto_avaialablity, setGotoAvaialbity] = useState(undefined)
  let [Edit_photo, setPhotoEdit] = useState(false)
  let Get_Businesses = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));
    if (
      (user !== undefined &&
        user.Business == true &&
        user.Business != undefined) ||
      (user.Coustomer == true && user.Coustomer != undefined)
    ) {
      Props.get_business(user);
    }
  };

  // console.log("Specific Business>>>>>>>>", Props.specific_Business);
  let [Business_user, setBusiness_user] = useState({});
  let [gotoEdit, setGotoEdit] = useState(undefined)
  let [choose_Business, setChooseBusiness] = useState(false);
  let [Filter, setFilter] = useState("");
  let Businesses = Props.Relevant_Business.filter(
    (e) => e.name.toLowerCase().indexOf(Filter.toLowerCase()) !== -1
  );

  useEffect(() => {
    getData();
    Get_Businesses();
  }, [isFocused])

  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));
    if (user != undefined) {
      console.log("Getting user >>>>>>Profile ", user.Given_Reviews_no);
      setUser(user);
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
      Props.navigation.navigate("LoginCheckRestict");
    }
    if (
      (user.Business == true && user.Business != undefined) ||
      (user.Coustomer == true && user.Coustomer != undefined)
    ) {
      if (user.Business == true && user.Business != undefined) {
        setBussiness_is(true);
      }
      if (user.Coustomer == true && user.Coustomer != undefined) {
        setCoustomer_is(true);
      }

      // setGernel(false)
    } else {
      // setGernel(true);
      setBussiness_is(false);
      setCoustomer_is(false);
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 1000,
      maxHeight: 1050,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }

      let arr = Images;

      arr.push({
        image: response.assets[0].uri,
        file: response.assets[0],
        fileName: response.assets[0].fileName,
      });
      setImages(arr);
      setRandom(Math.random() * 1000);
    });
  };

  let UploadFiles = async () => {
    console.log(Props.Business_info.photo, Props.limit_controls);
    if (Props.Business_info.photo + Images.length > Props.limit_controls) {
      alert(`Image Limit Exceed! you just can choose ${Props.limit_controls} Per Business.Maybe You already Updload maximum images.Goto Edit Busienss and check!`)
      return
    }
    setGotoEdit(undefined)
    let total = Images.length;
    let urls = [];
    let check = 0;
    if (Images.length == 0) {
      alert("Please Select Image First to Upload");
      return;
    }
    setLoadingS(true);
    Images.map(async (v, i) => {
      await storage()
        .ref(`BusinessImages/${v.fileName}`)
        .putFile(v.image)
        .then((snapshot) => {
          console.log(`${v.fileName} has been successfully uploaded.`);
        })
        .catch((e) => console.log("uploading image error => ", e));
      let imageRef = storage().ref(`BusinessImages/${v.fileName}`);
      await imageRef
        .getDownloadURL()
        .then(async (url) => {
          urls.push(url);
          check++;

          firestore()
            .collection("All_Business")
            .doc(Business_user.uid)
            .update({
              Images: firebase.firestore.FieldValue.arrayUnion(url),
            });

          console.log("Uploaded All images", check, total);
          if (check == total) {

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
                setImages([]);
                SetPhotoModal(false);
                setChooseBusiness(false)
              }

            );
          }
        })
        .catch((e) => {
          alert(e);
          setLoadingS(false);
        });
    });
  };
  let RemoveME = (v) => {
    console.log("Remove>>>>>>>>>");
    let array = Images;

    const index = array.indexOf(v);
    if (index > -1) {
      // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }

    setImages(array);
    setRandom(Math.random() * 1000);
  };

  let logout_Business = async () => {
    Props.Empty_store(Props)
    // 
    // get_data();
    // Props.navigation.navigate("LoginCheckRestict");
  };

  let renderItem = (v) => {
    return (
      <View
        // key={}

        style={{
          ...styles.linkDiv,
          // backgroundColor: '#FFFFFF',
        }}
      >
        <TouchableOpacity
          onPress={() => {


            if (Goto_avaialablity) {
              setGotoAvaialbity(false);
              setChooseBusiness(false)
              Props.navigation.navigate("AddAvailibility", {
                uid: v.item.uid,

              })

              return
            }


            if (gotoEdit == true) {
              setChooseBusiness(false)
              Props.navigation.navigate("Edit_Business", {
                Business: v.item,
                photo: Edit_photo
              })
              return
            }
            if (gotoEdit == false) {
              setBusiness_user(v.item)
              SetPhotoModal(true)

            }
          }}
          activeOpacity={0.5}
          style={styles.card}
        >
          {v.item.Business_Dp !== undefined ? (
            <Image
              source={{
                uri: v.item.Business_Dp,
              }}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                borderRadius: 10,
              }}
            />
          ) : (
            <Image
              source={{
                uri: "https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193060544?k=20&m=1193060544&s=612x612&w=0&h=MI8y2q1HsY4TEAZD3tNCJN3bmc39N3pnFKC2KKNDUmE=",
              }}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                borderRadius: 10,
              }}
            />
          )}

          <View style={{width:'86%'}}>
            <Text
              style={{
                fontSize: 13,
                color: "#414141",

                fontFamily: "sans-serif-normal",
                fontWeight: "bold",
                marginLeft: 15,
              }}
            >
              {v.item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return loginCheck ? (
    <>
      {Coustomer_is || Business_is ? (
        <>
          <StatusBar
            barStyle={loadingS ? "dark-content" : "light-content"}
            backgroundColor="#000"
          />

          <Modal transparent={true} visible={loadingS}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(4, 4, 4, 0.474)",
              }}
            >
              <Image
                source={require("../assets/loadingS.gif")}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </Modal>

          <ScrollView style={{ flex: 1 }}>
            <View style={styles.avatarSection}>
              <Image
                source={{
                  uri: loginCheck
                    ? user.photo
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABODcYhAAEl463hAAAAAElFTkSuQmCC",
                }}
                style={styles.avatar}
              />

              <Text style={styles.head}>{loginCheck ? user.name : ""}</Text>

              {user.Business !== undefined && user.Business == true && Props.Business_info ?
                <View style={styles.row}>

                  <Icon1
                    name="star-box"
                    style={{ marginLeft: 4 }}
                    size={18}
                    color={"grey"}
                  />
                  <Text style={styles.iconText}>{user.Given_Reviews_no}</Text>

                  <Icon1
                    name="image"
                    style={{ marginLeft: 4 }}
                    size={18}
                    color={"grey"}
                  />
                  <Text style={styles.iconText}>
                    {Props.Business_info ? Props.Business_info.photo : ''}
                  </Text>
                </View> :
                <>
                </>}

              <View style={styles.row2}>
                <TouchableOpacity
                  onPress={() =>
                    Props.navigation.navigate("BusinessSelect", {
                      navigate: "Rating",
                    })
                  }
                  activeOpacity={0.8}
                  style={styles.center}
                >
                  <View style={styles.shadow}>
                    <Icon1 name="star-box" size={25} color={"#000"} />
                  </View>

                  <Text style={styles.bottomhead}>Add Review</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {

                    // setGotoEdit(false); setChooseBusiness(true) 

                    setGotoEdit(true);
                    setChooseBusiness(true)
                    setPhotoEdit(true)
                  }}
                  activeOpacity={0.8}
                  style={styles.center}
                >
                  <View style={styles.shadow}>
                    <Icon1 name="camera" size={25} color={"#000"} />
                  </View>

                  <Text style={styles.bottomhead}>Add Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Props.navigation.navigate("FriendCheciIn")}
                  activeOpacity={0.8}
                  style={styles.center}
                >
                  <View style={styles.shadow}>
                    <Icon1 name="check-decagram" size={25} color={"#000"} />
                  </View>

                  <Text style={styles.bottomhead}>Check-In</Text>
                </TouchableOpacity>
              </View>
            </View>
            {user.Business !== undefined && user.Business == true && Props.Business_info ?
              <>
                <View style={styles.bar}></View>

                <View style={styles.myimpact}>
                  <Text style={styles.head1}>My Impact</Text>

                  <View style={styles.tabs}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => setTab(false)}
                      style={{ ...styles.tab, opacity: tab ? 0.3 : 1 }}
                    >
                      <Text style={styles.tabheading}>Review</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => setTab(true)}
                      style={{ ...styles.tab, opacity: tab ? 1 : 0.3 }}
                    >
                      <Text style={styles.tabheading}>Photos</Text>
                    </TouchableOpacity>
                  </View>

                  {tab ? (
                    <View>
                      <View style={styles.boxRow}>
                        <View style={styles.boxShadow}>
                          <Text
                            style={{
                              ...styles.headingPara,
                              marginBottom: 5,
                              marginTop: 10,
                              textAlign: "left",
                            }}
                          >
                            Total Photos
                          </Text>
                          <Text style={{ ...styles.head1, marginTop: 0 }}>
                            {Props.Business_info ? Props.Business_info.photo : ''}
                          </Text>
                        </View>

                        {/* <View style={styles.boxShadow}>
                     <Text
                       style={{
                         ...styles.headingPara,
                         marginBottom: 5,
                         marginTop: 10,
                         textAlign: 'left',
                       }}>
                       View Last 90 Days
                     </Text>
                     <Text style={{ ...styles.head1, marginTop: 0 }}>9</Text>
                   </View> */}
                      </View>

                      <Text style={styles.boxText}>
                        Total photos you have uploaded in all the Businesses.
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          // setGotoEdit(false); setChooseBusiness(true)

                          setGotoEdit(true);
                          setChooseBusiness(true)
                          setPhotoEdit(true)
                        }}
                        style={styles.reveiwButton}
                      >
                        <Text style={styles.revewText}>Add a Photo</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.boxRow}>
                        <View style={styles.boxShadow}>
                          <Text
                            style={{
                              ...styles.headingPara,
                              marginBottom: 5,
                              marginTop: 10,
                              textAlign: "left",
                            }}
                          >
                            Vote all the Time
                          </Text>
                          <Text style={{ ...styles.head1, marginTop: 0 }}>{user.Given_Reviews_no}</Text>
                        </View>

                        <View style={styles.boxShadow}>
                          <Text
                            style={{
                              ...styles.headingPara,
                              marginBottom: 5,
                              marginTop: 10,
                              textAlign: "left",
                            }}
                          >
                            Public Reviews
                          </Text>
                          <Text style={{ ...styles.head1, marginTop: 0 }}>{Props.Business_info.review}</Text>
                        </View>
                      </View>

                      <Text style={styles.boxText}>
                        Look Like you don't Vote For Anyone Yet For Your Review ?
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setChooseBusiness(false)
                          Props.navigation.navigate("BusinessSelect", {
                            navigate: "Rating",
                          })
                        }
                        }
                        style={styles.reveiwButton}
                      >
                        <Text style={styles.revewText}>Write A Review</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View></>
              :
              <>
              </>
            }

            {/* <View style={styles.bar}></View> */}

            {/* <View style={styles.myimpact}>
             <Text style={styles.head1}>Recently Viewed</Text>
           </View>
           {[0, 1].map((v, i) => {
             return (
               <TouchableOpacity activeOpacity={0.8} key={i}>
                 <View style={styles.RecentlyViewed}>
                   <Image
                     source={{ uri: arr[i].image }}
                     style={styles.userImage}
                   />

                   <View style={styles.centerPart}>
                     <Text style={styles.heading}>Haris.</Text>

                     <Text style={styles.paraRecent}>
                       Haris. details for Business
                     </Text>
                   </View>

                   <Icon3 name="bookmark-outline" size={25} color={'grey'} />
                 </View>

                 <View style={styles.bar1}></View>
               </TouchableOpacity>
             );
           })} */}

            <View
              style={{ ...styles.bar, marginTop: 10, marginBottom: 20 }}
            ></View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.prefrences}
              onPress={() =>
                Props.navigation.navigate("GernelProfile", { Edit: true })
              }
            >
              <Icon3 name="person-circle-outline" size={25} color={"grey"} />

              <Text style={{ ...styles.heading, marginLeft: 10 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            <View style={styles.bar1}></View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.prefrences}
              onPress={() => {
                setGotoEdit(true);
                setChooseBusiness(true)
                setPhotoEdit(false)
              }}
            >
              <Icon3 name="business-outline" size={25} color={"grey"} />

              <Text style={{ ...styles.heading, marginLeft: 10 }}>
                Edit Businesses
              </Text>
            </TouchableOpacity>
            <View style={styles.bar1}></View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.prefrences}
              onPress={() => { setGotoAvaialbity(true); setChooseBusiness(true); setGotoEdit(undefined) }}
            >
              <Icon3 name="timer-outline" size={25} color={"grey"} />

              <Text style={{ ...styles.heading, marginLeft: 10 }}>
              Edit Working Hours
              </Text>
            </TouchableOpacity>

            <View style={styles.bar1}></View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.prefrences}
              onPress={() => Props.navigation.navigate("FriendCheciIn")}
            >
              <Icon3 name="shield-checkmark-outline" size={25} color={"grey"} />

              <Text style={{ ...styles.heading, marginLeft: 10 }}>
                Check Ins
              </Text>
            </TouchableOpacity>

            <View style={styles.bar1}></View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Props.navigation.navigate("ChatsUserShow")}
              style={styles.prefrences}
            >
              <Icon3 name="mail-outline" size={25} color={"grey"} />

              <Text style={{ ...styles.heading, marginLeft: 10 }}>
                Messages
              </Text>
            </TouchableOpacity>

            <View style={styles.bar1}></View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.prefrences, marginBottom: 65 }}
              onPress={() => {
                Props.Empty_store()
                Props.navigation.navigate("LoginCheckRestict")
              }
              }
            >
              <Icon3 name="log-out-outline" size={25} color={"grey"} />

              <Text style={{ ...styles.heading, marginLeft: 10 }}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.bar1}></View>
          </ScrollView>

          <Modal visible={PhotoModal} transparent={false}>
            <View
              style={{
                ...styles.nav1,
              }}
            >
              <Icon3
                onPress={() => {
                  // setGotoEdit(false); setChooseBusiness(true); SetPhotoModal(false)

                  setGotoEdit(true);
                  setChooseBusiness(true)

                }}
                name="chevron-back-outline"
                size={25}
                style={{
                  color: "#FFFFFF",
                  position: "absolute",
                  top: 20,
                  left: 10,
                }}
              />

              <Text
                style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}
              >
                Add Photos
              </Text>

              <TouchableOpacity
                onPress={() => UploadFiles()}
                style={{ position: "absolute", top: 25, right: 10 }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.flex}>
                <TouchableOpacity
                  onPress={() => chooseFile("photo")}
                  style={{ width: "33%", height: 140 }}
                >
                  <Image
                    style={{ width: "100%", height: 100, resizeMode: "cover" }}
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png",
                    }}
                  />
                </TouchableOpacity>
                {/* {console.log(Images)} */}
                {Images.map((v, i) => {
                  return (
                    <TouchableOpacity style={{ width: "33%", height: 140 }}>
                      <Icon3
                        onPress={() => RemoveME(v)}
                        name="close-circle"
                        size={25}
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 2,
                          zIndex: 2,
                        }}
                        color={Global.color}
                      />
                      <Image
                        style={{
                          width: "100%",
                          height: 130,
                          resizeMode: "cover",
                        }}
                        source={{ uri: v.image }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Modal>

          {/* Select Business Modal  */}

          <Modal visible={choose_Business} transparent={false}>
            <View style={styles.nav2}>
              <Icon3
                onPress={() => {
                  setChooseBusiness(false);
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
                Choose Business
              </Text>
            </View>

            <TextInput
              placeholderTextColor={"grey"}
              onChangeText={(e) => setFilter(e)}
              style={{
                ...styles.input,
                width: "98%",
                marginLeft: "1%",
                borderWidth: 0.3,
                borderColor: "grey",
                marginBottom: 10,
              }}
              placeholder="Search Business here....."
            ></TextInput>

            <FlatList
              initialNumToRender={80}
              data={Businesses}
              renderItem={renderItem}
            ></FlatList>
          </Modal>
        </>
      ) : (
        <GernelProfile props={Props} />
      )}
    </>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    flexDirection: "row",

    paddingTop: 10,
    // paddingBottom: 10,
  },
  nav1: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 70,
    backgroundColor: Global.color,
    // position: 'absolute',
    // top: 0,
    zIndex: 1,
    justifyContent: "center",
  },
  nav2: {
    width: "100%",
    height: 60,
    paddingLeft: "5%",
    elevation: 5,
    backgroundColor: Global.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  avatarSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: Global.color,
    marginTop: 60
  },
  head: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    width: "80%",
    textAlign: "center",
  },
  head1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
  },
  headingPara: {
    fontSize: 13,
    color: "grey",

    width: "80%",
    textAlign: "center",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  iconText: {
    fontSize: 11,
    color: "grey",
    marginLeft: 1,
  },
  row2: {
    width: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 25,
    flexDirection: "row",
  },
  bottomhead: {
    fontSize: 13,
    color: "grey",
    marginTop: 7,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    padding: 10,
    backgroundColor: "rgba(123, 122, 122, 0.274)",
    borderRadius: 40,
  },
  bar: {
    width: "100%",
    backgroundColor: "grey",
    height: 12,
    opacity: 0.1,
    marginTop: 40,
  },
  bar1: {
    width: "100%",
    backgroundColor: "grey",
    height: 1,
    opacity: 0.1,
  },
  myimpact: {
    width: "100%",
    paddingHorizontal: 20,
  },
  tabs: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 20,
  },
  tab: {
    // width:0,

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: 20,
  },
  tabheading: {
    // fontWeight:'bold',
    fontSize: 16,
    color: "#000",
  },
  boxRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },

  boxShadow: {
    width: "47%",
    minHeight: 80,
    backgroundColor: "rgba(191, 191, 191, 0.274)",
    borderRadius: 4,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 15,
  },
  boxText: {
    fontSize: 13,
    color: "grey",
    marginTop: 10,

    marginLeft: 5,
  },
  reveiwButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    borderRadius: 5,
  },
  revewText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "roboto",
  },
  RecentlyViewed: {
    width: "100%",
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  centerPart: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingLeft: 10,
    height: 50,
  },
  heading: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  paraRecent: {
    fontSize: 13,
    color: "grey",
  },
  prefrences: {
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
    flexDirection: "row",
  },
  input: {
    height: 45,
    width: "100%",
    borderWidth: 1.2,
    borderColor: "#8B8C8E",
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: "Roboto",
    color: "#000",
  },
  linkDiv: {
    width: "100%",
    // paddingLeft: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(106, 105, 105, 0.184)",
  },
  card: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: "5%",
  },
});

const mapStateToProps = (state) => {
  return {
    name1: state.name,
    Relevant_Business: state.Relevant_Business,
    Business_info: state.Business_info,
    limit_controls: state.limit_controls
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
    get_business: (user) =>
      dispatch(get_business(user)),

    Empty_store: () => dispatch(Empty_store())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
