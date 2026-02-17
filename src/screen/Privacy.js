import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView ,Linking} from 'react-native';

export default Privacy = ({}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const handlePress = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

   const handleLinkPress = () => {
    // Replace with the actual URL you want to open
    Linking.openURL('https://bworth.co.in/privacypolicy');
  };
    const handleEmailPress = () => {
    // This will open the user's default mail client (like Gmail) to send an email to info@bworth.co.in
    Linking.openURL('mailto:info@bworth.co.in');
  };


  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
     <Text style={styles.sectionTitle}>Privacy Policy</Text>
    <View style={{paddingTop:30}}></View>
      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('welcome')}>
        <Text style={styles.sectionTitle}>Introduction</Text>
      </TouchableOpacity>
      {expandedSection === 'welcome' && (
        <Text style={styles.sectionContent}>
       We value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how Bworth Technologies Private Limited and its affiliates (collectively referred to as "Bworth," "we," "our," or "us") collect, use, share, protect, or otherwise process your personal data through the BWorth website https://bworth.co.in. While certain sections of the Platform can be browsed without registering, please note that we do not offer any product/service under this Platform outside India. Your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information, or availing of any product/service offered on the Platform, you expressly agree to be bound by this Privacy Policy, the Terms of Use, and applicable product/service terms and conditions, and consent to the processing of your data in accordance with Indian laws, including applicable data protection and privacy laws. If you do not agree, please do not use or access our Platform. </Text>
      )}

      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('collection')}>
        <Text style={styles.sectionTitle}>Data Collection
</Text>
      </TouchableOpacity>
      {expandedSection === 'collection' && (
        <Text style={styles.sectionContent}>
       We collect personal data related to your identity, demographics, and interactions with the Platform to provide services and ensure a seamless user experience. Information collected includes but is not limited to:
Information Provided by You:


Name, date of birth, address, contact details (telephone/mobile/email), and identification or address proofs.
Sensitive personal data (e.g., bank account details, payment instrument details, biometric data) with your explicit consent.
Behavioral and Device Information:


Shopping behavior, preferences, browsing history, IP address, and call data records.
Device location, voice, and images shared on the Platform (e.g., for certain shopping features).
Transactional Data:


Billing details, transaction history, and loyalty program participation data.
Third-Party Sources:


Data shared via third-party loyalty programs or business partners, governed by their respective privacy policies.
Public Interactions:


Information posted in public forums (e.g., message boards, reviews) that can be read by others.
 </Text>
      )}

      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('Use')}>
        <Text style={styles.sectionTitle}>Data Use</Text>
      </TouchableOpacity>
      {expandedSection === 'Use' && (
        <Text style={styles.sectionContent}>
        We use the collected data to:
Provide and improve services, process transactions, and enhance the customer experience.
Handle orders, resolve disputes, troubleshoot issues, and prevent fraud or illegal activities.
Send promotional communications (with an option to opt out).
Conduct market research, surveys, and analytics to understand user preferences.
Personalize Platform content and advertisements.
Cookies: We use cookies to enhance user experience, analyze web traffic, and improve the Platform. Third-party cookies (e.g., Google Analytics) may also be used for analytics and marketing. Users can manage cookie preferences via browser settings.
</Text>
      )}

      {/* <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('Cookies')}>
        <Text style={styles.sectionTitle}>Cookies</Text>
      </TouchableOpacity>
      {expandedSection === 'Cookies' && (
        <Text style={styles.sectionContent}>
          We use data collection devices such as "cookies" on certain pages of the Platform to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies" are small files placed on your hard drive that assist us in providing our services. Cookies do not contain any of your personal data. We offer certain features that are only available through the use of a "cookie". We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are "session cookies," meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline/delete our cookies if your browser permits, although in that case you may not be able to use certain features on the Platform and you may be required to re-enter your password more frequently during a session. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Platform that are placed by third parties. We do not control the use of cookies by third parties. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics helps us understand how our customers use the site. You can read more about how Google uses your personal data here. You can also opt-out of Google Analytics here. 
        </Text>
      )} */}

      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('Sharing')}>
        <Text style={styles.sectionTitle}>Data Sharing</Text>
      </TouchableOpacity>
      {expandedSection === 'Sharing' && (
        <Text style={styles.sectionContent}>
       Your personal data may be shared with:
Affiliates and Business Partners: To provide services, enable transactions, or offer products. These entities may market to you unless you opt out.
Government Agencies: To comply with legal obligations or respond to lawful requests.
Third Parties: For transaction facilitation (e.g., payment processors) or during business reorganizations, mergers, or acquisitions.
We ensure that any third party processing your data adheres to applicable privacy standards.
 </Text>
      )}

      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('SecurityPrecautions')}>
        <Text style={styles.sectionTitle}>Security Measures
</Text>
      </TouchableOpacity>
      {expandedSection === 'SecurityPrecautions' && (
        <Text style={styles.sectionContent}>
        We implement industry-standard security practices to protect your personal data from unauthorized access, misuse, or disclosure. While we strive to secure your data, users are responsible for safeguarding their account credentials. Data transmission over the internet cannot be guaranteed as fully secure.
</Text>
      )}

      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('Choice/Opt-Out')}>
        <Text style={styles.sectionTitle}>User Choices and Rights</Text>
      </TouchableOpacity>
      {expandedSection === 'Choice/Opt-Out' && (
        <Text style={styles.sectionContent}>
        1. Opt-Out: {"\n"}


- Users can opt out of promotional communications  via the provided unsubscribe links or by contacting {"\n"}  us. {"\n"}{"\n"}
2. Data Access and Rectification: {"\n"}


- Users may update or correct their personal data through  the Platform’s account settings. {"\n"}{"\n"}
3. Account Deletion: {"\n"}


- Users can delete their accounts via the Profile and Settings  section. Account deletion may result in the loss of order  history, preferences, loyalty rewards, and access to the Platform. Retention of certain data may be required for legal or legitimate business purposes.
{"\n"}{"\n"}4. Withdrawal of Consent:{"\n"}


- Consent for data processing can be withdrawn by contacting us. However, this may limit access to{"\n"}  certain services.
</Text>
      )}

      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('Children')}>
        <Text style={styles.sectionTitle}>Data Retention
</Text>
      </TouchableOpacity>
      {expandedSection === 'Children' && (
        <Text style={styles.sectionContent}>
       We retain personal data only as long as necessary to fulfill the purposes for which it was collected or as required under applicable laws. Anonymized data may be retained for analytics and research purposes.
 </Text>
      )}
  <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('DataDeletion')}>
        <Text style={styles.sectionTitle}>Children’s Privacy</Text>
      </TouchableOpacity>
      {expandedSection === 'DataDeletion' && (
        <Text style={styles.sectionContent}>
       The Platform is intended for users who can form legally binding contracts under the Indian Contract Act, 1872. We do not knowingly collect data from children under 18 years. If you share such data, you represent that you have the authority to do so.
 </Text>
      )}
      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('YourRights')}>
        <Text style={styles.sectionTitle}>Third-Party Links and Advertisements</Text>
      </TouchableOpacity>
      {expandedSection === 'YourRights' && (
        <Text style={styles.sectionContent}>
        Our Platform may include links to third-party websites. We are not responsible for the privacy practices or content of such external sites. Users are encouraged to review third-party privacy policies.
</Text>
      )}
      

      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('Consent')}>
        <Text style={styles.sectionTitle}>Policy Updates</Text>
      </TouchableOpacity>
      {expandedSection === 'Consent' && (
        <Text style={styles.sectionContent}>
       We may update this Privacy Policy periodically to reflect changes in our practices. Updates will be notified via the Platform or email where required by law. Users are encouraged to review the Privacy Policy regularly. </Text>
      )}
      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('BuybackPolicy')}>
        <Text style={styles.sectionTitle}>Buyback Policy for BWorth</Text>
      </TouchableOpacity>
      {expandedSection === 'BuybackPolicy' && (
        <Text style={styles.sectionContent}>
          Effective Date: 24 Oct 2024 {"\n"}
          At BWorth, we value sustainability and customer satisfaction. Our Buyback Policy allows you to return previously purchased items and avail BWorth credits, helping you refresh your wardrobe while promoting eco-friendly practices.{"\n"}
          {"\n"}
          Eligibility{"\n"}
          1. Timeframe: Items are eligible for buyback instantly from the date of purchase with BWorth.
{"\n"}2.Condition: Items must be in wearable good condition, free from significant wear and tear, stains, or odours.
{"\n"}3. Original Purchase: The item must have been purchased from BWorth platform only and should include proof of purchase (receipt / order confirmation / Order ID).
 {"\n"}{"\n"}
 Buyback Process {"\n"}
 1.Requesting a Buyback:{"\n"}
 - Customers can initiate a buyback request by logging into their account on the BWorth app.{"\n"}
- Navigate to “My Orders” and select the item you wish to return under the buyback policy.{"\n"}
- Click on the “Avail buyback” option and follow the further steps.{"\n"}{"\n"}
Shipping:{"\n"}
- Once buyback is approved, you will receive a confirmation via email.{"\n"}
- The delivery partner will arrive at your doorstep to pick up the buyback item.{"\n"}
- BWorth credits to be provided within 48 hours.{"\n"}{"\n"}
Inspection:{"\n"}
- Upon receiving the item, our team will inspect it to ensure it meets our buyback criteria.{"\n"}
- You will be notified of the inspection outcome within 2 working days.{"\n"}{"\n"}
BWorth Credit{"\n"}



        </Text>
      )}
       <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('BworthCredit')}>
        <Text style={styles.sectionTitle}>BWorth Credit
</Text>
      </TouchableOpacity>
     {expandedSection === 'BworthCredit' && (
  <View style={{ padding: 16, backgroundColor: '#fff' }}>
    {/* Intro text above the table */}
    <Text style={{ marginBottom: 8,color :'#000' }}>
      Credit Amount:{"\n"}
      - The BWorth credit will be determined based on the condition and original
      price of the item, generally ranging as per below table -
    </Text>

    {/* Table starts here */}
    <View
      style={{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      {/* Header Row */}
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#000',
          backgroundColor: '#f2f2f2',
        }}
      >
        <Text
          style={{
            flex: 1,
            padding: 12,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#000',
          }}
        >
          Period (in Months)
        </Text>
        <Text
          style={{
            flex: 1,
            padding: 12,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#000',
          }}
        >
          Credit %
        </Text>
      </View>

      {/* Data Rows */}
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#000',
        }}
      >
        <Text style={{ flex: 1, padding: 12,color :'#000' }}>0-2</Text>
        <Text style={{ flex: 1, padding: 12 ,color :'#000'}}>22</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#000',
        }}
      >
        <Text style={{ flex: 1, padding: 12 ,color :'#000'}}>3-5</Text>
        <Text style={{ flex: 1, padding: 12,color :'#000' }}>19</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#000',
        }}
      >
        <Text style={{ flex: 1, padding: 12 ,color :'#000'}}>6-9</Text>
        <Text style={{ flex: 1, padding: 12 ,color :'#000'}}>15</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#000',
        }}
      >
        <Text style={{ flex: 1, padding: 12,color :'#000' }}>10-12</Text>
        <Text style={{ flex: 1, padding: 12 ,color :'#000'}}>10</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text style={{ flex: 1, padding: 12,color :'#000' }}>12+</Text>
        <Text style={{ flex: 1, padding: 12 ,color :'#000'}}>5</Text>
      </View>
    </View>
    {/* Table ends here */}

    {/* Remaining text after table */}
    
    <Text style={{ marginBottom: 8,color :'#000' }}>
      Redemption:{"\n"}
      - BWorth credits can be fully redeemed during checkout on future purchases.{"\n"}
      - BWorth Credits will expire within 180 days and need to be used within the
      specified period of 180 days.
    </Text>
  </View>
)}

         <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('limitations')}>
        <Text style={styles.sectionTitle}>Limitations

</Text>
      </TouchableOpacity>
      {expandedSection === 'limitations' && (
        <Text style={styles.sectionContent}>
       - The buyback policy is subject to change, and BWorth reserves the right to modify terms as necessary.


        </Text>
      )}
      <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('customerSupportt')}>
        <Text style={styles.sectionTitle}>Customer Support


</Text>
      </TouchableOpacity>
       {expandedSection === 'customerSupportt' && (
        <Text style={styles.sectionContent}>
      For any questions regarding the Buyback Policy, please contact our customer support team at info@bworth.co.in.
{"\n"}
Thank you for supporting sustainable fashion with BWorth!!

        </Text>
      )}

      
       <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('ContactInfo')}>
        <Text style={styles.sectionTitle}>Contact Information
</Text>
      </TouchableOpacity>
      {expandedSection === 'ContactInfo' && (
        <Text style={styles.sectionContent}>
For queries or concerns regarding this Privacy Policy, contact our Grievance Officer at {' '}
        <Text style={{color: 'blue',
    textDecorationLine: 'underline',}} onPress={handleEmailPress}>
          info@bworth.co.in
        </Text>{' '}.
 {"\n"} {"\n"}

Grievance Officer {"\n"}
Mr. Dheeraj Anand {"\n"}
Designation:  {"\n"}
BWorth Technologies Pvt Ltd , {"\n"}
4, Sector 44 Rd, Kanahi, Gurugram, Haryana 122003 {"\n"}
Contact us:{' '}
        <Text style={{color: 'blue',
    textDecorationLine: 'underline',}} onPress={handleEmailPress}>
          info@bworth.co.in
        </Text>{' '} {"\n"}
Phone: +91 88 2666 8050 {"\n"}
Time: Monday - Friday (9:00 - 18:00) {"\n"}
Customer Support: You can reach our customer support team to address any of your queries or complaints by clicking the link:   <Text style={{ color: 'blue',
    textDecorationLine: 'underline'}} onPress={handleLinkPress}>here
        </Text>
 </Text>
      )}
       <TouchableOpacity style={styles.sectionButton} onPress={() => handlePress('Queries')}>
        <Text style={styles.sectionTitle}>Queries</Text>
      </TouchableOpacity>
      {expandedSection === 'Queries' && (
        <Text style={styles.sectionContent}>
      If you have a query, concern, or complaint in relation to collection or usage of your personal data under this Privacy Policy, please contact us at the contact information provided above.
</Text>
      )}
      {/* //end */}
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
   scrollContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  container: {
    padding: 15,
    backgroundColor: '#fcfcfc',
  },
  sectionButton: {
    backgroundColor: '#a5d6a7',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#81c784',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionContent: {
    color: '#424242',
    fontSize: 14,
    marginVertical: 8,
    lineHeight: 20,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
});
