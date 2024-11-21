import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { get_data } from '../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../assets/Global_Variable';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from "react-native-image-viewing";

function AllRatingReviewSearch(Props) {
  const [images, setImages] = useState([]);
  const [visible, setIsVisible] = useState(false);

  let [Filter, setFilter] = useState('');
  let allReviews = Props.Relevant_Reveiws.filter(
    (e) => e.data.feedback.toLowerCase().indexOf(Filter.toLowerCase()) !== -1
  )

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
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
            position: 'absolute',
            left: 10,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'notoserif',
            marginLeft: 20,
            color: '#FFFFFF',
          }}>
          Review
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Props.navigation.navigate('BusinessSelect', { navigate: 'Rating' })}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'notoserif',
              marginRight: 10,
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}>
            Write a Review
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholderTextColor={'grey'}
        onChangeText={e => setFilter(e)}
        style={{
          ...styles.input,
          width: '98%',
          marginLeft: '1%',
          borderWidth: 0.3,
          borderColor: 'grey',
          marginBottom: 10,
        }}
        placeholder="Search Within Review"></TextInput>

      <ScrollView style={{ flex: 1 }}>
        {allReviews.map((v, i) => {
          return (
            <View key={i} style={{ ...styles.ReviewCard, marginLeft: 15 }}>
              <View style={styles.header}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  source={{ uri: v.data.User_Dp }}
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
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#000',
                      }}>
                      {v.data.name}
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


                    <Icon3 name="star-outline" size={14} color="grey" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'grey',
                        marginLeft: 7,
                        marginRight: 7,
                      }}>
                      {v.data.Given_Reviews_no}
                    </Text>


                  </View>
                </View>

              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                {[0, 1, 2, 3, 4].map((vi, i) => {
                  rating = Math.floor(v.data.Rating)
                  if (i < rating) {
                    return (

                      <Icon1 name="star-box" size={20} color={Global.color} />

                    )

                  }
                  else {
                    return (

                      <Icon1 name="star-box" size={20} color={'#DDDDDD'} />

                    )
                  }
                })}
                <Text
                  style={{
                    fontSize: 12,
                    color: 'grey',
                    marginLeft: 7,
                    marginRight: 7,
                  }}>
                  {v.data.time}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                {/* <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={renderViewMore}
                  renderViewLess={renderViewLess}
                  textStyle={{ textAlign: 'justify', color: '#000' }}> */}
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    width: '98%',
                    color: '#000',
                    marginLeft: 2
                  }}>
                  {v.data.feedback}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>

              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}
                style={{ width: '100%', marginTop: 7, marginBottom: 7 }}>
                {v.data.Images.map((v, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={i}
                    onPress={() => {
                      setImages([{ uri: v }]);
                              setIsVisible(true);
                    }}
                    >
                      <Image
                        key={i}
                        source={{ uri: v }}
                        style={{
                          width: 90,
                          minHeight: 90,
                          borderRadius: 3,
                          resizeMode: 'cover',
                          marginLeft: i == 0 ? 0 : 5,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.2,
                  marginBottom: 10,
                  height: 0.1,
                  backgroundColor: 'grey',
                  marginTop: 4,
                  opacity: 0.1,
                }}></View>
            </View>
          );
        })}
      </ScrollView>


      <ImageView images={images} imageIndex={0} visible={visible}  onRequestClose={() => setIsVisible(false)} />

    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 55,
    paddingLeft: 15,
    elevation: 4,
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // paddingBottom:10
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
  },
  imageContent: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  nav1: {
    width: '100%',
    height: 60,
    paddingLeft: '5%',
    elevation: 5,
    backgroundColor: Global.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  },

  ReviewCard: {
    width: '95%',
    minHeight: 100,
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
});

const mapStateToProps = state => {
  return {
    name1: state.name,
    Relevant_Reveiws: state.Relevant_Reveiws
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    get_data: () => dispatch(get_data),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllRatingReviewSearch);
