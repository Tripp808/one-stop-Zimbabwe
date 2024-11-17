import React from 'react';
import {screens} from '../../constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ItemDetails from './ItemDetails';
import {navi, Global} from '../../assets/Global_Variable';

const Tab = createMaterialTopTabNavigator();
const BusinesDeails = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        
        tabBarScrollEnabled: true,
        tabBarPressColor: '#FFFFFF',
        tabBarIndicatorStyle: {
          backgroundColor: Global.color,
          height: 4,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#000',
          paddingHorizontal: 5,
          textTransform: 'capitalize',
          margin: 0,
          fontFamily: 'Roboto',
        },
        tabBarStyle: {
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          // paddingLeft: '5%',
          // elevation: 0,
          // paddingLeft:10,
        
        },
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 10,
          margin: 0,
        },
      }}
      sceneContainerStyle={{backgroundColor: 'white'}}>
      {navi.map((v, i) => {
        return <Tab.Screen key={i} name={v.title} component={ItemDetails} />;
      })}
    </Tab.Navigator>
  );
};

export default BusinesDeails;
