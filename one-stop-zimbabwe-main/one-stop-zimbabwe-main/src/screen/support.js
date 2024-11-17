import React, { useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity, Linking, Image } from "react-native";
import Icon3 from "react-native-vector-icons/Ionicons";
import { Global } from "../assets/Global_Variable";

function Support(Props) {
  return (
    <View style={{ flex: 1, display: "flex", alignItems: "center", backgroundColor: "#fff" }}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            Props.navigation.goBack();
          }}
          style={{ width: 45, height: 45, backgroundColor: Global.color, display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: 12, top: 12, borderRadius: 15 }}
        >
          <Icon3 name="close-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <Image source={require("../assets/logo.png")} style={{ width: 120, height: 120, marginTop: 120, borderRadius: 20 }}></Image>

        <Text style={{ fontSize: 27, color: Global.color, marginBottom: 10, marginTop: 30 }}>Support Center</Text>
        <View style={{ marginTop: 20, width: "92%", display: "flex", alignItems: "flex-start", marginLeft: "10%" }}>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:customerservice@onestopzim.co.zw")}
            activeOpacity={0.7}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", marginTop: 30 }}
          >
            <Icon3 name="mail-outline" size={24} color={"#5A5A5A"} />

            <Text style={{ color: "#5A5A5A", fontSize: 13, fontWeight: "bold", marginLeft: 10 }}>customerservice@onestopzim.co.zw</Text>
          </TouchableOpacity>
          <Text style={{ color: 'grey', fontSize: 10, marginLeft: 35, width: '100%', textAlign: 'left',marginTop:5 ,fontStyle:'italic'}}>Type your Detailed Question’ with “Enter your message”</Text>
          <View
            style={{
              width: "90%",
              borderWidth: 0.2,
              marginBottom: 10,
              height: 0.1,
              backgroundColor: "grey",
              marginTop: 20,
              opacity: 0.1,
            }}
          ></View>

          <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(`tel:+263771132543`)}>
            <View style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", marginTop: 30 }}>
              <Icon3 name="call-outline" size={24} color={"#5A5A5A"} />

              <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 10 }}>+263771132543</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: "90%",
              borderWidth: 0.2,
              marginBottom: 10,
              height: 0.1,
              backgroundColor: "grey",
              marginTop: 20,
              opacity: 0.1,
            }}
          ></View>

          <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginTop: 5, width: '80%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>

              <Icon3 name="time-outline" size={24} color={"#5A5A5A"} />

              <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 10 }}>Monday - Fridays</Text>
            </View>
            <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 20, width: 100, textAlign: 'left' }}> 8am - 5pm</Text>
          </View>

          <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginTop: 5, width: '80%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", }}>
              <Icon3 name="time-outline" size={24} color={"#fff"} />

              <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 10 }}>Saturday</Text>
            </View>

            <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 20, width: 100, textAlign: 'left' }}>8pm - 12pm</Text>
          </View>


          <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginTop: 5, width: '80%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", }}>

              <Icon3 name="time-outline" size={24} color={"#fff"} />

              <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 10 }}>Sunday</Text>
            </View>
            <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 20, width: 100, textAlign: 'left' }}>Closed</Text>
          </View>
        </View>

        <View
          style={{
            width: "90%",
            borderWidth: 0.2,
            marginBottom: 10,
            height: 0.1,
            backgroundColor: "grey",
            marginTop: 20,
            opacity: 0.1,
          }}
        ></View>
      {/* <Text style={{ color: "#5A5A5A", fontSize: 12, fontWeight: "bold", marginLeft: 20, width: '100%', textAlign: 'center',marginTop:5 }}>Contact us <Text onPress={()=>Props.navigation.navigate('Support_Form')} style={{color:Global.linkBlueColor}}>here</Text> for support if you have any challenges </Text> */}
     
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  card: {
    width: "90%",
    height: 100,
    backgroundColor: "red",
    elevation: 8,
    borderRadius: 20,
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  card1: {
    width: "100%",
    height: 100,
    backgroundColor: "#F5F5F5",
    display: "flex",
    alignItems: "center",
    paddingLeft: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
