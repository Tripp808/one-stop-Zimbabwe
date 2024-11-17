import React, {useState, useRef,useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_event} from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../../assets/Global_Variable';
import { useIsFocused } from '@react-navigation/native';


function EventsShow(Props) {

  const isFocused = useIsFocused();
  let [loadingS, setLoadingS] = useState(false);
  let [user, setUser] = useState();
  let [loginCheck, setLoginCheck] = useState(undefined);
  let [event_show, setevent_show] = useState([]);
  useEffect(() => {
    getData();
  },[]);
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user_data'));

    if (user != undefined) {

    } else {
      Props.navigation.navigate('LoginCheckRestict');
    }
    if (user.Business == true && user.Business != undefined) {

      console.log("PAssed updated Key>>>>>>>>>",Props.Relevant_Business_type.uid);
      if (Props.get_event_data=='fail' ) {
        setLoadingS(true)
        await Props.get_event(setLoadingS,Props.Relevant_Business_type.uid)
        console.log("foo Run",Props.Relevant_Business_type);
      }else{
        
        setevent_show(Props.get_event_data)
        console.log("kkkkkkkkkk",Props.get_event_data);

     
      }

    } else {
      alert('You have no any register business')
      Props.navigation.navigate('More');
    }
    
  };



  let renderItem = v => {
    return (
      <View
      // key={}
      
      style={{
        ...styles.linkDiv,
        // backgroundColor: '#FFFFFF',
        width:'100%'
      }}>
        <TouchableOpacity
          onPress={() => {
            Props.navigation.navigate('EventDetails',{detail:v.item});
          }}
          activeOpacity={0.5}
          style={styles.card}>
          <Image
            source={{uri: v.item.url}}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              borderRadius: 3,
            }}
          />

          <View style={{width:'80%'}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                fontWeight: 'bold',
                marginLeft: 15,
                textAlign: 'justify',
                width: '100%',
                
              }}>
              {v.item.title} 
            </Text>

            <Text
              numberOfLines={2}
              style={{
                fontSize: 11,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                marginLeft: 15,
                width: '65%',
              }}>
              {v.item.start_Date} - {v.item.End_Date}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <StatusBar
        // translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

<Modal transparent={true} visible={loadingS}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(4, 4, 4, 0.474)',
          }}>
          <Image
            source={require('../../assets/loadingS.gif')}
            style={{width: 150, height: 150}}
          />
        </View>
      </Modal>

      <View style={styles.nav1}>
        <Icon3
          onPress={() => {
            Props.navigation.goBack();
          }}
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
          Events
        </Text>


            {/* <Icon3
          onPress={() => {
            Props.navigation.navigate('EventsHistory');
          }}
          name="time-outline"
          size={24}
          style={{
            color: '#FFFFFF',
           position:'absolute',
           right:10
          }}
        /> */}
      </View>

      <Text
        style={{
          fontSize: 14,
          fontFamily: 'notoserif',
          marginLeft: 15,
          color: '#000',
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        All Events
      </Text>
      <FlatList
        initialNumToRender={80}
        data={Props.get_event_data}
        renderItem={renderItem}></FlatList>

        <TouchableOpacity onPress={()=>Props.navigation.navigate('AddEventsForm',{myBuiness_uid:Props.route.params.myBuiness_uid})} style={styles.addEvent}>
        <Icon3
          
          name="add-outline"
          size={30}
          style={{
            color: '#FFFFFF',
            marginLeft: 2,
          }}
        />
        </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  nav1: {
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
  input: {
    height: 45,
    width: '100%',
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#000',
  },
  linkDiv: {
    width: '100%',
    // paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(106, 105, 105, 0.184)',
  },
  card: {
    width: '94%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '3%',
  },
  addEvent:{
    width:60,
  height:60,
  backgroundColor:Global.color,
display:'flex',
alignItems:'center',
justifyContent:'center',
position:'absolute',
right:10,
bottom:10,
borderRadius:80 



}
});

const mapStateToProps = state => {
  return {
    name1: state.name,
    get_event_data:state.get_event,
    Relevant_Business_type:state.Relevant_Business_type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_event: (setLoadingS,user) => dispatch(get_event(setLoadingS,user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsShow);
