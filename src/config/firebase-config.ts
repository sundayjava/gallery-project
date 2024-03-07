import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAG-GvGuTVAznqZdkF3WiAKilEJ8491Qts",
  authDomain: "gallery-a6580.firebaseapp.com",
  projectId: "gallery-a6580",
  storageBucket: "gallery-a6580.appspot.com",
  messagingSenderId: "763333173627",
  appId: "1:763333173627:web:78c1e7cc9d136a4b675dde",
  measurementId: "G-LJMZT3B485"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)