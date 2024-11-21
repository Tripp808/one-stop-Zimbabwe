import React ,{useEffect, useState,}from "react";
import { View,StyleSheet,Text,ScrollView, TouchableOpacity,TextInput,Button,PermissionsAndroid, StatusBar} from 'react-native';
import BusinesDeails  from "./BusinesDeails_Navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';

export default function BusinessDetailsMail(Props) {

  let [Search, setSearch] = useState(false);
  let [Search_word, setSearch_word] = useState('');



  return(
    
    
    
  
    <View style={{backgroundColor:'#FFFFFF',flex:1}}>

 <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <View style={styles.nav}>
      <TouchableOpacity
       onPress={()=>Props.navigation.goBack()}
        activeOpacity={0.7}>
        <Icon3 name="chevron-back-outline" color={'#000'} style={{marginLeft:10}} size={25} />

      </TouchableOpacity>

      <Text style={{fontSize: 20, color:'#000',fontWeight:'bold',marginBottom:10,marginTop:6}}>
 Popular Dishes
      </Text>

      <Icon3 name="flag-outline" color={'#000'} size={25} />
    </View>
      
      
         
        
     <BusinesDeails props={Props} />
     
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
  