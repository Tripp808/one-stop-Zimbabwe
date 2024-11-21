import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {get_data} from '../../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {arr, Global} from '../../assets/Global_Variable';

function Food(Props) {
  let [selectedArr, setSelectedArr] = useState([]);
  let [random, setRandom] = useState();

  let seletedFoo = id => {
    let a = selectedArr;

    if (a.includes(id)) {
      a = selectedArr.filter(e => e !== id);
    } else {
      a.push(id);
      a.sort(function (a, b) {
        return a - b;
      });
    }

    setRandom(Math.random() * 1000);
    setSelectedArr(a);
  };

  return (
   <View style={{flex:1}}>
     <ScrollView style={{flex: 1}}>
      <View style={styles.flex}>
        {[0, 1, 2, 3,4,5,6,7,8,9].map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => seletedFoo(v)}
              activeOpacity={0.8}
              style={{
                ...styles.addButton,
                backgroundColor: selectedArr.includes(v)
                  ? Global.linkBlueColor
                  : '#FFFFFF',
                borderWidth: selectedArr.includes(v) ? 0 : 0.5,
              }}>
              <Icon3
                color={selectedArr.includes(v) ? '#FFFFFF' : '#000'}
                name="add-outline"
                size={20}
              />
              <Text
                style={{
                  ...styles.button,
                  color: selectedArr.includes(v) ? '#FFFFFF' : '#000',
                  fontWeight: selectedArr.includes(v) ? 'bold' : '400',
                }}>
                {v}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </ScrollView>
      <TouchableOpacity activeOpacity={0.8} disabled={selectedArr.length>0?false:true} style={{...styles.button1,opacity:selectedArr.length>0?1:0.3}}>
<Text style={styles.buttonText}>
    {selectedArr.length>0?
    "Save Changes":
    "No Preferences Updates"}
</Text>


</TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '48%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 0.7,
    borderRadius: 3,
    paddingLeft: 4,
    marginTop: 5,
  },
  button: {
    fontSize: 15,
    color: 'grey',
    marginLeft: 4,
  },
  button1:{
    width:'96%',
    height:40,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:10,
    backgroundColor:Global.linkBlueColor,
    borderRadius:5,
    marginLeft:'2%'
  },
  buttonText:{
    fontSize:15,
    color:'#FFFFFF'
  }
});

const mapStateToProps = state => {
  return {
    name1: state.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);
