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
import { get_data } from '../store/acion/index';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore, { firebase } from '@react-native-firebase/firestore';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../assets/Global_Variable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddAvailibility(Props) {
    let [Availibity_form, setAvailibity_form] = useState(false)
    let [all_timings, setall_timings] = useState([])
    const isFocused = useIsFocused();
    // Start Time
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    let [start_Time, setStartTime] = useState(undefined);
    let [start_Time_Validity, setStartTime_Validity] = useState(undefined);
    // End Time 
    let [End_Time, setEndTime] = useState(undefined);
    let [End_Time_Validity, setEndTime_Validity] = useState(undefined);

    const [isTimePickerVisible1, setTimePickerVisibility1] = useState(false);
    let [user, setUser] = useState();
    let [random, setRandom] = useState(3);
    let [loadingS, setLoadingS] = useState(false)

    // Days Select Filter
    let [Places, setPlaces] = useState([
        {
            name: 'Monday',
        },
        {
            name: 'Tuesday',
        },
        {
            name: 'Wednesday',
        },
        {
            name: 'Thursday',
        }, {
            name: 'Friday',
        }, {
            name: 'Saturday',
        },
        {
            name: 'Sunday',
        },
    ]);
    let [Days, setDays] = useState(false);
    let [DaysValidation, setDaysValidation] = useState('');
    let [Filter1, setFilter1] = useState('');
    let FilterData1 = single => {
        return single.name.toLowerCase().indexOf(Filter1.toLowerCase()) !== -1;
    };
    let allDays = Places.filter(FilterData1);
    let [selectedDays, setSelectedDays] = useState([]);
    useEffect(() => {
        getData();
        setall_timings([])
        setAvailibity_form(false)
        setDays(false)
        // setLoadingS(false)
    }, [isFocused]);

    let getData = async () => {
        let user = JSON.parse(await AsyncStorage.getItem('@user_data'));


        if (user != undefined) {
            setLoadingS(true)
            setUser(user);
            firestore()
                .collection('All_Business')
                .doc(Props.route.params.uid).onSnapshot((v) => {
                    if (v.data().Availaibility !== undefined) {
                        setall_timings(v.data().Availaibility)
                    }
                    setLoadingS(false)
                })
        } else {
            Props.navigation.navigate('LoginCheckRestict');
        }

    };






    let renderItem1 = v => {
        return (
            <View
                key={v.item.id}
                style={{
                    ...styles.linkDiv,
                    backgroundColor: selectedDays.includes(v.item)
                        ? Global.color
                        : '#FFFFFF',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedDays([v.item]);
                        setDays(false);
                        setFilter1('');
                        setDaysValidation('');
                        setRandom(Math.random() * 100);
                    }}
                    activeOpacity={0.5}
                    style={styles.card}>
                    <Text
                        style={{
                            fontSize: 13,
                            color: selectedDays.includes(v.item)
                                ? '#FFFFFF'
                                : '#414141',

                            fontFamily: 'sans-serif-normal',
                            fontWeight: 'bold',
                            marginLeft: 15,
                        }}>
                        {v.item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };




    let renderItem = v => {
        // console.log(v);

        return (
            <View
                // key={}

                style={{
                    ...styles.linkDiv,
                    // backgroundColor: '#FFFFFF',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        Props.navigation.navigate('Main_tab');
                    }}
                    activeOpacity={0.5}
                    style={styles.card}>
                    <Text
                        style={{
                            width: '40%',
                            fontSize: 13,
                            color: '#414141',

                            fontFamily: 'sans-serif-normal',
                            fontWeight: 'bold',
                            // marginLeft: 15,
                        }}>
                        {v.item.selectedDays}
                    </Text>

                    <View style={{
                        width: '40%', display: 'flex', alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <Text
                            style={{
                                fontSize: 13,
                                color: '#414141',

                                fontFamily: 'sans-serif-normal',
                                fontWeight: 'bold',
                                marginLeft: 25,
                            }}>
                            {v.item.start_Time}
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: '#414141',

                                fontFamily: 'sans-serif-normal',
                                fontWeight: 'bold',
                                marginLeft: 25,
                            }}>
                            {v.item.End_Time}
                        </Text>
                    </View>
                    <Icon3
                        onPress={() => {
                            firestore()
                                .collection('All_Business')
                                .doc(Props.route.params.uid)
                                .update({
                                    Availaibility: firebase.firestore.FieldValue.arrayRemove(v.item)
                                })
                        }}
                        name="close-outline"
                        size={20}
                        style={{
                            color: '#000',
                            marginLeft: 2,
                        }}
                    />
                </TouchableOpacity>


            </View>
        );
    };



    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours <10?'0'+ hours : hours? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
    // Time Ranges


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = Time => {
        hideTimePicker();
        // setStartTime(formatTime(Time.getHours() + ':' + Time.getMinutes()));
        setStartTime(formatAMPM(Time))
    };

    // End Time


    const showTimePicker1 = () => {
        setTimePickerVisibility1(true);
        // console.log('open');
    };

    const hideTimePicker1 = () => {
        setTimePickerVisibility1(false);
    };

    const handleConfirm1 = Time => {


        setEndTime(formatAMPM(Time));
        hideTimePicker1();
    };
    let Reset_Validity = () => {
        setStartTime(undefined)
        setEndTime(undefined)
        selectedDays.length = 0
    }

    let checkValidity = () => {

        setEndTime_Validity('')
        setStartTime_Validity('')
        setDaysValidation('')
        if (start_Time == undefined || End_Time == undefined || selectedDays.length == 0) {
            if (start_Time == undefined) {
                setStartTime_Validity("* Required")
            }

            if (End_Time == undefined) {
                setEndTime_Validity("* Required")
            }


            if (selectedDays.length == 0) {
                setDaysValidation("* Required")
            }
            return
        }
        setLoadingS(true)
        let obj = {
            start_Time: start_Time,
            End_Time: End_Time,
            selectedDays: selectedDays[0].name
        }

        setAvailibity_form(false)

        firestore()
            .collection('All_Business')
            .doc(Props.route.params.uid)
            .update({
                Availaibility: firebase.firestore.FieldValue.arrayUnion(obj),
            }).then(() => {
                Reset_Validity()
                setLoadingS(false)

            })




        // setall_timings(a)


    }


    return (
        <>
            <StatusBar
                barStyle={loadingS ? "dark-content" : "light-content"}
                backgroundColor="#000"
            />

            <Modal transparent={true} visible={loadingS}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(4, 4, 4, 0.474)",
                    }}
                >
                    <Image
                        source={require("../assets/loadingS.gif")}
                        style={{ width: 150, height: 150 }}
                    />
                </View>
            </Modal>
            <View style={styles.nav1}>
                <Icon3
                    onPress={() => {
                        Props.navigation.navigate('Main_tab');
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
                     Working Hours
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => setAvailibity_form(true)}
                activeOpacity={0.7}
                style={{
                    ...styles.buttonHalfTwo1,

                }}>
                <Icon3

                    name="timer-outline"
                    size={20}
                    style={{
                        color: Global.color,
                        marginRight: 10

                    }}
                />
                <Text style={{ fontSize: 18, color: Global.color, fontFamily: 'notoserif' }}>
                    Edit Working Hours
                </Text>
            </TouchableOpacity>

            <FlatList
                initialNumToRender={80}
                data={all_timings}
                renderItem={renderItem}></FlatList>



            <Modal visible={Availibity_form} transparent={false}>

                <View style={styles.nav1}>
                    <Icon3
                        onPress={() => {
                        setAvailibity_form(false)
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
                        Days and Timing
                    </Text>
                </View>


                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setDays(true)}
                    style={styles.inputBox}>
                    {selectedDays.length > 0 ? (
                        <View style={styles.row}>
                            <Text style={{ color: 'grey', }}>
                                {selectedDays[0].name}
                            </Text>
                        </View>
                    ) : (
                        <Text
                            style={{
                                ...styles.AdvertPlaceName,
                                color: 'grey',
                            }}>
                            Select Days
                        </Text>
                    )}

                    <Icon3
                        name="chevron-down-outline"
                        size={20}
                        style={{
                            color: 'grey',
                        }}
                    />
                </TouchableOpacity>

                <Text style={{ ...styles.Validation, color: 'red' }}>
                    {DaysValidation}
                </Text>




                <Text style={{ ...styles.formHeading, fontSize: 12, marginLeft: 10 }}>
                    Select Date Range
                </Text>

                <TouchableOpacity
                    onPress={() => showTimePicker()}
                    style={{
                        ...styles.input1,
                    }}>
                    {start_Time !== undefined ? (
                        <Text style={styles.title}>
                            {start_Time}
                        </Text>
                    ) : (
                        <Text style={styles.title}>Select Start Time</Text>
                    )}
                </TouchableOpacity>

                <Text style={{ ...styles.Validation, color: 'red' }}>
                    {start_Time_Validity}
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        showTimePicker1();
                    }}
                    style={{
                        ...styles.input1,
                    }}>
                    {End_Time !== undefined ? (
                        <Text style={styles.title}>
                            {End_Time}
                        </Text>
                    ) : (
                        <Text style={styles.title}>Select End Time</Text>
                    )}
                </TouchableOpacity>

                <Text style={{ ...styles.Validation, color: 'red' }}>
                    {End_Time_Validity}
                </Text>

                <TouchableOpacity
                    onPress={() => checkValidity()}
                    activeOpacity={0.7}
                    style={{
                        ...styles.buttonHalfTwo1,

                    }}>
                    <Icon3

                        name="timer-outline"
                        size={20}
                        style={{
                            color: Global.color,
                            marginRight: 10

                        }}
                    />
                    <Text style={{ fontSize: 18, color: Global.color, fontFamily: 'notoserif' }}>
                        Add Timing
                    </Text>
                </TouchableOpacity>

            </Modal>




            <Modal visible={Days} transparent={false}>
                <View style={styles.nav1}>
                    <Icon3
                        onPress={() => {
                            setDays(false);
                            setFilter1('');
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
                        Choose Days
                    </Text>
                </View>

                <TextInput
                    placeholderTextColor={'grey'}
                    onChangeText={e => setFilter1(e)}
                    style={{
                        ...styles.input,
                    }}
                    placeholder="Search Advert Place Here"></TextInput>

                <FlatList
                    initialNumToRender={80}
                    data={allDays}
                    renderItem={renderItem1}></FlatList>
            </Modal>


            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
                locale="en_GB" // Use "en_GB" here
            />

            <DateTimePickerModal
                isVisible={isTimePickerVisible1}
                mode="time"
                onConfirm={handleConfirm1}
                onCancel={hideTimePicker1}
                locale="en_GB" // Use "en_GB" here
            />
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
        marginLeft: '5%',
        marginBottom: 15,
        flexDirection: 'row'
    },
    linkDiv: {
        width: '100%',
        // paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderBottomWidth: 1,
        borderBottomColor: 'rgba(106, 105, 105, 0.184)',
    },
    card: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: '5%',
    },
    input: {
        width: '98%',
        marginLeft: '1%',
        borderWidth: 0.3,
        borderColor: 'grey',
        marginBottom: 10,
        height: 45,
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        fontSize: 15,
        fontFamily: 'Roboto',
        color: '#000',
    },
    inputBox: {
        width: '96%',

        minHeight: 60,
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5,
        borderBottomColor: Global.color,
        borderBottomWidth: 1,
        marginLeft: '2%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    Validation: {
        width: '96%',
        textAlign: 'right',
        fontSize: 12,
    },
    input1: {
        width: '96%',
        marginLeft: '2%',

        marginBottom: 10,
        height: 50,

        marginTop: 10,
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'Roboto',
        color: 'grey',
        borderBottomColor: Global.color,
        borderBottomWidth: 1,
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Roboto',
        color: 'grey',
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAvailibility);
