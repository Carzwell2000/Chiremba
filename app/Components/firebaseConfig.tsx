import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBtrBBzQBRjliFRq81YSU_vCZQL4Z7Q-rk",
    authDomain: "pharmacy-4c17b.firebaseapp.com",
    projectId: "pharmacy-4c17b",
    storageBucket: "pharmacy-4c17b.appspot.com",
    messagingSenderId: "983954503367",
    appId: "1:983954503367:web:b67a8cd37468a844def0e2",
    measurementId: "G-ELMPF4S7ML"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth; 