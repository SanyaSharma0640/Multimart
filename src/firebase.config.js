import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDWG6IKYiUpLvh2_KRnh4CCDD3bP3g762Q",
  authDomain: "shophive-92b34.firebaseapp.com",
  projectId: "shophive-92b34",
  storageBucket: "shophive-92b34.appspot.com",
  messagingSenderId: "177983736044",
  appId: "1:177983736044:web:6d7d692ec3980f7444fdc9",
  measurementId: "G-R3HNQ5L0JF"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);
export default app;