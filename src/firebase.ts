import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbWZu1vv7y8Dv8D_lg4CYBLf5sTX8GR6M",
  authDomain: "landing-constructor.firebaseapp.com",
  projectId: "landing-constructor",
  storageBucket: "landing-constructor.firebasestorage.app",
  messagingSenderId: "690412297605",
  appId: "1:690412297605:web:0634bf6a375a3d1cbeb8ec",
  measurementId: "G-1RNEGVP14E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };