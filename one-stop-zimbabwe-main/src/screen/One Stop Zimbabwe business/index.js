import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Modal,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {Global} from '../../assets/Global_Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const OneStopBusiness = Props => {
  const isFocused = useIsFocused();

  let [loginCheck, setLoginCheck] = useState(undefined);
  let [Notify, setNotify] = useState(false);
  let [user, setUser] = useState();
  useEffect(() => {
    getData();
  }, [isFocused]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    if (user != undefined) {
      setUser(user);
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };
  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={{...styles.nav}}>
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
          OneStop Business
        </Text>
      </View>

      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={styles.linkDiv}>
          <Image
            source={require('../../assets/advertize.png')}
            style={{
              height: 350,
              width: '100%',
              marginTop: '0%',
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              marginLeft: '5%',
              width: '90%',
              fontSize: 13,
              textAlign: 'center',
              marginTop: 10,
              color: '#000',
            }}>
            What's Service you want for your business?
          </Text>

          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              Props.navigation.navigate('MyownSelect', {
                navigate: 'Edit_AdvertizeSelected',
              });
            }}
            activeOpacity={0.8}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 15,
                color: Global.linkBlueColor,
                fontWeight: 'bold',
              }}>
              Claim your Listing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              loginCheck
                ? Props.navigation.navigate('AdvertizmentEvent')
                : Props.navigation.navigate('LoginCheckRestict');
            }}
            activeOpacity={0.8}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 15,
                color: Global.linkBlueColor,
                fontWeight: 'bold',
              }}>
              Advertize Event
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              loginCheck && setNotify(true);
            }}
            activeOpacity={0.8}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 15,
                color: Global.linkBlueColor,
                fontWeight: 'bold',
              }}>
              Advertize Business
            </Text>
          </TouchableOpacity>

          <View style={styles.bullets}>
            <Text style={{color: '#000', fontSize: 14}}>●</Text>
            <Text style={{...styles.Validation, color: '#000', marginTop: 0}}>
              OneStop Zim helps people find restaurants, home and commercial
              services and more. Having a strong presence on OneStop Zim helps
              you establish trust with potential customers.
            </Text>
          </View>

          <View style={styles.bullets}>
            <Text style={{color: '#000', fontSize: 14}}>●</Text>
            <Text style={{...styles.Validation, color: '#000', marginTop: 0}}>
              Claiming your business means you can verify and edit all the
              information about your business as it appears on OneStop Zim.
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Claiming your business gives you access to the Verified Licence
                Logo Feature.
              </Text>
            </Text>
          </View>
        </View>
        <Modal transparent={true} visible={Notify}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(4, 4, 4, 0.474)',
            }}>
            <View
              style={{
                width: '80%',
                minHeight: 170,
                borderRadius: 4,
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{fontSize: 20, color: Global.color, fontWeight: 'bold'}}>
                Notification
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: 'grey',
                  width: '70%',
                  textAlign: 'center',
                }}>
                Please add flyers/images for your business under the edit
                business (ME) function before advertising your business.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setNotify(false);
                  loginCheck
                    ? Props.navigation.navigate('AdvertizeBusiness')
                    : Props.navigation.navigate('LoginCheckRestict');
                }}
                style={{
                  width: '50%',
                  height: 40,
                  backgroundColor: Global.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 16, color: '#fff'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 60,
    paddingLeft: '5%',
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
    flex: 1,
  },
  Validation: {
    width: '90%',
    textAlign: 'left',
    fontSize: 12,
    marginLeft: '2%',
  },
  bullets: {
    display: 'flex',
    width: '94%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '3%',
    marginTop: 20,
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
  center: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {
    name1: state.name,
    business_data: state.business,
    Relevant_Business_type: state.Relevant_Business_type,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneStopBusiness);
