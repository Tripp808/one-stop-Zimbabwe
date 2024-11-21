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
import { get_data } from "../../store/acion/index";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Ionicons";
import { arr, Global } from "../../assets/Global_Variable";
import allSubCatagories from "../../assets/filter";
import { Countries } from "../../assets/countries";
import DropDownPicker from "react-native-dropdown-picker";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Cities from '../../assets/cities';
import Geocoder from 'react-native-geocoder';
import MapView, { Marker } from 'react-native-maps';

function AddBusiness(Props) {
  const isFocused = useIsFocused();
  let [Tag_line, setTag_line] = useState("");

  let [random, setRandom] = useState(3);
  let [loadingS, setLoadingS] = useState(false);
  let [user, setUser] = useState();
  useEffect(() => {
    getData();
  }, [isFocused]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));

    if (user != undefined) {
      setUser(user);
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [value_Valid, setValue_Valid] = useState(null);

  const [items, setItems] = useState([
    { label: "Free package", value: "Basic" },
    { label: "Premium Package (for claimed businesses only)", value: "Professional" },
  ]);

  // Business name

  let [Business_Name, setBusiness_Name] = useState("");
  let [Business_Modal, setBusiness_Modal] = useState(false);
  let [Business_Validation, setBusiness_Validation] = useState("");

  // Business name
  let [Business_Street_Hs, setBusiness_Street_Hs] = useState("");
  let [Business_city, setBusiness_city] = useState("");

  let [Business_Address, setBusiness_Address] = useState("");
  let [Business_Address_Modal, setBusiness_Address_Modal] = useState(false);
  let [Business_Address_Validation, setBusiness_Address_Validation] =
    useState("");
  const [region, setRegion] = useState({
    latitude: -17.824858
    , longitude: 31.053028,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState({
    latitude: -17.824858, longitude: 31.053028,

  })
  // Business_Catagorie
  let [Business_Catagorie, setBusiness_Catagorie] = useState("");
  let [Business_Catagorie_Modal, setBusiness_Catagorie_Modal] = useState(false);
  let [Business_Catagorie_Modal1, setBusiness_Catagorie_Modal1] =
    useState(false);
  console.log("All_Business_Nodes_newOld", Props.All_Business_Nodes_newOld);
  let [Business_Catagorie_Validation, setBusiness_Catagorie_Validation] =
    useState("");
  let allCatagriesName = [
    "active Life",
    "Arts Entertainment",
    "Bars",
    "Motor Vehicle Services",
    "BeautySpas",
    "Education",
    "Event Management Services",
    "Financial Insurance Services",
    "Food",
    "Religious Institude",
    "Shopping",
    "Health Medical Service",
    "Professional Services",
    "Local Services",
    "Government Public Services",
    "Home Commercial Services",
    "Hotels and Lodges",
    "Mass Media",
    "Pets",
    "TourismService"
  ];

  // City Select Filter
  let [CityModal, setCityModal] = useState(false);
  let [CityValidation, setCityValidation] = useState('');
  let [Filter1, setFilter1] = useState('');
  let FilterData1 = single => {
    return single.city.toLowerCase().indexOf(Filter1.toLowerCase()) !== -1;
  };
  let allCity = Cities.filter(FilterData1);
  let [selectedCity, setSelectedCity] = useState([]);
  let renderItem1 = v => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedCity.includes(v.item)
            ? Global.color
            : '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCity([v.item]);
            setCityModal(false);
            setFilter('');
            setCityValidation('');
            setRandom(Math.random() * 100);
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Text
            style={{
              fontSize: 13,
              color: selectedCity.includes(v.item) ? '#FFFFFF' : '#414141',

              fontFamily: 'sans-serif-normal',
              fontWeight: 'bold',
              marginLeft: 15,
            }}>
            {v.item.city}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const onChangeValue = async (region) => {
    setRegion(region)
    await Geocoder.fallbackToGoogle('AIzaSyB-49hZCMMZ9_AHaDEmTAdXswwXgEB899w')
    let lat = await region.latitude
    let lng = await region.longitude
    setMarker({
      latitude: lat,
      longitude: lng,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive'
    })
    try {
      let res = await Geocoder.geocodePosition({ lat, lng })
      // console.log("re",res[0].formattedAddress);
      setBusiness_Address(res[0].formattedAddress)
      // mark.showCallout()
    }

    catch (err) {
      console.log(err);
    }
    // console.log("region",region);
  }

  let allSub = allSubCatagories.map((v) =>
    v.filter(
      (e) => e.toLowerCase().indexOf(Business_Catagorie.toLowerCase()) !== -1
    )
  );
  let [selected_Catagorie, setSelectedCatagorie] = useState([]);

  let AddToSelecedCatagories = (v) => {
    if (selected_Catagorie.includes(v)) {
      console.log("Already added");
    } else {
      let arr = selected_Catagorie;
      arr.push(v);
      setSelectedCatagorie(arr);
    }

    setBusiness_Catagorie_Modal1(true);
    setBusiness_Catagorie("");
    setRandom(Math.random() * 100);
  };

  let RemoveMe = (v) => {
    let arr = selected_Catagorie;
    let index = arr.indexOf(v);
    if (index > 0) {
      arr.splice(index, index);
    } else {
      arr.shift();
    }
    setSelectedCatagorie(arr);
    setRandom(Math.random() * 1000);
    console.log(arr);
  };

  // Business name

  let [Business_Phone, setBusiness_Phone] = useState("");
  let [Business_Phone_Modal, setBusiness_Phone_Modal] = useState(false);
  let [Business_Phone_Validation, setBusiness_Phone_Validation] = useState("");



  // Business price

  let [Business_Price, setBusiness_Price] = useState("");
  let [Business_Price_Modal, setBusiness_Price_Modal] = useState(false);
  let [Business_Price_Validation, setBusiness_Price_Validation] = useState("");

  // Business price

  let [Business_Price_Max, setBusiness_Price_Max] = useState("");
  let [Business_Price_Modal_Max, setBusiness_Price_Modal_Max] = useState(false);
  let [Business_Price_Validation_Max, setBusiness_Price_Validation_Max] = useState("");

  // Country Select Filter
  let [countryModal, setCountryModal] = useState(false);
  let [countryValidation, setcountryValidation] = useState("");
  let [Filter, setFilter] = useState("");
  let FilterData = (single) => {
    return single.name.toLowerCase().indexOf(Filter.toLowerCase()) !== -1;
  };
  let allCountry = Countries.filter(FilterData);
  let [selectedCountry, setSelectedCountry] = useState([]);
  let renderItem = (v) => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedCountry.includes(v.item)
            ? Global.color
            : "#FFFFFF",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedCountry([v.item]);
            setCountryModal(false);
            setFilter("");
            setcountryValidation("");
            setRandom(Math.random() * 100);
          }}
          activeOpacity={0.5}
          style={styles.card}
        >
          <Image
            source={{ uri: FlagsAll[v.item.alpha2] }}
            style={{ width: 30, height: 20, resizeMode: "contain" }}
          />

          <Text
            style={{
              fontSize: 13,
              color: selectedCountry.includes(v.item) ? "#FFFFFF" : "#414141",

              fontFamily: "sans-serif-normal",
              fontWeight: "bold",
              marginLeft: 15,
            }}
          >
            {v.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  let ResetValidity = () => {
    setBusiness_Validation("");
    setBusiness_Address_Validation("");
    setBusiness_Catagorie_Validation("");
    setBusiness_Phone_Validation("");
    setBusiness_Price_Validation("");
    setBusiness_Price_Validation_Max("");

    setcountryValidation("");
    setValue_Valid("");
    setCityValidation("")
  };

  let ResetValues = () => {
    setBusiness_Name("");
    setBusiness_Address("");
    setBusiness_Catagorie("");
    setBusiness_Phone("");
    setBusiness_Price("");
    setBusiness_Price_Max("");
    setSelectedCountry([]);
    setValue_Valid("");
    setSelectedCatagorie([]);
    setOptional_Website("");
    setOptional_Menu_url("")
    setSelectedCity([])
    setBusiness_city("")
    setBusiness_Street_Hs("")
  };

  let Check_validity = () => {
    ResetValidity();
    if (
      Business_Name == "" ||
      Business_Address == "" &&
      Business_city == "" && Business_Street_Hs == '' ||
      selected_Catagorie.length == 0 ||
      Business_Phone == "" ||
      Business_Price == "" ||
      Business_Price_Max == "" ||
      selectedCountry.length == 0 ||
      value == null ||
      selectedCity.length == 0

    ) {
      if (Business_Name == "") {
        setBusiness_Validation("* Required");
      }

      if (Business_Address == "" && Business_city == "" && Business_Street_Hs == '') {
        setBusiness_Address_Validation("* Required");
      }

      if (Business_Phone == "") {
        setBusiness_Phone_Validation("* Required");
      }
      if (Business_Price == "") {
        setBusiness_Price_Validation("* Required");
      }
      if (Business_Price_Max == "") {
        setBusiness_Price_Validation_Max("* Required");
      }
      if (selected_Catagorie.length == 0) {
        setBusiness_Catagorie_Validation("* Required");
      }

      if (selectedCountry.length == 0) {
        setcountryValidation("* Required");
      }

      if (value == null) {
        setValue_Valid("* Required");
      }

      if (selectedCity.length == 0) {
        setCityValidation("* Required");
      }
      return;
    }
    if (JSON.parse(Business_Price_Max) < JSON.parse(Business_Price)) {
      alert("Maximum Price Should Greater then Minimum price")
      return
    }


   


    
    let alreadyExist = Props.All_Business_Nodes_newOld.filter(e => e.name.toLowerCase() == Business_Name.toLowerCase())
    if (alreadyExist.length > 0) {
      alert("Business with same name already exist! Try to register with other name")
      return
    }

console.log("Tryen>>>>>>>>>");

    setLoadingS(true);
    let new_date = new Date();
    new_date.setDate(new_date.getDate() + 1);
    let obj = {
      name: Business_Name,
      Business_Street_Hs: Business_Street_Hs,
      Business_city: Business_city,
      address: Business_Address,
      phone: Business_Phone,
      price: Business_Price,
      price_Max: Business_Price_Max,
      categories: selected_Catagorie,
      country: selectedCountry[0].name,
      website: optional_Website,
      Menu: optional_Menu_url,
      Profile_Type: value,
      user_uid: user.uid,
      Business_Dp: user.photo,
      Images: [],
      type: "business",
      Received_Reviews_no: 0,
      OverAll_Rating: [0, 0, 0, 0, 0],
      new: true,
      exp: new_date.getTime(),
      approved: false,
      Tag_line: Tag_line,
      city: selectedCity[0].city,
      Map_value: region,
      Registered_date: new Date(),
      Videos: [],
      last_update_photo: {
        date: new Date,
        this_month_update: 0
      },
      last_update_video: {
        date: new Date,
        this_month_update: 0
      },
      claimed: false,
      claimRequestProgess: false,
      Home_Monitize: false,
      Home_Monitize_Start_Time: 123123,
      Home_Monitize_End_Time: 123928,
      Categories_Monitize: false,
      Categories_Monitize_Start_Time: 123928,
      Categories_Monitize_End_Time: 123928,
      CheckIns: [],
      Home_Monitize_image: '',
      Categories_Monitize_image: '',
      events:[]


    };

    let user1 = user;
    user1.Business = true;
    firestore()
      .collection("All_Business")
      .add(obj)
      .then((e) => {
        firestore().collection("All_Business").doc(e._documentPath._parts[1]).update({ uid: e._documentPath._parts[1] }).then(() => {

          firestore()
            .collection("Authuntication")
            .doc(user.uid)
            .update({ Business: true })
            .then(async () => {
              await AsyncStorage.setItem(
                "@user_data",
                JSON.stringify(user1)
              ).then(async () => {
                alert("Data Submitted.");
                ResetValues();
                getData();
                setLoadingS(false);
                Props.navigation.goBack();
              });
            });
        })
      })
      .catch(() => {
        setLoadingS(false);
        alert("Something Went Wrong Try Again Later!");
        Props.navigation.goBack();
      });
  };

  let [optional_Website, setOptional_Website] = useState("");
  let [optional_WebsiteModal, setOptional_WebsiteModal] = useState("");



  let [optional_Menu_url, setOptional_Menu_url] = useState("");
  let [optional_Menu_urlModal, set_Menu_urlModal] = useState("");



  return (
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
          onPress={() => Props.navigation.goBack()}
          name="close-outline"
          size={30}
          style={{
            color: "#FFFFFF",
          }}
        />

        <Text style={styles.navHeading}>I am Business Owner</Text>

        <TouchableOpacity
          onPress={() => Check_validity()}
          activeOpacity={0.8}
          style={styles.sendTouch}
        >
          <Text style={styles.sendNav}>Send</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View>
          <Text style={styles.formHeading}>Country</Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCountryModal(true)}
            style={styles.inputBox}
          >
            {selectedCountry.length > 0 ? (
              <View style={styles.row}>
                <Image
                  source={{ uri: FlagsAll[selectedCountry[0].alpha2] }}
                  style={styles.flag}
                />
                <Text style={styles.countryName}>{selectedCountry[0].name}</Text>
              </View>
            ) : (
              <Text
                style={{
                  ...styles.countryName,
                  color: countryValidation == "* Required" ? "red" : "#000",
                }}
              >
                Select Country
              </Text>
            )}

            <Icon3
              name="chevron-down-outline"
              size={20}
              style={{
                color: countryValidation == "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          <Text style={styles.formHeading}>Required Information</Text>

          <TouchableOpacity
            onPress={() => setBusiness_Modal(true)}
            activeOpacity={0.9}
            style={styles.inputBox}
          >
            <Text
              style={{
                ...styles.countryName,
                color: Business_Validation === "* Required" ? "red" : "#000",
              }}
            >
              {Business_Name !== "" ? Business_Name : "Business Name"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: Business_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          <View style={styles.bar}></View>

          <TouchableOpacity
            onPress={async () => {

              setBusiness_Address_Modal(true)

            }}
            activeOpacity={0.9}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            <Text
              style={{
                ...styles.countryName,
                color:
                  Business_Address_Validation === "* Required" ? "red" : "#000",
                width: '90%'
              }}
            >
              {(Business_Street_Hs !== "" || Business_city !== "" || Business_Address !== "") ? Business_Street_Hs + Business_city + Business_Address : "Address"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color:
                  Business_Address_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          <View style={styles.bar}></View>



          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCityModal(true)}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            {selectedCity.length > 0 ? (
              <View style={styles.row}>

                <Text style={styles.countryName}>{selectedCity[0].city}</Text>
              </View>
            ) : (
              <Text
                style={{
                  ...styles.countryName,
                  color: CityValidation == "* Required" ? "red" : "#000",
                }}
              >
                Select City
              </Text>
            )}

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: CityValidation == "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          <View style={styles.bar}></View>


          <TouchableOpacity
            onPress={() =>
              selected_Catagorie.length < 1
                ? setBusiness_Catagorie_Modal(true)
                : setBusiness_Catagorie_Modal1(true)
            }
            activeOpacity={0.9}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            <Text
              style={{
                ...styles.countryName,
                width: "90%",
                marginTop: 7,
                marginBottom: 7,
                color:
                  Business_Catagorie_Validation === "* Required" ? "red" : "#000",
              }}
            >
              {selected_Catagorie.length > 0
                ? selected_Catagorie.map((vali) => {
                  return vali.subCatagorie;
                })
                : "Categories"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color:
                  Business_Catagorie_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          <View style={styles.bar}></View>

          <TouchableOpacity
            onPress={() => setBusiness_Phone_Modal(true)}
            activeOpacity={0.9}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            <Text
              style={{
                ...styles.countryName,
                color:
                  Business_Phone_Validation === "* Required" ? "red" : "#000",
              }}
            >
              {Business_Phone !== "" ? Business_Phone : "Phone"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color:
                  Business_Phone_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>


          <View style={styles.bar}></View>

          <TouchableOpacity
            onPress={() => setBusiness_Price_Modal(true)}
            activeOpacity={0.9}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            <Text
              style={{
                ...styles.countryName,
                color:
                  Business_Price_Validation === "* Required" ? "red" : "#000",
              }}
            >
              {Business_Price !== "" ? Business_Price : "Minimum Price"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color:
                  Business_Price_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>


          <View style={styles.bar}></View>

          <TouchableOpacity
            onPress={() => setBusiness_Price_Modal_Max(true)}
            activeOpacity={0.9}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            <Text
              style={{
                ...styles.countryName,
                color:
                  Business_Price_Validation_Max === "* Required" ? "red" : "#000",
              }}
            >
              {Business_Price_Max !== "" ? Business_Price_Max : "Maximum Price"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color:
                  Business_Price_Validation_Max === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>


          <View style={styles.bar}></View>

          <DropDownPicker
            placeholder="Select Profile Type"
            placeholderStyle={{
              color: value_Valid === "* Required" ? "red" : "#000",
              marginLeft: 10,
              fontSize: 16,
            }}
            ArrowDownIconComponent={({ style }) => (
              <Icon3
                name="chevron-forward-outline"
                size={20}
                color={value_Valid === "* Required" ? "red" : "#000"}
              />
            )}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              borderWidth: 0,
              height: 60,
            }}
          />
          <Text style={styles.formHeading}>Optional Information</Text>

          <TouchableOpacity
            onPress={() => setOptional_WebsiteModal(true)}
            activeOpacity={0.9}
            style={styles.inputBox}
          >
            <Text style={styles.countryName}>
              {optional_Website !== "" ? optional_Website : "Website"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: "#000",
              }}
            />
          </TouchableOpacity>


          <View style={styles.bar}></View>


          <TouchableOpacity
            onPress={() => set_Menu_urlModal(true)}
            activeOpacity={0.9}
            style={{ ...styles.inputBox, marginTop: 0 }}
          >
            <Text style={styles.countryName}>
              {optional_Menu_url !== "" ? optional_Menu_url : "Menu/Business Catalogue URL"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: "#000",
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={countryModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setCountryModal(false);
              setFilter("");
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
            Choose Country
          </Text>
        </View>

        <TextInput
          placeholderTextColor={"grey"}
          onChangeText={(e) => setFilter(e)}
          style={{
            ...styles.input,
          }}
          placeholder="Search Countries Here"
        ></TextInput>

        <FlatList
          initialNumToRender={80}
          data={allCountry}
          renderItem={renderItem}
        ></FlatList>
      </Modal>

      {/* Business Name Modal  */}
      <Modal visible={Business_Modal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setBusiness_Modal(false)}
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
            Business Name
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Modal(false);
            }}
            disabled={Business_Name !== "" ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: Business_Name !== "" ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={(e) => setBusiness_Name(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
          }}
          value={Business_Name}
          placeholder="Type Business Name Here...."
        ></TextInput>
      </Modal>

      {/* Business_Address Modal  */}
      <Modal visible={Business_Address_Modal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setBusiness_Address_Modal(false)


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
            Edit Address
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Address_Modal(false);
            }}
            disabled={(Business_Street_Hs !== "" || Business_city !== "" || Business_Address !== "") ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: (Business_Street_Hs !== "" || Business_city !== "" || Business_Address !== "") ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={(e) => setBusiness_Street_Hs(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
            height: 45,
            marginTop: 0
          }}
          value={Business_Street_Hs}
          placeholder="Type House No# Street Here...."
        ></TextInput>



        <TextInput
          onChangeText={(e) => setBusiness_city(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
            height: 45,
            marginTop: 0
          }}
          value={Business_city}
          placeholder="Type City Here...."
        ></TextInput>

        <TextInput
          onChangeText={(e) => setBusiness_Address(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
            height: 45,
            marginTop: 0
          }}
          value={Business_Address}
          placeholder="Type Address Here...."
        ></TextInput>


        <View style={{ width: '100%', height: '100%', display: 'flex', marginTop: 0, backgroundColor: 'white' }}>

          <MapView

            style={{ width: '100%', height: '90%' }}
            region={region}

            onRegionChangeComplete={(region) => { onChangeValue(region) }}
            zoomEnabled={true}
            zoomControlEnabled={false}
            showsMyLocationButton={true}
            showsUserLocation={true}
            followsUserLocation={true}
            scrollDuringRotateOrZoomEnabled={false}

          >
            {/* <Marker coordinate = {marker}
         pinColor = {Global.color} // any color
         title={"title"}
         description={"description"}
         style={{position:'absolute'}}
         /> */}
          </MapView>
          <View
            style={{ position: 'absolute', top: '45%', width: '50%', left: '51%', marginTop: -48, marginLeft: -24 }}
          >


            <Icon2 name="map-pin" size={33} style={{ padding: 10 }} color='red' />

          </View>


          <View>

          </View>


        </View>


      </Modal>

      {/* BusinesscatagoriesModal  */}

      <Modal visible={Business_Catagorie_Modal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setBusiness_Catagorie_Modal(false);
              setBusiness_Catagorie_Modal1(false);
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
            Edit Categories
          </Text>
        </View>

        <Text style={{ ...styles.countryName, fontSize: 14, margin: 10 }}>
          Search Upto Three Best Categories Related To your Business
        </Text>

        <TextInput
          onChangeText={(e) => setBusiness_Catagorie(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,

            backgroundColor: "#FFFFFF",
            elevation: 4,
            marginBottom: 0,
          }}
          value={Business_Catagorie}
          placeholder="Search Categories here"
        ></TextInput>

        <ScrollView>
          {allSub.map((v, index) => {
            if (Business_Catagorie.length > 1) {
              return v.map((val, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.5}
                    onPress={() =>
                      AddToSelecedCatagories({
                        catagorie: allCatagriesName[index],
                        subCatagorie: val,
                      })
                    }
                  >
                    <View style={styles.catagoriesDiv}>
                      <Text style={styles.catagoriesDivText}>
                        {allCatagriesName[index]} {">"} {val}
                      </Text>
                    </View>

                    <View style={styles.bar}></View>
                  </TouchableOpacity>
                );
              });
            }
          })}
        </ScrollView>
      </Modal>

      <Modal visible={Business_Catagorie_Modal1}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setBusiness_Catagorie_Modal(false);
              setBusiness_Catagorie_Modal1(false);
              setSelectedCatagorie([]);
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
            Edit Categories
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Catagorie_Modal(false);
              setBusiness_Catagorie_Modal1(false);
              let Tag_line = "";
              if (selected_Catagorie.length == 1) {
                Tag_line =
                  selected_Catagorie[0].catagorie +
                  selected_Catagorie[0].subCatagorie;
              }
              if (selected_Catagorie.length == 2) {
                Tag_line =
                  selected_Catagorie[0].catagorie +
                  selected_Catagorie[0].subCatagorie +
                  selected_Catagorie[1].catagorie +
                  selected_Catagorie[1].subCatagorie;
              }

              if (selected_Catagorie.length == 3) {
                Tag_line =
                  selected_Catagorie[0].catagorie +
                  selected_Catagorie[0].subCatagorie +
                  selected_Catagorie[1].catagorie +
                  selected_Catagorie[1].subCatagorie +
                  selected_Catagorie[2].catagorie +
                  selected_Catagorie[2].subCatagorie;
              }
              setTag_line(Tag_line);
            }}
            disabled={selected_Catagorie.length > 0 ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: selected_Catagorie.length > 0 ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Done</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ ...styles.countryName, fontSize: 14, margin: 10 }}>
          Provide upto three Categories that best Describe core foucus of
          Business
        </Text>

        {selected_Catagorie.map((v, i) => {
          return (
            <View key={i} style={styles.catagorieShowDiv}>
              <Text style={{ ...styles.catagoriesDivText, fontSize: 15 }}>
                {v.subCatagorie}
              </Text>

              <Icon3
                onPress={() => RemoveMe(v)}
                name="close-circle-outline"
                size={20}
                color="grey"
              />
            </View>
          );
        })}

        {selected_Catagorie.length < 3 ? (
          <TouchableOpacity
            onPress={() => {
              setBusiness_Catagorie_Modal1(false);
              setBusiness_Catagorie_Modal(true);
            }}
            activeOpacity={0.9}
            style={styles.addCatagorieDiv}
          >
            <Text style={styles.catagoriesDivText}>Add New Categorie</Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              ...styles.countryName,
              fontSize: 12,
              color: "red",
              width: "100%",
              textAlign: "right",
              marginTop: 10,
              marginRight: 5,
            }}
          >
            Your Already Have Added 3 Catagories
          </Text>
        )}
      </Modal>

      {/* Business Phone Modal  */}
      <Modal visible={Business_Phone_Modal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setBusiness_Phone_Modal(false)}
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
            Business Phone
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Phone_Modal(false);
            }}
            disabled={Business_Phone !== "" ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: Business_Phone !== "" ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={(e) => setBusiness_Phone(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
          }}
          keyboardType="number-pad"
          value={Business_Phone}
          placeholder="Type Business Phone Here...."
        ></TextInput>
      </Modal>


      {/* Business Price Modal  */}
      <Modal visible={Business_Price_Modal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setBusiness_Price_Modal(false)}
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
            Minimum Price
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Price_Modal(false);
            }}
            disabled={Business_Price !== "" ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: Business_Price !== "" ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={(e) => setBusiness_Price(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
          }}
          keyboardType="number-pad"
          value={Business_Price}
          placeholder="Type Minimum Price Here...."
        ></TextInput>
      </Modal>



      <Modal visible={Business_Price_Modal_Max}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setBusiness_Price_Modal_Max(false)}
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
            Maximum Price
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Price_Modal_Max(false);
            }}
            disabled={Business_Price_Max !== "" ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: Business_Price_Max !== "" ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={(e) => setBusiness_Price_Max(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
          }}
          keyboardType="number-pad"
          value={Business_Price_Max}
          placeholder="Type Maximum Price Here...."
        ></TextInput>
      </Modal>



      {/* Business Website Modal  */}
      <Modal visible={optional_WebsiteModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setOptional_WebsiteModal(false)}
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
            Website
          </Text>

          <TouchableOpacity
            onPress={() => setOptional_WebsiteModal(false)}
            disabled={optional_Website !== "" ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: optional_Website !== "" ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={(e) => setOptional_Website(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
          }}
          value={optional_Website}
          placeholder="https://www.google.com/"
        ></TextInput>
      </Modal>



      {/* Business Menu/Business Catalogue URL Modal  */}

      <Modal visible={optional_Menu_urlModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => set_Menu_urlModal(false)}
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
            Menu/Business Catalogue URL
          </Text>

          <TouchableOpacity
            onPress={() => set_Menu_urlModal(false)}
            disabled={optional_Menu_url !== "" ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: optional_Menu_url !== "" ? 1 : 0.4,
            }}
          >
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={(e) => setOptional_Menu_url(e)}
          placeholderTextColor={"grey"}
          style={{
            ...styles.input1,
          }}
          value={optional_Menu_url}
          placeholder="https://www.google.com/"
        ></TextInput>
      </Modal>


      {/* Business City Chooser  */}
      <Modal visible={CityModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setCityModal(false);
              setFilter('');
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
            Choose City
          </Text>
        </View>

        <TextInput
          placeholderTextColor={'grey'}
          onChangeText={e => setFilter1(e)}
          style={{
            ...styles.input,
          }}
          placeholder="Search City Here"></TextInput>

        <FlatList
          initialNumToRender={20}
          data={allCity}
          renderItem={renderItem1}></FlatList>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addCatagorieDiv: {
    width: "90%",

    height: 40,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5%",
    borderRadius: 4,
    marginTop: 30,
  },
  bar: {
    width: "100%",
    height: 1,
    opacity: 0.4,
  },
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

  formHeading: {
    fontSize: 16,
    color: "#363636",
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
  inputBox: {
    width: "100%",

    backgroundColor: "#FFFFFF",
    minHeight: 60,
    paddingHorizontal: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
  },
  flag: {
    width: 30,
    height: 20,
    resizeMode: "contain",
    marginTop: 2,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  countryName: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
    fontWeight: "400",
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

  input1: {
    width: "98%",
    marginLeft: "1%",

    marginBottom: 10,
    height: 45,

    marginTop: 10,
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: "Roboto",
    color: "grey",
    borderBottomColor: Global.linkBlueColor,
    borderBottomWidth: 2,
  },
  fillAddress: {
    width: "98%",
    height: 30,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    marginLeft: "1%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 4,
  },
  fillText: {
    fontSize: 13,
    color: "#000",
  },

  catagoriesDiv: {
    width: "98%",
    height: 30,
    backgroundColor: "#FFFFFF",
    marginLeft: "1%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 0.4,
  },
  catagoriesDivText: {
    fontSize: 12,
    color: "#000",
    paddingLeft: 10,
    fontWeight: "bold",
  },
  catagorieShowDiv: {
    width: "98%",
    height: 50,
    backgroundColor: "#FFFFFF",
    marginLeft: "1%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 0.4,
    flexDirection: "row",
    padding: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    name1: state.name,
    All_Business_Nodes_newOld: state.All_Business_Nodes_newOld

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBusiness);
