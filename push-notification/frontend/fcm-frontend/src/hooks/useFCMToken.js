// src/hooks/useFCMToken.js

import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../lib/firebase";

const useFCMToken = () => {
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const requestPermissionAndGetToken = async () => {
      try {
        // Step 1: Ask browser for notification permission
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          console.log("Notification permission denied");
          return;
        }

        // Step 2: Get FCM token
        const fcmToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        if (fcmToken) {
          console.log("FCM Token:", fcmToken);
          setToken(fcmToken);

          // Step 3: Send token to your NestJS backend
          await fetch("http://localhost:3000/notifications/save-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: fcmToken }),
          });
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    requestPermissionAndGetToken();

    // Step 4: Listen for foreground notifications
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      setNotification(payload.notification);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { token, notification };
};

export default useFCMToken;