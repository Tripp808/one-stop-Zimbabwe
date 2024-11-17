import React from 'react';
import {screens} from '../../constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ImageDetailsShown from './ImageDetailsShown';
import {navi, Global} from '../../assets/Global_Variable';

const Tab = createMaterialTopTabNavigator();
const ImageDeails_Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        
        tabBarScrollEnabled: true,
        tabBarPressColor: '#000',
        tabBarIndicatorStyle: {
          backgroundColor:'#FFFFFF' ,
          height: 3,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          // fontWeight: 'bold',
          color: '#FFFFFF',
          // paddingHorizontal: 5,
          textTransform: 'capitalize',
          // margin: 0,
          fontFamily: 'Roboto',
        },
        tabBarStyle: {
          justifyContent: 'center',
          alignContent: 'center',
          width: '88%',
          marginLeft: '10%',
          elevation: 0,
          // paddingLeft:10,
          backgroundColor:'#000'
        
        },
        tabBarItemStyle: {
          width: 'auto',
          // paddingHorizontal: 10,
          // margin: 0,
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-start'
          // alignContent:'flex-start'
        },
      }}
      sceneContainerStyle={{backgroundColor: 'white'}}>
      {navi.map((v, i) => {
        return <Tab.Screen key={i} name={v.title} component={ImageDetailsShown} />;
      })}
    </Tab.Navigator>
  );
};

export default ImageDeails_Navigation;
