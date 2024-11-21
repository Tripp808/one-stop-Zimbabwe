import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, Image, StatusBar, TouchableOpacity, LogBox } from "react-native";
import { get_data } from "../../store/acion/index";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore, { firebase } from "@react-native-firebase/firestore";
import SoundPlayer from 'react-native-sound-player'

import { useIsFocused } from "@react-navigation/native";

import Modal from "react-native-modal";
import { arr, Global } from "../../assets/Global_Variable";

function SubChat(Props) {
  let [loadingS, setLoadingS] = useState(false);
  let [BusinessUid, setBusinessUid] = useState(Props.route.params.BusienssUID);
  const [state, setState] = useState({});
  const [messages, setMessages] = useState([]);
  const [my_uid, setMY_uid] = useState("");
  let [profileMe, setProfileME] = useState("");
  const { params } = Props.route;
  const isFocused = useIsFocused();
  let [final_id, setfinal_id] = useState(params.final_id);
  console.log(final_id);

  useEffect(() => {
    Collect_all_chats();
    auto_send();
  }, [Props, isFocused]);

  const auto_send = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_data");
    let parse = JSON.parse(jsonValue);

    setMY_uid(parse.uid);
    setProfileME(parse.profile);
    if (params.pic_url) {
      try {
        firestore().collection("Communicate").doc(final_id).set({
          BusinessName: params.BusinessName,
          Business_uid: params.BusienssUID,
          BusinessImage: params.pic_url,
          user_name: parse.name,
          user_uid: parse.uid,
          user_profile: parse.photo,
        });
      } catch (e) {}
    }
  };

  let Collect_all_chats = async () => {
    if (BusinessUid) {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      let parse = JSON.parse(jsonValue);
      if (parse !== undefined) {
        console.log("BusinessUid", parse.uid + params.BusienssUID);
        setProfileME(parse.image);
        setMY_uid(parse.uid);
        let docRef = firestore();

        docRef
          .collection("Communicate")
          .doc(final_id)
          .collection("chat")
          .onSnapshot((doc) => {
            let arr = [];
            doc.forEach((snap) => {
              arr.push(snap.data());
            });
            arr.sort(function (a, b) {
              return b.date - a.date;
            });

            setMessages(arr);
          });
      }
    }
  };

  const onSend = async (messages = []) => {
    const jsonValue = await AsyncStorage.getItem("@user_data");
    let parse = JSON.parse(jsonValue);

    var d = new Date();
    let obj = {
      _id: messages[0]._id,
      // image:params.pic_url,
      text: messages[0].text,
      date: d.getTime(),
      // received:false,
      SenderId: parse.uid,
      is_user_tick: false,
      RecieverId: BusinessUid,
      createdAt: d.toString(),
      user: {
        _id: my_uid,
        name: "React Native",
        avatar: parse.photo,
      },
    };
    console.log(parse, obj);
    if (parse !== undefined) {
      firestore().collection("Communicate").doc(final_id).collection("chat").add(obj);
    }

      try {
        // play the file tone.mp3
        SoundPlayer.playSoundFile('se', 'mp3')
        // or play from url
        // SoundPlayer.playUrl('https://example.com/music.mp3')
    } catch (e) {
        // console.log(`cannot play the sound file`, e)
    }
  };
  // console.log("message,",messages);

  let renderBubble = (props) => {
    if (!props.currentMessage.sent) {
      // if current Message has not been sent, return other Bubble with backgroundColor red for example
      return (
        <Bubble
          wrapperStyle={{
            right: {
              backgroundColor: "#F57224",
            },
          }}
          textStyle={{
            right: {
              color: "#fff",
            },
          }}
          {...props}
        />
      );
    }
  };

  

  return (
    <View style={styles.mainScreen}>
      {/* condition model  */}

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

      <View style={styles.navbar}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => Props.navigation.goBack()}>
            <Icon3 name="chevron-back-outline" size={22} style={{ marginLeft: 7 }} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: params.pic }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              marginLeft: 7,
            }}
          ></Image>

          <Text style={styles.nameUser}>{params.BusinessName}</Text>
        </View>

        <View style={styles.logoDiv}>
          <TouchableOpacity>{/* <Icon2 name='trash-alt' size={15}  color='#fff'  style={{marginLeft:10}}/> */}</TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        seNativeDriver={true}
        containerStyle={{
          backgroundColor: "#fff",
          width: "100%",
          borderTopWidth: 0,
          borderBottomWidth: 0,

          borderBottomColor: "#D3D3D3",
          borderTopColor: "#D3D3D3",

          marginBottom: -10,
          elevation: 7,
        }}
        renderBubble={renderBubble}
        messages={messages}
        textInputStyle={{
          color: "#000",
          backgroundColor: "#fff",
        }}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: my_uid,
        }}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props;
          return (
            <TouchableOpacity
              style={{ width: 56, ...styles.sendButton }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user: user,
                      _id: messageIdGenerator(),
                    },
                    true
                  );
                }
              }}
            >
              <Icon name="send-circle" size={52} color="#7FE695" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    flex: 1,
    paddingBottom: 10,
  },

  nav: {
    width: "85%",
    // backgroundColor:'#000',
    marginHorizontal: 2,
    paddingTop: 1,
    paddingBottom: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  navbar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // margin:5,
    backgroundColor: Global.color,
    height: 60,
    elevation: 3,
  },
  logoDiv: {
    width: "12%",
  },
  nameUser: {
    fontSize: 16,
    marginLeft: 10,
    // fontWeight:'800',
    color: "#fff",
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

export default connect(mapStateToProps, mapDispatchToProps)(SubChat);
