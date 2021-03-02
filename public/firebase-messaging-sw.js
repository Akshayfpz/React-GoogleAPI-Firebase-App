// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = {
apiKey: "xxx",
authDomain: "xxxx",
databaseURL: "xxxx",
projectId: "xxxx",
storageBucket: "xxxx",
messagingSenderId: "xxxx",
appId: "xxxxx"
}

firebase.initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
       .matchAll({
            type: "window",
            includeUncontrolled: true,
       })
       .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                 const windowClient = windowClients[i];
                 windowClient.postMessage(payload);
            }
       })
       .then(() => {
            return registration.showNotification("my notification title");
       });
  return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
  console.log(event);
});
