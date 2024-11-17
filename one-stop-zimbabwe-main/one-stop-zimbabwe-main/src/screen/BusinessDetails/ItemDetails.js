import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {get_data} from '../../store/acion/index';
import {arr, Global, navi} from '../../assets/Global_Variable';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewMoreText from 'react-native-view-more-text';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import {Modalize} from 'react-native-modalize';
import {LogBox} from 'react-native';

function ItemDetails(Props) {
  useEffect(() => {
    LogBox.ignoreLogs(["Cannot read property 'layout' of null"]); // Ignore log notification by message
  });
  const [ModalVisible_2, setModalVisible_2] = useState(false);

  // Read More
  function renderViewMore(onPress) {
    return (
      <Text style={{color: '#000'}} onPress={onPress}>
        View more
      </Text>
    );
  }
  function renderViewLess(onPress) {
    return (
      <Text style={{color: '#000'}} onPress={onPress}>
        View less
      </Text>
    );
  }

  // // Show Image Gallery

  const images = [
    {
      uri: 'https://www.heart.org/-/media/AHA/H4GM/Article-Images/friends-dining-out.jpg',
    },
    {
      uri: 'https://c.tadst.com/gfx/750w/eat-outside-day-fun.jpg',
    },
    {
      uri: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzdCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80',
    },
  ];

  const [visible, setIsVisible] = useState(false);

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  let [tabActive, settabActive] = useState(false);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            paddingTop: 10,
            paddingLeft: 0,
          }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            style={{width: '100%', paddingLeft: 20}}>
            {arr.map((v, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={i}
                  onPress={() => setIsVisible(true)}>
                  <Image
                    key={i}
                    source={{uri: v.image}}
                    style={{
                      width: 280,
                      minHeight: 240,
                      borderRadius: 10,
                      resizeMode: 'contain',
                      marginLeft: i == 0 ? 0 : 20,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={{width: '100%', paddingLeft: 20}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 25,
                color: '#000',
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              {arr[0].title} {arr[1].title}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                color: '#000',
                fontWeight: '500',
                marginTop: 5,
              }}>
              $ 123
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                color: '#000',
                marginTop: 5,
              }}>
              {arr[0].details}
            </Text>
          </View>

          <View
            style={{
              height: 10,
              backgroundColor: 'grey',
              opacity: 0.1,
              width: '100%',
              marginTop: 20,
              elevation: 8,
            }}></View>

          <View style={{width: '100%', paddingLeft: 20}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 21,
                color: '#000',
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              50 reviews
            </Text>

            {navi.map((v, i) => {
              return (
                <View key={i} style={styles.ReviewCard}>
                  <View style={styles.header}>
                    <Image
                      style={{width: 50, height: 50, borderRadius: 50}}
                      source={{uri: v.user}}
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
                          {v.title}
                        </Text>
                        <View style={styles.elite}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: '#FFFFFF',
                              fontWeight: 'bold',
                            }}>
                            Elite '{Math.floor(Math.random() * 500)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          marginTop: 3,
                        }}>
                        <Icon name="person-outline" size={14} color="grey" />
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'grey',
                            marginLeft: 7,
                            marginRight: 7,
                          }}>
                          {Math.floor(Math.random() * 500)}
                        </Text>

                        <Icon name="star-outline" size={14} color="grey" />
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'grey',
                            marginLeft: 7,
                            marginRight: 7,
                          }}>
                          {Math.floor(Math.random() * 500)}
                        </Text>

                        <Icon name="camera-outline" size={14} color="grey" />
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'grey',
                            marginLeft: 7,
                            marginRight: 7,
                          }}>
                          {Math.floor(Math.random() * 500)}
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
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />
                    <Icon1 name="star-box" size={20} color={Global.color} />

                    <Text
                      style={{
                        fontSize: 12,
                        color: 'grey',
                        marginLeft: 7,
                        marginRight: 7,
                      }}>
                      {Math.floor(Math.random() * 12)} month ago
                    </Text>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <ViewMoreText
                      numberOfLines={3}
                      renderViewMore={renderViewMore}
                      renderViewLess={renderViewLess}
                      textStyle={{textAlign: 'justify', color: '#000'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'justify',
                          width: '100%',
                        }}>
                        A+ experience second time working with Hassan, would
                        highly recommend. Will go the extra mile to help and
                        definitely one of the best on Fiverr. A+ experience
                        second time working with Hassan, would highly recommend.
                        Will go the extra mile to help and definitely one of the
                        best on Fiverr.
                      </Text>
                    </ViewMoreText>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      borderWidth: 0.2,
                      marginBottom: 30,
                      height: 0.1,
                      backgroundColor: 'grey',
                      marginTop: 4,
                      opacity: 0.1,
                    }}></View>
                </View>
              );
            })}
          </View>
        </View>

        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          HeaderComponent={() => (
            <View>
              <View style={{...styles.nav, marginBottom: 20, marginTop: 20}}>
                <Icon
                  onPress={() => setIsVisible(false)}
                  name="chevron-back-outline"
                  size={25}
                  style={{
                    color: '#FFFFFF',
                    marginLeft: 2,
                  }}
                />
              </View>
              <View style={{...styles.header, marginLeft: '4%'}}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 10}}
                  source={{uri: arr[0].image}}
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
                      {arr[0].title}
                    </Text>
                    <View style={styles.elite}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                        }}>
                        Elite '{Math.floor(Math.random() * 500)}
                      </Text>
                    </View>
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
          FooterComponent={() => {
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
      </ScrollView>

      <Modal
        isVisible={ModalVisible_2}
        avoidKeyboard={true}
        coverScreen={true}
        animationIn={'fadeInRight'}
        animationInTiming={500}
        animationOut={'fadeOutRight'}
        animationOutTiming={500}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => setModalVisible_2(false)}>
          <View
            style={{
              backgroundColor: '#303030',
              position: 'absolute',
              bottom: '2%',
              right: '3%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '60%',
            }}>
            <Text style={styles.dropdown}>Home</Text>
            <Text style={styles.dropdown}>Cart</Text>
            <Text style={styles.dropdown}>Message</Text>
            <Text style={{...styles.dropdown, borderBottomWidth: 0}}>
              Account
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.bottomDiv}>
        <TouchableOpacity
          onPress={() => onOpen()}
          activeOpacity={0.8}
          style={styles.button}>
          <Text style={styles.buttonText}>Start Order</Text>
        </TouchableOpacity>
      </View>

      <Modalize ref={modalizeRef} modalHeight={400}>
        <View style={styles.tabs}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => settabActive(false)}
            style={{
              width: '48%',
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomColor: tabActive ? 'transparent' : Global.color,
              borderBottomWidth: tabActive ? 0 : 4,
            }}>
            <Text
              style={{fontSize: 18, color: Global.color, fontWeight: 'bold'}}>
              Takeout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => settabActive(true)}
            style={{
              width: '48%',
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomColor: tabActive ? Global.color : 'transparent',
              borderBottomWidth: tabActive ? 4 : 0,
            }}>
            <Text
              style={{fontSize: 18, color: Global.color, fontWeight: 'bold'}}>
              Delivery
            </Text>
          </TouchableOpacity>
        </View>

        {tabActive ? (
          <View style={{...styles.bottomDiv1, justifyContent: 'space-between'}}>
            <TextInput
              style={{
                ...styles.input,
              }}
              placeholder="First Name"></TextInput>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                <Text style={styles.buttonText}>Start Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{...styles.button1, marginTop: 10}}>
                <Text style={styles.buttonText1}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{...styles.bottomDiv1, justifyContent: 'space-between'}}>
            <Image
              source={require('../../assets/wellcome.png')}
              style={{
                height: 150,
                width: 150,
                marginTop: '10%',
                resizeMode: 'contain',
                // position:'absolute'
              }}
            />

            <Text
              style={{
                width: '100%',
                fontSize: 13,
                color: '#000',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: -15,
              }}>
              Takeout Address
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 12,
                color: '#000',
                textAlign: 'center',
                marginTop: -15,
              }}>
              Street no 20 uk main city
            </Text>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                <Text style={styles.buttonText}>Start Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{...styles.button1, marginTop: 10}}>
                <Text style={styles.buttonText1}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modalize>
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
    height: 60,
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
    get_data: () => dispatch(get_data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
