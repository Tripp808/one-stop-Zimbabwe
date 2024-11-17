import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../assets/Global_Variable';
import {StoryContainer} from '../Custom Modules/react-native-stories-view/index';

export default function StoryShow(Props) {
  let [stop, setStop] = useState(true);

  let images = [
    'https://www.eatthis.com/wp-content/uploads/sites/4/2018/02/mcdonalds-chicken-sandwich-meal.jpg?quality=82&strip=1',
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <ScrollView style={{flex:1,backgroundColor: '#FFFFFF'}}>
        <View
          onTouchStart={() => setStop(false)}
          onTouchEnd={() => setStop(true)}
          style={{flex: 1, margin: 0}}>
          <StoryContainer
            visible={true}
            enableProgress={stop}
            images={images}
            duration={20}
               onComplete={() =>Props.navigation.goBack()}
            containerStyle={{
              width: '100%',
              height: 600,
              //  marginTop:-15,
            }}
            imageStyle={{
              width: Dimensions.get('window').width,
              height: 400,
              resizeMode: 'cover',
            }}
            headerComponent={
              <View style={styles.nav}>
                <Image
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={{uri: arr[2].user}}
                />

                <Text style={styles.heading}>Jone Stunt Man.</Text>

                <Icon
                  name="close-outline"
                  color={'#000'}
                  style={{position: 'absolute', right: 7, top: 40}}
                  size={35}
                  onPress={()=>Props.navigation.goBack()}
                />
              </View>
            }
            barStyle={{
              barActiveColor: '#000',
              barInActiveColor: '#D3D3D3',
              barWidth: 100,
              barHeight: 3,
            }}
          />

          <View style={styles.footer}>
            <Text style={styles.footerHeading} numberOfLines={2}>
              Main Heading Content
            </Text>

            <Text style={styles.footerPara}>
              Footer Para Details Footer Para Details Footer Para Details Footer
              Para Details Footer Para Details Footer Para Details Footer Para
              Details Footer Para Details Footer Para Details Footer Para
              Details Footer Para Details Footer Para Details Footer Para
              Details Footer Para Details Footer Para Details Footer Para
              Details Footer Para Details Footer Para Details Footer Para
              Details Footer Para Details Footer Para Details Footer Para
              Details Footer Para Details Footer Para Details Footer Para
              Details Footer Para Details Footer Para Details Footer Para
              Details
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    paddingHorizontal: 15,
    height: 100,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
  },
  footer: {
    width: '100%',
    display: 'flex',
    paddingHorizontal: 20,
    marginTop: -100,
    paddingTop: 20,
  },
  footerHeading: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    marginLeft: 0,
  },
  footerPara: {
    fontSize: 13,
    color: 'grey',
  },
});
