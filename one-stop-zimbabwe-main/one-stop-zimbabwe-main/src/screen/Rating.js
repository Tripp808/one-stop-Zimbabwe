import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Global } from "../assets/Global_Variable";
import Icon3 from "react-native-vector-icons/Ionicons";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { Send_feedback } from "../store/acion/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

let RatingComponent = (Props) => {
  let [loadingS, setLoadingS] = useState(false);
  const isFocused = useIsFocused();
  let [Random, setRandom] = useState(0)
  let [cleanLiness, setCleanliness] = useState(0);
  let [services, setService] = useState(0);
  let [Ambience, setAmbience] = useState(0);
  let [Price, setPrice] = useState(0);
  let [Feedback, setFeedback] = useState("");
  let [calculated_value, setcalculated_value] = useState(0)
  let [bottomRating_Validation, setBottomRating_Validation] = useState("");
  let [image_Validate, setImageValidate] = useState("");
  let [review_Validate, setReviewValidate] = useState("");
  let [Images_Data, setImage_Data] = useState([]);
  let [PhotoModal, setPhotoModal] = useState(false)
  let [user, setUser] = useState();

  useEffect(() => {
    getData();
  }, [isFocused]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));

    if (

      user != undefined
    ) {
      setUser(user);
    } else {
      Props.navigation.navigate("LoginCheckRestict");
    }
  };


  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 550,
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
      let arr = Images_Data
      arr.push(response.assets[0])
      setImage_Data(arr);
      setRandom(Math.random() * 1000)
    });
  };

  let Validate_check = async () => {
    if (
      // overall == 0 ||
      cleanLiness == 0 ||
      services == 0 ||
      Ambience == 0 ||
      Price == 0 ||
      // Images_Data.length == 0 ||
      Feedback == ""
    ) {
      // if (overall == 0) {
      //   setOverall_Validation("* Required");
      // }
      if (cleanLiness == 0 || services == 0 || Ambience == 0 || Price == 0) {
        setBottomRating_Validation("* Required all Fields");
      }

      // if (Images_Data.length == 0) {
      //   setImageValidate("* Required");
      // }

      if (Feedback == "") {
        setReviewValidate("* Required");
      }
      return;
    }

    if (Images_Data.length > 10) {
      setImageValidate("Selected Images limit exceed")
      return
    }
    let Received_Reviews_no =
      Props.route.params.SelectedBusiness.Received_Reviews_no;

    let old_rating = Props.route.params.SelectedBusiness.OverAll_Rating;

    let rating = {
      Sender: user.uid,
      Receiver: Props.route.params.SelectedBusiness.uid,
      Rating: calculated_value,
      feedback: Feedback,
      approved: true,
      time: new Date().getDate() + '-' + JSON.parse(new Date().getMonth() + 1) + '-' + new Date().getUTCFullYear()
    };
    //
    await Props.Send_feedback(
      rating,
      Images_Data,
      setLoadingS,
      Props,
      Received_Reviews_no,
      old_rating
    );
  };

  let RemoveME = (v) => {
    console.log("Remove>>>>>>>>>");
    let array = Images_Data;

    const index = array.indexOf(v);
    if (index > -1) {
      // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }

    setImage_Data(array);
    setRandom(Math.random() * 1000);
  };


  return (
    <ScrollView style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
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

        <>
          <View
            style={{
              ...styles.nav,
              backgroundColor: Global.color,
            }}
          >
            <Icon3
              onPress={() => Props.navigation.goBack()}
              name="chevron-back-outline"
              size={25}
              style={{
                color: "#fff",
                position: "absolute",
                top: 20,
                left: 10,
              }}
            />

            <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
              Rating
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 390,
              marginVertical: 220,
            }}
          >
            <View style={styles.box1}>
              <Text style={{ color: "#000", fontSize: 20, fontWeight: "400" }}>
                Give us Your Feedback
              </Text>
              <Text style={{ fontSize: 10, color: "grey" }}>
                Automatically Select Based On overall Rating
              </Text>
              <View style={styles.box} >
                <Text
                  style={{
                    fontSize: 14,
                    color: "grey",
                    marginTop: 15,
                    width: 75,
                  }}
                >
                  Your Rating
                </Text>
                <AirbnbRating
                  isDisabled
                  count={5}
                  reviews={[]}
                  defaultRating={calculated_value}
                  size={20}
                  // onFinishRating={ratingCompleted}
                  reviewColor={Global.color}
                  selectedColor={Global.color}
                  ratingContainerStyle={{ marginTop: -40 }}

                />
              </View>

              <View style={{ ...styles.box, marginTop: 15 }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: "grey",
                    marginTop: 5,
                    width: 100,
                  }}
                >
                  Select Image
                </Text>


                <TouchableOpacity
                  onPress={() => setPhotoModal(true)}
                  activeOpacity={0.8}
                  style={styles.imagePick}
                >
                  {Images_Data.length > 0 ?
                    <Text style={{ fontSize: 14, color: "#fff" }}>{Images_Data.length}/10</Text>
                    :
                    <Text style={{ fontSize: 14, color: "#fff" }}>Browse</Text>}
                </TouchableOpacity>




              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: "red",
                  width: "100%",
                  textAlign: "right",
                }}
              >
                {image_Validate}
              </Text>
            </View>

            <View style={styles.box}>
              <Text
                style={{
                  fontSize: 14,
                  color: "grey",
                  marginTop: 15,
                  width: 75,
                }}
              >
                Cleanliness
              </Text>
              <Stars
                default={0}
                update={(val) => {
                  setCleanliness(val);
                  // setIndexOF(++indexOf)
                  let arr = [val, services, Ambience, Price];
                  let a = 0
                  let index = 0
                  arr.map((v) => {
                    if (v > 0) {
                      a = a + v;
                      index = ++index
                    }
                    setcalculated_value(a / index)
                  })
                }}
                spacing={4}
                starSize={30}
                count={5}
                fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={"star"}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={"star-half"} style={[styles.myStarStyle]} />
                }
              />
            </View>

            <View style={styles.box}>
              <Text
                style={{
                  fontSize: 14,
                  color: "grey",
                  marginTop: 15,
                  width: 75,
                }}
              >
                Service
              </Text>

              <Stars
                default={0}
                update={(val) => {
                  setService(val);
                  let arr = [cleanLiness, val, Ambience, Price];
                  let a = 0
                  let index = 0
                  arr.map((v) => {
                    if (v > 0) {
                      a = a + v;
                      index = ++index
                    }
                    console.log(a, index);
                    setcalculated_value(a / index)
                  })
                }}
                spacing={4}
                starSize={30}
                count={5}
                fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={"star"}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={"star-half"} style={[styles.myStarStyle]} />
                }
              />
            </View>

            <View style={styles.box}>
              <Text
                style={{
                  fontSize: 14,
                  color: "grey",
                  marginTop: 15,
                  width: 75,
                }}
              >
                Ambience
              </Text>

              <Stars
                default={0}
                update={(val) => {
                  setAmbience(val);
                  let arr = [cleanLiness, services, val, Price];
                  let a = 0
                  let index = 0
                  arr.map((v) => {
                    if (v > 0) {
                      a = a + v;
                      index = ++index
                    }
                    setcalculated_value(a / index)
                  })
                }}
                spacing={4}
                starSize={30}
                count={5}
                fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={"star"}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={"star-half"} style={[styles.myStarStyle]} />
                }
              />
            </View>

            <View style={styles.box}>
              <Text
                style={{
                  fontSize: 14,
                  color: "grey",
                  marginTop: 15,
                  width: 75,
                }}
              >
                Price
              </Text>

              <Stars
                default={0}
                update={(val) => {
                  setPrice(val);
                  let arr = [cleanLiness, services, Ambience, val];
                  let a = 0
                  let index = 0
                  arr.map((v) => {
                    if (v > 0) {
                      a = a + v;
                      index = ++index
                    }
                    setcalculated_value(a / index)
                  })
                }}
                spacing={4}
                starSize={30}
                count={5}
                fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={"star"}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={"star-half"} style={[styles.myStarStyle]} />
                }
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "red",
                width: "90%",
                textAlign: "right",
              }}
            >
              {bottomRating_Validation}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "red",
                width: "80%",
                textAlign: "left",
                paddingVertical: 10,
              }}
            >
              {/* * Required */}
            </Text>
            <TextInput
              onChangeText={(e) => setFeedback(e)}
              placeholderTextColor="grey"
              style={{
                width: "90%",
                height: 130,
                borderColor: "#000",
                borderWidth: 0.5,
                // textAlign: 'left',
                textAlignVertical: "top",
                color: "#000",
                borderRadius: 5,
                padding: 10,
              }}
              multiline
              placeholder="Tip: “A great review covers food, service and ambiance. Got recommendations for your favorite dishes and drinks, or something everyone should try here? Include that too! And remember.” "
            ></TextInput>
            <Text
              style={{
                fontSize: 12,
                color: "red",
                width: "90%",
                textAlign: "right",
              }}
            >
              {review_Validate}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "grey",
                width: "80%",
                textAlign: "left",
                paddingLeft: 3,
              }}
            >
              Your review should be at least 140 characters
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "red",
                width: "80%",
                textAlign: "left",
                paddingVertical: 10,
              }}
            >
              {/* {FeedbackVali} */}
            </Text>

            <TouchableOpacity
              onPress={() => {
                Validate_check();
              }}
              activeOpacity={0.6}
              style={styles.button}
            >
              <Text style={styles.ButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Props.navigation.goBack()}>
              <Text
                style={{
                  color: Global.linkTextColor,
                  fontSize: 13,
                  fontWeight: "400",
                  textDecorationLine: "underline",
                  paddingVertical: 10,
                }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </View>


      <Modal visible={PhotoModal} transparent={false}>
        <View
          style={{
            ...styles.nav1,
          }}
        >
          <Icon3
            disabled={Images_Data.length > 10 ? true : false}
            onPress={() => {
              setPhotoModal(false)

            }}
            name="chevron-back-outline"
            size={25}
            style={{
              opacity: Images_Data.length > 10 ? 0.5 : 1,
              color: "#FFFFFF",
              position: "absolute",
              top: 20,
              left: 10,
            }}
          />

          <Text
            style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}
          >
            Add Photos ({Images_Data.length}/10)
          </Text>

          <TouchableOpacity
            onPress={() => setPhotoModal(false)}
            style={{ position: "absolute", top: 25, right: 10, opacity: Images_Data.length > 10 ? 0.5 : 1 }}
            disabled={Images_Data.length > 10 ? true : false}
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
            {console.log(">>>>>>>>>>", Images_Data)}
            {Images_Data.map((v, i) => {
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
                    source={{ uri: v.uri }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>

  );
};
const styles = StyleSheet.create({
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 70,
    // backgroundColor:'red',
    position: "absolute",
    top: 0,
    zIndex: 1,
    justifyContent: "center",
  },
  button: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Global.color,
    borderRadius: 4,
    height: 40,
  },
  imagePick: {
    width: 100,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 4,
    flexDirection: 'row'
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "sans-serif-condensed",
  },
  box: {
    width: "90%",
    display: "flex",
    flexDirection: "row",

    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 4,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
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
  box1: {
    width: "90%",
    elevation: 1,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 4,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  myStarStyle: {
    color: Global.color,
    backgroundColor: "transparent",
    // textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontSize: 30,
  },
  myEmptyStarStyle: {
    color: "#EBECF0",
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
  },
});

const mapStateToProps = (state) => {
  return {
    name1: state.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    Send_feedback: (
      rating,
      Images_Data,
      setLoadingS,
      Props,
      Received_Reviews_no,
      old_rating
    ) =>
      dispatch(
        Send_feedback(
          rating,
          Images_Data,
          setLoadingS,
          Props,
          Received_Reviews_no,
          old_rating
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingComponent);
