import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {get_data} from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../../assets/Global_Variable';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FriendCheciIn(Props) {
  const isFocused = useIsFocused();
  let [user, setUser] = useState();
let [All_checkIns,setAll_check_Ins]=useState([])
  let getData = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("@user_data"));
    let allCheckIns=[]
    if (user != undefined) {
      setUser(user);
      console.log(user);
     user.Check_In.map((v,i)=>{
     let me= Props.All_Business_Nodes_newOld.filter(e=>{
      return(
        e.uid==v
      )
     })
      console.log("VVVVVVVVVVV",v);

      allCheckIns.push(me[0])
      
     })

     setAll_check_Ins(allCheckIns)
     console.log("all Check ins>>>>>",allCheckIns);
    } else {

      Props.navigation.navigate('LoginCheckRestict');

    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);






  let renderItem = v => {
    
    return (
      <View
        // key={}

        style={{
          ...styles.linkDiv,
          // backgroundColor: '#FFFFFF',
        }}>
        <TouchableOpacity
          onPress={() => {
            Props.navigation.navigate("BusinessAllDetails", {
              Details: v.item.uid,
            });
          }}
          activeOpacity={0.5}
          style={styles.card}>

{ v.item.Images.length==0?


<Image
source={{uri: 'https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193060544?k=20&m=1193060544&s=612x612&w=0&h=MI8y2q1HsY4TEAZD3tNCJN3bmc39N3pnFKC2KKNDUmE='}}
style={{
  width: 50,
  height: 50,
  resizeMode: 'contain',
  borderRadius: 10,
}}
/>
:
<Image
source={{uri: v.item.Images[0]}}
style={{
  width: 50,
  height: 50,
  resizeMode: 'contain',
  borderRadius: 10,
}}
/>




}


          <View>
            <Text
              style={{
                fontSize: 13,
                color: '#414141',

                fontFamily: 'sans-serif-normal',
                fontWeight: 'bold',
                marginLeft: 15,
              }}>
              {v.item.name}
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
 Check-In
        </Text>
      </View>

      {/* <TouchableOpacity
          onPress={() => Props.navigation.navigate('AddCheckIn')}
          activeOpacity={0.7}
          style={{
            ...styles.buttonHalfTwo1,
            
          }}>
             <Icon3
          
          name="shield-checkmark-outline"
          size={20}
          style={{
            color: Global.color,
            marginRight:10
           
          }}
        />
          <Text style={{fontSize: 18, color:Global.color,fontFamily: 'notoserif'}}>
            Add Check-In
          </Text>
        </TouchableOpacity> */}

      <FlatList
        initialNumToRender={80}
        data={All_checkIns}
        renderItem={renderItem}></FlatList>
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
  buttonHalfTwo1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    marginTop: 10,
    fontFamily: 'sans-serif-thin',
    marginLeft:'5%',
    marginBottom:15,
    flexDirection:'row'
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
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '5%',
  },
});

const mapStateToProps = state => {
  return {
    name1: state.name,
    All_Business_Nodes_newOld:state.All_Business_Nodes_newOld
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendCheciIn);
