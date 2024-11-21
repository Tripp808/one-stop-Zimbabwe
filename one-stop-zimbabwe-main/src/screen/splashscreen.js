
import React, { useEffect, useState } from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { StackActions } from '@react-navigation/native';
import { Global } from '../assets/Global_Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen(Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [color, setColor] = useState('fff');

  useEffect(() => {
    setTimeout(() => {
      getData();

    }, 1000);

  }, []);

  let getData = async () => {
    setColor('fff');




    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    // console.log(">>>>>>>>>>>",user);

    if (user != undefined) {
      setColor('000');
      setIsLoaded(true);
      Props.navigation.dispatch(StackActions.replace('Main_tab'));
    }
    else {
      Props.navigation.dispatch(StackActions.replace('WellCome'));

    }

  };

  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      backgroundColor={`#${color}`}
      logoImage={require('../assets/logo.png')}
      logoHeight={120}
      logoWidth={120}
    >
    </AnimatedSplash>
  );
}

export default SplashScreen;