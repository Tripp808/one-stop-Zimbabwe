import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, StatusBar, Modal, TextInput, FlatList, LogBox, Alert } from "react-native";
import { get_data } from "../store/acion/index";
import storage from "@react-native-firebase/storage";
import SweetAlert from "react-native-sweet-alert";
import Icon from "react-native-vector-icons/FontAwesome5";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon3 from "react-native-vector-icons/Ionicons";
import { arr, Global } from "../assets/Global_Variable";
import allSubcategories from "../assets/filter";
import { Countries } from "../assets/countries";
import DropDownPicker from "react-native-dropdown-picker";
import firestore, { firebase } from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Cities from "../assets/cities";
import Geocoder from "react-native-geocoder";
import MapView, { Marker } from "react-native-maps";
import VideoPlayer from "react-native-video-player";
import getPath from "@flyerhq/react-native-android-uri-path";
import { createThumbnail } from "react-native-create-thumbnail";

function Edit_Business(Props) {
  let Edit_Business = Props.route.params.Business;
  const isFocused = useIsFocused();
  let [Tag_line, setTag_line] = useState(Edit_Business.Tag_line);
  let [random, setRandom] = useState(3);
  let [loadingS, setLoadingS] = useState(true);
  let [limit_month_picture, setlimit_month_picture] = useState(Edit_Business.last_update_photo.this_month_update);
  let [limit_month_Video, setlimit_month_Video] = useState(Edit_Business.last_update_video.this_month_update);
  useEffect(() => {
    setTag_line(Edit_Business.Tag_line);
    setBusiness_Name(Edit_Business.name);
    setValue(Edit_Business.Profile_Type);
    setBusiness_Address(Edit_Business.address);
    setBusiness_Phone(Edit_Business.phone);
    setSelectedCountry([{ name: Edit_Business.country }]);
    setSelectedCatagorie(Edit_Business.categories);
    setImages(Edit_Business.Images);
    setImage(Edit_Business.Business_Dp);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setLoadingS(false);
    if(Props.route.params.photo){
      SetEditPhotoModal(true)
    }
    if(Props.route.params.video){
      SetEditVideoModal(true)
    }


  }, [isFocused]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(Edit_Business.Profile_Type);
  const [value_Valid, setValue_Valid] = useState(null);

  const [items, setItems] = useState([
    { label: "Free package", value: "Basic" },
    { label: "Premium Package (for claimed businesses only)", value: "Professional" },
  ]);

  // Business_Photo
  let [EditPhotoModal, SetEditPhotoModal] = useState(false);
  let [Images, setImages] = useState(Edit_Business.Images);
  let [Images_Data, setImages_Data] = useState([]);

  // Business_Video
  let [EditVideoModal, SetEditVideoModal] = useState(false);
  let [Videos, setVideos] = useState(Edit_Business.Videos == undefined ? [] : Edit_Business.Videos);
  let [Videos_Data, setVideos_Data] = useState([]);
  let [play_me, setPlay_me] = useState("");
  let [video_Modal, setvideo_Modal] = useState(false);

  // Business name

  let [Business_Name, setBusiness_Name] = useState(Edit_Business.name);
  let [Business_Modal, setBusiness_Modal] = useState(false);
  let [Business_Validation, setBusiness_Validation] = useState("");
  const [region, setRegion] = useState(Edit_Business.Map_value);

  // Business Address
  let [Business_Street_Hs, setBusiness_Street_Hs] = useState(Edit_Business.Business_Street_Hs!==undefined ? Edit_Business.Business_Street_Hs:"");
  let [Business_city, setBusiness_city] = useState(Edit_Business.Business_city!==undefined ? Edit_Business.Business_city:"");
  let [Business_Address, setBusiness_Address] = useState(Edit_Business.address);
  let [Business_Address_Modal, setBusiness_Address_Modal] = useState(false);
  let [Business_Address_Validation, setBusiness_Address_Validation] = useState("");
  const [marker, setMarker] = useState({
    latitude: Edit_Business.Map_value.latitude,
    longitude: Edit_Business.Map_value.longitude,
  });
  // Business_Catagorie
  let [Business_Catagorie, setBusiness_Catagorie] = useState("");
  let [Business_Catagorie_Modal, setBusiness_Catagorie_Modal] = useState(false);
  let [Business_Catagorie_Modal1, setBusiness_Catagorie_Modal1] = useState(false);
  let [Business_Catagorie_Validation, setBusiness_Catagorie_Validation] = useState("");
  let allCatagriesName = ["active Life",
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
  "TourismService"];
  const onChangeValue = async (region) => {
    setRegion(region);
    await Geocoder.fallbackToGoogle("AIzaSyB-49hZCMMZ9_AHaDEmTAdXswwXgEB899w");
    let lat = await region.latitude;
    let lng = await region.longitude;
    setMarker({
      latitude: lat,
      longitude: lng,
    });
    try {
      let res = await Geocoder.geocodePosition({ lat, lng });
      // console.log("re",res[0].formattedAddress);
      setBusiness_Address(res[0].formattedAddress);
      // mark.showCallout()
    } catch (err) {
      console.log(err);
    }
    // console.log("region",region);
  };

  // City Select Filter
  let [CityModal, setCityModal] = useState(false);
  let [CityValidation, setCityValidation] = useState("");
  let [Filter1, setFilter1] = useState("");
  let FilterData1 = (single) => {
    return single.city.toLowerCase().indexOf(Filter1.toLowerCase()) !== -1;
  };
  let allCity = Cities.filter(FilterData1);
  let [selectedCity, setSelectedCity] = useState([{ city: Edit_Business.city }]);
  let renderItem1 = (v) => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedCity.includes(v.item) ? Global.color : "#FFFFFF",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedCity([v.item]);
            setCityModal(false);
            setFilter("");
            setCityValidation("");
            setRandom(Math.random() * 100);
          }}
          activeOpacity={0.5}
          style={styles.card}
        >
          <Text
            style={{
              fontSize: 13,
              color: selectedCity.includes(v.item) ? "#FFFFFF" : "#414141",

              fontFamily: "sans-serif-normal",
              fontWeight: "bold",
              marginLeft: 15,
            }}
          >
            {v.item.city}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  // Business name

  let [Business_Phone, setBusiness_Phone] = useState(Edit_Business.phone);
  let [Business_Phone_Modal, setBusiness_Phone_Modal] = useState(false);
  let [Business_Phone_Validation, setBusiness_Phone_Validation] = useState("");



   // Business name

   let [Business_Price, setBusiness_Price] = useState(Edit_Business.price==undefined? 0:Edit_Business.price);
   let [Business_Price_Modal, setBusiness_Price_Modal] = useState(false);
   let [Business_Price_Validation, setBusiness_Price_Validation] = useState("");

   
   let [Business_Price_Max, setBusiness_Price_Max] = useState(Edit_Business.price_Max==undefined? 0:Edit_Business.price_Max);
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
  let [selectedCountry, setSelectedCountry] = useState([{ name: Edit_Business.country }]);

  let allSub = allSubcategories.map((v) => v.filter((e) => e.toLowerCase().indexOf(Business_Catagorie.toLowerCase()) !== -1));
  let [selected_Catagorie, setSelectedCatagorie] = useState(Edit_Business.categories);

  let AddToSelecedcategories = (v) => {
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
    // console.log(arr);
  };

  let renderItem = (v) => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedCountry.includes(v.item) ? Global.color : "#FFFFFF",
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
          <Image source={{ uri: FlagsAll[v.item.alpha2] }} style={{ width: 30, height: 20, resizeMode: "contain" }} />

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

  const ChooseImage = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        alert("User cancelled ");
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

      arr.push(response.assets[0].uri);

      setImages(arr);

      let arr1 = Images_Data;

      arr1.push({
        image: response.assets[0].uri,
        file: response.assets[0],
        fileName: response.assets[0].fileName,
      });

      setImages_Data(arr1);

      setRandom(Math.random() * 1000);
    });
  };

  const ChooseVideo = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert("User cancelled ");
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

      console.log("Size= ", Math.round(response.assets[0].fileSize / 1000000));

      if (Math.round(response.assets[0].fileSize / 1000000) > Props.limit_controls.Video_size_mb) {
        alert(`Video file size exceed limit of ${16}mb.Your file size is ${Math.round(response.assets[0].fileSize / 1000000)}mb.`);
        return;
      }
      createThumbnail({
        url: response.assets[0].uri,
        timeStamp: 10000,
      })
        .then((resp) => {
          console.log("Response>>>>>>>", getPath(response.assets[0].uri));
          let arr = Videos;
          let obj = {
            url: getPath(response.assets[0].uri),
            fileName: response.assets[0].fileName,
            upload: false,
            thumbnail: resp.path,
          };
          arr.push(obj);

          setVideos(arr);

          let arr1 = Videos_Data;

          arr1.push(obj);

          setVideos_Data(arr1);

          setRandom(Math.random() * 1000);
        })
        .catch((err) => console.log({ err }));
    });
  };

  let UploadImages = async () => {
    // console.log(Images);
    let total = Images_Data.length;
    let urls = [];
    let check = 0;
    if (Images_Data.length == 0) {
      SetEditPhotoModal(false);
      // alert('Please Select Image First to Upload');
      return;
    }
    let this_month_update = limit_month_picture;

    if (Edit_Business.Profile_Type == "Basic") {
      if (Edit_Business.last_update_photo.date.toDate().getMonth() == new Date().getMonth() && Images_Data.length + JSON.parse(limit_month_picture) > Props.limit_controls.Basic_picture) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_photo.date.toDate().getMonth() !== new Date().getMonth() && Images_Data.length > Props.limit_controls.Basic_picture) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_photo.date.toDate().getMonth() !== new Date().getMonth()) {
        this_month_update = 0;
        firestore()
          .collection("All_Business")
          .doc(Edit_Business.uid)
          .update({
            last_update_photo: {
              this_month_update: 0,
            },
          });
      }
    }

    if (Edit_Business.Profile_Type == "Professional") {
      if (Edit_Business.last_update_photo.date.toDate().getMonth() == new Date().getMonth() && Images_Data.length + JSON.parse(limit_month_picture) > Props.limit_controls.Professional_picture) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_photo.date.toDate().getMonth() !== new Date().getMonth() && Images_Data.length > Props.limit_controls.Professional_picture) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_photo.date.toDate().getMonth() !== new Date().getMonth()) {
        this_month_update = 0;
        firestore()
          .collection("All_Business")
          .doc(Edit_Business.uid)
          .update({
            last_update_photo: {
              this_month_update: 0,
            },
          });
      }
    }
    setLoadingS(true);
    Images_Data.map(async (v, i) => {
      await storage()
        .ref(`BusinessImages/${v.fileName}`)
        .putFile(v.image)
        .then(async (snapshot) => {
          console.log(`${v.fileName} has been successfully uploaded.`);
          let imageRef = storage().ref(`BusinessImages/${v.fileName}`);
          await imageRef
            .getDownloadURL()
            .then(async (url) => {
              //from url you can fetched the uploaded image easil
              urls.push(url);
              check++;
              console.log(check, total);
              this_month_update++;

              firestore()
                .collection("All_Business")
                .doc(Edit_Business.uid)
                .update({
                  Images: firebase.firestore.FieldValue.arrayUnion(url),
                  last_update_photo: {
                    date: new Date(),
                    this_month_update: this_month_update,
                  },
                });

              if (check == total) {
                console.log("Uploaded All images", urls.length);
                setLoadingS(false);
                setImages_Data([])
                Props.navigation.navigate("Me");

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
                    // setImages([]);

                    SetEditPhotoModal(false);
                  }
                );
              }
            })
            .catch((e) => {
              alert(e);
              setLoadingS(false);
            });
        })
        .catch((e) => console.log("uploading image error => ", e));
    });
  };

  let UploadVideos = async () => {
    let this_month_update = limit_month_Video;
console.log(Videos_Data.length + JSON.parse(limit_month_Video) > Props.limit_controls.Basic_videos,Videos_Data.length + JSON.parse(limit_month_Video) , Props.limit_controls.Basic_videos)
    if (Edit_Business.Profile_Type == "Basic") {
      if (Edit_Business.last_update_video.date.toDate().getMonth() == new Date().getMonth() && Videos_Data.length + JSON.parse(limit_month_Video) > Props.limit_controls.Basic_videos) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_video.date.toDate().getMonth() !== new Date().getMonth() && Videos_Data.length > Props.limit_controls.Basic_videos) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_video.date.toDate().getMonth() !== new Date().getMonth()) {
        this_month_update = 0;
        firestore()
          .collection("All_Business")
          .doc(Edit_Business.uid)
          .update({
            last_update_video: {
              this_month_update: 0,
            },
          });
      }
    }

    if (Edit_Business.Profile_Type == "Professional") {
      if (Edit_Business.last_update_video.date.toDate().getMonth() == new Date().getMonth() && Videos_Data.length + JSON.parse(limit_month_Video) > Props.limit_controls.Professional_video) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_video.date.toDate().getMonth() !== new Date().getMonth() && Videos_Data.length > Props.limit_controls.Professional_video) {
        alert("Exceed Free Monthly Upload Package limit!");
        return;
      } else if (Edit_Business.last_update_video.date.toDate().getMonth() !== new Date().getMonth()) {
        this_month_update = 0;
        firestore()
          .collection("All_Business")
          .doc(Edit_Business.uid)
          .update({
            last_update_video: {
              this_month_update: 0,
            },
          });
      }
    }

    let arr = Videos_Data;
    // console.log(Images);
    let total = Videos_Data.length;
    let urls = [];
    let check = 0;

    let point = Videos_Data.filter((e) => e.upload !== true);
    if (Videos_Data.length == 0 || point == 0) {
      SetEditVideoModal(false);
      // alert('Please Select Image First to Upload');
      return;
    }

    if (Videos.length > Props.limit_controls) {
      alert(`Exceed Image Limit. Maximum limit is ${Props.limit_controls}`);
      return;
    }

    console.log("upload foo");
    setLoadingS(true);
    Videos_Data.map(async (v, i) => {
      await storage()
        .ref(`BusinessVideos/${v.thumbnail}`)
        .putFile(v.thumbnail)
        .then(async (snapshot) => {
          let ThumbnailRef = storage().ref(`BusinessVideos/${v.thumbnail}`);

          await ThumbnailRef.getDownloadURL().then(async (Thumbnail_Url) => {
            await storage()
              .ref(`BusinessImages/${v.fileName}`)
              .putFile(v.url)
              .then(async (snapshot) => {
                console.log(`${v.fileName} has been successfully uploaded.`);
                let imageRef = storage().ref(`BusinessImages/${v.fileName}`);
                await imageRef
                  .getDownloadURL()
                  .then(async (url) => {
                    urls.push(url);
                    check++;
                    this_month_update++;
                    console.log(check, total);
                    arr[i].upload = true;
                    firestore()
                      .collection("All_Business")
                      .doc(Edit_Business.uid)
                      .update({
                        Videos: firebase.firestore.FieldValue.arrayUnion({
                          url: url,
                          thumbnail: Thumbnail_Url,
                        }),
                        last_update_video: {
                          date: new Date(),
                          this_month_update: this_month_update,
                        },
                      });

                    if (check == total) {
                      console.log("Uploaded All images", urls.length);
                      setLoadingS(false);
                      Props.navigation.navigate("Me");
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
                          setVideos_Data(arr);
                          SetEditVideoModal(false);
                        }
                      );
                    }
                  })
                  .catch((e) => {
                    alert(e);
                    setLoadingS(false);
                  });
              })
              .catch((e) => console.log("uploading image error => ", e));
          });
        });
    });
  };
  let RemoveImage = (v) => {
    setLoadingS(true);
    try {
      var desertRef = firebase.storage().refFromURL(v);

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          // File deleted successfully
          DeleteFromfirestoreImage(v);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          // alert(error)
          DeleteFromfirestoreImage(v);
        });
    } catch (error) {
      console.log(error);
      let array = Images;

      const index = array.indexOf(v);
      if (index > -1) {
        // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
      }
      setImages_Data(Images_Data.filter((e) => e.file.uri !== v));
      setImages(array);
      setLoadingS(false);
      setRandom(Math.random() * 1000);
    }
  };

  let RemoveVideo = (v) => {
    setLoadingS(true);
    try {
      var desertRef = firebase.storage().refFromURL(v.url);

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          // File deleted successfully
          DeleteFromfirestoreVideo(v);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          // alert(error)
          DeleteFromfirestoreVideo(v);
        });
    } catch (error) {
      console.log(error);
      let array = Videos;

      const index = array.indexOf(v);
      if (index > -1) {
        // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
      }
      let remaning = Videos_Data.filter((e) => e.url !== v.url);
      setVideos_Data(remaning);

      console.log(remaning.length);

      setVideos(array);
      setLoadingS(false);
      setRandom(Math.random() * 1000);
    }
  };
  // console.log("REmoved iimage data", Images_Data);

  let DeleteFromfirestoreImage = (v) => {
    firestore()
      .collection("All_Business")
      .doc(Edit_Business.uid)
      .get()
      .then((e) => {
        let update_obj = {
          date: e.data().last_update_photo.date,
          this_month_update: e.data().last_update_photo.this_month_update > 0 ? JSON.parse(e.data().last_update_photo.this_month_update) - 1 : 0,
        };
        firestore()
          .collection("All_Business")
          .doc(Edit_Business.uid)
          .update({
            Images: firebase.firestore.FieldValue.arrayRemove(v),
            last_update_photo: update_obj,
          })
          .then(() => {
            let array = Images;
            setlimit_month_picture(e.data().last_update_photo.this_month_update > 0 ? JSON.parse(e.data().last_update_photo.this_month_update) - 1 : 0);
            const index = array.indexOf(v);
            if (index > -1) {
              // only splice array when item is found
              array.splice(index, 1); // 2nd parameter means remove one item only
            }

            setImages(array);
            setLoadingS(false);
            setRandom(Math.random() * 1000);
          });
      });
  };

  let DeleteFromfirestoreVideo = (v) => {
    firestore()
      .collection("All_Business")
      .doc(Edit_Business.uid)
      .get()
      .then((e) => {
        let removeobj = {
          url: v.url,
          thumbnail: v.thumbnail,
        };
        let update_obj = {
          date: e.data().last_update_video.date,
          this_month_update: e.data().last_update_video.this_month_update > 0 ? JSON.parse(e.data().last_update_video.this_month_update) - 1 : 0,
        };
        firestore()
          .collection("All_Business")
          .doc(Edit_Business.uid)
          .update({
            Videos: firebase.firestore.FieldValue.arrayRemove(removeobj),
            last_update_video: update_obj,
          })
          .then(() => {
            let array = Videos;
            setlimit_month_Video(e.data().last_update_video.this_month_update > 0 ? JSON.parse(e.data().last_update_video.this_month_update) - 1 : 0);
            const index = array.indexOf(v);
            if (index > -1) {
              // only splice array when item is found
              array.splice(index, 1); // 2nd parameter means remove one item only
            }

            setVideos(array);
            setLoadingS(false);
            setRandom(Math.random() * 1000);
          });
      });
  };
  // Dp Veriable

  let [imageData, setImageData] = useState(undefined);
  let [image, setImage] = useState(Edit_Business.Business_Dp);
  const chooseDp = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, async (response) => {
      console.log("Response = ");
      setImage(response.assets[0].uri);
      setImageData(response.assets[0]);
    });
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
    setCityValidation("");
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
    setImage("https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=");
    setImages_Data([]);
    setSelectedCity([]);
  };

  let Check_validity = async () => {
    ResetValidity();
    if (Business_Name == "" || 
    // Business_Address == "" || 
    selected_Catagorie.length == 0 ||
    //  Business_Phone == ""  || 
    Business_Price == "" ||
    Business_Price_Max == "" ||

     selectedCountry.length == 0 
     || value == null || 
     selectedCity.length == 0) {
      if (Business_Name == "") {
        setBusiness_Validation("* Required");
      }

      // if (Business_Address == "") {
      //   setBusiness_Address_Validation("* Required");
      // }

      // if (Business_Phone == "") {
      //   setBusiness_Phone_Validation("* Required");
      // }

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
    console.log(Business_Price_Max<Business_Price,Business_Price_Max,Business_Price);
    if(JSON.parse(Business_Price_Max)<JSON.parse(Business_Price)){
      alert("Maximum Price Should Greater then Minimum price")
      return
    }
    setLoadingS(true);
    let new_date = new Date();
    new_date.setDate(new_date.getDate() + 2);
    // console.log(">>>>>>>>>>>>>>>..", new_date);
    let obj = {
      name: Business_Name,
      address: Business_Address,
      Business_Street_Hs:Business_Street_Hs,
      Business_city:Business_city,
      phone: Business_Phone,
      price:Business_Price,
      price_Max: Business_Price_Max,
      categories: selected_Catagorie,
      country: selectedCountry[0].name,
      website: optional_Website,
      Menu:optional_Menu_url,

      Profile_Type: value,
      Tag_line: Tag_line,
      city: selectedCity[0].city,
      Map_value: region,
    };
    if (imageData) {
      await UpdateDpFirestore(obj);
      return;
    }

    updateNodes(obj);
  };

  let updateNodes = (obj) => {
    firestore()
      .collection("All_Business")
      .doc(Edit_Business.uid)
      .update(obj)
      .then(() => {
        // alert("Data update >>........")
        ResetValues();
        Props.navigation.navigate("Main_tab");
      })
      .catch(() => {
        setLoadingS(false);
        alert("Something Went Wrong Try Again Later!");
        Props.navigation.navigate("Main_tab");
      });
  };

  let UpdateDpFirestore = async (obj) => {
    console.log("uploading image>>>>>");
    try {
      await storage()
        .ref(`Dp/${imageData.fileName}`)
        .putFile(imageData.uri)
        .then(async (snapshot) => {
          let imageRef = storage().ref(`Dp/${imageData.fileName}`);
          await imageRef
            .getDownloadURL()
            .then(async (url) => {
              obj.Business_Dp = url;

              // firestore()
              //   .collection('Authuntication')
              //   .doc(user.uid)
              //   .update({ photo: url })
              //   .then(() => {
              updateNodes(obj);

              // })
            })
            .catch(() => {
              setLoadingS(false);
              alert("Something Went Wrong Try Again Later!");
              Props.navigation.navigate("Main_tab");
            });
        });
    } catch (error) {
      alert("Error", error);
      console.log(error);
      setLoadingS(false);
    }
  };

  let [optional_Website, setOptional_Website] = useState(Edit_Business.website);
  let [optional_WebsiteModal, setOptional_WebsiteModal] = useState("");


  let [optional_Menu_url, setOptional_Menu_url] = useState(Edit_Business.Menu==undefined? '':Edit_Business.Menu);
  let [optional_Menu_urlModal, set_Menu_urlModal] = useState("");



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
          <Image source={require("../assets/loadingS.gif")} style={{ width: 150, height: 150 }} />
        </View>
      </Modal>

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View
          style={{
            ...styles.nav,
            backgroundColor: Global.color,
          }}
        >
          <Icon3
            onPress={() => Props.navigation.navigate("Main_tab")}
            name="close-outline"
            size={30}
            style={{
              color: "#FFFFFF",
            }}
          />

          <Text style={styles.navHeading}>Edit Business</Text>

          <TouchableOpacity onPress={() => Check_validity()} activeOpacity={0.8} style={styles.sendTouch}>
            <Text style={styles.sendNav}>Update</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={{ display: "flex", alignContent: "center" }}>
            <Image style={styles.avatar1} source={{ uri: image }} />

            <Icon name="user-edit" onPress={() => chooseDp("photo")} size={20} style={{ marginLeft: "60%", marginTop: -40, marginBottom: 20 }} color={Global.color} />
          </View>

          <Text style={styles.formHeading}>Country</Text>

          <TouchableOpacity activeOpacity={0.9} onPress={() => setCountryModal(true)} style={styles.inputBox}>
            {selectedCountry.length > 0 ? (
              <View style={styles.row}>
                <Image source={{ uri: FlagsAll[selectedCountry[0].alpha2] }} style={styles.flag} />
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

          <TouchableOpacity onPress={() => setBusiness_Modal(true)} activeOpacity={0.9} style={styles.inputBox}>
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
                width:'90%'
            }}
          >
            {(Business_Street_Hs !== "" || Business_city !== "" || Business_Address !== "")  ? Business_Street_Hs + " " + Business_city +" "+ Business_Address  : "Address"}
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

          <TouchableOpacity activeOpacity={0.9} onPress={() => setCityModal(true)} style={{ ...styles.inputBox, marginTop: 0 }}>
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
          <TouchableOpacity onPress={() => (selected_Catagorie.length < 1 ? setBusiness_Catagorie_Modal(true) : setBusiness_Catagorie_Modal1(true))} activeOpacity={0.9} style={{ ...styles.inputBox, marginTop: 0 }}>
            <Text
              style={{
                ...styles.countryName,
                width: "90%",
                marginTop: 7,
                marginBottom: 7,
                color: Business_Catagorie_Validation === "* Required" ? "red" : "#000",
              }}
            >
              {selected_Catagorie.length > 0
                ? selected_Catagorie.map((vali) => {
                  return vali.subCatagorie;
                })
                : "categories"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: Business_Catagorie_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          <View style={styles.bar}></View>

          <TouchableOpacity onPress={() => setBusiness_Phone_Modal(true)} activeOpacity={0.9} style={{ ...styles.inputBox, marginTop: 0 }}>
            <Text
              style={{
                ...styles.countryName,
                color: Business_Phone_Validation === "* Required" ? "red" : "#000",
              }}
            >
              {Business_Phone !== "" ? Business_Phone : "Phone"}
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: Business_Phone_Validation === "* Required" ? "red" : "#000",
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
            {Business_Price !== "" ? Business_Price : " Minimum Price"}
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

          <TouchableOpacity onPress={() => SetEditPhotoModal(true)} activeOpacity={0.9} style={{ ...styles.inputBox, marginTop: 0 }}>
            <Text
              style={{
                ...styles.countryName,
              }}
            >
              Edit Business Images
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: Business_Phone_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          <View style={styles.bar}></View>

          <TouchableOpacity onPress={() => SetEditVideoModal(true)} activeOpacity={0.9} style={{ ...styles.inputBox, marginTop: 0 }}>
            <Text
              style={{
                ...styles.countryName,
              }}
            >
              Edit Business Videos
            </Text>

            <Icon3
              name="chevron-forward-outline"
              size={20}
              style={{
                color: Business_Phone_Validation === "* Required" ? "red" : "#000",
              }}
            />
          </TouchableOpacity>

          {/* <View style={styles.bar}></View>

          <DropDownPicker
            placeholder="Select Profile Type"
            placeholderStyle={{
              color: value_Valid === "* Required" ? "red" : "#000",
              marginLeft: 15,
              fontSize: 16,
            }}
            ArrowDownIconComponent={({ style }) => <Icon3 name="chevron-forward-outline" size={20} color={value_Valid === "* Required" ? "red" : "#000"} />}
            textStyle={{ marginLeft: 10 }}
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
          /> */}

          <TouchableOpacity onPress={() => setOptional_WebsiteModal(true)} activeOpacity={0.9} style={styles.inputBox}>
            <Text style={styles.countryName}>{optional_Website !== "" ? optional_Website : "Website"}</Text>

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
  style={{...styles.inputBox,marginTop:0}}
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

        <FlatList initialNumToRender={80} data={allCountry} renderItem={renderItem}></FlatList>
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

        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            marginTop: 0,
            backgroundColor: "white",
          }}
        >
          <MapView
            style={{ width: "100%", height: "90%" }}
            region={region}
            onRegionChangeComplete={(region) => {
              onChangeValue(region);
            }}
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
            style={{
              position: "absolute",
              top: "45%",
              width: "50%",
              left: "51%",
              marginTop: -48,
              marginLeft: -24,
            }}
          >
            <Icon name="map-pin" size={33} style={{ padding: 10 }} color="red" />
          </View>

          <View></View>
        </View>
      </Modal>

      {/* BusinesscategoriesModal  */}

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
            Edit categories
          </Text>
        </View>

        <Text style={{ ...styles.countryName, fontSize: 14, margin: 10 }}>Search Upto Three Best Categories Related To your Business</Text>

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
          placeholder="Search categories here"
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
                      AddToSelecedcategories({
                        catagorie: allCatagriesName[index],
                        subCatagorie: val,
                      })
                    }
                  >
                    <View style={styles.categoriesDiv}>
                      <Text style={styles.categoriesDivText}>
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
                Tag_line = selected_Catagorie[0].catagorie + selected_Catagorie[0].subCatagorie;
              }
              if (selected_Catagorie.length == 2) {
                Tag_line = selected_Catagorie[0].catagorie + selected_Catagorie[0].subCatagorie + selected_Catagorie[1].catagorie + selected_Catagorie[1].subCatagorie;
              }

              if (selected_Catagorie.length == 3) {
                Tag_line = selected_Catagorie[0].catagorie + selected_Catagorie[0].subCatagorie + selected_Catagorie[1].catagorie + selected_Catagorie[1].subCatagorie + selected_Catagorie[2].catagorie + selected_Catagorie[2].subCatagorie;
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

        <Text style={{ ...styles.countryName, fontSize: 14, margin: 10 }}>Provide upto three Categories that best Describe core foucus of Business</Text>

        {selected_Catagorie.map((v, i) => {
          return (
            <View key={i} style={styles.categorieshowDiv}>
              <Text style={{ ...styles.categoriesDivText, fontSize: 15 }}>{v.subCatagorie}</Text>

              <Icon3 onPress={() => RemoveMe(v)} name="close-circle-outline" size={20} color="grey" />
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
            <Text style={styles.categoriesDivText}>Add New Catagorie</Text>
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
            Your Already Have Added 3 categories
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

      
      {/* Business Name Modal  */}
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

      {/* Business Photo Modal  */}
      <Modal visible={EditPhotoModal}>
        <View
          style={{
            ...styles.nav2,
          }}
        >
          <Icon3
            onPress={() => SetEditPhotoModal(false)}
            name="chevron-back-outline"
            size={25}
            style={{
              color: "#FFFFFF",
              position: "absolute",
              top: 20,
              left: 10,
            }}
          />

          <Text style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}>Edit Photos</Text>

          <TouchableOpacity onPress={() => UploadImages()} style={{ position: "absolute", top: 25, right: 10 }}>
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
            <TouchableOpacity onPress={() => ChooseImage("photo")} style={{ width: "33%", height: 140 }}>
              <Image
                style={{ width: "100%", height: 100, resizeMode: "cover" }}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png",
                }}
              />
            </TouchableOpacity>
            {/* {console.log("all Images >>>>>>>>>>>>>>>>", Images)} */}
            {Images.map((v, i) => {
              return (
                <TouchableOpacity style={{ width: "33%", height: 140 }}>
                  <Icon3
                    onPress={() =>
                      Alert.alert("Delete", "Are You Sure Want Remove Image Permanantly from listing?", [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        { text: "OK", onPress: () => RemoveImage(v) },
                      ])
                    }
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
                  <Image style={{ width: "100%", height: 130, resizeMode: "cover" }} source={{ uri: v }} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Modal>

      {/* Business Photo Modal  */}
      <Modal visible={EditVideoModal}>
        <View
          style={{
            ...styles.nav2,
          }}
        >
          <Icon3
            onPress={() => SetEditVideoModal(false)}
            name="chevron-back-outline"
            size={25}
            style={{
              color: "#FFFFFF",
              position: "absolute",
              top: 20,
              left: 10,
            }}
          />

          <Text style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}>Edit Videos</Text>

          <TouchableOpacity onPress={() => UploadVideos()} style={{ position: "absolute", top: 25, right: 10 }}>
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
              onPress={() => ChooseVideo("video")}
              style={{
                width: "50%",
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: "100%", height: 140, resizeMode: "cover" }}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png",
                }}
              />
            </TouchableOpacity>
            {Videos.map((v, i) => {
              // console.log(v);
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ width: "50%", height: 200 }}
                  onPress={() => {
                    setPlay_me(v);
                    setvideo_Modal(true);
                  }}
                >
                  <Icon3
                    onPress={() =>
                      Alert.alert("Delete", "Are You Sure Want Remove Video Permanantly from listing?", [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        { text: "OK", onPress: () => RemoveVideo(v) },
                      ])
                    }
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
                  <Image style={{ width: "100%", height: 200, resizeMode: "cover" }} source={{ uri: v.thumbnail }} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Modal>

      {/* Business City Chooser  */}
      <Modal visible={CityModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => {
              setCityModal(false);
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
            Choose City
          </Text>
        </View>

        <TextInput
          placeholderTextColor={"grey"}
          onChangeText={(e) => setFilter1(e)}
          style={{
            ...styles.input,
          }}
          placeholder="Search City Here"
        ></TextInput>

        <FlatList initialNumToRender={20} data={allCity} renderItem={renderItem1}></FlatList>
      </Modal>

      <Modal visible={video_Modal}>
        <View style={{ width: "100%", flex: 1, backgroundColor: "#000" }}>
          <View style={{ ...styles.nav1, marginBottom: 50 }}>
            <Icon3
              onPress={() => {
                setvideo_Modal(false);
              }}
              name="chevron-back-outline"
              size={25}
              style={{
                color: "#FFFFFF",
                marginLeft: 2,
              }}
            />
          </View>
          <VideoPlayer video={{ uri: play_me.url }} videoWidth={300} videoHeight={450} autoplay={true} thumbnail={{ uri: play_me.thumbnail }} />
        </View>
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
  videoTitle: {
    color: "#fff",
    fontSize: 20,
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
  nav2: {
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
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
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

  categoriesDiv: {
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
  categoriesDivText: {
    fontSize: 12,
    color: "#000",
    paddingLeft: 10,
    fontWeight: "bold",
  },
  categorieshowDiv: {
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
  avatar1: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "relative",
    marginTop: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    name1: state.name,
    limit_controls: state.limit_controls,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit_Business);
