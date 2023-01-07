import { initializeApp } from "firebase/compat/app";
import { getStorage } from 'firebase/compat/storage';

const app = initializeApp ({
  apiKey: "AIzaSyAyf2Lk8w-05rERpJADOgIbHvE6YtEGZEQ",
  authDomain: "jamesoveobveznice.firebaseapp.com",
  projectId: "jamesoveobveznice",
  storageBucket: "jamesoveobveznice.appspot.com",
  messagingSenderId: "170246172688",
  appId: "1:170246172688:web:fb1e981c9f5c7209fb9a95"
});

// Initialize Firebase
const storage = getStorage(app);
export default storage;