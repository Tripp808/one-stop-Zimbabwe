import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { get_data } from '../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from "react-native-vector-icons/FontAwesome";

import { arr, Global } from '../assets/Global_Variable';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { TextInput } from 'react-native-gesture-handler';
import Cities from '../assets/cities';
import Slider from '@react-native-community/slider';
import RangeSlider from './others/priceRangeSlider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { act } from 'react-test-renderer';

function Search(Props) {
  const modalizeRef = useRef(null);
  let [random, setRandom] = useState(0)
  const onOpen = () => {
    modalizeRef.current?.open();
  };


  const onClose = () => {
    modalizeRef.current?.close();
  };

  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 50000;
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(50000);
  let [start_price, set_Start_price] = useState(0)
  let [End_price, set_End_price] = useState(1000)
  let [Price_range_Modal, setPrice_range_Modal] = useState(false)
  let [All_Business, setAll_Business] = useState(Props.All_Business_Nodes_newOld)
  let [Backup_AllBusiness, setBackup_All_business] = useState(Props.All_Business_Nodes_newOld)
  let [loadingS, setLoadingS] = useState(false)
  let [slider_priceRange, setslider_priceRange] = useState(100)
  let [modalVisible, setModalVisible] = useState(true);
  let [categoriesSearch, setcategoriesSearch] = useState('');
  let [locationSearch, setLocationSearch] = useState('');
  let [Selected_Name, setSelected_Name] = useState(undefined)
  let [selected_location, setSelected_location] = useState(undefined)
  let [itemActive, SetitemActive] = useState();
  let [LocationActive, SetLocationActive] = useState();
  let [validity, set_validity] = useState('')
  let [active, setActive] = useState(0)
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


  let filteredcategories = Props.All_Business_Nodes_newOld.filter((e) => e.name.toLowerCase().indexOf(categoriesSearch.toLowerCase()) !== -1)
  useEffect(() => {
    onOpen();

  }, []);




  let fooReturn = (val) => {
    // console.log("foo is working");
    let allItem = Backup_AllBusiness.filter(country => {
      console.log(country);
      switch (val) {
        case '0':
          {
            setActive(1)
            return ((country.price <= maxValue) && (country.price_Max >= minValue))
          }

        case '1':
          {
            setActive(2)
            return (country)
          }


        case '2':
          {
            setActive(3)
            return (country)
          }





        default:
          break;
      }
    }


    );
    if (val == '1') {
      allItem.sort((a, b) =>
        b.Received_Reviews_no - a.Received_Reviews_no
      )


    }



    if (val == '2') {

      let arr = []

      allItem.map((v, i) => {
        var stars = v.OverAll_Rating;
        (count = 0),
          (sum = stars.reduce(function (sum, item, index) {
            count += item;
            return sum + item * (index + 1);
          }, 0));
        let final_Star = sum / count
        console.log("L", final_Star, final_Star > 0);
        if (final_Star > 0) {
          allItem[i].ReviewsMost = final_Star
        }
        else {
          allItem[i].ReviewsMost = 0

        }

        arr.push(v)
      })


      allItem = arr.sort((a, b) =>
        b.ReviewsMost - a.ReviewsMost
      )


      allItem.map((v, i) => {
        console.log(v.ReviewsMost);
      })



    }


    setAll_Business(allItem)
    setPrice_range_Modal(false)
    onOpen()

  }


  let filteredLocation = Cities.filter((e) => e.city.toLowerCase().indexOf(locationSearch.toLowerCase()) !== -1)


  let check_validity = (Selected_Name, selected_location) => {
    set_validity("")
    console.log(Selected_Name == undefined, selected_location == undefined);
    if (Selected_Name == undefined && selected_location == undefined) {

      set_validity("Select any Name or city")


      return
    }

    setLoadingS(true)

    setTimeout(() => {
      setAll_Business(Props.All_Business_Nodes_newOld.filter(e => {
        if (Selected_Name !== undefined && selected_location !== undefined) {

          return (e.city.toLowerCase().indexOf(selected_location.city.toLowerCase()) !== -1 && (e.name.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1 || e.Tag_line.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1))
        }

        if (selected_location !== undefined) {
          return (e.city.toLowerCase().indexOf(selected_location.city.toLowerCase()) !== -1)
        }


        if (Selected_Name !== undefined) {
          return (e.name.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1 || e.Tag_line.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1)
        }

      }

      )



      )
      setBackup_All_business(Props.All_Business_Nodes_newOld.filter(e => {
        if (Selected_Name !== undefined && selected_location !== undefined) {

          return (e.city.toLowerCase().indexOf(selected_location.city.toLowerCase()) !== -1 && (e.name.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1 || e.Tag_line.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1))
        }

        if (selected_location !== undefined) {
          return (e.city.toLowerCase().indexOf(selected_location.city.toLowerCase()) !== -1)
        }


        if (Selected_Name !== undefined) {
          return (e.name.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1 || e.Tag_line.toLowerCase().indexOf(Selected_Name.toLowerCase()) !== -1)
        }


      }))







      setModalVisible(false)
      setLoadingS(false)
    }, 500);
  }



  let ResetBusiness = () => {
    setAll_Business(Backup_AllBusiness)
    setActive(0)
  }



  return (
    <>
      <StatusBar
        // translucent
        barStyle="light-content"
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

      <TouchableOpacity
        onPress={() => {

          setModalVisible(true)
          setcategoriesSearch("")
          setSelected_Name(undefined)
          setSelected_location(undefined)
        }

        }
        activeOpacity={1}
        style={{ ...styles.inputDiv, position: 'absolute', top: 0, zIndex: 1 }}>
        <Icon3
          name="search-outline"
          style={{ marginLeft: 15 }}
          size={20}
          color="#000"></Icon3>
        <View style={styles.input}>
          <Text>{Selected_Name !== undefined && selected_location !== undefined ?
            Selected_Name + " ," + selected_location.city

            : Selected_Name !== undefined ?
              Selected_Name
              :
              selected_location !== undefined ?

                selected_location.city
                :
                "Search for Busienss.."
          }</Text>
        </View>
      </TouchableOpacity>
      <MapView.Animated
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ flex: 1 }}
        region={{
          latitude: selected_location == undefined ? 12.3342 : selected_location.lat,
          longitude: selected_location == undefined ? -102.9999 : selected_location.lng,
          latitudeDelta: 0.025,
          longitudeDelta: 0.221,
        }}>


        <Marker
          coordinate={{
            latitude: selected_location == undefined ? 12.3342 : selected_location.lat,
            longitude: selected_location == undefined ? -102.9999 : selected_location.lng,
          }}
          title={selected_location == undefined ? 'Business' : selected_location.city}
        />


      </MapView.Animated>

      <View style={styles.bottomSet}></View>

      <Modalize modalStyle={{ backgroundColor: '#fff' }} ref={modalizeRef} modalHeight={Dimensions.get('screen').height} alwaysOpen={selected_location !== undefined ? 300 : Dimensions.get('screen').height - 150}>






        <View
          style={{
            ...styles.mainDivi,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            marginLeft: '5%',
            marginTop: 25,
            paddingTop: 5,

          }}>


          <Icon3 name='chevron-back-outline' color={'#000'} size={20} onPress={() => {
            setModalVisible(true)
            setcategoriesSearch("")
            setSelected_Name(undefined)
            setSelected_location(undefined)
          }} />
          <Text
            style={{
              ...styles.iconText,
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: -7
            }}>
            Top Searched Business
          </Text>



        </View>


        <View style={styles.topScrollFilterBar}>

          <TouchableOpacity style={{ ...styles.sortButton, backgroundColor: active == 1 ? Global.color : '#fff', borderWidth: active == 1 ? 0 : 1 }} activeOpacity={0.8} onPress={() => { onClose(); setPrice_range_Modal(true) }}>
            <Text style={{ ...styles.sortText, color: active == 1 ? "#fff" : "#000" }}>
              Price
            </Text>

          </TouchableOpacity>




          <TouchableOpacity onPress={() => fooReturn('1')} style={{ ...styles.sortButton, backgroundColor: active == 2 ? Global.color : '#fff', borderWidth: active == 2 ? 0 : 1 }} activeOpacity={0.8}>
            <Text style={{ ...styles.sortText, color: active == 2 ? "#fff" : "#000" }}>
              Review
            </Text>

          </TouchableOpacity>



          <TouchableOpacity onPress={() => fooReturn('2')} style={{ ...styles.sortButton, backgroundColor: active == 3 ? Global.color : '#fff', borderWidth: active == 3 ? 0 : 1 }} activeOpacity={0.8}>
            <Text style={{ ...styles.sortText, color: active == 3 ? "#fff" : "#000" }}>
              Ratings
            </Text>

          </TouchableOpacity>





        </View>

        {active == 1 || active == 2 || active == 3 ?
          <View style={{ ...styles.topScrollFilterBar, marginTop: 0, height: 40, justifyContent: 'space-between', alignItems: 'center' }}>

            <Text style={{ fontSize: 13, color: Global.color, fontWeight: 'bold', marginLeft: 20 }}>
              {active == 1 ?
                <>
                  Range: {minValue}$ - {maxValue}$</>
                :
                ''}
            </Text>



            <TouchableOpacity onPress={() => ResetBusiness()} style={{ ...styles.sortButton, borderWidth: 0, marginTop: 0, marginBottom: 0 }} activeOpacity={0.8}>
              <Image style={{ width: 20, height: 20, marginRight: 5 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6159/6159296.png' }} />
              <Text style={{ ...styles.sortText, textDecorationColor: '#000', textDecorationLine: 'underline' }}>
                clear filter
              </Text>

            </TouchableOpacity>

          </View>

          :
          <>
          </>}
        <View
          style={{
            width: '80%',
            borderWidth: 0.2,
            marginBottom: 10,
            height: 0.2,
            backgroundColor: 'grey',
            marginTop: 0,
            opacity: 0.2,
            marginLeft: '10%',
          }}></View>
        <View style={styles.allCardDiv}>

          {All_Business.map((v, i) => {
                              let check_in_count=v.CheckIns.filter(e=>e.time>new Date().getTime())

            return (
              <TouchableOpacity
                onPress={() => {
                  Props.navigation.navigate("BusinessAllDetails", {
                    Details: v.uid,
                    from: "search"

                  });
                }}
                key={i}
                activeOpacity={0.7}
                style={{
                  ...styles.card1,
                  marginBottom:
                    i == Props.All_Business_Nodes_newOld.length - 1 ? 90 : 0,
                }}
              >
                <View style={styles.navCard}>
                  <Image
                    source={{ uri: v.Business_Dp }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      resizeMode: "contain",
                    }}
                  />

                  <View style={{ width: "80%" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000",
                        fontWeight: "bold",
                        width: "80%",
                        marginLeft: 10,
                        textAlign: "left",
                        fontFamily: "sans-serif",
                      }}
                      numberOfLines={1}
                    >
                      {v.name}.
                    </Text>

                    <Text
                      style={{
                        fontSize: 13,
                        color: "#000",
                        fontWeight: "400",
                        width: "80%",
                        textAlign: "left",
                        fontFamily: "sans-serif",
                        marginLeft: 10,
                      }}
                      numberOfLines={1}
                    >
                      {v.status}
                    </Text>
                    {/* <Icon
                            name="information-circle-outline"
                            style={{ position: 'absolute', right: 10, top: 10 }}
                            size={25}
                            color="#000"></Icon> */}
                  </View>
                </View>

                {v.Images.length > 0 ? (
                  <Image
                    source={{ uri: v.Images[0] }}
                    style={{
                      width: "100%",
                      height: 350,
                      resizeMode: "cover",
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: "https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193060544?k=20&m=1193060544&s=612x612&w=0&h=MI8y2q1HsY4TEAZD3tNCJN3bmc39N3pnFKC2KKNDUmE=",
                    }}
                    style={{
                      width: "100%",
                      height: 350,
                      resizeMode: "cover",
                    }}
                  />
                )}

                <View style={styles.navBottom}>
                  {v.Received_Reviews_no > 0 ?
                    <Text
                      style={{
                        fontSize: 13,
                        color: Global.color,
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "left",
                        fontFamily: "sans-serif",
                      }}
                      numberOfLines={1}
                    >
                      <Icon4 name="star" color={Global.color} size={12} />
                      {" "}
                      {Math.floor((v.OverAll_Rating[0] * 1 + v.OverAll_Rating[1] * 2 + v.OverAll_Rating[2] * 3 + v.OverAll_Rating[3] * 4 + v.OverAll_Rating[4] * 5) / v.Received_Reviews_no)}
                      {""}
                      ({v.Received_Reviews_no})
                      ||
                      <Icon3 name="man-outline" size={15} color={Global.color} />{check_in_count.length}

                      {" "} ||
                      {" "}

                      {v.city}
                    </Text>
                    :
                    <Text
                      style={{
                        fontSize: 13,
                        color: Global.color,
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "left",
                        fontFamily: "sans-serif",
                      }}
                      numberOfLines={1}
                    >
                      No Reviews ||
                      <Icon3 name="man-outline" size={15} color={Global.color} />{check_in_count.length}

                      {" "} ||
                      {" "}

                      {v.city}
                    </Text>
                  }

                  <Text
                    style={{
                      fontSize: 11,
                      color: "grey",
                      fontWeight: "400",
                      width: "100%",
                      textAlign: "left",
                      fontFamily: "sans-serif",
                      // marginTop: 6,
                    }}
                    numberOfLines={3}
                  >
                    {v.categories.map((vi, i) => {
                      return (
                        <>
                          {vi.subCatagorie}
                          {v.categories.length - 1 == i ? "" : ","}{" "}
                        </>
                      );
                    })}

                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}



          {All_Business.length === 0 ?

            <Text style={{ width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: 10, color: 'red', fontWeight: 'bold' }}>
              No Business Found
            </Text>
            :
            <>
            </>
          }

        </View>
      </Modalize>






      <Modal visible={Price_range_Modal} style={{ backgroundColor: '#fff', flex: 1, borderRadius: 10 }}   >

        <View
          style={{
            ...styles.mainDivi,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            marginLeft: '5%',
            marginTop: 25,
            paddingTop: 5,

          }}>


          <Icon3 name='chevron-back-outline' color={'#000'} size={20} onPress={() => {
            onOpen()
            setPrice_range_Modal(false)
          }} />
          <Text
            style={{
              ...styles.iconText,
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: -7
            }}>
            Price Filter
          </Text>



        </View>




        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <View style={styles.content}>
                <Text style={styles.text}>Select Price Range</Text>
                <RangeSlider
                  sliderWidth={300}
                  min={MIN_DEFAULT}
                  max={MAX_DEFAULT}
                  step={10}
                  onValueChange={range => {
                    setMinValue(range.min);
                    setMaxValue(range.max);
                  }}
                />
                <View style={styles.tableContainer}>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles.colorBlack}>Min Price</Text>
                    <View style={styles.table}>
                      <Text style={styles.colorBlack}>${MIN_DEFAULT}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.colorBlack}>Max Price</Text>
                    <View style={styles.table}>
                      <Text style={styles.colorBlack}>${MAX_DEFAULT}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </GestureHandlerRootView>



        <TouchableOpacity activeOpacity={0.8} style={styles.goandSearchbutton} onPress={() => fooReturn('0')}>
          <Text style={styles.headingGoandSearch}>
            Apply Price Filter
          </Text>
          <Icon3 name='search-circle-outline' style={{ position: 'absolute', right: 10 }} size={30} color={'#fff'} />
        </TouchableOpacity>


      </Modal>



      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          Props.navigation.goBack()

        }}
        transparent={false}
        style={styles.modal}>
        <StatusBar
          // translucent
          barStyle="dark-content"
          backgroundColor="#000"
        />

        <View style={styles.bar}>
          <View
            style={{
              ...styles.mainDivi,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '90%',
              marginLeft: '5%',

              paddingTop: 20,

            }}>


            <Icon3 name='chevron-back-outline' color={'#fff'} size={20} onPress={() => Props.navigation.navigate("Main_tab")} />
            <Text
              style={{
                ...styles.iconText,
                fontSize: 20,
                color: '#fff',
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: -7
              }}>
              Search Businesses
            </Text>

          </View>


          <TouchableOpacity activeOpacity={1} style={{ ...styles.inputDiv }}>
            <Icon3
              name="search-outline"
              style={{ marginLeft: 15 }}
              size={20}
              color="#000"></Icon3>
            <TextInput
              style={styles.input}
              onChangeText={e => { setcategoriesSearch(e); setSelected_Name(e) }}
              onFocus={() => {
                SetitemActive(true);
                SetLocationActive(false);
              }}
              placeholder="Search For Pizza, Hair Salon, Plumbing"
              defaultValue={Selected_Name !== undefined ? Selected_Name : ""}

            ></TextInput>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} style={{ ...styles.inputDiv }}>
            <Icon3
              name="navigate-outline"
              style={{ marginLeft: 15 }}
              size={20}
              color="#000"></Icon3>
            <TextInput
              onFocus={() => {
                SetitemActive(false);
                SetLocationActive(true);
              }}
              onChangeText={e => setLocationSearch(e)}
              style={styles.input}
              defaultValue={selected_location !== undefined ? selected_location.city : ""}
              placeholder="Neighborhood, city,state"></TextInput>

          </TouchableOpacity>



        </View>

        <ScrollView style={{ flex: 1 }}>

          <Text style={{ width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: 10, color: 'red', fontWeight: 'bold' }}>
            {validity}
          </Text>


          {itemActive && categoriesSearch.length > 0 ? (
            <View style={styles.fleXCol}>
              {filteredcategories.map((v, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      ...styles.linkDiv,
                      // backgroundColor: '#FFFFFF',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelected_Name(v.name)
                        setcategoriesSearch("")
                      }}
                      activeOpacity={0.5}
                      style={styles.card}>


                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#414141',

                            fontFamily: 'sans-serif-normal',
                            fontWeight: 'bold',
                            marginLeft: 15,
                          }}>
                          {v.name}
                        </Text>


                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}

          {LocationActive && locationSearch.length > 0 ? (
            <View style={styles.fleXCol}>
              {filteredLocation.map((v, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      ...styles.linkDiv,
                      // backgroundColor: '#FFFFFF',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelected_location(v)
                        setLocationSearch("")
                      }}
                      activeOpacity={0.5}
                      style={styles.card}>
                      <Icon3
                        name="globe-outline"
                        style={{ marginLeft: 15 }}
                        size={20}
                        color="#000"></Icon3>

                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#414141',

                            fontFamily: 'sans-serif-normal',
                            fontWeight: 'bold',
                            marginLeft: 15,
                          }}>
                          {v.city}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}




          {categoriesSearch == '' && locationSearch.length == '' ?

            <Image style={{ width: '100%', height: 500, resizeMode: 'contain' }} source={require('../assets/Search.png')} />

            :
            <>
            </>


          }
        </ScrollView>



        <TouchableOpacity activeOpacity={0.8} style={styles.goandSearchbutton} onPress={() => { check_validity(Selected_Name, selected_location); setActive(0) }}>
          <Text style={styles.headingGoandSearch}>
            Go and Search
          </Text>
          <Icon3 name='search-circle-outline' style={{ position: 'absolute', right: 10 }} size={30} color={'#fff'} />
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  mainModalDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    margin: 0,
  },
  bottomSet: {
    minWidth: '100%',
    minHeight: 100,
    position: 'absolute',
    bottom: 250,
    backgroundColor: 'red',
    opacity: 0,
  },
  nav1: {
    width: '100%',
    height: 60,
    paddingLeft: '3%',
    // backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  modal: {
    margin: 0,
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  goandSearchbutton: {
    width: '92%',
    height: 45,
    elevation: 3,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4%',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  inputDiv: {
    width: '92%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    height: 50,
    elevation: 9,
    borderRadius: 5,
    flexDirection: 'row',
    marginLeft: '4%',
    marginTop: 20,
    // marginTop:scrollValue>200 && scrollValue<180? 50 :0
  },
  headingGoandSearch: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    width: '80%',
    marginLeft: '2%',
    fontSize: 15,
    color: '#000'
  },
  linkDiv: {
    width: '100%',
    // paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.184)',
  },
  card: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '5%',
  },
  fleXCol: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  bar: {
    width: '100%',
    backgroundColor: Global.color,
    paddingBottom: 20
  },

  card1: {
    width: "92%",
    // marginLeft:'4%',

    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    // marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  navCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    height: 80,
  },
  navBottom: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    height: 80,
  },
  allCardDiv: {
    width: "100%",
    display: "flex",
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20
  },
  topScrollFilterBar: {
    width: '90%',
    height: 60,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sortButton: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 20,
    paddingLeft: 15, paddingRight: 15, paddingTop: 6, paddingBottom: 6,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
  ,
  sortText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold'
  }
  ,
  mainBoxfilter: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 170,
    marginTop: 20
    // backgroundColor:'red'
  },
  rangeShow: {
    width: 320,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -10
  },
  buttonHalfOne: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,

    width: '100%',
    height: 45,
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000',
    marginTop: 5
  },

  buttonHalfTwo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 45,
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    fontFamily: 'Roboto',
    paddingLeft: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  buttonsDiv: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    width: '90%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table: {
    borderColor: '#EBECF2',
    marginTop: 5,
    borderRadius: 5,
  },
  colorBlack: { color: 'black' },
});

const mapStateToProps = state => {
  return {
    name1: state.name,
    All_Business_Nodes_newOld: state.All_Business_Nodes_newOld,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
