import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/database";

const initializedFirebaseApp = firebase.initializeApp({
     // Project Settings => Add Firebase to your web app
	 apiKey: "xxxxxx",
	 authDomain: "xxxxx",
	 databaseURL: "xxxxxx",
	 projectId: "xxxxx",
	 storageBucket: "xxxxx",
	 messagingSenderId: "xxxxxxx",
	 appId: "xxxxxxx"
});
const messaging = initializedFirebaseApp.messaging();

export default firebase.database();
export { messaging };
