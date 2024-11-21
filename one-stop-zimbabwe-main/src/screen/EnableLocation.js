import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StatusBar
} from 'react-native';
import {get_data} from '../store/acion/index';
import {Global} from '../assets/Global_Variable';
function Enablelocation(Props) {
  return (
    <>
    <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.flex}>
        <TouchableOpacity activeOpacity={0.8}></TouchableOpacity>

        <Text style={styles.welcomeHeading}>Enable Location</Text>

        <Text style={styles.welcomePara}>
          OneStop Zim receives your location when you're using the app to search for
          nearby businesses, give you a better local experience , and more.{' '}
        </Text>

        <Image
          source={require('../assets/location.png')}
          style={{
            height: '70%',
            width: '100%',
            marginTop: '10%',
            resizeMode: 'contain',
          }}
        />
      </View>

      <View style={styles.flexBottom}>
        <TouchableOpacity onPress={()=>Props.navigation.navigate('LoginCheckRestict')} activeOpacity={0.7} style={styles.buttonHalfTwo}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontFamily: 'notoserif',
              fontWeight: '600',
            }}>
            OK, I understand
          </Text>
        </TouchableOpacity>

        <View activeOpacity={0.7} style={styles.content}>
          <Text
            style={{
              fontSize: 15,
              color: 'grey',
              width: '80%',
              textAlign: 'center',
              marginTop: 7,
              fontFamily: 'sans-serif-condensed',
            }}>
            You can adjust your location settings at any time.{' '}
            <Text
              style={{color: Global.linkTextColor}}
              onPress={() =>
                Linking.openURL('https://hac-portfolio.web.app/').catch(err =>
                  console.error("Couldn't load page", err),
                )
              }>
              Learn more.
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 2,
    padding: 20,
  },
  skip: {
    fontSize: 17,
    color: '#2F7585',
    width: '100%',
    textAlign: 'right',
    marginTop: -5,
    fontWeight: '500',
  },
  welcomeHeading: {
    fontSize: 32,
    color: '#333333',
    fontWeight: 'bold',
    marginTop: '7%',
  },
  welcomePara: {
    fontSize: 16,
    color: '#333333',
    marginTop: '2%',
  },
  flexBottom: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    padding: 20,
  },
  buttonsDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonHalfOne: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    width: '48%',
    height: 45,
    borderRadius: 5,
  },

  buttonHalfTwo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    borderRadius: 5,
    backgroundColor: Global.color,
    elevation: 1,
  },
  GoogleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: 'grey',
    marginBottom: 7,
    height: 45,
  },
  facebookButton: {
    backgroundColor: '#4167B2',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

    marginBottom: 7,
    height: 45,
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(Enablelocation);
