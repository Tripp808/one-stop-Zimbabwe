import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {Global} from '../assets/Global_Variable';
import Icon3 from 'react-native-vector-icons/Ionicons';

function AskQuestion(Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // console.log(Props.route.params.id);

  return (
    <>
      <View
        style={{
          ...styles.nav,
          backgroundColor: Global.color,
        }}>
        <Icon3
          onPress={() => Props.navigation.goBack()}
          name="chevron-back-outline"
          size={25}
          style={{
            color: '#FFFFFF',
            position: 'absolute',
            top: 20,
            left: 10,
          }}
        />

        <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: 'bold'}}>
          Ask a Question
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 390,
          marginVertical: 120,
        }}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: '400'}}>
          Have Any Question Ask Us Freely
        </Text>

        <TextInput
          // onChangeText={e => setFeedback(e)}
          placeholderTextColor="grey"
          style={{
            width: '80%',
            height: 130,
            borderColor: '#000',
            borderWidth: 0.5,
            // textAlign: 'left',
            textAlignVertical: 'top',
            color: '#000',
            borderRadius: 5,
            padding: 10,
            marginTop: 20,
          }}
          multiline
          placeholder="Type your Detailed Question here...."></TextInput>

        <Text
          style={{
            fontSize: 11,
            color: 'red',
            width: '80%',
            textAlign: 'left',
            paddingVertical: 10,
          }}>
          {/* {FeedbackVali} */}
        </Text>


        <TouchableOpacity
          onPress={() => {
            // AddFavME();
          }}
          activeOpacity={0.6}
          style={styles.button}>
          <Text style={styles.ButtonText}>Post Question</Text>
        </TouchableOpacity>


        
        <View style={styles.button1}>
          <Text style={{color: '#000', fontSize: 12, fontWeight: '400',marginLeft:5}}>
            Notify Me About Feature Answers
          </Text>

          <Switch
          
            trackColor={{false: 'grey', true: Global.color}}
            thumbColor={'grey'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 70,
    // backgroundColor:'red',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Global.color,
    borderRadius: 4,
    height: 40,
  },

  button1: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: Global.color,
    borderRadius: 4,
    height: 40,

    marginBottom: 10,
    flexDirection: 'row',
    padding: 0,
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
});

export default AskQuestion;
