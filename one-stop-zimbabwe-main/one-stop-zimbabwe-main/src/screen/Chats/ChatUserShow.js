import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, StatusBar, Modal, FlatList, RefreshControl } from "react-native";
import { get_data } from "../../store/acion/index";
import { useIsFocused } from "@react-navigation/native";
import Icon3 from "react-native-vector-icons/Ionicons";
import { arr, Global } from "../../assets/Global_Variable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore, { firebase } from "@react-native-firebase/firestore";

function ChatsUserShow(Props) {
  let [loadingS, setLoadingS] = useState(false);
  let [lists, setList] = useState([]);
  let [final_id, setfinal_id] = useState("");
  const isFocused = useIsFocused();
  let [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setList([]);

    GetAllChats();

    // console.log("is focused>?");
  }, [Props, isFocused]);

  const GetAllChats = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_data");
    let parse = JSON.parse(jsonValue);
    if (parse) {
      setLoadingS(true);
      let uid = parse.uid;
      await firestore()
        .collection("Communicate")
        // .where("user_uid", "==", uid )
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach((doc) => {
            if (doc.id.includes(uid)) {
              console.log("check data>>>>>", doc.data().user_uid == uid);
              if (doc.data().user_uid == uid) {
                doc.data().final_id = doc.data().user_uid + doc.data().Business_uid;
                arr.push(doc.data());
              }
              if (doc.data().Business_uid == uid) {
                // doc.data().Business_uid= doc.data().user_uid
                doc.data().final_id = doc.data().user_uid + doc.data().Business_uid;
                doc.data().BusinessName = doc.data().user_name;
                doc.data().BusinessImage = doc.data().user_profile;
                arr.push(doc.data());
              }
            }
          });
          setLoadingS(false);
          setRefresh(false);
          setList(arr);
        })
        .catch((error) => {
          // console.log("Error getting documents: ", error);
        });
    } else {
      Props.navigation.navigate("LoginCheckRestict");
    }
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
            Props.navigation.navigate("SubChat", {
              BusienssUID: v.item.Business_uid,
              BusinessName: v.item.BusinessName,
              pic: v.item.BusinessImage,
              final_id: v.item.final_id,
            });
          }}
          activeOpacity={0.5}
          style={styles.card}
        >
          <Image
            source={{ uri: v.item.BusinessImage }}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              borderRadius: 30,
            }}
          />

          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                color: "#414141",

                fontFamily: "sans-serif-normal",
                fontWeight: "bold",
                marginLeft: 15,
                textAlign: "justify",
                // width: '55%',
              }}
            >
              {v.item.BusinessName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <StatusBar barStyle={loadingS ? "dark-content" : "light-content"} backgroundColor="#000" />

      <Modal transparent={true} visible={loadingS}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(4, 4, 4, 0.474)",
          }}
        >
          <Image source={require("../../assets/loadingS.gif")} style={{ width: 150, height: 150 }} />
        </View>
      </Modal>

      <View style={styles.nav1}>
        <Icon3
          onPress={() => {
            Props.navigation.goBack();
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
          All Users
        </Text>
      </View>

      <FlatList
        initialNumToRender={80}
        data={lists}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => GetAllChats()} />}
      ></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  nav1: {
    width: "100%",
    height: 60,
    paddingLeft: "5%",
    elevation: 5,
    backgroundColor: Global.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    zIndex: 1,
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
    width: "94%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: "3%",
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatsUserShow);
