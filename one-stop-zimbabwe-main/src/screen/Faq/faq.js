import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Modal, Image, FlatList, TextInput } from "react-native";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import { Global } from "../../assets/Global_Variable";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";

function Faq(Props) {
  const [faqs, setFaqs] = React.useState([])
  let [loadingS, setLoadingS] = useState(true);
  const [text, setText] = useState('');
let finalFaq=faqs.filter(e=>e.question.toLowerCase().indexOf(text.toLowerCase())!==-1 || e.answer.toLowerCase().indexOf(text.toLowerCase())!==-1)
  useEffect(() => {
    firestore()
      .collection("Faq")
      .onSnapshot(function (querySnapshot) {
        let arr1 = [];
        querySnapshot.forEach((a) => {
          arr1.push(a.data());
        });
        setFaqs(arr1);
        setLoadingS(false);
      });
  }, []);

  let [index, setIndex] = useState(0);

  const modalizeRef = useRef(null);

  const onOpen = (e) => {
    setIndex(e);
    modalizeRef.current?.open();
  };

  let renderList = (e) => {
    return (
      <TouchableOpacity style={styles.listbox} onPress={() => onOpen(e.index)}>
        <Text style={styles.listtext}>{e.item.question}</Text>
        <Icon3 name="arrow-top-right" size={20} style={styles.arrowicon} color={Global.color} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, display: "flex", alignItems: "center", backgroundColor: "#fff" }}>
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
      {!loadingS && <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            Props.navigation.goBack();
          }}
          style={{ width: 45, height: 45, backgroundColor: Global.color, display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: 12, top: 12, borderRadius: 15 }}
        >
          <Icon2 name="close-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <Image source={require("../../assets/logo.png")} style={{ width: 120, height: 120, marginTop: 120, borderRadius: 20 }}></Image>

        <Text style={{ fontSize: 50, color: Global.color, marginTop: 30 }}>FAQs</Text>
        <Text style={{ fontSize: 20, color: Global.color, marginBottom: 10 }}> (Frequently Asked Questions) </Text>
        
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder={'Search your question here....'}
          placeholderTextColor={Global.color}
          underlineColorAndroid="transparent"
        />
        <View style={styles.mainView}>
          <FlatList data={finalFaq} renderItem={(e) => renderList(e)} />
        </View>
        <Modalize adjustToContentHeight ref={modalizeRef} handlePosition="inside" modalStyle={styles.modal}>
          <View style={styles.answerContainer}>
            <Text style={styles.modalizeQuestion}>{faqs[index]?.question}</Text>
            <Text style={styles.answer}>{faqs[index]?.answer}</Text>
          </View>
        </Modalize>
      </View>}

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

  mainView: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 30,
    padding: 10,
  },
  listbox: {
    height: 50,
    borderBottomColor: "#B2BEB5",
    borderBottomWidth: 0.3,
    marginBottom: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    minWidth: "100%",
    paddingLeft: 5,
    paddingRight: 20,
  },
  listtext: {
    fontSize: 13,
    color: Global.color,
    fontWeight: "500",
    fontStyle: "italic",
    width: "90%",
  },
  arrowicon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  answer: {
    fontSize: 13,
    color: Global.linkBlueColor,
    marginTop: 20,
  },
  modal: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 13,
  },

  modalizeQuestion: {
    fontSize: 20,
    color: Global.color,
    fontWeight: "500",
    fontStyle: "italic",
    width: "100%",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#FF5800",
    marginVertical: 10,
    width: '80%',
    paddingLeft: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
