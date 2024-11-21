import React, { useState, useRef, useEffect } from "react";
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
  FlatList
} from "react-native";
import { get_data } from "../../store/acion/index";

import Icon3 from "react-native-vector-icons/Ionicons";
import { arr, Global } from "../../assets/Global_Variable";
import firestore, { firebase } from "@react-native-firebase/firestore";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useIsFocused } from "@react-navigation/native";
import SweetAlert from "react-native-sweet-alert";

function AdvertizeBusiness(Props) {
  const isFocused = useIsFocused();
  let [loadingS, setLoadingS] = useState(false);
  let [End_Date, setEndDate] = useState(undefined);
  let [End_Date_Validity, setEndDate_Validity] = useState(undefined);
  let [random, setRandom] = useState(3);
  let [selectedBusiness, setSelectedBusiness] = useState(undefined);
  let [BusinessValidation, setBusinessValidation] = useState("");
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  let [AdvertPlaceModal, setAdvertPlaceModal] = useState(false);
  let [AdvertPlaceValidation, setAdvertPlaceValidation] = useState('');
  let [Filter1, setFilter1] = useState('');
  let [selectedImage, setSelectedImage] = useState([])
  let FilterData1 = single => {
    return single.name.toLowerCase().indexOf(Filter1.toLowerCase()) !== -1;
  };
  let [Places, setPlaces] = useState([
    {
      name: 'Homepage',

    },
    {
      name: 'Categories'
    }
  ]);
  let allAdvertPlace = Places.filter(FilterData1);
  let [selectedAdvertPlace, setSelectedAdvertPlace] = useState([]);
  var day = 60 * 60 * 24 * 1000;


  useEffect(() => {
    if (Props.route.params !== undefined) {
      setSelectedBusiness(Props.route.params.Business);
      setSelectedImage(Props.route.params.Business.Images !== undefined ? Props.route.params.Business.Images[0] : undefined)
    }
  }, [isFocused]);

  // Date Ranges
  // Start Date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  let [start_Date, setStartDate] = useState(undefined);
  let [start_Date_Validity, setStartDate_Validity] = useState(undefined);

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    setStartDate(date);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  // End Date

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
    console.log("open");
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    console.warn(
      "A date has been picked: ",
      date.getDate() + "-" + date.getMonth() + 1 + date.getFullYear()
    );
    setEndDate(date);
    hideDatePicker1();
  };

  let ResetValidity = () => {
    setBusinessValidation("");
    setEndDate_Validity("");
    setAdvertPlaceValidation('');
    setStartDate_Validity('');

  };

  let ClearFields = () => {
    setSelectedBusiness(undefined);
    setSelectedAdvertPlace([]);
    setStartDate(undefined);

    setEndDate(undefined);
  };
  let Check_validity = () => {

    ResetValidity();
    if (selectedBusiness == undefined || End_Date == undefined || selectedAdvertPlace.length == 0 || start_Date == undefined

    ) {
      if (selectedBusiness == undefined) {
        setBusinessValidation("* Required");
      }
      if (start_Date == undefined) {
        setStartDate_Validity('* Required');
      }
      if (End_Date == undefined) {
        setEndDate_Validity("* Required");
      }
      if (selectedAdvertPlace.length == 0) {
        setAdvertPlaceValidation('* Required');
      }
      return;
    }
    if (start_Date > End_Date) {
      alert("Attention:Start Date Must less then End Date")
      return
    }
    if (selectedBusiness.Home_Monitize && selectedBusiness.Categories_Monitize) {
      SweetAlert.showAlertWithOptions(
        {
          title: "Sucess",
          subTitle: "Your Business is Already Montitized on HomePage and Categories.",
          confirmButtonTitle: "OK",
          confirmButtonColor: "#000",
          otherButtonTitle: "Cancel",
          otherButtonColor: "#dedede",
          style: "success",
          cancellable: true,
        }
      );
      return
    }

    // let obj = {}
    // let images = []
    // if (selectedImage) {
    //   images = selectedBusiness.Images.filter(e => e !== selectedImage[0])
    //   if (images !== undefined) {
    //     images.unshift(selectedImage[0])
    //   }
    // }
    // console.log(">>>>>>>>>",images);
    // return
    // console.log(">>>>>>", selectedAdvertPlace[0].name, selectedAdvertPlace[0].name == 'Homepage');
    if (selectedAdvertPlace[0].name == 'Homepage') {
      obj = {
        Home_Monitize: true,
        Home_Monitize_Start_Time: new Date(start_Date).getTime(),
        Home_Monitize_End_Time: new Date(End_Date).getTime(),
        Home_Monitize_image:selectedBusiness.Images.length !== 0 ?selectedImage[0]:''
      }

    }

    else {

      obj = {
        Categories_Monitize: true,
        Categories_Monitize_Start_Time: new Date(start_Date).getTime(),
        Categories_Monitize_End_Time: new Date(End_Date).getTime(),
        // Images: images.length !== 0 ? images : [],
        Categories_Monitize_image:selectedBusiness.Images.length !== 0 ?selectedImage[0]:''


      }
    }





    // console.log(">>>>>>>>", images);
    // return
    setLoadingS(true)
    firestore()
      .collection("All_Business")
      .doc(selectedBusiness.uid)
      .update(obj).then(() => {
        ClearFields()
        setLoadingS(false)
        SweetAlert.showAlertWithOptions(
          {
            title: "Sucess",
            subTitle: "Your Business sucessfully Advertised!",
            confirmButtonTitle: "OK",
            confirmButtonColor: "#000",
            otherButtonTitle: "Cancel",
            otherButtonColor: "#dedede",
            style: "success",
            cancellable: true,
          },
          (callback) => {
            Props.navigation.navigate('Search')
          }
        );
      })
  };
  let renderItem1 = v => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedAdvertPlace.includes(v.item)
            ? Global.color
            : '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedAdvertPlace([v.item]);
            setAdvertPlaceModal(false);
            setFilter1('');
            setAdvertPlaceValidation('');
            setRandom(Math.random() * 100);
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Text
            style={{
              fontSize: 13,
              color: selectedAdvertPlace.includes(v.item) ? '#FFFFFF' : '#414141',

              fontFamily: 'sans-serif-normal',
              fontWeight: 'bold',
              marginLeft: 15,
            }}>
            {v.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <ScrollView>
        <View>
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
                  source={require("../../assets/loadingS.gif")}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            </Modal>
            <View
              style={{
                ...styles.nav,
                backgroundColor: Global.color,
              }}
            >
              <Icon3
                onPress={() => Props.navigation.navigate("Search")}
                name="close-outline"
                size={30}
                style={{
                  color: "#FFFFFF",
                }}
              />

              <Text style={styles.navHeading}>Advertise Business</Text>
            </View>

            <TouchableOpacity
              activeOpaBusiness={0.9}
              onPress={() =>
                Props.navigation.navigate("MyownSelect", {
                  navigate: "AdvertizeBusiness",
                })
              }
              style={styles.inputBox}
            >
              {selectedBusiness !== undefined ? (
                <View style={styles.row}>
                  <Text style={styles.BusinessName}>
                    {selectedBusiness.name}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    ...styles.BusinessName,
                    color: "grey",
                  }}
                >
                  Select Business
                </Text>
              )}

              <Icon3
                name="chevron-down-outline"
                size={20}
                style={{
                  color: "grey",
                }}
              />
            </TouchableOpacity>
            <Text style={{ ...styles.Validation, color: "red", marginTop: 8 }}>
              {BusinessValidation}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setAdvertPlaceModal(true)}
              style={styles.inputBox}>
              {selectedAdvertPlace.length > 0 ? (
                <View style={styles.row}>
                  <Image
                    source={{ uri: FlagsAll[selectedAdvertPlace[0].alpha2] }}
                    style={styles.flag}
                  />

                  <Text style={{
                    ...styles.AdvertPlaceName,
                    color: 'grey'
                  }}>
                    {selectedAdvertPlace[0].name}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    ...styles.AdvertPlaceName,
                    color: 'grey',
                  }}>
                  Select Advert Place
                </Text>
              )}

              <Icon3
                name="chevron-down-outline"
                size={20}
                style={{
                  color: 'grey',
                }}
              />
            </TouchableOpacity>
            <Text style={{ ...styles.Validation, color: 'red' }}>
              {AdvertPlaceValidation}
            </Text>


            <Text style={{ ...styles.formHeading, fontSize: 12 }}>
              Select Advertize Date Range:
            </Text>



            <TouchableOpacity
              onPress={() => showDatePicker()}
              style={{
                ...styles.input1,
              }}>
              {start_Date !== undefined ? (
                <Text style={styles.title}>
                  {start_Date.getDate() +
                    '-' +
                    JSON.stringify(JSON.parse(start_Date.getMonth()) + 1) +
                    '-' +
                    start_Date.getFullYear()}
                </Text>
              ) : (
                <Text style={styles.title}>Select Start Date</Text>
              )}
            </TouchableOpacity>

            <Text style={{ ...styles.Validation, color: 'red' }}>
              {start_Date_Validity}
            </Text>



            <TouchableOpacity
              onPress={() => {
                showDatePicker1();
              }}
              style={{
                ...styles.input1,
              }}
            >
              {End_Date !== undefined ? (
                <Text style={styles.title}>
                  {End_Date.getDate() +
                    "-" +
                    JSON.stringify(JSON.parse(End_Date.getMonth()) + 1) +
                    "-" +
                    End_Date.getFullYear()}
                </Text>
              ) : (
                <Text style={styles.title}>Select End Date</Text>
              )}
            </TouchableOpacity>

            <Text style={{ ...styles.Validation, color: "red" }}>
              {End_Date_Validity}
            </Text>

            {selectedBusiness !== undefined ? (

              <><Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  marginTop: 10,
                  fontWeight: "bold",
                  width: "80%",
                  textAlign: "left",
                  paddingLeft: 15,
                  marginBottom: 20
                }}
              >
                Select Advertizment Banner Image
              </Text>
                <View style={styles.mainBox}>

                  {selectedBusiness.Images.map((v, i) => {
                    return (
                      <TouchableOpacity style={{ width: '46%' }} onPress={() => setSelectedImage([v])}>
                        <Image

                          style={{
                            width: "100%",
                            marginLeft: "2%",
                            height: 130,
                            resizeMode: 'cover',
                            borderWidth: selectedImage.includes(v) ? 4 : 0,
                            borderColor: Global.color,
                            marginTop: 3,
                            marginLeft: 3,
                            marginRight: 3
                          }}
                          source={{ uri: v }}
                        />
                      </TouchableOpacity>
                    )
                  })}

                </View>
              </>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  marginTop: 10,
                  fontWeight: "bold",
                  width: "80%",
                  textAlign: "left",
                  paddingLeft: 15,
                }}
              >
                No Business Selected{" "}
              </Text>
            )}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={new Date(new Date().getTime())}

              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="date"
              minimumDate={new Date(new Date().getTime() + day)}
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
          </>

        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => Check_validity()}
        activeOpaBusiness={0.7}
        style={{
          ...styles.buttonHalfTwo1,
          opaBusiness: 1,
        }}
      >
        <Text
          style={{ fontSize: 18, color: "#FFFFFF", fontFamily: "notoserif" }}
        >
          Advertise  Business
        </Text>
      </TouchableOpacity>


      <Modal visible={AdvertPlaceModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setAdvertPlaceModal(false);
              setFilter1('');
            }}
            name="chevron-back-outline"
            size={20}
            style={{
              color: '#FFFFFF',
              marginLeft: 2,
            }}
          />
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'notoserif',
              marginLeft: 15,
              color: '#FFFFFF',
            }}>
            Choose AdvertPlace
          </Text>
        </View>

        <TextInput
          placeholderTextColor={'grey'}
          onChangeText={e => setFilter1(e)}
          style={{
            ...styles.input,
          }}
          placeholder="Search Advert Place Here"></TextInput>

        <FlatList
          initialNumToRender={80}
          data={allAdvertPlace}
          renderItem={renderItem1}></FlatList>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60,
    // backgroundColor:'red',
    flexDirection: "row",
    paddingLeft: 15,
  },
  navHeading: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 20,
    fontWeight: "bold",
  },
  sendNav: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sendTouch: {
    position: "absolute",
    right: 10,
    top: 20,
  },

  input1: {
    width: "96%",
    marginLeft: "2%",

    marginBottom: 10,
    height: 50,

    marginTop: 10,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: "Roboto",
    color: "grey",
    borderBottomColor: Global.color,
    borderBottomWidth: 1,
    padding: 10,
  },
  Validation: {
    width: "96%",
    textAlign: "right",
    fontSize: 12,
  },
  input: {
    width: "98%",
    marginLeft: "1%",
    borderWidth: 0.3,
    borderColor: "grey",
    marginBottom: 10,
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: "Roboto",
    color: "#000",
  },
  title: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: "grey",
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
  input: {
    width: "98%",
    marginLeft: "1%",
    borderWidth: 0.3,
    borderColor: "grey",
    marginBottom: 10,
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: "Roboto",
    color: "#000",
  },
  nav1: {
    width: "100%",
    height: 60,
    paddingLeft: "3%",
    elevation: 5,
    backgroundColor: Global.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  BusinessName: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
    fontWeight: "400",
  },
  inputBox: {
    width: "96%",

    minHeight: 60,
    paddingHorizontal: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
    borderBottomColor: Global.color,
    borderBottomWidth: 1,
    marginLeft: "2%",
  },
  formHeading: {
    fontSize: 16,
    color: "#363636",
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
  mainBox: {
    minWidth: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: 'wrap'
  },

  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHalfTwo1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 40,
    borderRadius: 5,
    backgroundColor: Global.color,
    elevation: 1,
    marginTop: 20,
    fontFamily: "sans-serif-thin",
    marginLeft: "5%",
    marginBottom: 10,
  },
  buttonFl: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "cover",
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvertizeBusiness);
