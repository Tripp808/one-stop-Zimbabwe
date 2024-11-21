import React ,{useEffect, useState,}from "react";
import { View,StyleSheet,Text,ScrollView, TouchableOpacity,TextInput,Button,PermissionsAndroid, StatusBar} from 'react-native';
import ImageDeails_Navigation  from "./ImageDeails_Navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';

export default function ImageDetailsMail(Props) {

  let [Search, setSearch] = useState(false);
  let [Search_word, setSearch_word] = useState('');

  
  
  return(
    
    
    
    
    
    <View style={{backgroundColor:'#000',flex:1}}>

 <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Icon3 name="chevron-back-outline" onPress={()=>Props.navigation.goBack()} color={'#FFFFFF'} style={{position:'absolute',top:10,left:10,zIndex:10}} size={25} />

      
      
         
        
     <ImageDeails_Navigation props={Props} />
     
  </View>


    )
}



const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

    // padding: 10,
    // paddingLeft:5,
    paddingLeft:0,
    paddingRight:10,
    paddingTop:10
   
  },
   navBackText: {
    fontSize: 15,
    color: '#000',
    fontWeight:'bold'
  },

  });
  