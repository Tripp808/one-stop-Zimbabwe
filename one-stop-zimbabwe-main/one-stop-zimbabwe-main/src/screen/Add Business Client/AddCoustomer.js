import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
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
} from 'react-native';
import {get_data} from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../../assets/Global_Variable';
import allSubcategories from '../../assets/filter';
import {Countries} from '../../assets/countries';
function AddCoustomer(Props) {
  let [random, setRandom] = useState(3);
  // Business name

  let [Business_Name, setBusiness_Name] = useState('');
  let [Business_Modal, setBusiness_Modal] = useState(false);
  let [Business_Validation, setBusiness_Validation] = useState('');

  // Business name

  let [Business_Address, setBusiness_Address] = useState('');
  let [Business_Address_Modal, setBusiness_Address_Modal] = useState(false);
  let [Business_Address_Validation, setBusiness_Address_Validation] =
    useState('');

  // Business_Catagorie
  let [Business_Catagorie, setBusiness_Catagorie] = useState('');
  let [Business_Catagorie_Modal, setBusiness_Catagorie_Modal] = useState(false);
  let [Business_Catagorie_Modal1, setBusiness_Catagorie_Modal1] =
    useState(false);

  let [Business_Catagorie_Validation, setBusiness_Catagorie_Validation] =
    useState('');
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

  let allSub = allSubcategories.map(v =>
    v.filter(
      e => e.toLowerCase().indexOf(Business_Catagorie.toLowerCase()) !== -1,
    ),
  );
  let [selected_Catagorie, setSelectedCatagorie] = useState([]);

  let AddToSelecedcategories = v => {
    if (selected_Catagorie.includes(v)) {
      console.log('Already added');
    } else {
      let arr = selected_Catagorie;
      arr.push(v);
      setSelectedCatagorie(arr);
    }

    setBusiness_Catagorie_Modal1(true);
    setBusiness_Catagorie('');
    setRandom(Math.random() * 100);
  };

  let RemoveMe = v => {
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

 

  // Country Select Filter
  let [countryModal, setCountryModal] = useState(false);
  let [countryValidation,setcountryValidation]=useState('')
  let [Filter, setFilter] = useState('');
  let FilterData = single => {
    return single.name.toLowerCase().indexOf(Filter.toLowerCase()) !== -1;
  };
  let allCountry = Countries.filter(FilterData);
  let [selectedCountry, setSelectedCountry] = useState([]);
  let renderItem = v => {
    return (
      <View
        key={v.item.id}
        style={{
          ...styles.linkDiv,
          backgroundColor: selectedCountry.includes(v.item)
            ? Global.color
            : '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCountry([v.item]);
            setCountryModal(false);
            setFilter('');
            setcountryValidation('')
            setRandom(Math.random()*100)
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Image
            source={{uri: FlagsAll[v.item.alpha2]}}
            style={{width: 30, height: 20, resizeMode: 'contain'}}
          />

          <Text
            style={{
              fontSize: 13,
              color: selectedCountry.includes(v.item) ? '#FFFFFF' : '#414141',

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

  let ResetValidity = () => {
    setBusiness_Validation('');
    setBusiness_Address_Validation('');
    setBusiness_Catagorie_Validation('');
    setcountryValidation('')
  };

  let Check_validity = () => {
    ResetValidity();
    if (
      Business_Name == '' ||
      Business_Address == '' ||
      selected_Catagorie.length == 0 ||
      selectedCountry.length==0
    ) {
      if (Business_Name == '') {
        setBusiness_Validation('* Required');
      }

      if (Business_Address == '') {
        setBusiness_Address_Validation('* Required');
      }

    

      if (selected_Catagorie.length == 0) {
        setBusiness_Catagorie_Validation('* Required');
      }

      if (selectedCountry.length == 0) {
        setcountryValidation('* Required');
      }
      return;
    }


    let obj={
      name:Business_Name,
      address:Business_Address,
      categories:selected_Catagorie,
      country:selectedCountry,
      website:optional_Website,
      phone:optional_phone,
      Hours:optional_Hour
    }

    console.log(obj);
    alert("Data Submitted.")
  };

  let [optional_Website, setOptional_Website] = useState('');
  let [optional_WebsiteModal, setOptional_WebsiteModal] = useState('');


  let [optional_phone, setOptional_Phone] = useState('');
  let [optional_PhoneModal, setOptional_PhoneModal] = useState('');



  let [optional_Hour, setOptional_Hour] = useState('');
  let [optionalHourModal, setOptional_HourModal] = useState('');


  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <ScrollView>
      <View
        style={{
          ...styles.nav,
          backgroundColor: Global.color,
        }}>
        <Icon3
          onPress={() => Props.navigation.goBack()}
          name="close-outline"
          size={30}
          style={{
            color: '#FFFFFF',
          }}
        />

        <Text style={styles.navHeading}>Add Business</Text>

        <TouchableOpacity
          onPress={() => Check_validity()}
          activeOpacity={0.8}
          style={styles.sendTouch}>
          <Text style={styles.sendNav}>Send</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.formHeading}>Country</Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setCountryModal(true)}
          style={styles.inputBox}>
          {selectedCountry.length > 0 ? (
            <View style={styles.row}>
              <Image
                source={{uri: FlagsAll[selectedCountry[0].alpha2]}}
                style={styles.flag}
              />
              <Text style={styles.countryName}>{selectedCountry[0].name}</Text>
            </View>
          ) : (
            <Text style={{...styles.countryName,color:countryValidation=='* Required'? 'red':'#000'}}>Select Country</Text>
          )}

          <Icon3
            name="chevron-down-outline"
            size={20}
            style={{
              color:countryValidation=='* Required'? 'red':'#000'
                        }}
          />
        </TouchableOpacity>

        <Text style={styles.formHeading}>Required Information</Text>

        <TouchableOpacity
          onPress={() => setBusiness_Modal(true)}
          activeOpacity={0.9}
          style={styles.inputBox}>
          <Text
            style={{
              ...styles.countryName,
              color: Business_Validation === '* Required' ? 'red' : '#000',
            }}>
            {Business_Name !== '' ? Business_Name : 'Business Name'}
          </Text>

          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: Business_Validation === '* Required' ? 'red' : '#000',
            }}
          />
        </TouchableOpacity>

        <View style={styles.bar}></View>

        <TouchableOpacity
          onPress={() => setBusiness_Address_Modal(true)}
          activeOpacity={0.9}
          style={{...styles.inputBox, marginTop: 0}}>
          <Text
            style={{
              ...styles.countryName,
              color:
                Business_Address_Validation === '* Required' ? 'red' : '#000',
            }}>
            {Business_Address !== '' ? Business_Address : 'Address'}
          </Text>

          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color:
                Business_Address_Validation === '* Required' ? 'red' : '#000',
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
          style={{...styles.inputBox, marginTop: 0}}>
          <Text
            style={{
              ...styles.countryName,
              width: '90%',
              marginTop: 7,
              marginBottom: 7,
              color:
                Business_Catagorie_Validation === '* Required' ? 'red' : '#000',
            }}>
            {selected_Catagorie.length > 0
              ? selected_Catagorie + ' '
              : 'categories'}
          </Text>

          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color:
                Business_Catagorie_Validation === '* Required' ? 'red' : '#000',
            }}
          />
        </TouchableOpacity>


     

        <Text style={styles.formHeading}>Optional Information</Text>

        <TouchableOpacity
          onPress={() => setOptional_WebsiteModal(true)}
          activeOpacity={0.9}
          style={styles.inputBox}>
          <Text style={styles.countryName}>
            {optional_Website !== '' ? optional_Website : 'Website'}
          </Text>

          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
            }}
          />
        </TouchableOpacity>

        <View style={styles.bar}></View>

        <TouchableOpacity
          onPress={() => setOptional_PhoneModal(true)}
          activeOpacity={0.9}
          style={{...styles.inputBox,marginTop:0}}>
          <Text style={styles.countryName}>
            {optional_phone !== '' ? optional_phone : 'Phone'}
          </Text>

          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
            }}
          />
        </TouchableOpacity>



        <View style={styles.bar}></View>

<TouchableOpacity
  onPress={() => setOptional_HourModal(true)}
  activeOpacity={0.9}
  style={{...styles.inputBox,marginTop:0}}>
  <Text style={styles.countryName}>
    {optional_Hour !== '' ? optional_Hour : 'Hour'}
  </Text>

  <Icon3
    name="chevron-forward-outline"
    size={20}
    style={{
      color: '#000',
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
            Choose Country
          </Text>
        </View>

        <TextInput
          placeholderTextColor={'grey'}
          onChangeText={e => setFilter(e)}
          style={{
            ...styles.input,
          }}
          placeholder="Search Countries Here"></TextInput>

        <FlatList
          initialNumToRender={80}
          data={allCountry}
          renderItem={renderItem}></FlatList>
      </Modal>

      {/* Business Name Modal  */}
      <Modal visible={Business_Modal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setBusiness_Modal(false)}
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
            Business Name
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Modal(false);
            }}
            disabled={Business_Name !== '' ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: Business_Name !== '' ? 1 : 0.4,
            }}>
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={e => setBusiness_Name(e)}
          placeholderTextColor={'grey'}
          style={{
            ...styles.input1,
          }}
          value={Business_Name}
          placeholder="Type Business Name Here...."></TextInput>
      </Modal>

      {/* Business_Address Modal  */}
      <Modal visible={Business_Address_Modal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setBusiness_Address_Modal(false)}
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
            Edit Address
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Address_Modal(false);
            }}
            disabled={Business_Address !== '' ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: Business_Address !== '' ? 1 : 0.4,
            }}>
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.fillAddress}>
          <Text style={styles.fillText}>Fill With Current Address</Text>
        </TouchableOpacity>

        <TextInput
          onChangeText={e => setBusiness_Address(e)}
          placeholderTextColor={'grey'}
          style={{
            ...styles.input1,
          }}
          value={Business_Address}
          placeholder="Type Address Here...."></TextInput>
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
            Edit categories
          </Text>
        </View>

        <Text style={{...styles.countryName, fontSize: 14, margin: 10}}>
          Search Upto Three Best Categories Related To your Business
        </Text>

        <TextInput
          onChangeText={e => setBusiness_Catagorie(e)}
          placeholderTextColor={'grey'}
          style={{
            ...styles.input1,

            backgroundColor: '#FFFFFF',
            elevation: 4,
            marginBottom: 0,
          }}
          value={Business_Catagorie}
          placeholder="Search categorieshere"></TextInput>

        <ScrollView>
          {allSub.map((v, index) => {
            if (Business_Catagorie.length > 1) {
              return v.map((val, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.5}
                    onPress={() => AddToSelecedcategories(val)}>
                    <View style={styles.categoriesDiv}>
                      <Text style={styles.categoriesDivText}>
                        {allCatagriesName[index]} {'>'} {val}
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
           Edit Categories
          </Text>

          <TouchableOpacity
            onPress={() => {
              ResetValidity();
              setBusiness_Catagorie_Modal(false);
              setBusiness_Catagorie_Modal1(false);
            }}
            disabled={selected_Catagorie.length > 0 ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: selected_Catagorie.length > 0 ? 1 : 0.4,
            }}>
            <Text style={styles.sendNav}>Done</Text>
          </TouchableOpacity>
        </View>

        <Text style={{...styles.countryName, fontSize: 14, margin: 10}}>
          Provide upto three Categories that best Describe core foucus of
          Business
        </Text>

        {selected_Catagorie.map((v, i) => {
          return (
            <View key={i} style={styles.categorieshowDiv}>
              <Text style={{...styles.categoriesDivText, fontSize: 15}}>
                {v}
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
            style={styles.addCatagorieDiv}>
            <Text style={styles.categoriesDivText}>Add New Catagorie</Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              ...styles.countryName,
              fontSize: 12,
              color: 'red',
              width: '100%',
              textAlign: 'right',
              marginTop: 10,
              marginRight: 5,
            }}>
            Your Already Have Added 3 categories
          </Text>
        )}
      </Modal>

    

      {/* Business Website Modal  */}
      <Modal visible={optional_WebsiteModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setOptional_WebsiteModal(false)}
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
            Website
          </Text>

          <TouchableOpacity
            onPress={() => setOptional_WebsiteModal(false)}
            disabled={optional_Website !== '' ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: optional_Website !== '' ? 1 : 0.4,
            }}>
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={e => setOptional_Website(e)}
          placeholderTextColor={'grey'}
          style={{
            ...styles.input1,
          }}
          value={optional_Website}
          placeholder="https://www.google.com/"></TextInput>
      </Modal>






       {/* Business Phone Modal  */}
       <Modal visible={optional_PhoneModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setOptional_PhoneModal(false)}
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
            Phone
          </Text>

          <TouchableOpacity
            onPress={() => setOptional_PhoneModal(false)}
            disabled={optional_phone !== '' ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: optional_phone !== '' ? 1 : 0.4,
            }}>
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={e => setOptional_Phone(e)}
          placeholderTextColor={'grey'}
          style={{
            ...styles.input1,
          }}
          value={optional_phone}
          placeholder="333 333333333"></TextInput>
      </Modal>






      {/* Business Hour Modal  */}
      <Modal visible={optionalHourModal}>
        <View style={styles.nav1}>
          <Icon3
            onPress={() => setOptional_HourModal(false)}
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
            Hour
          </Text>

          <TouchableOpacity
            onPress={() => setOptional_HourModal(false)}
            disabled={optional_Hour !== '' ? false : true}
            activeOpacity={0.8}
            style={{
              ...styles.sendTouch,
              opacity: optional_Hour !== '' ? 1 : 0.4,
            }}>
            <Text style={styles.sendNav}>Next</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={e => setOptional_Hour(e)}
          placeholderTextColor={'grey'}
          style={{
            ...styles.input1,
          }}
          value={optional_Hour}
          placeholder=" Mon - Tue (10:00am- 12:00pm) Seprate With Comma"></TextInput>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addCatagorieDiv: {
    width: '90%',

    height: 40,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    borderRadius: 4,
    marginTop: 30,
  },
  bar: {
    width: '100%',
    height: 1,
    opacity: 0.4,
  },
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    // backgroundColor:'red',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  navHeading: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  sendNav: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sendTouch: {
    position: 'absolute',
    right: 10,
    top: 20,
  },

  formHeading: {
    fontSize: 16,
    color: '#363636',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },
  inputBox: {
    width: '100%',

    backgroundColor: '#FFFFFF',
    minHeight: 60,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
  },
  flag: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    marginTop: 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  countryName: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    fontWeight: '400',
  },
  nav1: {
    width: '100%',
    height: 60,
    paddingLeft: '3%',
    elevation: 5,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
  input: {
    width: '98%',
    marginLeft: '1%',
    borderWidth: 0.3,
    borderColor: 'grey',
    marginBottom: 10,
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
  },

  input1: {
    width: '98%',
    marginLeft: '1%',

    marginBottom: 10,
    height: 45,

    marginTop: 10,
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'grey',
    borderBottomColor: Global.linkBlueColor,
    borderBottomWidth: 2,
  },
  fillAddress: {
    width: '98%',
    height: 30,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    marginLeft: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 4,
  },
  fillText: {
    fontSize: 13,
    color: '#000',
  },

  categoriesDiv: {
    width: '98%',
    height: 30,
    backgroundColor: '#FFFFFF',
    marginLeft: '1%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
  },
  categoriesDivText: {
    fontSize: 12,
    color: '#000',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  categorieshowDiv: {
    width: '98%',
    height: 50,
    backgroundColor: '#FFFFFF',
    marginLeft: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    flexDirection: 'row',
    padding: 10,
  },
});

const mapStateToProps = state => {
  return {
    name1: state.name,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCoustomer);
