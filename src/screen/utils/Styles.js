import {StyleSheet} from 'react-native';
import {widthPrecent as wp, heightPercent as hp} from './responsive';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    

  },
  image: {
    width: 300,
    height: 100,
    marginBottom: 0,
    marginLeft: 0, // Add left margin
    marginRight: 100, // Add right margin
  },
  bannerImage: {
    width: 300,
    height: 100,
    marginBottom: 0,
    marginLeft: 0, // Add left margin
    marginRight: 100, // Add right margin
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    height: 48,
    backgroundColor: 'blue',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: 'blue',
    fontSize: 14,
    marginBottom: 16,
  },
  signUp: {
    fontSize: 14,
    marginTop: 16,
  },
  //////////////////css
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo1: {
    width: wp(40),
    height: hp(9),
    /// resizeMode: 'contain',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 8,
    width: 100,
    borderRadius: 5,
  },
  balanceText: {
    color: '#fff',
    marginLeft: 5,
  },
  cartContainer: {
    // position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  menuItem: {
    marginHorizontal: 8,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  container2: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 5,
  },
  //////////////////css
  signUpLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  // ..css for phone verification
  container1: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titlep: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  titleps: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title1: {
    fontSize: 24,
    marginBottom: 20,
  },
  title2: {
    fontSize: 15,
    marginBottom: 20,
  },
  formGroup1: {
    marginBottom: 20,
  },
  label1: {
    marginBottom: 5,
  },
  label2: {
    marginBottom: 5,
    textAlign: 'center',
  },
  title3: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },

  input1: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 55,
  },
  button1: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 55,
    alignItems: 'center',
  },
  buttons1: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 55,
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  buttontoken1: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 55,
    alignItems: 'center',
  },
  buttonText1: {
    color: '#fff',
    fontSize: 16,
  },

  buttonTexts1: {
    color: 'grey',
    fontSize: 16,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextt2: {
    color: '#fff',
    fontSize: 16,
  },

  or1: {
    marginVertical: 20,
    alignItems: 'center',
  },
  socialLogin1: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 50,
  },
  socialButton1: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  facebook1: {
    backgroundColor: '#3b5998',
  },
  google1: {
    backgroundColor: '#db4a39',
  },
  instagram1: {
    backgroundColor: '#e4405f',
  },
  socialButtonText1: {
    color: '#fff',
  },
  signup1: {
    alignItems: 'center',
  },
  signupButton1: {
    marginTop: 10,
  },
  signupButtonText1: {
    color: '#007bff',
  },
  //css otp verif
  otpinputcontainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  //css for pin code
  container3: {
    flex: 2,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // optional: to add a semi-transparent overlay
  },
  halfBlackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'white',
  },
  halfBlackC: {
    position: 'absolute',
    //  borderColor: 'grey',
    borderBottomColor: '#BABABA',
    borderBottomWidth: 1,
    borderLeftColor: '#BABABA',
    borderLeftWidth: 1,
    borderRightColor: '#BABABA',
    borderRightWidth: 1,
    //  borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'white',
    shadowColor: '#000000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5,
  },
  halfBlackContainer1: {
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    bottom: 240,
    left: 30,
    right: 30,
    height: '30%',
    backgroundColor: 'white',
    shadowColor: '#000000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5,
  },
  // textpincode: {
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // },
  modalButton: {
    backgroundColor: '#2AAFE5',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // width: '100%',
  },
  yesButton: {
    width: 60,
    marginRight: 40,
    backgroundColor: '#2AAFE5', // Green for "Yes"
    borderRadius: 35,
    //         borderWidth: 1,
  },
  noButton: {
    width: 60,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 35,
    borderWidth: 1, // Add a border width
    borderColor: 'grey', // Set the border color
  },
  t1: {
    paddingTop: 60,
    fontSize: 18,
    color: '#000000',
  },
  t2: {
    // paddingTop:20
    fontSize: 18,
    paddingBottom: 16,
    color: '#000000',
    fontWeight: '400',
  },
  t3: {
    // paddingTop:20
    fontSize: 15,
    paddingBottom: 16,
    color: '#000000',
    fontWeight: '400',
    textAlign:'center'
  },
});
