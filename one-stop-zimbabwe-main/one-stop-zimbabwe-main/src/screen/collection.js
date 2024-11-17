import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {get_data} from '../store/acion/index';
import {arr, Global, navi} from '../assets/Global_Variable';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import ViewMoreText from 'react-native-view-more-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
function Collection(Props) {
  let [closeSearch, SetcloseSearch] = useState('');
  let [search, setSearch] = useState(false);

  const isFocused = useIsFocused();

  let [loginCheck, setLoginCheck] = useState(undefined);
  let [user, setUser] = useState();
  useEffect(() => {
    getData();
  }, [isFocused]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    // console.log(">>>>>>>>>>>",user);

    if (user != undefined) {
      setUser(user);
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };
  return (
    <>
      <StatusBar backgroundColor={Global.color} />

      {search ? (
        <View style={styles.nav1}>
          <Icon
            //   onPress={() => setIsVisible(false)}
            name="location-outline"
            size={25}
            style={{
              color: '#000',
            }}
          />
          <TextInput
            value={closeSearch}
            onChangeText={e => {
              SetcloseSearch(e);
            }}
            placeholder="Helisinki, Los Engles"
            placeholderTextColor={'grey'}
            style={styles.input}
          />

          {closeSearch.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                SetcloseSearch('');
                setSearch(false);
              }}
              activeOpacity={0.8}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Global.color,
                borderRadius: 4,
                position: 'absolute',
                right: 10,
                top: 10,
              }}>
              <Icon
                //   onPress={() => setIsVisible(false)}
                name="close-outline"
                size={25}
                style={{
                  color: '#FFFFFF',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setSearch(false)}
              activeOpacity={0.8}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Global.color,
                borderRadius: 4,
                position: 'absolute',
                right: 10,
                top: 10,
              }}>
              <Icon
                //   onPress={() => setIsVisible(false)}
                name="search-outline"
                size={20}
                style={{
                  color: '#FFFFFF',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.nav}>
          <Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: 'bold'}}>
            Collections
          </Text>

          <TouchableOpacity
            onPress={() => Props.navigation.navigate('WellCome')}>
            <Text
              style={{
                fontSize: 14,
                color: '#FFFFFF',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setSearch(true)}
        style={styles.flex}
        activeOpacity={0.8}>
        <Text style={styles.location}>
          Featured in{' '}
          <Text style={{color: 'grey', fontWeight: 'bold'}}>
            Manhatan , NY , United States
          </Text>
        </Text>
        <Icon
          //   onPress={() => setIsVisible(false)}
          name="chevron-down-outline"
          size={20}
          style={{
            color: 'grey',
            marginLeft: -10,
            marginTop: 2,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          //   backgroundColor: '#FFFFFF',
          width: '100%',
          paddingTop: 10,
          paddingLeft: 0,
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          style={{width: '100%', paddingLeft: 15}}>
          {arr.map((v, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={i}
                onPress={() => Props.navigation.navigate('collectionDetails')}
                style={{
                  ...styles.showImage,
                  marginLeft: i == 0 ? 0 : 20,
                  marginRight: i == 9 ? 20 : 0,
                }}>
                {/* */}

                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image
                    key={i}
                    source={{uri: v.image}}
                    style={{
                      width: '65%',
                      height: 200,

                      resizeMode: 'contain',
                      borderTopLeftRadius: 8,
                    }}
                  />

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '35%',
                      height: 200,
                    }}>
                    <Image
                      source={{uri: arr[Math.floor(Math.random() * 4)].image}}
                      style={{
                        width: '100%',
                        minHeight: 100,
                        resizeMode: 'cover',
                        borderTopRightRadius: 8,
                      }}
                    />

                    <Image
                      source={{uri: arr[Math.floor(Math.random() * 4)].image}}
                      style={{
                        width: '100%',
                        minHeight: 100,
                        resizeMode: 'cover',
                      }}
                    />

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        width: '100%',
                        minHeight: 100,
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0.427)',
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="bookmark-outline"
                        size={30}
                        color="#fff"></Icon>
                      <Text style={{color: '#FFFFFF', fontSize: 15}}>
                        {Math.floor(Math.random() * 4)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: 'grey',
                      fontWeight: '600',
                      fontSize: 15,
                      width: 200,
                      textAlign: 'left',
                      marginLeft: 2,
                    }}>
                    {v.title}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      color: 'grey',
                      fontSize: 12,
                      width: 290,
                      textAlign: 'justify',
                      marginLeft: 2,
                    }}>
                    {v.details} {v.details} {v.details} {v.details}
                    {v.details} {v.details}
                    {v.details}
                    {v.details}
                  </Text>

                  <Text
                    numberOfLines={3}
                    style={{
                      color: 'grey',
                      fontSize: 12,
                      width: 300,
                      textAlign: 'justify',
                      marginLeft: 2,
                      marginTop: 2,
                    }}>
                    {v.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View
          style={{
            width: '100%',
            borderWidth: 0.2,
            marginBottom: 30,
            height: 0.4,
            backgroundColor: 'grey',
            marginTop: 20,
            opacity: 0.3,
          }}></View>

        {!loginCheck ? (
          <>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                width: '70%',
                color: '#000',
                marginLeft: '15%',
              }}>
              Sign Up or login in to start creating and following collections
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => Props.navigation.navigate('Login')}
              style={{
                ...styles.buttonHalfTwo1,
              }}>
              <Text
                style={{fontSize: 15, color: '#FFFFFF', fontFamily: 'notoserif'}}>
                Sign up / Login
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 60,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
  },
  buttonHalfTwo1: {
    backgroundColor: Global.linkBlueColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 10,
    width: '90%',
    fontFamily: 'sans-serif-thin',
    marginLeft: '5%',
    borderRadius: 5,
  },
  input: {
    width: '90%',
    height: 60,
    fontSize: 17,
    fontWeight: '600',
    color: 'grey',
  },
  nav1: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row',
    elevation: 4,
    // paddingTop: StatusBar.currentHeight,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  location: {
    fontSize: 14,
    color: 'grey',
    // fontWeight: '600',
    paddingHorizontal: 15,
  },
  ReviewCard: {
    width: '95%',
    minHeight: 100,
  },

  showImage: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 310,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor:'red',
    // marginLeft: 30,
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

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
