import React, { useState,useRef ,useEffect} from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity,StatusBar } from "react-native";
import { get_data } from "../store/acion/index";
import Lottie from 'lottie-react-native';

import Icon3 from "react-native-vector-icons/Ionicons";
import { Global } from "../assets/Global_Variable";

function EmailSendConfirmation(Props) {
  let topic=Props.route.params.value
  const animationRef = useRef(null)
  useEffect(() => {
    animationRef.current?.play()

  }, [])

  return (
    <>
        <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
       
      />
      <View style={styles.nav}>
        

        <Text
          style={{
            fontSize: 21,
            fontFamily: "notoserif",
            
            color: "#fff",
          }}
        >
        Email Send  Confirmaiton
        </Text>
      </View>



      <View style={styles.form}>
       
      <Lottie
      ref={animationRef}
      source={require('../assets/loading.json')}
      style={{width:'80%'}}
      autoPlay
      loop={false}
    />

        <Text
          style={{
            fontSize: 13,
            color: "#8B8C8E",
            width: "80%",
            textAlign: "center",
            // marginLeft: "10%",
            marginTop: 10,
          }}
        >
          Email Send to You Successfully! Please Check Your Email For {topic} Completion.
             </Text>


             <Text
          style={{
            color: "#8B8C8E",
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            marginTop: 0,
            marginBottom: 10,
          }}
        >
          Account {topic} Already?{" "}
          <Text
            style={{ color: Global.linkTextColor, fontWeight: "bold" }}
            onPress={() => Props.navigation.navigate("Login")}
          >
            Login
          </Text>{" "}
          </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 2,
    padding: 20,
  },

  flexBottom: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "column",
    padding: 15,
  },
  buttonsDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonHalfOne: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    width: "48%",
    height: 45,
    borderRadius: 5,
  },
  nav: {
    width: "100%",
    height: 55,
    paddingLeft: 15,
    elevation: 4,
    backgroundColor:Global.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  form: {
    width: "100%",
    padding: 15,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
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
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSendConfirmation);
