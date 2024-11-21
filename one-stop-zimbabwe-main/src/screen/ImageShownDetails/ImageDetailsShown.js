import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {arr, Global, navi} from '../../assets/Global_Variable';

function ImageDetailsShown(Props) {


  return (
    <>
      <View style={{flex: 1,marginTop:-100}}>
        <ImageViewer
          imageUrls={arr}
          renderIndicator={() => <></>}
          renderHeader={(e) => (
            <View style={{position:'absolute',top:100}}>
              {console.log(e)}
              <View style={{...styles.header, marginLeft: '4%'}}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 10}}
                  source={{uri: arr[e].user}}
                />

                <View style={styles.imageContent}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: 13, fontWeight: 'bold', color: '#FFFFFF'}}>
                      {arr[e].title}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginTop: 3,
                    }}>
                    <Icon name="person-outline" size={14} color="#fff" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#FFFFFF',
                        marginLeft: 7,
                        marginRight: 7,
                      }}>
                      {Math.floor(Math.random() * 500)}
                    </Text>

                    <Icon name="star-outline" size={14} color="#fff" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#FFFFFF',
                        marginLeft: 7,
                        marginRight: 7,
                      }}>
                      {Math.floor(Math.random() * 500)}
                    </Text>

                    <Icon name="camera-outline" size={14} color="#fff" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#FFFFFF',
                        marginLeft: 7,
                        marginRight: 7,
                      }}>
                      {Math.floor(Math.random() * 500)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          // footerContainerStyle={{position:'absolute',bottom:20}}
          renderFooter={() => {
            return (
              <View>
                <View
                  style={{
                    ...styles.nav,
                    marginBottom: 20,
                    marginTop: 20,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginLeft: '4%',
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: 'bold', color: '#FFFFFF'}}>
                    {arr[0].title}
                  </Text>

                  <Text
                    style={{fontSize: 13, fontWeight: '500', color: 'grey'}}>
                    {Math.floor(Math.random() * 12)} Month Ago
                  </Text>
                </View>
                <View
                  style={{
                    width: '98%',
                    borderWidth: 1,
                    marginBottom: 5,
                    height: 1,
                    backgroundColor: '#FFFFFF',
                    marginTop: 4,
                    opacity: 0.3,
                    marginLeft: '1%',
                  }}></View>

                <View style={styles.like}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setModalVisible_2(true)}>
                    <Icon
                      name="ellipsis-horizontal-outline"
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8}>
                    <Icon
                      name="thumbs-up-outline"
                      size={20}
                      color="#fff"
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 12,
                      color: '#FFFFFF',
                      marginLeft: 7,
                      marginRight: 7,
                    }}>
                    {Math.floor(Math.random() * 500)} Likes
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ReviewCard: {
    width: '95%',
    minHeight: 100,
  },
  input: {
    height: 45,
    width: '90%',
    borderWidth: 1.2,
    borderColor: '#8B8C8E',
    borderRadius: 5,
    marginTop: 15,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 70,
  },
  imageContent: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  elite: {
    backgroundColor: Global.color,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  nav: {
    width: '100%',
    height: 20,
    paddingLeft: '2%',
    elevation: 5,
    // backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  like: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 6,
  },
  dropdown: {
    fontSize: 17,
    fontFamily: 'sans-serif',
    fontWeight: '900',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    padding: 10,
    color: '#FFFFFF',
  },
  bottomDiv: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    elevation: 9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomDiv1: {
    width: '100%',
    height: 350,
    // backgroundColor:'#000',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    paddingBottom: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  button1: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 7,
  },
  buttonText1: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Roboto',
  },
  tabs: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = state => {
  return {
    name1: state.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    // get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetailsShown);
