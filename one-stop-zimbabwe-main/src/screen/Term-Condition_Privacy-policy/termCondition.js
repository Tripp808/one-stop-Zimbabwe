import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar, Text, Image } from 'react-native';
import { get_data } from '../../store/acion/index';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { arr, Global } from '../../assets/Global_Variable';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


function TermConditions(Props) {
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
                    Terms of Services
                </Text>

            </View>


            <ScrollView>

                <View style={styles.allContent}>

                    {/* <Text style={styles.heading}>
                        Terms of Service
                    </Text> */}


                    <Text style={styles.para}>
                        Last Updated on 1 June, 2022. These Terms of Service (which, together with the Business Terms below, are the “Terms”) are effective immediately for users accessing or using the Service without an Account or those registering Accounts on or after December 13, 2019, and will become effective January 31, 2020 for users with pre-existing Accounts. To review the previous terms, please click here.
                    </Text>

                    <Text style={{ ...styles.para, fontWeight: 'bold', textAlign: 'left' }}>
                        PLEASE NOTE: THESE TERMS INCLUDE DISPUTE RESOLUTION PROVISIONS (SEE SECTION 13) THAT, WITH LIMITED EXCEPTIONS, REQUIRE THAT (1) CLAIMS YOU BRING AGAINST OneStop Zim BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION, AND (2) YOU WAIVE YOUR RIGHT TO BRING OR PARTICIPATE IN ANY CLASS, GROUP, OR REPRESENTATIVE ACTION OR PROCEEDING                    </Text>
                    <Text style={styles.para}>
                        These Terms govern your access to and use of our products and services, including those offered through our websites, events, communications (e.g., emails, phone calls, and texts) and mobile applications (collectively, the “Service”). By accessing or using the Service, you are agreeing to these Terms, which form a legally binding contract with: (i) OneStop Zim, a company in Zimbabwe with its headquarters in Harare, Zimbabwe. Do not access or use the Service if you are unwilling or unable to be bound by the Terms.                     </Text>


                    <Text style={styles.subheading}>
                        DEFINITIONS
                    </Text>
                    <Text style={styles.para}>
                        Parties. “You” and “your” refer to you, as a user of the Service. A “user” is someone who accesses or in any way uses the Service. “We,” “us,” and “our” refer to OneStop Zim and its subsidiaries.
                        Content. “Content” means text, images, photos, audio, video, and all other forms of data or communication. “Your Content” means Content that you submit or transmit to, through, or in connection with the Service, such as ratings, reviews, photos, videos, compliments, invitations, check-ins, votes, friending and following activity, direct messages, and information that you contribute to your user profile or suggest for a business page. “User Content” means Content that users submit or transmit to, through, or in connection with the Service. “OneStop Zim Content” means Content that we create and make available in connection with the Service. “Third Party Content” means Content that originates from parties other than OneStop Zim or its users, which is made available in connection with the Service. “Service Content” means all of the Content that is made available in connection with the Service, including Your Content, User Content, OneStop Zim Content, and Third Party Content.
                        Sites and Accounts. “Consumer Site” means OneStop Zim’s consumer website (www.OneStop Zim.com and related domains) and mobile applications. “Consumer Account” means the account you create to access or use the Consumer Site. “Business Account” means the account you create to access or use the OneStop Zim for Business Owners website (biz.OneStop Zim.com and related domains) and mobile applications. “Account” means any Consumer Account or Business Account.


                    </Text>



                    <Text style={styles.subheading}>
                        CHANGES TO THE TERMS
                    </Text>



                    <Text style={styles.para}>
                        We may modify the Terms from time to time. The most current version of the Terms will be located here. You understand and agree that your access to or use of the Service is governed by the Terms effective at the time of your access to or use of the Service. If we make material changes to these Terms, we will notify you by email, by posting notice on the Service, and/or by other method prior to the effective date of the changes. We will also indicate at the top of this page the date that such changes were last made. You should revisit these Terms on a regular basis as revised versions will be binding on you. You understand and agree that your continued access to or use of the Service after the effective date of changes to the Terms represents your acceptance of such changes.
                    </Text>






                    <Text style={styles.subheading}>
                        TRANSLATION
                    </Text>



                    <Text style={styles.para}>
                        We may translate these Terms into other languages for your convenience. Nevertheless, the English version governs your relationship with OneStop Zim, and any inconsistencies among the different versions will be resolved in favor of the English version available here.
                    </Text>



                    <Text style={styles.subheading}>
                        USING THE SERVICE
                    </Text>



                    <Text style={styles.para}>
                        Eligibility. To access or use the Service, you must have the requisite power and authority to enter into these Terms. You may not access or use the Service if you are a competitor of OneStop Zim or if we have previously banned you from the Service or closed your Account.
                        Permission to Use the Service. We grant you permission to use the Service subject to these Terms. Your use of the Service is at your own risk, including the risk that you might be exposed to Content that is offensive, indecent, inaccurate, objectionable, incomplete, fails to provide adequate warning about potential risks or hazards, or is otherwise inappropriate.
                        Service Availability. The Service may be modified, updated, interrupted, suspended or discontinued at any time without notice or liability.
                        Accounts. You must create an Account and provide certain information about yourself in order to use some of the features that are offered through the Service. You are responsible for maintaining the confidentiality of your Account password. You are also responsible for all activities that occur in connection with your Account. You agree to notify us immediately of any unauthorized use of your Account. We reserve the right to close your Account at any time for any or no reason.
                        Your Consumer Account is for your personal, non-commercial use only, and you may not create or use a Consumer Account for anyone other than yourself. We ask that you provide complete and accurate information about yourself when creating an Account in order to bolster your credibility as a contributor to the Service. You may not impersonate someone else, provide an email address other than your own, create multiple Accounts, or transfer your Consumer Account to another person without OneStop Zim’s prior approval.

                        Communications from OneStop Zim and Others. By accessing or using the Service, you consent to receive communications from other users and OneStop Zim through the Service, or through any other means such as emails, push notifications, text messages (including SMS and MMS), and phone calls. These communications may promote OneStop Zim or businesses listed on OneStop Zim, and may be initiated by OneStop Zim, businesses listed on OneStop Zim, or other users. You further understand that communications may be sent using an automatic telephone dialing system, and that you may be charged by your phone carrier for certain communications such as SMS messages or phone calls. You agree to notify us immediately if the phone number(s) you have provided to us have been changed or disconnected. Please note that any communications, including phone calls, with OneStop Zim or made through the Service may be monitored and recorded for quality purposes.
                        You can opt-out of certain communications here.
                    </Text>




                    <Text style={styles.subheading}>
                        CONTENT
                    </Text>



                    <Text style={styles.para}>
                        Responsibility for Your Content. You alone are responsible for Your Content, and once posted to OneStop Zim, it cannot always be withdrawn. You assume all risks associated with Your Content, including anyone’s reliance on its quality, accuracy, or reliability, and any risks associated with personal information you disclose. You represent that you own or have the necessary permissions to use and authorize the use of Your Content as described herein. You may not imply that Your Content is in any way sponsored or endorsed by OneStop Zim.
                        You may expose yourself to liability if, for example, Your Content contains material that is false, intentionally misleading, or defamatory; violates any third-party right, including any copyright, trademark, service mark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; contains material that is unlawful, including illegal hate speech or pornography; exploits or otherwise harms minors; violates or advocates the violation of any law or regulation; or violates these Terms.

                        Our Right to Use Your Content. We may use Your Content in a number of different ways, including by publicly displaying it, reformatting it, incorporating it into advertisements and other works, creating derivative works from it, promoting it, distributing it, and allowing others to do the same in connection with their own websites and media platforms (“Other Media”). As such, you hereby irrevocably grant us world-wide, perpetual, non-exclusive, royalty-free, assignable, sublicensable, transferable rights to use Your Content for any purpose. Please note that you also irrevocably grant the users of the Service and any Other Media the right to access Your Content in connection with their use of the Service and any Other Media. Finally, you irrevocably waive, and cause to be waived, against OneStop Zim and its users any claims and assertions of moral rights or attribution with respect to Your Content. By “use” we mean use, copy, publicly perform and display, reproduce, distribute, modify, translate, remove, analyze, commercialize, and prepare derivative works of Your Content.
                        Ownership. As between you and OneStop Zim, you own Your Content. We own the OneStop Zim Content, including but not limited to visual interfaces, interactive features, graphics, design, compilation (including, but not limited to, our selection, coordination, aggregation, and arrangement of User Content and other Service Content), computer code, products, software, aggregate star ratings, and all other elements and components of the Service excluding Your Content, User Content and Third Party Content. We also own the copyrights, trademarks, service marks, trade names, trade secrets, and other intellectual and proprietary rights throughout the world associated with the OneStop Zim Content and the Service, which are protected by copyright, trade dress, patent, trademark, and trade secret laws and all other applicable intellectual and proprietary rights and laws. As such, you may not sell, license, copy, publish, modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in any way use or exploit any of the OneStop Zim Content in whole or in part except as expressly authorized by us. Except as expressly and unambiguously provided herein, we do not grant you any express or implied rights, and all rights in and to the Service and the OneStop Zim Content are retained by us.
                        Advertising. OneStop Zim and its licensees may publicly display advertisements, paid content, and other information nearby or in association with Your Content. You are not entitled to any compensation for such advertisements. The manner, mode and extent of such advertising are subject to change without specific notice to you.
                        Other. User Content (including any that may have been created by users employed or contracted by OneStop Zim) does not necessarily reflect the opinion of OneStop Zim. Except as required by law, we have no obligation to retain or provide you with copies of Your Content, and we do not guarantee any confidentiality with respect to Your Content. We reserve the right to remove, screen, edit, or reinstate User Content at our sole discretion for any reason or no reason, and without notice to you. For example, we may remove a review if we believe it violates our Content Guidelines. Except in accordance with OneStop Zim’s Verified License program, OneStop Zim does not attempt to verify any licenses a local business or its representatives may have, and consumers should inquire about any such licenses with the business directly. Businesses whose licenses have been verified by OneStop Zim will have a “Verified License” badge displayed on their OneStop Zim business page.
                    </Text>








                    <Text style={styles.subheading}>
                        BOOKING AND TRANSACTING
                    </Text>



                    <Text style={styles.para}>
                        Generally. You can access features through the Service that allow you to book or transact online with local businesses, such as making restaurant or spa reservations, ordering food delivery, or scheduling appointments. These features may be provided by OneStop Zim’s third-party partners, including through iframes or similar formats, and their use may be governed by different or additional terms presented to you as part of the booking or transaction process. Please note that such third-party partners and/or the transacting local businesses themselves are responsible for fulfilling such bookings and transactions.
                        Payments and Cancellations. You may be required to provide your credit card information to confirm a booking, and will be charged any applicable fees, including cancellation or no-show fees in accordance with the transacting local business’s cancellation policy provided at the time of booking. You agree that OneStop Zim may facilitate any such payments and charges on behalf of the transacting local business.
                        Coupons. Any coupons that OneStop Zim might issue for use in connection with the Service are non-transferable (unless required by law), not redeemable for cash or any other consideration, and automatically expire thirty (30) days after the issue date unless otherwise specified. If your Account is terminated you will not be able to use any unexpired and unused coupons, and any such coupons will automatically terminate and cannot be redeemed unless required by law.
                    </Text>






                    <Text style={styles.subheading}>
                        REPRESENTATIONS AND WARRANTIES
                    </Text>



                    <Text style={styles.para}>
                        We are under no obligation to enforce the Terms on your behalf against another user. While we encourage you to let us know if you believe another user has violated the Terms, we reserve the right to investigate and take appropriate action at our sole discretion.
                        You represent and warrant that:
                        You have read and understood our Content Guidelines;
                        You have read and understood our Privacy Policy. If you use the Service outside of the United States of America, you consent to having your personal data transferred to and processed in the United States of America; and
                        Prior to attending any event listed on the Service, you have read and agree to our Event Terms and Conditions.
                        You also represent and warrant that you will not, and will not assist, encourage, or enable others to use the Service to:
                        Violate our Terms, including the Content Guidelines and Event Terms and Conditions;
                        Post any fake or defamatory review, trade reviews with others, or compensate someone or be compensated to post, refrain from posting, or remove a review;
                        Violate any third party’s rights, including any breach of confidence, copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right;
                        Threaten, stalk, harm, or harass others, or promote bigotry or discrimination;
                        Promote a business or other commercial venture or event, or otherwise use the Service for commercial purposes, except in connection with a Business Account in accordance with the Business Terms;
                        Send bulk emails, surveys, or other mass messaging, whether commercial in nature or not; engage in keyword spamming, or otherwise attempt to manipulate the Service’s search results, review Recommendation Software (as defined in the Business Terms below), or any third party website;
                        Solicit personal information from minors, or submit or transmit pornography;
                        Violate any applicable law;
                        Modify, adapt, appropriate, reproduce, distribute, translate, create derivative works or adaptations of, publicly display, sell, trade, or in any way exploit the Service or Service Content (other than Your Content), except as expressly authorized by OneStop Zim;
                        Use any robot, spider, Service search/retrieval application, or other automated device, process or means to access, retrieve, copy, scrape, or index any portion of the Service or any Service Content, except as expressly permitted by OneStop Zim
                        Reverse engineer any portion of the Service, unless applicable law prohibits this restriction, in which case you agree to provide us with  30 days’ prior written notice here;
                        Remove or modify any copyright, trademark, or other proprietary rights notice that appears on any portion of the Service or on any materials printed or copied from the Service;
                        Record, process, or mine information about users;
                        Access, retrieve or index any portion of the Service for purposes of constructing or populating a searchable database of business reviews;
                        Reformat or frame any portion of the Service;
                        Take any action that imposes, or may impose, in our sole discretion, an unreasonable or disproportionately large load on OneStop Zim’s technology infrastructure or otherwise make excessive traffic demands of the Service;
                        Attempt to gain unauthorized access to the Service, Accounts, computer systems or networks connected to the Service through hacking, password mining or any other means;
                        Use the Service or any Service Content to transmit any computer viruses, worms, defects, Trojan horses, malicious code, spyware, malware or other items of a destructive or harmful nature;
                        Use any device, software or routine that interferes with the proper working of the Service, or otherwise attempt to interfere with the proper working of the Service;
                        Use the Service to violate the security of any computer network, crack passwords or security encryption codes; disrupt or interfere with the security of, or otherwise cause harm to, the Service or Service Content; or
                        Remove, circumvent, disable, damage or otherwise interfere with any security-related features of the Service, features that prevent or restrict the use or copying of Service Content, or features that enforce limitations on the use of the Service.
                    </Text>








                    <Text style={styles.subheading}>
                        ADDITIONAL POLICIES AND TERMS
                    </Text>



                    <Text style={styles.para}>
                        Copyright and Trademark Disputes. You agree to follow our Infringement Policy in notifying us about copyright and trademark disputes concerning User Content. You agree we may forward any notification sent pursuant to our Infringement Policy to the user who submitted the User Content at issue.
                        Additional Terms. Your use of the Service is subject to any and all additional terms, policies, rules, or guidelines that we may post on or link to from the Service (the “Additional Terms”). All such Additional Terms are hereby incorporated by reference into, and made a part of, these Terms. If you have a Business Account, the Business Terms provided below apply to you.
                    </Text>





                    <Text style={styles.subheading}>
                        SUGGESTIONS AND IMPROVEMENTS                    </Text>



                    <Text style={styles.para}>
                        By sending us any ideas, suggestions, documents or proposals (“Feedback”), you agree that (i) your Feedback does not contain any third party confidential or proprietary information, (ii) we are under no obligation of confidentiality, express or implied, with respect to the Feedback, (iii) we may have something similar to the Feedback already under consideration or in development, (iv) we have no obligation to review, consider, or implement the Feedback, or to return to you all or part of the Feedback, and (v) you grant us an irrevocable, non-exclusive, royalty-free, perpetual, worldwide, assignable, sublicensable, transferable license to use, modify, prepare derivative works of, publish, distribute and sublicense the Feedback, and you irrevocably waive, and cause to be waived, against OneStop Zim and its users any claims and assertions of any moral rights contained in such Feedback.
                    </Text>








                    <Text style={styles.subheading}>
                        THIRD PARTY CONTENT AND SERVICES                  </Text>



                    <Text style={styles.para}>
                        The Service may host Third Party Content, or include links to other websites or applications (each, a “Third Party Service”). We do not control or endorse any Third Party Content or Third Party Service. You agree that we are not responsible for the availability, accuracy, or content of any such Third Party Content or Third Party Service. Your use of and reliance on any Third Party Content or Third Party Service is at your own risk.
                        Some of the services made available through the Service and Third Party Services may be subject to additional third party terms of service, privacy policies, licensing terms and disclosures, and other terms, conditions, and policies, including without limitation the ones posted here. It is your responsibility to familiarize yourself with any such applicable third party terms.
                    </Text>







                    <Text style={styles.subheading}>
                        INDEMNITY

                    </Text>


                    <Text style={styles.para}>
                        You agree to indemnify, defend, and hold harmless OneStop Zim, its parents, subsidiaries, affiliates, any related companies, suppliers, licensors and partners, and the officers, directors, employees, agents, contractors and representatives of each of them (collectively, the “OneStop Zim Entities”) from  and against any and all third party claims, actions, demands, losses, damages, costs, liabilities and expenses (including but not limited to attorneys’ fees and court costs)  arising out of or relating to: (i) your access to or use of the Service, including Your Content, (ii) your violation of the Terms, (iii) your breach of your representations and warranties provided under these Terms, (iv) any products or services purchased or obtained by you in connection with the Service, (v) your products or services, or the marketing or provision thereof to end users, or (vi) the infringement by you, or any third party using your Account, of any intellectual property or other right of any person or entity. OneStop Zim reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us and you agree to cooperate with our defense of these claims. You agree not to settle any such matter without the prior written consent of OneStop Zim. OneStop Zim will use reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it.
                    </Text>





                    <Text style={styles.subheading}>
                        DISCLAIMERS AND LIMITATIONS OF LIABILITY

                    </Text>


                    <Text style={styles.para}>
                        PLEASE READ THIS SECTION CAREFULLY SINCE IT LIMITS THE LIABILITY OF THE OneStop Zim ENTITIES TO YOU. EACH OF THE SUBSECTIONS BELOW ONLY APPLIES UP TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW. NOTHING HEREIN IS INTENDED TO LIMIT ANY RIGHTS YOU MAY HAVE WHICH MAY NOT BE LAWFULLY LIMITED. BY ACCESSING OR USING THE SERVICE, YOU REPRESENT THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THESE TERMS, INCLUDING THIS SECTION. YOU ARE GIVING UP SUBSTANTIAL LEGAL RIGHTS BY AGREEING TO THESE TERMS.
                        THE SERVICE AND SERVICE CONTENT ARE MADE AVAILABLE TO YOU ON AN “AS IS”, “WITH ALL FAULTS” AND “AS AVAILABLE” BASIS, WITH THE EXPRESS UNDERSTANDING THAT THE OneStop Zim ENTITIES MAY NOT MONITOR, CONTROL, OR VET USER CONTENT OR THIRD PARTY CONTENT. AS SUCH, YOUR USE OF THE SERVICE IS AT YOUR OWN DISCRETION AND RISK. THE OneStop Zim ENTITIES MAKE NO CLAIMS OR PROMISES ABOUT THE QUALITY, COMPLETENESS, ACCURACY, OR RELIABILITY OF THE SERVICE, ITS SAFETY OR SECURITY, INCLUDING WITHOUT LIMITATION THE SECURITY OF YOUR DATA, OR THE SERVICE CONTENT. ACCORDINGLY, THE OneStop Zim ENTITIES ARE NOT LIABLE TO YOU FOR ANY PERSONAL INJURY, LOSS OR DAMAGE THAT MIGHT ARISE, FOR EXAMPLE, FROM THE SERVICE’S INOPERABILITY, DEPLETION OF BATTERY POWER OR OTHER IMPAIRMENT OF DEVICES USED TO ACCESS THE SERVICE, SERVICE UNAVAILABILITY, SECURITY VULNERABILITIES OR FROM YOUR RELIANCE ON THE QUALITY, ACCURACY, OR RELIABILITY OF THE BUSINESS LISTINGS, RATINGS, REVIEWS (INCLUDING THEIR CONTENT OR OMISSION OF CONTENT, ORDER, AND DISPLAY), METRICS OR OTHER CONTENT FOUND ON, USED ON, OR MADE AVAILABLE THROUGH THE SERVICE.
                        THE OneStop Zim ENTITIES MAKE NO CLAIMS OR PROMISES WITH RESPECT TO ANY THIRD PARTY, SUCH AS THE BUSINESSES OR ADVERTISERS LISTED ON THE SERVICE OR THAT OFFER GOODS OR SERVICES THROUGH THE SERVICE, OR THE SERVICE’S USERS. ACCORDINGLY, THE OneStop Zim ENTITIES ARE NOT LIABLE TO YOU FOR ANY PERSONAL INJURY, LOSS OR DAMAGE THAT MIGHT ARISE FROM ANY SUCH THIRD PARTY’S ACTIONS OR OMISSIONS, INCLUDING, FOR EXAMPLE, IF ANOTHER USER OR BUSINESS MISUSES YOUR CONTENT, IDENTITY OR PERSONAL INFORMATION, OR IF YOU HAVE A NEGATIVE EXPERIENCE WITH ONE OF THE BUSINESSES OR ADVERTISERS LISTED OR FEATURED ON THE SERVICE. YOUR PURCHASE AND USE OF PRODUCTS OR SERVICES OFFERED BY THIRD PARTIES THROUGH THE SERVICE IS AT YOUR OWN DISCRETION AND RISK.
                        YOUR SOLE AND EXCLUSIVE RIGHT AND REMEDY IN CASE OF DISSATISFACTION WITH THE SERVICE, RELATED SERVICES, OR ANY OTHER GRIEVANCE SHALL BE YOUR TERMINATION AND DISCONTINUATION OF ACCESS TO, OR USE OF THE SERVICE.
                        THE OneStop Zim ENTITIES’ LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE OneStop Zim ENTITIES WILL NOT BE LIABLE FOR ANY (i) INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, EXEMPLARY, RELIANCE, OR CONSEQUENTIAL DAMAGES, (ii) LOSS OF PROFITS OR REVENUE, (iii) BUSINESS INTERRUPTION, (iv) REPUTATIONAL HARM, (v) LOSS OF INFORMATION OR DATA; OR (vi) LIABILITY WITH RESPECT TO A CONSUMER ALERT POSTED ON ANY OneStop Zim BUSINESS PAGES FOR YOUR BUSINESS. THE WAIVERS AND LIMITATIONS SPECIFIED IN THIS SECTION 12 WILL SURVIVE AND APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE.
                        ARBITRATION, DISPUTES, AND CHOICE OF LAW
                        If you are a resident of Zimbabwe:
                        EXCEPT FOR EXCLUDED CLAIMS: ANY CLAIM, CAUSE OF ACTION, REQUEST FOR RELIEF OR DISPUTE THAT MIGHT ARISE BETWEEN YOU AND OneStop Zim (“CLAIMS”) MUST BE RESOLVED BY ARBITRATION ON AN INDIVIDUAL BASIS; YOU AND WE AGREE THAT EACH MAY BRING OR PARTICIPATE IN CLAIMS AGAINST THE OTHER ONLY IN OUR RESPECTIVE INDIVIDUAL CAPACITIES, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. UNLESS BOTH YOU AND OneStop Zim AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN THE CLAIMS OF OTHER PERSONS OR PARTIES WHO MAY BE SIMILARLY SITUATED, AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING. YOU AND OneStop Zim EXPRESSLY WAIVE THE RIGHT TO TRIAL BY A JURY.
                        “Excluded Claims” means: (a) Claims brought by you or OneStop Zim that could be brought in small claims court, if permitted by the rules of that court, or (b) Claims related to intellectual property (like copyrights and trademarks), violations of OneStop Zim’s API Terms of Use (which, for clarity, are governed by those terms), or a breach of Section 7 above (Representations and Warranties). Excluded Claims may be brought in court. Any issues relating to the scope and enforceability of the arbitration provision will be resolved by the arbitrator. If any Claim cannot be arbitrated in accordance with this provision, then only that Claim may be brought in court and all other Claims remain subject to arbitration. Notwithstanding this paragraph, Business Claims, as defined in Section 3 of the Additional Terms for Business Accounts, are governed by that section.
                        Excluded Claims and Claims that cannot be arbitrated must be brought in court. Zimbabwean law will govern these Terms (to the extent not preempted or inconsistent with territorial law), as well as any such Excluded Claim or Claim that cannot be arbitrated, without regard to conflict of law provisions.
                        Arbitration shall be administered by the Commercial Arbitration Centre (“CAC”) in accordance with its Consumer Arbitration Rules then in effect. Arbitration may be conducted in person, through the submission of documents, by phone or online. The arbitrator may award damages to you individually as a court could, including declaratory or injunctive relief, but only to the extent required to satisfy your individual claim.
                        You agree that any subpoena, third-party discovery request, or other third-party process directed to OneStop Zim must issue from, or be domesticated by, the state of Zimbabwe in the city of Harare and you agree to submit to the jurisdiction of each of these courts for any related proceedings.
                    </Text>







                    <Text style={styles.subheading}>
                        TERMINATION

                    </Text>


                    <Text style={styles.para}>
                        You may terminate the Terms at any time by closing your Account, discontinuing any access to or use of the Service, and providing OneStop Zim with a notice of termination here.
                        We may close your Account, suspend your ability to use certain portions of the Service, terminate any license or permission granted to you hereunder, and/or ban you altogether from the Service for any or no reason, and without notice or liability of any kind. Any such action could prevent you from accessing your Account, the Service, Your Content, Service Content, or any other related information.
                        In the event of any termination of these Terms, whether by you or us, Sections 1, 3,  5, 7–15 of the Terms of Service will continue in full force and effect.
                    </Text>








                    <Text style={styles.subheading}>
                        GENERAL TERMS

                    </Text>


                    <Text style={styles.para}>
                        We reserve the right to modify, update, or discontinue the Service at our sole discretion, at any time, for any or no reason, and without notice or liability.
                        Except as otherwise stated in Section 10 above, nothing herein is intended, nor will be deemed, to confer rights or remedies upon any third party.
                        The Terms contain the entire agreement between you and us regarding the use of the Service, and supersede any prior agreement between you and us on such subject matter. The parties acknowledge that no reliance is placed on any representation made but not expressly contained in these Terms.
                        Any failure on OneStop Zim’s part to exercise or enforce any right or provision of the Terms does not constitute a waiver of such right or provision. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder. The Terms may not be waived, except pursuant to a writing executed by OneStop Zim.
                        If any provision of the Terms is found to be unenforceable or invalid by an arbitrator or court of competent jurisdiction, then only that provision shall be modified to reflect the parties’ intention or eliminated to the minimum extent necessary so that the Terms shall otherwise remain in full force and effect and enforceable.
                        The Terms, and any rights or obligations hereunder, are not assignable, transferable or sublicensable by you except with OneStop Zim’s prior written consent, but may be assigned or transferred by us without restriction. Any attempted assignment by you shall violate these Terms and be void.
                        You agree that no joint venture, partnership, employment, agency, special or fiduciary relationship exists between you and OneStop Zim as a result of these Terms or your use of the Service.
                        The section titles in the Terms are for convenience only and have no legal or contractual effect.
                        Copyright © 2020 OneStop Zim Inc, 87 Pax House, Kwame Nkrumah Avenue, Harare, Zimbabwe

                    </Text>
                    <Text style={styles.subheading}>
                        ADDITIONAL TERMS FOR BUSINESS ACCOUNTS

                    </Text>


                    <Text style={styles.para}>
                        Last Updated on December 13, 2019.

                        The following terms (“Business Terms”), in addition to the Terms of Service above, govern your access to and use of your Business Account. In the event of any conflict between these Business Terms and the Terms of Service, the Business Terms apply. If you have purchased products or services from OneStop Zim on behalf of your business (e.g., advertising or business tools), the terms of that purchase apply in the event of any conflict with these Business Terms. Capitalized words used but not defined in these Business Terms have the meanings described in the Terms of Service. By creating, accessing, or using your Business Account, you are agreeing to these Business Terms and concluding a legally binding contract with OneStop Zim. You are not authorized to create, access, or use a Business Account if you do not agree to these Business Terms.

                        PLEASE READ THESE BUSINESS TERMS CAREFULLY AS THEY REQUIRE THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN TRIALS OR CLASS ACTIONS, AND ALSO LIMIT THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A DISPUTE.

                        In the event of any termination of these Business Terms, whether by you or us, these Business Terms in their entirety will continue in full force and effect.

                    </Text>






                    <Text style={styles.subheading}>
                        REQUIREMENTS, REPRESENTATIONS AND WARRANTIES
                    </Text>


                    <Text style={styles.para}>
                        In order to access or use the Services, you agree that:
                        you have the authority to act on behalf of the business or businesses associated with or claimed through your Business Account and bind any such business (including any corresponding business entity) to the Business Terms (such business or businesses, your “Business”);
                        your access to or use of the Business Site will only be in your capacity as an authorized representative of your Business;
                        you will not use the Consumer Site for business activities, including but not limited to flagging reviews or messaging people who have reviewed your Business;
                        your Business complies with applicable laws and does not offer, advertise, sell, or lease illegal products and/or services;
                        you grant OneStop Zim a non-transferable, non-exclusive, royalty-free limited license to display your public website on the Services, or allow for its display through iframes or other framing technology;
                        you agree that we may contact you, including by phone or email, using the contact information you provide us, make publicly available, or that we have on record for your business, and that our communications (including phone calls) with you may be monitored and recorded for quality purposes;
                        you understand that we may display health score information for your Business, and may place a Consumer Alert regarding that health score, on the business page for your Business;
                        you understand and agree that we may share certain aggregate or otherwise deidentified information about your responses to Request a Quote leads with other Businesses, for example, the number of total Businesses responding to the lead and the speed of those responses; and
                        You represent and warrant that you will not, and will not authorize or induce any other party, to:
                        offer incentives of any kind, such as discounts, freebies, refunds, gift cards, contest entries, offers, or deals in exchange for the posting of reviews of your Business, or to prevent or remove reviews, and you understand and acknowledge that OneStop Zim, through its Consumer Alerts, may publicly notify consumers about such incentives and other attempts to obtain, prevent, or remove reviews;
                        solicit or ask for reviews from your customers;
                        write reviews or vote on Content (e.g., voting user reviews as useful, funny, or cool) for your Business or your Business’s competitors;
                        pay or induce anyone to post, refrain from posting, or remove reviews, or otherwise attempt to circumvent OneStop Zim’s Recommendation Software (defined below) or fraud detection systems;
                        attempt to generate automated, fraudulent, or otherwise invalid ad impressions, inquiries, conversions, ad clicks, or other actions;
                        use any automated means or form of scraping or data extraction to access, query or otherwise collect OneStop Zim data, content and/or reviews from the Consumer Site or the Business Site, except as expressly permitted by OneStop Zim (for example, as described at www.OneStop Zim.com/robots.txt);
                        use any OneStop Zim trademark or service mark in any manner without OneStop Zim’s prior written consent; or
                        misrepresent your identity or affiliation to anyone in connection with OneStop Zim.
                        You understand and acknowledge that OneStop Zim allows consumers to post Content about your Business, including photos, ratings, and reviews. You understand and acknowledge that OneStop Zim employs automated software in an effort to showcase the most reliable and useful reviews while displaying other reviews less prominently (“Recommendation Software”). You understand and acknowledge that while OneStop Zim uses its Recommendation Software to identify potentially less helpful reviews, the Recommendation Software may sometimes suppress legitimate reviews or fail to detect illegitimate reviews. You understand and acknowledge that any purchase of advertising or other paid features from OneStop Zim will not influence the Recommendation Software or otherwise allow or enable You, directly or indirectly, to alter reviews or impact whether, where, or how reviews appear on OneStop Zim.

                    </Text>









                    <Text style={styles.subheading}>
                        DISCLAIMERS AND LIMITATIONS OF LIABILITY
                    </Text>


                    <Text style={styles.para}>
                        Business Claims shall be heard by a single arbitrator. Arbitrations will be held in Harare, Zimbabwe, but the parties may choose for themselves whether to appear in person, by phone, or through the submission of documents. The arbitration shall be governed by the laws of Zimbabwe.

                        NOTWITHSTANDING THE FOREGOING, FOR ANY BUSINESS CLAIM THAT IS NOT SUBJECT TO ARBITRATION, INCLUDING WITHOUT LIMITATION EXCLUDED BUSINESS CLAIMS, YOU AGREE TO SUBMIT AND CONSENT TO THE PERSONAL AND EXCLUSIVE JURISDICTION IN, AND THE EXCLUSIVE VENUE OF, THE STATE AND COURTS LOCATED WITHIN HARARE, ZIMBABWES, WHICH IS THE PLACE OF PERFORMANCE OF THESE BUSINESS TERMS.

                        YOU AND OneStop Zim AGREE THAT EACH MAY BRING OR PARTICIPATE IN BUSINESS CLAIMS AGAINST THE OTHER ONLY IN THEIR RESPECTIVE INDIVIDUAL CAPACITIES, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. UNLESS BOTH YOU AND OneStop Zim AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN THE BUSINESS CLAIMS OF OTHER PERSONS OR PARTIES WHO MAY BE SIMILARLY SITUATED, AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING. IF A BUSINESS CLAIM IMPLICATES THIS SECTION, AND THIS SECTION IS FOUND TO BE INVALID, UNENFORCEABLE OR ILLEGAL BY A COURT, SUCH BUSINESS CLAIM MUST BE ADJUDICATED BY A COURT AND NOT BY AN ARBITRATOR.
                    </Text>




                    <Text style={{ ...styles.para, fontWeight: 'bold', textAlign: 'center' }}>
                        Copyright © 2021 OneStop Zim. Pax House, 87 Kwame Nkrumah Road, Harare, Zimbabwe
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

export default connect(mapStateToProps, mapDispatchToProps)(TermConditions);
