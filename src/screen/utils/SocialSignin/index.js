import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
export async function onFacebookButtonPress() {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
export async function onGoogleButtonPress() {
  //   auth().signOut();
  //   console.log('siggn out');

  //   return;
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    // console.log('-----here');
    console.log(error);
  }
}
export async function onGoogleSignOut() {
  try {
    // Sign out from Firebase Authentication
    await auth().signOut();

    // Sign out from Google Sign-In
    await GoogleSignin.signOut();

    console.log('User signed out successfully');
  } catch (err) {
    console.error('Sign out failed:', err);
  }
}
