// public/firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyB_D6w3eMcRcGnTPU6-plQ6JfVsnUEArxw",
  authDomain: "fcm-push-notification-ac9ef.firebaseapp.com",
  projectId: "fcm-push-notification-ac9ef",
  storageBucket: "fcm-push-notification-ac9ef.firebasestorage.app",
  messagingSenderId: "369868260414",
  appId: "1:369868260414:web:73ae3f316de7125ad37d6f",
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body: body,
    icon: "/vite.svg", // any icon in your public folder
  });
});
