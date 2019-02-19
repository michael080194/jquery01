
// importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-messaging.js');

var config = {
 apiKey: "AIzaSyDS_C3TZgxS-blH2Q1QjnGdTX41198yw1U",
 authDomain: "repair-b974d.firebaseapp.com",
 databaseURL: "https://repair-b974d.firebaseio.com",
 projectId: "repair-b974d",
 storageBucket: "repair-b974d.appspot.com",
 messagingSenderId: "626157948636"
};

firebase.initializeApp(config);
// step--02
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
 console.log('Received background message ', payload);

});
