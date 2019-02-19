

    isIncognito(function(itIs){
        if(itIs){
          console.log("You are in incognito mode");
        }else{
          console.log("You are NOT in incognito mode");
        }
    });  

    function isIncognito(callback){
        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;

        if (!fs) {
            callback(false);
        } else {
            fs(window.TEMPORARY,
                100,
                callback.bind(undefined, false),
                callback.bind(undefined, true)
            );
        }
    }  
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      console.log("This browser  support desktop notification");
    }      
    if (Notification.permission === 'denied') {  
      console.log("Notification.permission  is denied")
    } else {
      console.log("Notification.permission  is allowed")
    }

    // step--01
    // Initialize Firebase
    // var config = {
    //   apiKey: "AIzaSyDS_C3TZgxS-blH2Q1QjnGdTX41198yw1U",
    //   authDomain: "repair-b974d.firebaseapp.com",
    //   databaseURL: "https://repair-b974d.firebaseio.com",
    //   projectId: "repair-b974d",
    //   storageBucket: "repair-b974d.appspot.com",
    //   messagingSenderId: "626157948636"
    // };

    // firebase.initializeApp(config);
    // const database = firebase.database();
    // // step--02
    // // Retrieve Firebase Messaging object.
    // const messaging = firebase.messaging();
      
    messaging.usePublicVapidKey("BKsArxACO_ucIeJcV5bNCXTigL0XYSP5QpvqV4Z_YTuFZg028n6WGfQdvH7uYLmtd_5JCHy3CVjLgXRPJFLj3Qg");

   
    // firebase.messaging().onMessage(notification => {
    //   alert('Notification received!', notification);
    // });    
    // IDs of divs that display Instance ID token UI or request permission UI.
    const tokenDivId = 'token_div';
    const permissionDivId = 'permission_div';
    // step--03
    messaging.requestPermission().then(function() {
      // navigator.serviceWorker.register('firebase-messaging-sw.js')
      // .then((registration) => {
      //   messaging.useServiceWorker(registration);
      
      //   // Request permission and get token.....
      // });        
      console.log('Notification permission granted.');
      if('serviceWorker' in navigator) {
        console.log("serviceWorker  is supportted")
        // navigator.serviceWorker.register("firebase-messaging-sw.js").then(function() { //Include the service worker js file
        //   //Registration worked
        // }).catch(function() {
        //   //Registration didn't work
        // }); 
        messaging.useServiceWorker('sw.js');               
        // firebase.messaging().useServiceWorker('firebase-messaging-sw.js')           
     }      
      if (!isTokenSentToServer()) {
          getRegisterToken();
      } else {
        console.log('Token already exist !!');
        getRegisterToken();
      }   
      //  getRegisterToken();
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }).catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });

    // step--04 
    function getRegisterToken(){
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken().then(function(currentToken) {
        console.log("currentToken" , currentToken)
        if (currentToken) {
          sendTokenToServer(currentToken);
          updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          updateUIForPushPermissionRequired();
          setTokenSentToServer(false);
        }
      }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
      });
    }

    // step--05
    // Send the Instance ID token your application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    function sendTokenToServer(currentToken) {
      if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        var json = {
          token: currentToken
        }      
        var json1 = {
          [currentToken] : new Date().toLocaleString()
        }              
        database.ref("/token/" + currentToken ).set(new Date().toLocaleString()).then(function () {
            alert("insertData 成功");
        }).catch(function () {
            alert("伺服器發生錯誤，請稍後再試");
        })           
        setTokenSentToServer(true);
      } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
      }
    }

    // step--06
    function isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') === '1';
    }
    function setTokenSentToServer(sent) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }

    function updateUIForPushEnabled(currentToken) {
      showHideDiv(tokenDivId, true);
      showHideDiv(permissionDivId, false);
      showToken(currentToken);
    }
    function updateUIForPushPermissionRequired() {
      showHideDiv(tokenDivId, false);
      showHideDiv(permissionDivId, true);
    }

    function showToken(currentToken) {
      // Show token in console and UI.
      var tokenElement = document.querySelector('#token');
      tokenElement.textContent = currentToken;
    }

    function showHideDiv(divId, show) {
      const div = document.querySelector('#' + divId);
      if (show) {
        div.style = 'display: visible';
      } else {
        div.style = 'display: none';
      }
    }
    function deleteToken() {
        // setTokenSentToServer(false);
        // Delete Instance ID token.
        // [START delete_token]
        messaging.getToken().then(function(currentToken) {
          // messaging.deleteToken(currentToken).then(function() {
          //   console.log('Token deleted.');
          //   setTokenSentToServer(false);
          //   // [START_EXCLUDE]
          //   // Once token is deleted update UI.
          //   // resetUI();
          //   // [END_EXCLUDE]
          // }).catch(function(err) {
          //   console.log('Unable to delete token. ', err);
          // });
          // [END delete_token]
          var ref = database.ref('token/' + currentToken);  

          ref.remove()
          .then(function() {
            setTokenSentToServer(false);
            alert("Remove succeeded.")
          })
          .catch(function(error) {
            alert("Remove failed: " + error.message)
          });          
        }).catch(function(err) {
          console.log('Error retrieving Instance ID token. ', err);
          showToken('Error retrieving Instance ID token. ', err);
        });
      }
      // function resetUI() {
      //   clearMessages();
      //   showToken('loading...');
      //   // [START get_token]
      //   // Get Instance ID token. Initially this makes a network call, once retrieved
      //   // subsequent calls to getToken will return from cache.
      //   messaging.getToken().then(function(currentToken) {
      //     if (currentToken) {
      //       sendTokenToServer(currentToken);
      //       updateUIForPushEnabled(currentToken);
      //     } else {
      //       // Show permission request.
      //       console.log('No Instance ID token available. Request permission to generate one.');
      //       // Show permission UI.
      //       updateUIForPushPermissionRequired();
      //       setTokenSentToServer(false);
      //     }
      //   }).catch(function(err) {
      //     console.log('An error occurred while retrieving token. ', err);
      //     showToken('Error retrieving Instance ID token. ', err);
      //     setTokenSentToServer(false);
      //   });
      //   // [END get_token]
      // }  
      // function clearMessages() {
      //   const messagesElement = document.querySelector('#messages');
      //   while (messagesElement.hasChildNodes()) {
      //     messagesElement.removeChild(messagesElement.lastChild);
      //   }
      // }  

      messaging.onMessage(function(payload) {
        // alert("Message received.")
        // console.log(payload);
        var title = payload.data.title;
        var options = {
          body : payload.data.body , 
          icon : payload.data.icon , 
          image : payload.data.image                 
        }
        var myNotification = new Notification(title, options);
  
      });     
     
   