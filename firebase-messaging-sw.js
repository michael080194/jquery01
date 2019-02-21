
importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-messaging.js');

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
 var title = payload.data.title;
 var options = {
   body : payload.data.body , 
   icon : payload.data.icon , 
   image : payload.data.image,
   data : {
      time : new Date(Date.now()).toString(),
      click_action : payload.data.click_action
   }                        
 };
 return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
 var action_click = event.notification.data.click_action;
 event.notification.close();

 event.waitUntil(
  clients.openWindow(action_click)
  );

});      

self.addEventListener('notificationclose', function(event) {
  alert("notification close");
});      
