import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar, Text, Image } from 'react-native';
import { get_data } from '../../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../../assets/Global_Variable';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


function PrivacyPolicy(Props) {
    return (
        <>
            <StatusBar
                // translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />

            <View
                style={{
                    ...styles.nav,
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

                <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}>
                    Privacy Policy
                </Text>





            </View>


            <ScrollView>

                <View style={styles.allContent}>


                    <Text style={styles.para}>
                        This Privacy Policy describes our policies on the collection, use, and disclosure of information about you in connection with your use of our services, including those offered through our websites, communications (e.g., emails, phone calls, and texts), and mobile applications (collectively, the “Service”). The terms “we”, “us”, and <Text style={{ fontWeight: 'bold' }}>
                            “OneStop Zim”</Text> refer to: {"\n"}(i) OneStop Zim., a Zimbabwean registered company with its headquarters in Harare, or{"\n"}(ii)OneStop Zim., a limited liability company established and resident under the laws of the Zimbabwe. When you use the Service, you consent to our collection, use, and disclosure of information about you as described in this Privacy Policy. We may translate this Privacy Policy into other languages for your convenience.
                    </Text>

                    <Text style={styles.subheading}>
                        INFORMATION WE COLLECT AND HOW WE USE IT
                    </Text>



                    <Text style={styles.para}>
                        We may collect, transmit, and store information about you in connection with your use of the Service, including any information you send to or through the Service. We use that information to provide the Service’s functionality, fulfill your requests, improve the Service’s quality, engage in research and analysis relating to the Service, personalize your experience, track usage of the Service, provide feedback to third party businesses that are listed on the Service, display relevant advertising, market the Service, provide customer support, message you, back up our systems, allow for disaster recovery, enhance the security of the Service, and comply with legal obligations. Even when we do not retain such information, it still must be transmitted to our servers initially and stored long enough to process.
                    </Text>


                    <Text style={styles.subheading2}>
                        A.	Account Information:
                    </Text>


                    <Text style={styles.subpara}>
                        When you create a OneStop Zim account, we store and use the information you provide during that process, such as the first and last name you enter, email address, post code, physical address, and any other information you may provide during the account creation process, such as a gender, phone number, or birth date. We may publicly display the first name and last initial that you provide, as well as any photo or other content you submit through the account creation process, as part of your account profile. We also store and use any preferences you provide to personalize your user experience, including dining and activity preferences. You can later modify some of the account information you provide through your account settings. If you believe that someone has created an unauthorized account using your personal information, you can request its removal by flagging it.
                    </Text>







                    <Text style={styles.subheading2}>
                        B.	Public Content:
                    </Text>


                    <Text style={styles.subpara}>
                        Your contributions to the Service are intended for public consumption and are therefore viewable by the public, including your photos, ratings, reviews, tips, lists, bookmarks and collections, compliments, Ask the Community posts, OneStop Zim Talk posts, and edits to business page information. Your account profile (e.g., first name, last initial, city, neighborhood, the month and year you created your OneStop Zim account, profile photos and list of friends on OneStop Zim) is also intended for public consumption, as is some of your other activity through the Service, like how you vote on other people’s contributions (e.g., useful, funny, cool, helpful, or not helpful), which contributions you like, where you check-in (including when friends on OneStop Zim tag you in their own check-ins), which contributions or users you follow, and which businesses you follow. You can limit the public visibility of some of these activities through your account settings.
                    </Text>










                    <Text style={styles.subheading2}>
                        C.	Contacts:
                    </Text>


                    <Text style={styles.subpara}>
                        You can invite others to join or become your friend on OneStop Zim by providing us with their contact information, or by allowing us to access contacts from your computer, mobile device, or third party sites to select which individuals you want to invite. If you allow us to access your contacts, we will transmit information about your contacts to our servers long enough to process your invitations or friend requests.
                    </Text>








                    <Text style={styles.subheading2}>
                        D.	Communications:
                    </Text>


                    <Text style={styles.subpara}>
                        When you sign up for an account or use certain features, you are opting to receive messages from other users, businesses, and OneStop Zim. You can manage some of your messaging preferences through your account settings, but note that you cannot opt out of receiving certain administrative, transactional, or legal messages from OneStop Zim. For example, if you make a reservation, order food, place yourself on a waitlist, or request a quote or otherwise contact a business through the Service, we, or the business you are interacting with through OneStop Zim, may send you messages about your transaction using any contact information you provide, including through SMS to your phone number. We may also track your actions in response to the messages you receive from us or through the Service, such as whether you deleted, opened, or forwarded such messages, and share that information with other parties to your messages (for example, to let them know if you have viewed their message). When a user requests a quote or similar information from one or more businesses through the Service, in addition to the request, we may disclose to those businesses information about the status of the user’s requests, such as whether any business has responded to the request, the type of response provided (for example, whether the user received a quote or a request for more information), and whether the user has responded to any business’s reply. If a business elects to share its availability or schedule with users through the Service, that information may be used for the purpose of determining availability and/or scheduling appointments. If you exchange messages with others through the Service, we may store them in order to process and deliver them, allow you to manage them, and we may review and disclose them in connection with investigations related to use of the Service, as well as our efforts to improve the Service. We may not deliver messages that we believe are objectionable, such as spam messages, fraudulent solicitations, or requests to post, exchange, or remove reviews for compensation. If you send or receive messages through the Service via SMS, we may log phone numbers, phone carriers, and the date and time that any messages were processed. Carrier message and data rates may apply. We may also store information that you provide through communications with us, including from phone calls, letters, emails and other electronic messages, or in person. Any of our communications with you, including any phone calls, may be monitored and recorded for quality purposes. If you are a representative of a business listed on OneStop Zim, or use a phone number associated now or previously with such a business, we may contact you, including by phone or email, using the contact information you provide us, make publicly available, or that we have on record for your business.
                    </Text>










                    <Text style={styles.subheading2}>
                        E.	Transactions:
                    </Text>


                    <Text style={styles.subpara}>
                        If you initiate a transaction through the Service, such as making a reservation, joining a waitlist, making an appointment, or making a purchase, we will collect and store information you provide associated with your transaction, such as your name, phone number, address, email, and payment information, as well as any other information you provide relating to the transaction or request, in order to process your transaction, send you communications related to the transaction, and to facilitate future transactions. We may also use aggregated or anonymized  information regarding those transactions for analytics purposes and to improve OneStop Zim’s services. This information may be shared with third parties, and third parties may share such information with us, for the same purposes. When you submit credit card numbers and other sensitive payment information, that information is encrypted using industry standard technology. If you write reviews about businesses with which you transact through the Service, we may publicly display the fact that you transacted with those businesses in connection with such reviews. For example, if you make a dining reservation through the Service and later write a review about your dining experience, we may publicly display the fact that you made your reservation through the Service in connection with that review.
                    </Text>





                    <Text style={styles.subheading2}>
                        F.	Activity:
                    </Text>


                    <Text style={styles.subpara}>
                        We store information about your use of the Service, such as your search activity, the pages you view, the date and time of your visits, businesses you call using our mobile applications, and reservations, purchases, or transactions you make through the Service. We also store information that your computer or mobile device may provide to us in connection with your use of the Service, such as your browser type, type of computer or mobile device, browser language, IP address, WiFi information such as SSID, mobile carrier, phone number, unique device identifier, advertising identifier, location (including geolocation, beacon based location, and GPS location), and requested and referring URLs and mobile applications. We may also receive and store your location whenever our mobile applications are running, including when running in the background, if you enable our mobile apps to access such information in the course of using the Service. You may be able to limit or disallow our use of certain data through your device or browser settings, for example you may be able to limit or disallow our collection, use or sharing of location data or mobile advertising identifiers by adjusting the settings for our applications in iOS or Android privacy settings
                    </Text>





                    <Text style={styles.subheading2}>
                        G.	Different Devices
                    </Text>


                    <Text style={styles.subpara}>
                        You may access the Service through different devices (e.g., your mobile phone, personal computer, or other internet connected device) and different platforms (e.g., through the OneStop Zim website or OneStop Zim mobile apps). The information that we collect and store through those different uses may be cross-referenced and combined, and your contributions through one OneStop Zim platform will typically be similarly visible and accessible through all other OneStop Zim platforms.
                    </Text>






                    <Text style={styles.subheading2}>
                        H.	Professional Information
                    </Text>


                    <Text style={styles.subpara}>
                        If you represent a business on OneStop Zim, we may collect and display information about you related to your business activities, such as a business name that may incorporate your individual name, or a publicly available business address that is also used as a home address. We will also collect and display information about your professional background that you choose to share with us through the Service, such as information about your professional licenses or certifications, or your professional history or specialties.
                    </Text>






                    <Text style={styles.subheading2}>
                        I.	Sensitive Personal Information
                    </Text>


                    <Text style={styles.subpara}>
                        Service, you may choose to allow OneStop Zim to collect and store sensitive personal information about you, such as your precise geolocation. You may choose to share other sensitive personal information through the content you share on OneStop Zim, for example, when leaving a review, sending a direct message, or otherwise sharing information on OneStop Zim. You may be able to limit or disallow our collection, use or sharing of location data by adjusting the settings for our applications in iOS or Android privacy settings. You can remove content that may include sensitive personal information through your account settings.

                    </Text>



                    <Text style={styles.heading}>
                        COOKIES
                    </Text>

                    <Text style={styles.para}>
                        We, and our third-party service providers, may use cookies, web beacons, tags, scripts, local shared objects such as HTML5 and Flash (sometimes called “flash cookies”), advertising identifiers (including mobile identifiers such as Apple’s Identifier for Advertisers (“IDFA”) or Google’s Advertising ID (“GAID”)) and similar technology (“Cookies”) in connection with your use of the Service, third party websites, and mobile applications. Cookies may contain unique identifiers, and reside, among other places, on your computer or mobile device, in emails we send to you, and on our web pages. Cookies may transmit information about you and your use of the Service, such as your browser type, search preferences, IP address, data relating to advertisements that have been displayed to you or that you have interacted with, and the date and time of your use. Cookies may be persistent or stored only during an individual session.
                        Manage cookies

                    </Text>


                    {/* HAve to add table  */}

                    <Text style={styles.para}>
                        The purposes for which we use Cookies in the Service include:
                    </Text>

                    <View style={styles.outerbox}>

                        <View style={styles.rows}>
                            <View style={styles.leftPortion}>
                                <Text style={styles.subheading2}>
                                    Purpose
                                </Text>
                            </View>


                            <View style={styles.RightPortion}>
                                <Text style={styles.subheading2}>
                                    Explanation
                                </Text>
                            </View>
                        </View>






                        <View style={styles.rows}>
                            <View style={styles.leftPortion}>
                                <Text style={styles.para}>
                                    Processes
                                </Text>
                            </View>


                            <View style={styles.RightPortion}>
                                <Text style={styles.para}>
                                    Intended to make the Service work in the way you expect. For example, we use a Cookie that tells us whether you have already signed up for an account.
                                </Text>
                            </View>
                        </View>


                        <View style={styles.rows}>
                            <View style={styles.leftPortion}>
                                <Text style={{ ...styles.para, textAlign: 'left' }}>
                                    Authentication, Security and Compliance
                                </Text>
                            </View>


                            <View style={styles.RightPortion}>
                                <Text style={styles.para}>
                                    Intended to prevent fraud, protect your data from unauthorized parties, and comply with legal requirements. For example, we use Cookies to determine if you are logged in.
                                </Text>
                            </View>
                        </View>



                        <View style={styles.rows}>
                            <View style={styles.leftPortion}>
                                <Text style={{ ...styles.para, textAlign: 'left' }}>
                                    Preferences
                                </Text>
                            </View>


                            <View style={styles.RightPortion}>
                                <Text style={styles.para}>
                                    Intended to remember information about how you prefer the Service to behave and look. For example, we use a Cookie that tells us whether you have declined to allow us to send push notifications to your phone.
                                </Text>
                            </View>
                        </View>




                        <View style={styles.rows}>
                            <View style={styles.leftPortion}>
                                <Text style={{ ...styles.para, textAlign: 'left' }}>
                                    Notifications
                                </Text>
                            </View>


                            <View style={styles.RightPortion}>
                                <Text style={styles.para}>
                                    Intended to allow or prevent notices of information or options that we think could improve your use of the Service. For example, we use a Cookie that stops us from showing you the signup notification if you have already seen it.
                                </Text>
                            </View>
                        </View>





                        <View style={styles.rows}>
                            <View style={styles.leftPortion}>
                                <Text style={{ ...styles.para, textAlign: 'left' }}>
                                    Advertising
                                </Text>
                            </View>


                            <View style={styles.RightPortion}>
                                <Text style={styles.para}>
                                    Intended to make advertising more relevant to users and more valuable to advertisers. For example, we may use Cookies to serve you interest-based ads, such as ads that are displayed to you based on your visits to other websites, or to tell us if you have recently interacted with an ad.
                                </Text>
                            </View>
                        </View>




                        <View style={styles.rows}>
                            <View style={styles.leftPortion}>
                                <Text style={{ ...styles.para, textAlign: 'left' }}>
                                    Analytics
                                </Text>
                            </View>


                            <View style={styles.RightPortion}>
                                <Text style={styles.para}>
                                    Intended to help us understand how visitors use the Service. For example, we use a Cookie that tells us how our search suggestions correlate to your interactions with the search page.
                                </Text>
                            </View>
                        </View>



                    </View>



                    <Text style={styles.para}>
                        You can also set some Cookie preferences through your device or browser settings, but doing so may affect the functionality of the Service. The method for disabling Cookies may vary by device and browser, but can usually be found in your device or browser preferences or security settings. For example, iOS and Android devices each have settings which are designed to limit forms of ad tracking. Please note that changing any of these settings does not prevent the display of certain advertisements to you.
                    </Text>




                    <Text style={styles.heading}>
                        THIRD PARTIES
                    </Text>

                    <Text style={styles.para}>
                        Third parties may share, receive or process information about you as follows:
                    </Text>

                    <Text style={styles.subheading2}>
                        A.	Advertisers
                    </Text>



                    <Text style={styles.subpara}>
                        We may share some non-identifiable, de-identified or aggregated information from or about you with third parties in connection with advertising programs and data analytics. We also share certain information described below with businesses on OneStop Zim, who may or may not be advertisers.
                    </Text>







                    <Text style={styles.subheading2}>
                        B.	Content and Data Partners: :
                    </Text>


                    <Text style={styles.subpara}>
                        We allow third party partners to use and display some of the public content available through the Service, such as your photos, reviews, and other information listed under “Public Content” in Section 1 above.
                    </Text>










                    <Text style={styles.subheading2}>
                        C.	Acquired Data:
                    </Text>


                    <Text style={styles.subpara}>
                        OneStop Zim may acquire information enabling us to identify and contact representatives of local businesses from third parties. Such acquired data may be combined with other data OneStop Zim receives from or about you, and used for the purposes described in Section 1 of this Privacy Policy
                    </Text>








                    <Text style={styles.subheading2}>
                        D.	OneStop Zim’s Service Providers:
                    </Text>


                    <Text style={styles.subpara}>
                        We rely on third-party service providers to support or provide services for us in connection with your use of the Service, such as food delivery services, communications and hosting, security and fraud prevention, technical and customer support, tracking and reporting usage of the Service, quality assurance testing, payment processing, marketing, and other functions. We share information from or about you with these third party providers so that they can perform their services or complete your requests. For example, we may share your advertising identifiers (e.g., your IDFA, GAID, or a cryptographic hash of your email address) with third party service providers that help us facilitate OneStop Zim’s advertising programs and measure and report their effectiveness, including with third parties that help determine the efficacy of OneStop Zim’s advertising programs by combining information they receive about you from other sources than the Service. OneStop Zim shares personal information with its service providers subject to obligations consistent with this Privacy Policy, and on the condition that personal information is only used on OneStop Zim’s behalf and pursuant to our instructions. You may be able to limit our access to some of this information through your mobile device settings, as described in Section 2 above, or through the Service’s settings. OneStop Zim’s third party service providers may likewise share information with us that they obtain from or about you in connection with providing their services or completing your requests.
                    </Text>










                    <Text style={styles.subheading2}>
                        E.	OneStop Zim’s role as a Service Provider
                    </Text>


                    <Text style={styles.subpara}>
                        Zimbabwe collects, receives and processes certain information about you on behalf of businesses for which OneStop Zim is acting as a service provider. For example, when you make a restaurant reservation or join the waitlist through OneStop Zim, we collect your phone number, email address and reservation details on behalf of the business, and share that information with the business. OneStop Zim does not share information collected or received by OneStop Zim outside of its role as a service provider with the business or other third parties, unless otherwise disclosed in this Privacy Policy, or at your direction. Third parties may also share information about you with OneStop Zim in order for OneStop Zim to provide services to them. For example, OneStop Zim may receive information about you for the purposes of targeting advertising, to measure ad performance, or to facilitate links to restaurant loyalty programs or point of sale systems. Third parties’ collection, use and disclosure of your information is subject to such third party’s own privacy policy and any relevant terms.
                    </Text>





                    <Text style={styles.subheading2}>
                        F.	Aggregate or Anonymous Information:
                    </Text>


                    <Text style={styles.subpara}>
                        We share user information in the aggregate with third parties, such as businesses that are listed on OneStop Zim and content distributors. For example, we disclose the number of users that have been exposed to or interacted with advertisements, or that we estimate visited the physical location of a particular business.
                    </Text>





                    <Text style={styles.subheading2}>
                        G.	Business Transfers
                    </Text>


                    <Text style={styles.subpara}>
                        : We share information from or about you with our parent companies, subsidiaries, joint ventures, or other companies under common control, and require them to also honor this Privacy Policy. If another company acquires OneStop Zim, or all or substantially all our assets, that company will possess the same information, and will collect, use, and disclose the information only as described in this Privacy Policy.
                    </Text>






                    <Text style={styles.subheading2}>
                        H.	Businesses on OneStop Zim:
                    </Text>


                    <Text style={styles.subpara}>
                        We may share information from or about you (such as your city, and if you provide it, your age and gender), your device type, and your use of the Service (such as which businesses you bookmark or call, or if you visit a business’s URL) with businesses on OneStop Zim. You may adjust your account settings to increase or decrease the amount of information we share. Keep in mind that businesses can also view your public activity and posts, and may receive information from or about you when you transact or communicate with them, through OneStop Zim or otherwise, regardless of your settings (see Section 1 above). Additionally, if you make a phone call to a business through or in connection with your use of the Service, we may share information about your call with the business that the business would have received had you called them directly, such as the date and time of your call and your phone number. You may be able to limit our ability to collect and share your phone number through your phone settings or phone service provider.
                    </Text>






                    <Text style={styles.subheading2}>
                        I.	Investigations and Legal Disclosures:
                    </Text>


                    <Text style={styles.subpara}>
                        We may investigate and disclose information from or about you if we have a good faith belief that such investigation or disclosure: (a) is reasonably necessary to comply with legal or law enforcement processes, such as a search warrant, subpoena, statute, judicial proceeding, or other legal process or law enforcement request; (b) is helpful to prevent, investigate, or identify possible wrongdoing in connection with the Service; or (c) protects our rights, reputation, property, or that of our users, affiliates, or the public, such as disclosures in connection with OneStop Zim’s Consumer Alerts program. If you flag or otherwise complain to us about content through the Service, we may share the substance of your complaint with the contributor of that content in order to provide an opportunity for the contributor to respond.

                    </Text>






                    <Text style={styles.subheading2}>
                        J.	Links:
                    </Text>


                    <Text style={styles.subpara}>
                        The Service may link to third party-controlled websites, like a business’s URL. Except as set forth herein, we do not share your personal information with them, and are not responsible for their privacy practices.

                    </Text>










                    <Text style={styles.subheading2}>
                        K.	Interaction With Third-Party Platforms:
                    </Text>


                    <Text style={styles.subpara}>
                        If you sign up for, or log into, OneStop Zim using a third-party platform like Facebook or Google, or link your OneStop Zim account with a third-party platform like Facebook, Instagram or Twitter, we may receive information about you from such third-party platform. If you post content to a third-party platform through the Service, that third-party platform will also receive that content, which will be visible to anyone that has access to it through that third-party platform. Some of our web pages utilize framing techniques to serve content to you from third-party platforms, while preserving the look and feel of the Service. In such cases, please note that the information you provide may be transmitted directly to the identified third party. If you interact with businesses through OneStop Zim, they will receive whatever information you choose to share with them, for example contact information you share through quote requests or direct messages to the business, or your phone number if you call the business. OneStop Zim may share information with third parties where you direct OneStop Zim to do so through the Service.



                    </Text>




                    <Text style={styles.heading}>
                        CONTROLLING YOUR PERSONAL DATA
                    </Text>

                    <Text style={styles.para}>
                        Other users may be able to identify you, or associate you with your account, if you include personal information in the content you post publicly. You can reduce the risk of being personally identified by using the Service pseudonymously, though doing so could detract from the credibility of your contributions to the Service. OneStop Zim users can also use the Find Friends feature to find one another based on their names or email addresses (you can limit your visibility for this feature in your account settings). Please also note that the messages you send or receive using the Service are only private to the extent that both you and the recipient(s) of your messages keep them private. For example, if you send a message to another user, that user may choose to publicly post it. We may access, review, and disclose such messages in connection with investigations related to use of the Service, as well as with our efforts to improve the Service.
                    </Text>




                    <Text style={styles.heading}>
                        DATA RETENTION AND ACCOUNT TERMINATION
                    </Text>

                    <Text style={styles.para}>
                        Information on how to close your account is available here. We will remove certain public posts from view and/or dissociate them from your account profile, but we may retain information about you for the purposes authorized under this Privacy Policy unless prohibited by law. For example, we may retain information to prevent, investigate, or identify possible wrongdoing in connection with the Service or to comply with legal obligations. We may also maintain residual copies of your personal information in our backup systems. Please note that businesses cannot remove their business pages, ratings, or reviews by closing their accounts. OneStop Zim retains information for as long  as reasonably necessary for the purposes for which it was collected, or as otherwise permitted or required by law.  Beginning in January 2023 you can access additional information about OneStop Zim’s data retention practices here
                    </Text>






                    <Text style={styles.heading}>
                        CHILDREN
                    </Text>

                    <Text style={styles.para}>
                        The Service is intended for general audiences and is not directed to children under 13. We do not knowingly collect personal information from children under 13. Although use of OneStop Zim by children is unlikely, if you become aware that a child has provided us with personal information without parental consent, please contact us. If we become aware that a child under 13 has provided us with personal information without parental consent, we take steps to remove such information and terminate the child’s account.
                    </Text>









                    <Text style={styles.heading}>
                        SECURITY
                    </Text>

                    <Text style={styles.para}>
                        We use various safeguards to protect the personal information submitted to us, both during transmission and after we receive it. However, no method of transmission over the Internet or via mobile device, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                    </Text>






                    <Text style={styles.heading}>
                        CONTACT INFORMATION
                    </Text>

                    <Text style={styles.para}>
                        You may contact us online concerning our Privacy Policy, or write to us at the following
                        {"\n"}address:{"\n"}
                        OneStop Zim, Attn: Manager{"\n"}
                        410., 4th Floor{"\n"}
                        Pax House Building, Kwame Nkrumah Road{"\n"}
                        Harare

                    </Text>



                    <Text style={styles.heading}>
                        MODIFICATIONS TO THIS PRIVACY POLICY
                    </Text>


                    <Text style={styles.para}>
                        We may modify this Privacy Policy from time to time. The most current version of the Privacy Policy will govern our collection, use, and disclosure of information about you and will be located here. If we make material changes to this Privacy Policy, we will notify you by email and/or by posting a notice on the Service prior to or on the effective date of the changes. By continuing to access or use the Service after those changes become effective, you acknowledge the revised Privacy Policy.

                        For Zimbabwean Residents, our legal basis for collecting and using the information described above will depend on the specific information concerned and the context in which we collect it. We, however, will normally collect personal information from you only where we have your consent to do so, where we need the personal information to perform a contract with you, or where the processing is in our legitimate interests and not overridden by your data protection interests or fundamental rights and freedoms. In some cases, we may also have a legal obligation to collect personal information from you or may otherwise need the personal information to protect your vital interests or those of another person (for instance, to prevent, investigate, or identify possible wrongdoing in connection with the Service or to comply with legal obligations). If we ask you to provide personal information to comply with a legal requirement or to perform a contract with you, we will make this clear at the relevant time and advise you whether the provision of your personal information is mandatory or not (as well as of the possible consequences if you do not provide your personal information). If we collect and use your personal information in reliance on our legitimate interests (or those of any third party), this interest will typically be to operate our Services, communicate with you in relation to our Services, or for our other legitimate commercial interests, for instance, when responding to your queries, to analyze and improve our platform, engage in marketing, or for the purposes of detecting or preventing fraud. You can learn more about how to submit a data rights request, or appeal denial of a request, through OneStop Zim. You may also send your request by email to customerservice@onestopzim.co.zw{"\n"}

                        If you have questions about or need further information concerning the legal basis on which we collect and use your personal information, please contact us at the address listed below: {"\n"}
                        Office 410{"\n"}
                        Pax House Building{"\n"}
                        89 Kwame Nkrumah{"\n"}
                        Harare

                    </Text>


                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    nav: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: 70,
        backgroundColor: Global.color,

        justifyContent: 'center'
    },


    heading: {
        width: '96%',

        color: '#000',
        fontSize: 20,
        marginLeft: '2%',
        paddingTop: 7,
        textAlign: 'left',
        fontWeight: 'bold'

    },
    para: {
        width: '95%',

        color: '#000',
        fontSize: 14,
        marginLeft: '2.5%',
        paddingTop: 7,
        textAlign: 'justify'
    },
    subheading: {
        width: '96%',

        color: '#000',
        fontSize: 18,
        marginLeft: '2%',
        paddingTop: 7,
        textAlign: 'left',
        fontWeight: 'bold'
    }
    ,
    subheading2: {
        width: '90%',

        color: '#000',
        fontSize: 16,
        marginLeft: '4%',
        paddingTop: 7,
        textAlign: 'left',
        fontWeight: 'bold',

    }
    ,
    subpara: {
        width: '85%',

        color: '#000',
        fontSize: 14,

        paddingTop: 7,
        textAlign: 'justify',
        marginLeft: '13%'
    }
    ,
    outerbox: {
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '2.5%',
        marginTop:10

    },
    rows: {
        display: 'flex',
        flexDirection: 'row'
    },
    leftPortion: {
        width: '35%',
        borderWidth: 0.3,
        borderColor: '#000',
        borderRightWidth: 0,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    RightPortion: {
        width: '65%',
        borderWidth: 0.3,
        borderColor: '#000',
        borderLeftW: 0,
        display: 'flex',
        alignItems: 'center',

        paddingBottom: 7,
        paddingRight: 5

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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
