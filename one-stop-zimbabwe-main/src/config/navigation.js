import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import WellCome from '../screen/welcome';
import Enablelocation from '../screen/EnableLocation';
import AppNavigation_2 from './Tab_navigation';
import LoginChekScree from '../screen/LoginChekScree';
import signup from '../screen/signup';
import Login from '../screen/Login';
import Forgotpassword from '../screen/forgotPassword';
import BusinessDetailsMail from '../screen/BusinessDetails/Business_details_Main';
import Categories from '../screen/catagores_SubCatagories';
import collectionDetails from '../screen/collectionDetails';
import SplashScreen from '../screen/splashscreen';
import ImageDetailsMain from '../screen/ImageShownDetails/ImageDetailsMain';
import BusinessAllDetails from '../screen/BusinessDetailsAllOnePage';
import mapViewing from '../screen/mapView';
import RatingComponent from '../screen/Rating';
import AllRatingsHistory_Search from '../screen/AllRatingsHistory_Search';
import AskQuestion from '../screen/CommunityAskQuestion';
import StoryShow from '../screen/Story';
import Tips from '../screen/Tips';
import Profile from '../screen/Profile';
import EmailSendConfirmation from '../screen/EmailSendConfirmation';
import prefrences from '../screen/Sub Profile Screens/prefrences';
import CheckInME from '../screen/Sub Profile Screens/CheckIn';
import Search from '../screen/Search';
import AddCheckIn from '../screen/Sub Profile Screens/addCheckin';
import AddCheckInForm from '../screen/Sub Profile Screens/addCheckinForm';
import FriendCheciIn from '../screen/Sub Profile Screens/FriendcheckIn';
import EventsShow from '../screen/Events/event';
import EventDetails from '../screen/Events/eventDetails';
import AddChat from '../screen/Chats/Add chats';
import ChatsUserShow from '../screen/Chats/ChatUserShow';
import AddEventsForm from '../screen/Events/AddEvent';
import SubChat from '../screen/Chats/subchat';
import EventsHistory from '../screen/Events/EventsHistory';
import AddAvailibility from '../screen/Add availability';
import BusinessSelect from '../screen/BusinessSelect';
import Edit_Business from '../screen/Edit_Business';
import GernelProfile from '../screen/Gernel Profile';
import Setting from '../screen/setting';
import Addbusiness from '../screen/AddBusiness';
import AddCoustomer from '../screen/Add Business Client/AddCoustomer';
import AddBusiness from '../screen/Add Business Client/AddBusiness';
import AddSameCoustomer from '../screen/Add Business Client/AddSameCoustomer';
import OneStopBusiness from '../screen/One Stop Zimbabwe business/index';
import AdvertizeBusiness from '../screen/One Stop Zimbabwe business/advertizmentBusinessAdd';
import AdvertizmentEvent from '../screen/One Stop Zimbabwe business/advertizmentEventAdd ';
import ClaimYourListing from '../screen/One Stop Zimbabwe business/ClaimYourListing';
import Support from '../screen/support';
import MyownSelect from '../screen/One Stop Zimbabwe business/myownSelect';
import TermConditions from '../screen/Term-Condition_Privacy-policy/termCondition';
import PrivacyPolicy from '../screen/Term-Condition_Privacy-policy/privacypolicy';
import Edit_AdvertizeSelected from '../screen/One Stop Zimbabwe business/Edit_AdvertizeSelected';
import EditEventForm from '../screen/Events/EditEvent';
import Support_Form from '../screen/Support Form';
import Faq from '../screen/Faq/faq'
const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>



        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="WellCome"
          component={WellCome}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Signup"
          component={signup}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="EmailSendConfirmation"
          component={EmailSendConfirmation}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Verified"
          component={EmailSendConfirmation}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Main_tab"
          component={AppNavigation_2}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="BusinessDetails"
          component={BusinessDetailsMail}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="categories"
          component={Categories}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="EnableLocation"
          component={Enablelocation}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Forgotpassword"
          component={Forgotpassword}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="LoginCheckRestict"
          component={LoginChekScree}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="collectionDetails"
          component={collectionDetails}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="ImageDetailsMain"
          component={ImageDetailsMain}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        {/* Back Business Details */}
        <Stack.Screen
          name="BusinessAllDetails"
          component={BusinessAllDetails}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="MapView"
          component={mapViewing}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AllRatingsHistory_Search"
          component={AllRatingsHistory_Search}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AskQuestion"
          component={AskQuestion}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Support_Form"
          component={Support_Form}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />


        <Stack.Screen
          name="StoryShow"
          component={StoryShow}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Tips"
          component={Tips}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Search1"
          component={Search}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="prefrences"
          component={prefrences}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="PRofile"
          component={Profile}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Rating"
          component={RatingComponent}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="CheckIn"
          component={CheckInME}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AddCheckIn"
          component={AddCheckIn}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="AddCheckInForm"
          component={AddCheckInForm}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="FriendCheciIn"
          component={FriendCheciIn}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AddEventsForm"
          component={AddEventsForm}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="EventsHistory"
          component={EventsHistory}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="EventsShow"
          component={EventsShow}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="SubChat"
          component={SubChat}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AddChat"
          component={AddChat}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="ChatsUserShow"
          component={ChatsUserShow}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AddAvailibility"
          component={AddAvailibility}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="BusinessSelect"
          component={BusinessSelect}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />



        <Stack.Screen
          name="Edit_Business"
          component={Edit_Business}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />




        <Stack.Screen
          name="GernelProfile"
          component={GernelProfile}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />



        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Addbusiness"
          component={Addbusiness}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AddCoustomer"
          component={AddCoustomer}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AddSameCoustomer"
          component={AddSameCoustomer}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />




        <Stack.Screen
          name="AddBusiness"
          component={AddBusiness}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />



        <Stack.Screen
          name="OneStopBusiness"
          component={OneStopBusiness}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />


        <Stack.Screen
          name="AdvertizmentEvent"
          component={AdvertizmentEvent}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="AdvertizeBusiness"
          component={AdvertizeBusiness}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />




        <Stack.Screen
          name="ClaimYourListing"
          component={ClaimYourListing}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />



        <Stack.Screen
          name="SupportUs"
          component={Support}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />



        <Stack.Screen
          name="MyownSelect"
          component={MyownSelect}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />




        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="TermConditions"
          component={TermConditions}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Edit_AdvertizeSelected"
          component={Edit_AdvertizeSelected}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />


        <Stack.Screen
          name="EditEventForm"
          component={EditEventForm}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
