import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
  Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon3 from "react-native-vector-icons/Ionicons";
import { Global } from "../assets/Global_Variable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const Addbusiness = (Props) => {
  const isFocused = useIsFocused();
  let [Notify, setNotify] = useState(false);
  let [loginCheck, setLoginCheck] = useState(undefined);
  let [user, setUser] = useState();
  let [notify_text, setNotify_Text] = useState(
    " Your Business is Already Added you can goto Profile to update your business."
  );
  useEffect(() => {
    getData();
  }, [isFocused]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));

    if (user != undefined) {
      setUser(user);
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  return (
    <>

      <StatusBar
        barStyle={Notify ? "dark-content" : "light-content"}
        backgroundColor="#000"
      />

      <Modal transparent={true} visible={Notify}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(4, 4, 4, 0.474)",
          }}
        >
          <View
            style={{
              width: "80%",
              minHeight: 170,
              borderRadius: 4,
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{ fontSize: 20, color: Global.color, fontWeight: "bold" }}
            >
              Notification
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: "grey",
                width: "70%",
                textAlign: "center",
              }}
            >
              {notify_text}
            </Text>

            <TouchableOpacity
              onPress={() => setNotify(false)}
              style={{
                width: "50%",
                height: 40,
                backgroundColor: Global.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "#fff" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ ...styles.nav }}>
        <Icon3
          onPress={() => Props.navigation.goBack()}
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
          Add a business
        </Text>
      </View>
      <ScrollView style={{ flex: 1, paddingBottom: 20 }}>

        <View style={styles.linkDiv}>
          <Image
            source={require("../assets/join.png")}
            style={{
              height: 350,
              width: "100%",
              marginTop: "0%",
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              marginLeft: "5%",
              width: "90%",
              fontSize: 13,
              textAlign: "center",
              marginTop: 10,
              color: "#000",
            }}
          >
            What's your relationship to the business?
          </Text>

          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              loginCheck
                ? Props.navigation.navigate("AddSameCoustomer")
                : Props.navigation.navigate("LoginCheckRestict");
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontSize: 13,
                marginTop: 15,
                color: Global.linkBlueColor,
                fontWeight: "bold",
              }}
            >
              I am a customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              if (loginCheck) {
                if (!user.Business) {
                  Props.navigation.navigate("AddBusiness");
                } else {
                  setNotify(true);
                }
              } else {
                Props.navigation.navigate("LoginCheckRestict");
              }
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontSize: 13,
                marginTop: 15,
                color: Global.linkBlueColor,
                fontWeight: "bold",
              }}
            >
              I am the owner of the business
            </Text>
          </TouchableOpacity>
          <View style={styles.bullets}>

            <Text style={{ color: '#000', marginTop: 0 }}>
              <Text style={{ fontWeight: 'bold' }}>
                The Free (Claimed) Package</Text> has the following benefits:  </Text>



            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
                Access to post a maximum of 3 photos to showcase your business
              </Text>
            </View>



            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
                Access to respond to reviews and messages as soon as they come in
              </Text>
            </View>



            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
                Access to update business information such as business name, address and contact details so people can find you
              </Text>
            </View>

          </View>

          <Text style={{ width: '92%', color: '#000', fontSize: 12, marginLeft: '4%', marginTop: 20 }}>
            Upgrade to The Premium Package to stand out from the competition. The Premium package combines OneStop's Zim best tools so you can grab people's attention and bring in more business.</Text>


          <View style={styles.bullets}>

            <Text style={{ color: '#000', marginTop: 0 }}>
              Upgrading to
              <Text style={{ fontWeight: 'bold' }}>
                The Premium Package </Text> has the following benefits:   </Text>




            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
              Access to <Text style={{fontWeight:'bold'}}>
              Verified License logo feature </Text>             </Text>
            </View>



            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
              Access to post up to 20 photos to showcase your business              </Text>
            </View>



            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
              Access to post up to 5 videos to showcase your business              </Text>
            </View>


            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
              Access to advertise your business across the platform
              </Text>
            </View>







            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
            Access to advertise your business events across the platform              </Text>
            </View>







            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
              Access to respond to reviews and messages as soon as they come in
                            </Text>
            </View>






            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
              <Image source={require('../assets/arrow.png')} style={{ width: 13, height: 13, marginLeft: 5 }} />
              <Text style={{ ...styles.Validation, color: '#000', fontSize: 12 }}>
            Access to update business information such as business name, address and contact details so people can find you
                            </Text>
            </View>


            <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 ,marginBottom:40}}>
              {/* <Text style={{ ...styles.Validation, color: Global.color, fontSize: 12 }}>
              Click here to purchase the Premium Package            
                               </Text> */}
            </View>

            
          </View>
        </View>



      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  nav: {
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
  linkDiv: {
    width: "100%",
    // paddingLeft: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // flex: 1,

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
  center: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Validation: {
    width: '90%',
    textAlign: 'left',
    fontSize: 13,
    marginLeft: '2%',

  },
  bullets: {
    display: 'flex',
    width: '94%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '3%',
    marginTop: 20
  },
});

export default Addbusiness;
