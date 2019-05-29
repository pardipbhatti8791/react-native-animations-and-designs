import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAPVoI3Xwhc9ggws9dmi0HAx5U6wmov9u8",
  authDomain: "react-native-designer.firebaseapp.com",
  databaseURL: "https://react-native-designer.firebaseio.com",
  projectId: "react-native-designer",
  storageBucket: "react-native-designer.appspot.com",
  messagingSenderId: "499229609762",
  appId: "1:499229609762:web:fa37a3b744a1a1a7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
