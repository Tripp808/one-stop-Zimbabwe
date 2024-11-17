import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {get_data} from '../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../assets/Global_Variable';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

function CollectionDetails(Props) {
  let [scrollValue, setScrollValue] = useState(0);
  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <View
        style={{
          ...styles.nav,
          backgroundColor: scrollValue > 250 ? Global.color : 'transparent',
        }}>
        <Icon3
          onPress={() => Props.navigation.goBack()}
          name="chevron-back-outline"
          size={25}
          style={{
            color: '#FFFFFF',
            position: 'absolute',
            top: 20,
            left: 10,
          }}
        />

        <Icon3
          onPress={() => Props.navigation.goBack()}
          name="map-outline"
          size={25}
          style={{
            color: '#FFFFFF',
            position: 'absolute',
            top: 20,
            right: 110,
          }}
        />

        <Icon3
          onPress={() => Props.navigation.goBack()}
          name="share-social-outline"
          size={25}
          style={{
            color: '#FFFFFF',
            position: 'absolute',
            top: 20,
            right: 60,
          }}
        />

        <Icon3
          onPress={() => Props.navigation.goBack()}
          name="flag-outline"
          size={25}
          style={{
            color: '#FFFFFF',
            position: 'absolute',
            top: 20,
            right: 15,
          }}
        />
      </View>

      <ScrollView
        style={{flex: 1}}
        onScroll={event => setScrollValue(event.nativeEvent.contentOffset.y)}>
        <Image
          source={{uri:arr[0].image}}
          style={{width: '100%', height: 300, resizeMode: 'cover'}}
        />

        <Text
          style={{
            fontSize: 14,
            color: '#000',
            fontWeight: '400',
            left: 15,
            width: '90%',
            textAlign: 'left',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>followers :</Text>{' '}
          234423
        </Text>

        <Text
          style={{
            fontSize: 22,
            color: '#000',
            fontWeight: 'bold',
            left: 15,
            width: '90%',
            textAlign: 'left',
            marginTop: 10,
          }}>
          Black Owed Business In Queue
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: 'grey',
            left: 15,
            width: '90%',
            textAlign: 'justify',
            marginTop: 10,
          }}>
          A+ experience second time working with Hassan, would highly recommend.
          Will go the extra mile to help and definitely one of the best on
          Fiverr. A+ experience second time working with Hassan, would highly
          recommend. Will go the extra mile to help and definitely one of the
          best on Fiverr. A+ experience second time working with Hassan, would
          highly recommend. Will go the extra mile to help and definitely one of
          the best on Fiverr. A+ experience second time working with Hassan,
          would highly recommend. Will go the extra mile to help and definitely
          one of the best on Fiverr. A+ experience second time working with
          Hassan, would highly recommend. Will go the extra mile to help and
          definitely one of the best on Fiverr. A+ experience second time
          working with Hassan, would highly recommend. Will go the extra mile to
          help and definitely one of the best on Fiverr. A+ experience second
          time working with Hassan, would highly recommend. Will go the extra
          mile to help and definitely one of the best on Fiverr.
        </Text>

        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                color: 'grey',

                textAlign: 'left',
              }}>
              Alexender
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: 'grey',

                textAlign: 'left',
              }}>
              2019
            </Text>
          </View>

          <Image
            source={require('../assets/back.png')}
            style={{width: 50, height: 50, borderRadius: 40, marginRight: 9}}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => Props.navigation.navigate('Login')}
          style={{
            ...styles.buttonHalfTwo1,
          }}>
          <Text style={{fontSize: 15, color: '#FFFFFF', fontFamily: 'notoserif'}}>
            Follow Collection
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            flexDirection: 'row',
            marginTop:20
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              textAlign: 'left',
              fontWeight:'bold'
            }}>
            59 Places
          </Text>

          <TouchableOpacity  activeOpacity={0.9} style={{display:'flex',flexDirection:'row'}}>
            <Text
              style={{
                fontSize: 13,
                color: Global.linkTextColor,
                fontWeight: 'bold',
                textAlign: 'left',
              }}>
              Distance From Me
            </Text>
            <Icon3
              onPress={() => Props.navigation.goBack()}
              name="chevron-down-outline"
              size={15}
              style={{
                color: Global.linkTextColor,

                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        </View>


       {[0,1,2,3,4].map((v,i)=>{
        return(
          <>
            <View
                    style={{
                      width: '90%',
                      borderWidth: 0.2,
                      marginBottom: 10,
                      height: 0.2,
                      backgroundColor: 'grey',
                      marginTop: 10,
                      opacity: 0.2,
                      marginLeft:'5%',
                      
                    }}></View>




<View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            flexDirection: 'row',
            marginBottom:7
          }}>
          <View style={{width:'60%'}}>
            <Text
            numberOfLines={1}
              style={{
                fontSize: 13,
                color: 'grey',

                textAlign: 'left',
                fontWeight:'bold',
                
              }}>
              Somthing Cashe 
            </Text>

            <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />

                    <Text
                      style={{
                        fontSize: 12,
                        color: 'grey',
                        marginLeft: 7,
                        marginRight: 7,
                      }}>
                      11 month ago
                    </Text>
                  </View>
            <Text
              style={{
                fontSize: 11,
                color: 'grey',

                textAlign: 'left',
              }}>
              12-13 scale 6th Ave , Astaria
            </Text>


            <Text
              style={{
                fontSize: 11,
                color: 'grey',

                textAlign: 'left',
              }}>
              SeaFood
            </Text>


          </View>

          <Icon3
          // onPress={() => Props.navigation.goBack()}
          name="bookmark-outline"
          size={25}
          style={{
            color: 'grey',
           
          }}
        />
        </View>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            style={{width: '100%', paddingLeft: 20}}>
            {arr.map((v, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={i}
                  // onPress={() => setIsVisible(true)}
                  >
                  <Image
                    key={i}
                    source={{uri: v.image}}
                    style={{
                      width: 90,
                      minHeight: 90,
                      borderRadius: 3,
                      resizeMode: 'cover',
                      marginLeft:i==0?0:5,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView></>
        )
       })}

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 70,
    // backgroundColor:'red',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  buttonHalfTwo1: {
    backgroundColor: Global.linkBlueColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 10,
    width: '92%',
    fontFamily: 'sans-serif-thin',
    marginLeft: '4%',
    borderRadius: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);
