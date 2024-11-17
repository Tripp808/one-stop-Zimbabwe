import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Global } from '../assets/Global_Variable';
import Home from '../screen/Home';
import collection from '../screen/collection';
import ChatsUserShow from "../screen/Chats/ChatUserShow"
import Profile from '../screen/Profile'
import More from '../screen/More';
const Tab = createBottomTabNavigator();

function AppNavigation_2(Props) {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        activeTintColor: Global.color,

        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#FFFFFF',
          elevation: 0,
          borderTopWidth: 0,
          height: 65,
          elevation: 3
        },
      }}>
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.center}>
              <Icon3
                name="search"
                style={{
                  fontSize: 22,
                  color: focused ? Global.color : '#6F7072',
                  fontWeight: 'bold'
                }}

              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  fontStyle: 'italic',
                  color: focused ? Global.color : '#6F7072',
                  marginTop: 3
                }}>
                Search
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Me"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.center}>
              <Icon2
                name="account-circle"
                style={{
                  fontSize: 22,
                  color: focused ? Global.color : '#6F7072',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  fontStyle: 'italic',
                  color: focused ? Global.color : '#6F7072',
                  marginTop: 5
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ChatsUserShow"
        component={ChatsUserShow}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.center}>
              <Icon
                name="comments"
                style={{
                  fontSize: 22,
                  color: focused ? Global.color : '#6F7072',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  fontStyle: 'italic',
                  color: focused ? Global.color : '#6F7072',
                  marginTop: 5
                }}>
                Chats
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.center}>
              <Icon
                name="bars"
                style={{
                  fontSize: 22,
                  color: focused ? Global.color : '#6F7072',

                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  fontStyle: 'italic',
                  color: focused ? Global.color : '#6F7072',
                  marginTop: 5
                }}>
                More
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigation_2;
