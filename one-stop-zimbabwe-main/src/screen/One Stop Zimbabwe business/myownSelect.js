import React, { useState, useEffect } from 'react';
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
    FlatList,
    Modal
} from 'react-native';
import { get_data } from '../../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../../assets/Global_Variable';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SweetAlert from 'react-native-sweet-alert';
function MyownSelect(Props) {
    let [Filter, setFilter] = useState('')
    let [Notify, setNotify] = useState(false)
    const isFocused = useIsFocused();

    let [user, setUser] = useState()
    useEffect(() => {
        getData();
    }, [isFocused]);
    let getData = async () => {
        let user = JSON.parse(await AsyncStorage.getItem('@user_data'));


        if (user != undefined) {
            setUser(user);
        } else {

        }

    };



    let All_Business =
    Props.route.params.navigate == 'AdvertizeBusiness' ?
    Props.Relevant_Business.filter(
        e => e.name.toLowerCase().indexOf(Filter.toLowerCase()) !== -1 && e.type !== 'coustomer' 
    )
    :
    Props.Relevant_Business.filter(
        e => e.name.toLowerCase().indexOf(Filter.toLowerCase()) !== -1 &&
            Props.route.params.navigate == 'Edit_AdvertizeSelected' ? e.Profile_Type !== 'Basic' : e 
    )


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


                        Props.route.params.navigate == 'AdvertizeBusiness' ?
                           
                                Props.navigation.navigate(Props.route.params.navigate, { Business: v.item })

                            :
                            v.item.claimed ?
                                SweetAlert.showAlertWithOptions(
                                    {
                                        title: 'Already Claimed',
                                        subTitle: 'Your Business is Already Sucessfully Claimed!',
                                        confirmButtonTitle: 'OK',
                                        confirmButtonColor: '#000',
                                        otherButtonTitle: 'Cancel',
                                        otherButtonColor: '#dedede',
                                        cancellable: true,
                                        style: 'success',

                                    },
                                    callback => {
                                    },
                                )

                                :
                                v.item.claimRequestProgess ?

                                    SweetAlert.showAlertWithOptions(
                                        {
                                            title: 'Already Submit',
                                            subTitle: 'Your Request already submit yet no response from admin side if any response came you will be able to submit again request',
                                            confirmButtonTitle: 'OK',
                                            confirmButtonColor: '#000',
                                            otherButtonTitle: 'Cancel',
                                            otherButtonColor: '#dedede',
                                            cancellable: true,
                                        },
                                        callback => {
                                        },
                                    )
                                    :



                                    Props.navigation.navigate(Props.route.params.navigate, { Business: v.item })
                    }}
                    activeOpacity={0.5}
                    style={styles.card}>
                    {v.item.Images.length > 0 ?

                        <Image
                            source={{
                                uri: v.item.Images[0],
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                resizeMode: 'contain',
                                borderRadius: 10,
                            }}
                        /> :

                        <Image
                            source={{
                                uri: 'https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193060544?k=20&m=1193060544&s=612x612&w=0&h=MI8y2q1HsY4TEAZD3tNCJN3bmc39N3pnFKC2KKNDUmE=',
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                resizeMode: 'contain',
                                borderRadius: 10,
                            }}
                        />}

                    <View style={{width:'86%'}}>
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
                    Choose Business

                </Text>
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
                placeholder="Search Business here....."></TextInput>

            <FlatList
                initialNumToRender={80}
                data={All_Business}
                renderItem={renderItem}></FlatList>


            <Modal transparent={true} visible={Notify} >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(4, 4, 4, 0.474)',
                    }}>

                    <View style={{
                        width: '80%', minHeight: 170, borderRadius: 4, backgroundColor: '#fff', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{ fontSize: 20, color: Global.color, fontWeight: 'bold' }}>
                            Notification
                        </Text>


                        <Text style={{ fontSize: 12, color: 'grey', width: '70%', textAlign: 'center' }}>
                            You Can't Review Your Own Business
                        </Text>



                        <TouchableOpacity onPress={() => setNotify(false)} style={{ width: '50%', height: 40, backgroundColor: Global.color, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </Modal>
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
        Relevant_Business: state.Relevant_Business,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        get_data: () => dispatch(get_data),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyownSelect);
