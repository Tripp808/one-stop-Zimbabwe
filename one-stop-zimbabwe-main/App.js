

import React from 'react';
import  AppNavigation from './src/config/navigation' 
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export default  App = ({props}) =>  {
  return (

<GestureHandlerRootView style={{ flex: 1 }}>

     <AppNavigation />
</ GestureHandlerRootView>

   
   
   
   );
};

