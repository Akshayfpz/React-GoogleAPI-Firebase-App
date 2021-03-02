import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/database";

const initializedFirebaseApp = firebase.initializeApp({
     // Project Settings => Add Firebase to your web app
	 apiKey: "AIzaSyBgxl_OAn5SHDyRD4ijn6aKAIkHNmQBh78",
	 authDomain: "angular-fc747.firebaseapp.com",
	 databaseURL: "https://angular-fc747.firebaseio.com",
	 projectId: "angular-fc747",
	 storageBucket: "angular-fc747.appspot.com",
	 messagingSenderId: "299138396800",
	 appId: "1:299138396800:web:c0c9ea30919d4f50"
});
const messaging = initializedFirebaseApp.messaging();

export default firebase.database();
export { messaging };