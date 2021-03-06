import React from 'react';
import ReactGA from 'react-ga';

import { useEffect } from 'react';
 
import Container from '@material-ui/core/Container';
import styled from 'styled-components'

 

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import { Paper, Divider, Typography } from '@material-ui/core';
 

const Div = styled.div`
display:flex;
flex-direction:row;
ailgn-content:center;
  justify-content:space-between;
  margin:5px;
 
`

export default function PointSystem() {

    const [value, setValue] = React.useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)

    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
 
    
 
      };


    return (
        <div>
            <Container maxWidth="md" style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
 
                marginTop: 10
            }}>

            <Paper elevation={0} style={{padding:10}}>
				<h3>Privacy Policy</h3>
 
				<br/>
                <Typography variant="caption">Nodestack Private Limited operates the portal in India, which offers cricket fantasy games through the web-portal Fantasyjutsu.com and associated Facebook application, partner website(s) and mobile application(s) (collectively referred to as the “Portal”) (Nodestack Technologies Private Limited referred to herein as “<strong>Fantasyjutsu</strong>” or “<strong>we</strong>” or “<strong>us</strong>” “<strong>our</strong>”).</Typography>
				<br/>
                <Typography variant="caption">Any person utilizing the Portal ("<strong>User</strong>" or "<strong>you</strong>" or "<strong>your</strong>") or any of its features including participation in the various contests, games (including fantasy games ("<strong>Game</strong>") (" <strong>Services</strong> ") being conducted on the Portal) shall be bound by this Privacy Policy.</Typography>
				<br/>
                <Typography variant="caption">Fantasyjutsu respects the privacy of its Users and is committed to protect it in all respects. With a view to offer an enriching and holistic internet experience to its Users, Fantasyjutsu offers a vast repository of Services. Kindly take time to read the 'About Us' section to know more about Fantasyjutsu. Most of the Services are offered for free but you may need registration to participate in Fantasyjutsu's online games. The information about the User is collected by Fantasyjutsu as (i) information supplied by Users and (ii) information automatically tracked during User's navigation on Fantasyjutsu.</Typography>
				<br/>
                <Typography variant="caption">Before you submit any information to the Portal, please read this Privacy Policy for an explanation of how we will treat your personal information. By using any part of the Portal, you consent to the collection, use, disclosure and transfer of your personal information for the purposes outlined in this Privacy Policy and to the collection, processing and maintenance of this information. If you do not agree to this Privacy Policy, please do not use the Portal. Your use of any part of the Portal indicates your acceptance of this Privacy Policy and of the collection, use and disclosure of your personal information in accordance with this Privacy Policy. While you have the option not to provide us with certain information or withdraw consent to collect certain information, kindly note that in such an event you may not be able to take full advantage of the entire scope of features and services offered to you and we reserve the right not to provide you with our services.</Typography>
				<br/>
                <Typography variant="caption"><strong>Purpose and Usage:</strong></Typography>
				<br/>
                <Typography variant="caption">To avail certain Services on the Portal, Users would be required to provide certain information for the registration process namely:</Typography>
				<br/>
                <Typography variant="caption">1. Username <br/>2. Password <br/>3. Email address&nbsp;<br/>4. Date of birth&nbsp;</Typography>
				<br/>
                <Typography variant="caption">In the course of providing you with access to the Services , and in order to provide you access to the features offered through the Portal and to verify your identity, you may be required to furnish additional information, including your Permanent Account Number.</Typography>
				<br/>
                <Typography variant="caption">In certain instances, we may also collect Sensitive Personal Information (“SPI”) from you on the Portal.  SPI means such personal information which consists of information relating to your physical, physiological and mental health condition; medical records and history; biometric information, sexual orientation and financial information, such as information regarding the payment instrument/modes used by you to make such payments, which may include cardholder name, credit/debit card number (in encrypted form) with expiration date, banking details, wallet details etc. This information is presented to you at the time of making a payment to enable you to complete your payment expeditiously.</Typography>
				<br/>
                <Typography variant="caption">Except for any financial information that you choose to provide while making payment for any Services on the Portal, Fantasyjutsu does not collect any other SPI in the course of providing the Services . Any SPI collected by Fantasyjutsu shall not be disclosed to any third party without your express consent, save as otherwise set out in this Privacy Policy or as provided in a separate written agreement between Fantasyjutsu and you or as required by law. It is clarified that this condition shall not apply to publicly available information, including SPI, in relation to you on the Portal.</Typography>
				<br/>
                <Typography variant="caption">In the course of providing the Services , Users may invite other existing Users or other users ("<strong>Invited Users</strong>") to participate in any of the Services  by providing the email address or Facebook username of such users. Fantasyjutsu may thereafter use this information to contact the Invited User and invite such user to register with Fantasyjutsu (if such Invited User is not an existing User) and participate in the Game in relation to which such person was invited by the User. The participation of the Invited User in any of the Gameshall be subject to the terms of this Privacy Policy and the Terms and Conditions for the use of the Portal. The User hereby represents that the Invited Users have consented and agreed to such disclosure to and use of their email address and Facebook username by Fantasyjutsu.</Typography>
				<br/>
                <Typography variant="caption">All required information is specific and based on the kind of Game/ Services the User wishes to participate in or access, and will be utilized for the purpose of providing services, including but not limited to the Services requested by the User. The information as supplied by the Users enables us to improve the Services  and provide you the most user-friendly game experience.</Typography>
				<br/>
                <Typography variant="caption">Fantasyjutsu may also share such information with affiliates and third parties in limited circumstances, including for the purpose of providing services requested by the User, complying with legal process, preventing fraud or imminent harm, and ensuring the security of our network and services.</Typography>
				<br/>
                <Typography variant="caption"><strong>Disclosure/Sharing:</strong></Typography>
				<br/>
                <Typography variant="caption">Fantasyjutsu may also share information as provided by you and data concerning usage of the Services and participation in the Games with third party service providers engaged by Fantasyjutsu, for the purpose of data analytics or other similar purposes, for the purpose of storage, improving the services and helping Fantasyjutsu serve you better.</Typography>
				<br/>
                <Typography variant="caption">Where we propose to use your personal information (that is, information that that may be used to identify the User and that is not otherwise publicly available) for any other uses we will ensure that we notify you first. You will also be given the opportunity to withhold or withdraw your consent for your use other than as listed above.</Typography>
				<br/>
                <Typography variant="caption">By using the Portal, you hereby expressly agree and grant consent to the collection, use and storage of this information by Fantasyjutsu. Fantasyjutsu reserves the right to share, disclose and transfer information collected hereunder with its own affiliates. In the event Fantasyjutsu sells or transfers all or a portion of its business assets, consumer information may be one of the business assets that are shared, disclosed or transferred as part of the transaction. You hereby expressly grant consent and permission to Fantasyjutsu for disclosure and transfer of information to such third parties. Fantasyjutsu may share information as provided by you and data concerning usage of the Services and participation in the Game with its commercial partners for the purpose of facilitating user engagement, for marketing and promotional purposes and other related purposes. Further, Fantasyjutsu reserves the right to disclose personal information as obligated by law, in response to duly authorized legal process, governmental requests and as necessary to protect the rights and interests of Fantasyjutsu.</Typography>
				
				<br/>
                <Typography variant="caption"><strong>Use of Cookies:</strong></Typography>
				<br/>
                <Typography variant="caption">To improve the effectiveness and usability of the Portal for our Users, we use "cookies", or such similar electronic tools to collect information to assign each visitor a unique random number as a User Identification (User ID) to understand the User's individual interests using the identified computer. Unless the User voluntarily identifies himself/herself (e.g., through registration), Fantasyjutsu has no way of knowing who the User is, even if we assign a cookie to the User's computer. The only personal information a cookie can contain is information supplied by the User. A cookie cannot read data off the User's hard drive. Fantasyjutsu’s advertisers may also assign their own cookies to the User's browser (if the User clicks on their ad banners), a process that Fantasyjutsu does not control.</Typography>
				<br/>
                <Typography variant="caption">Fantasyjutsu's web servers automatically collect limited information about User's computer's connection to the Internet, including User's IP address, when the User visits the Portal. (User's IP address is a number that lets computers attached to the Internet know where to send data to the User -- such as the web pages viewed by the User). The User's IP address does not identify the User personally. Fantasyjutsu uses this information to deliver its web pages to Users upon request, to tailor its Portal to the interests of its users, to measure traffic within the Portal and let advertisers know the geographic locations from where Fantasyjutsu's visitors come.</Typography>
				<br/>
                <Typography variant="caption"><strong>Links:</strong></Typography>
				<br/>
                <Typography variant="caption">Fantasyjutsu also includes links to other websites. Such websites are governed by their respective privacy policies, which are beyond Fantasyjutsu's control. Once the User leaves Fantasyjutsu's servers (the User can tell where he/she is by checking the URL in the location bar on the User's browser), use of any information provided by the User is governed by the privacy policy of the operator of the site which the User is visiting. That policy may differ from Fantasyjutsu's own. If the User can't find the privacy policy of any of these sites via a link from the site's homepage, the User may contact the site directly for more information. Fantasyjutsu is not responsible for the privacy practices or the content of such websites.</Typography>
				<br/>
                <Typography variant="caption"><strong>Security Procedures:</strong></Typography>
				<br/>
                <Typography variant="caption">All information gathered on Fantasyjutsu is securely stored within Fantasyjutsu- controlled database. The database is stored on servers secured behind a firewall; access to such servers being password-protected and strictly limited based on need-to-know basis. However, we understand that as effective as our security measures are, no security system is impenetrable. Thus, we cannot guarantee the security of our database, nor can we guarantee that information you supply will not be intercepted while being transmitted to us over the Internet. Further, any information you include in a posting to the discussion areas will be available to anyone with Internet access. By using the Portal, you understand and agree that your information may be used in or transferred to countries other than India.</Typography>
				<br/>
                <Typography variant="caption">Fantasyjutsu also believes that the internet is an ever-evolving medium. We may periodically review from time to time and change our privacy policy to incorporate such future changes as may be considered appropriate, without any notice to you. Our use of any information we gather will always be consistent with the policy under which the information was collected, regardless of what the new policy may be. Any changes to our privacy policy will be posted on this page, so you are always aware of what information we collect, how we use it, how we store it and under what circumstances we disclose it.</Typography>
				<br/>
                <Typography variant="caption"><strong>Advertising:</strong></Typography>
				<br/>
                <Typography variant="caption">When Fantasyjutsu presents information to it's online advertisers -- to help them understand our audience and confirm the value of advertising on the Portal -- it is usually in the form of aggregated statistics on traffic to various pages within our site. When you register with Fantasyjutsu, we contact you from time to time about updating your content to provide features which we believe may benefit you.</Typography>
				<br/>
                <Typography variant="caption">Several deceptive emails, websites, blogs etc. claiming to be from or associated with Fantasyjutsu may or are circulating on the Internet. These emails, websites, blogs etc. often include our logo, photos, links, content or other information. Some emails, websites, blogs etc. call the user to provide login name, password etc. or that the user has won a prize/ gift or provide a method to commit illegal/ unauthorized act or deed or request detailed personal information or a payment of some kind. The sources and contents of these emails, websites, blogs etc. and accompanying materials are in no way associated with Fantasyjutsu. For your own protection, we strongly recommend not responding to emails or using websites, blogs etc. We may use the information provided by you to Fantasyjutsu, including your email address or phone number, to contact you about the Services  availed by you or to inform you of our updated Services if any.</Typography>
				<br/>
                <Typography variant="caption"><strong>Conditions of Use:</strong></Typography>
				<br/>
                <Typography variant="caption">FANTASYJUTSU DOES NOT WARRANT THAT THIS PORTAL, IT’S SERVERS, OR EMAIL SENT BY US OR ON OUR BEHALF ARE VIRUS FREE. Fantasyjutsu WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THIS PORTAL, INCLUDING, BUT NOT LIMITED TO COMPENSATORY, DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL AND CONSEQUENTIAL DAMAGES, LOSS OF DATA, GOODWILL, BUSINESS OPPORTUNITY, INCOME OR PROFIT, LOSS OF OR DAMAGE TO PROPERTY AND CLAIMS OF THIRD PARTIES. IN NO EVENT WILL FANTASYJUTSU BE LIABLE FOR ANY DAMAGES WHATSOEVER IN AN AMOUNT IN EXCESS OF AN AMOUNT OF INR 10.</Typography>
				<br/>
                <Typography variant="caption"><strong>Retention of Data:</strong></Typography>
				<br/>
                <Typography variant="caption">Your personal information may be retained and may continue to be used until: (i) the relevant purposes for the use of your information described in this Privacy Policy are no longer applicable; and (ii) we are no longer required by applicable law, regulations, contractual obligations or legitimate business purposes to retain your personal information and the retention of your personal information is not required for the establishment, exercise or defense of any legal claim.</Typography>
				<br/>
                <Typography variant="caption"><strong>Applicable Law and Jurisdiction:</strong></Typography>
				<br/>
                <Typography variant="caption">By visiting this Portal, you agree that the laws of the Republic of India without regard to its conflict of laws principles, govern this Privacy Policy and any dispute arising in respect hereof shall be subject to and governed by the dispute resolution process set out in the <a href="https://www.Fantasyjutsu.com/terms" target="_blank">Terms and Conditions</a>. </Typography>
				<br/>
                <Typography variant="caption"><strong>Updating Information:</strong></Typography>
				<br/>
                <Typography variant="caption">You will promptly notify Fantasyjutsu if there are any changes, updates or modifications to your information. Further, you may also review, update or modify your information and user preferences by logging into your Profile page on the Portal.&nbsp;</Typography>
				<br/>
                <Typography variant="caption"><strong>Contact Us:</strong></Typography>
				<br/>
                <Typography variant="caption">Any questions or clarifications with respect to this Policy or any complaints, comments, concerns or feedback can be sent to Fantasyjutsu at: <a href="mailto:support@Fantasyjutsu.com"><span class="s1">support@Fantasyjutsu.com</span></a>&nbsp;or by normal/physical mail addressed to:</Typography>
				<br/>
 
			</Paper>

 
            </Container>
        </div>
    );

}