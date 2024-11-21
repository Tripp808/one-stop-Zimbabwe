import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {Global} from '../assets/Global_Variable';
import Modal from 'react-native-modal';
import obj from '../assets/SubCatagories';
const Categories = Props => {
  let [Selected, setSelected] = useState('');
  let [Modal1, setModal] = useState(false);

  let [subcategories, setSubcategories] = useState([
    
  ]);

  let selectSubcategories = e => {
    setSubcategories([])
    switch (e) {
      case 'Active Life':
        setSubcategories(obj.activeLife);
        setModal(true);
        break;
      case 'Art & Entertainment':
        setSubcategories(obj.ArtsEntertainment);
        setModal(true);
        break;
      case 'Motor Vehicle Services':
        setSubcategories(obj.MotorVehicleServices);
        setModal(true);
        break;
      case 'Beauty & Spas':
        setSubcategories(obj.BeautySpas);
        setModal(true);
        break;
      case 'Education':
        setSubcategories(obj.Education);
        setModal(true);
        break;
      case 'Event Management Services':
        setSubcategories(obj.EventManagementServices);
        setModal(true);
        break;
      case 'Financial & Insurance Services':
        setSubcategories(obj.FinancialInsuranceServices);
        setModal(true);
        break;
      case 'Food':
        setSubcategories(obj.Food);
        setModal(true);
        break;
      case 'Government & Public Service':
        setSubcategories(obj.GovernmentPublicServices);
        setModal(true);
        break;
      case 'Health & Medical Services':
        setSubcategories(obj.HealthMedicalService);
        setModal(true);
        break;
      case 'Home Service':
        setSubcategories(obj.HomeCommercialServices);
        setModal(true);
        break;
      case 'Hotel & Lodges':
        setSubcategories(obj.HotelsandLodges);
        setModal(true);
        break;
      case 'Local Services':
        setSubcategories(obj.LocalServices);
        setModal(true);
        break;
      case 'Professional Services':
        setSubcategories(obj.ProfessionalServices);
        setModal(true);
        break;
      case 'Religious Institutions':
        setSubcategories(obj.ReligiousInstitude);
        setModal(true);
        break;
      case 'Shopping':
        setSubcategories(obj.Shopping);
        setModal(true);
        break;
      case 'Tourism Services':
        setSubcategories(obj.TourismService);
        setModal(true);
        break;

      default:
        break;
    }

   
  };
  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.nav}>
          <Icon3
            onPress={() => Props.navigation.goBack()}
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
            All Categories
          </Text>
        </View>

        {/* <Text
          style={{
            width: '100%',
            fontSize: 16,
            color: '#414141',

            fontFamily: 'sans-serif-normal',
            paddingTop: 20,
            paddingBottom: 10,
            marginLeft: '5%',
            fontWeight: 'bold',
          }}>
          Popular categories
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkDiv}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="flame-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Hot New Business
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkDiv}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="bicycle-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Delivery
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkDiv}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="shield-checkmark-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Check-In-offer
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkDiv}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="fast-food-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Resturant
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkDiv}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="wine-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Bars
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.linkDiv}}
          onPress={() => {
            
          }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="snow-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Everything
            </Text>
          </TouchableOpacity>
        </TouchableOpacity> */}

        <Text
          style={{
            width: '100%',
            fontSize: 16,
            color: '#414141',

            fontFamily: 'sans-serif-normal',
            paddingTop: 20,
            paddingBottom: 10,
            marginLeft: '5%',
            fontWeight: 'bold',
          }}>
          All Categories
        </Text>



        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            Props.navigation.navigate('Search',{filter:'all'})
            
          }}>
          <View style={styles.card}>
            <Icon3
              name="grid-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              All Businesses
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>


        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Active Life');
          }}>
          <View style={styles.card}>
            <Icon3
              name="flash-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Active Life
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Art & Entertainment');
          }}>
          <View style={styles.card}>
            <Icon3
              name="musical-notes-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Art & Entertainment
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Motor Vehicle Services');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="car-sport-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Motor Vehicle Services
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            Props.navigation.navigate('Search',{filter:'bar'})
          }}>
          <View style={styles.card}>
            <Icon3
              name="wine-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Bars
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Beauty & Spas');
          }}>
          <View style={styles.card}>
            <Icon3
              name="cut-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Beauty & Spas
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Education');
          }}>
          <View style={styles.card}>
            <Icon3
              name="book-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Education
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Event Management Services');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="calendar-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Event Management Services
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Financial & Insurance Services');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="cash-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Financial & Insurance Services
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Food');
          }}>
          <View style={styles.card}>
            <Icon3
              name="fast-food-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Food
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv, marginBottom: 0}}
          onPress={() => {
            selectSubcategories('Government & Public Service');
          }}>
          <View style={styles.card}>
            <Icon3
              name="football-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Government & Public Service
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Health & Medical Services');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="medkit-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Health & Medical Services
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Home Service');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="home-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Home Service
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Hotel & Lodges');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="business-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Hotel & Lodges
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Local Services');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="file-tray-full-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Local Services
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Professional Services');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="earth-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Professional Services
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Religious Institutions');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="ribbon-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Religious Institutions
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Shopping');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="cart-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Shopping
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{...styles.linkDiv}}
          onPress={() => {
            selectSubcategories('Tourism Services');
          }}>
          <View activeOpacity={0.7} style={styles.card}>
            <Icon3
              name="happy-outline"
              size={20}
              style={{
                color: '#000',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 10,
                // fontWeight:'bold'
              }}>
              Tourism Services
            </Text>
          </View>
          <Icon3
            name="chevron-forward-outline"
            size={20}
            style={{
              color: '#000',
              marginLeft: 2,
            }}
          />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={Modal1}
        transparent={false}
        style={{flex: 1, width: '100%', margin: 0, backgroundColor: '#FFFFFF'}}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />

        <ScrollView style={{flex: 1}}>
          <View style={styles.nav}>
            <Icon3
              onPress={() => setModal(false)}
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
              Sub-categories
            </Text>
          </View>

          {subcategories.map((v, i) => {
            // console.log(v);
            return (
              <View key={i}  style={styles.linkDiv} >
                <TouchableOpacity activeOpacity={0.7} style={styles.card} 
                onPress={() => {
            Props.navigation.navigate('Search',{filter:v})
            
          }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#414141',

                      fontFamily: 'sans-serif-normal',
                      marginLeft: 10,
                      // fontWeight:'bold'
                    }}>
                    {v}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {/* <View style={styles.linkDiv}>
            <TouchableOpacity activeOpacity={0.7} style={styles.card}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#414141',

                  fontFamily: 'sans-serif-normal',
                  marginLeft: 10,
                  // fontWeight:'bold'
                }}>
                Check-In-offer
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.184)',
    paddingRight: '5%',
    backgroundColor: '#FFFFFF',
    elevation: 1,
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
});

export default Categories;
