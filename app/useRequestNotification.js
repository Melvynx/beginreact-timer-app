import { useEffect } from "react";

const useRequestNotification = () => {
  useEffect(() => {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      new Notification("You are already subscribed to notifications.");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Thank you for subscribing to notifications!");
        }
      });
    }
  }, []);
};

export default useRequestNotification;
