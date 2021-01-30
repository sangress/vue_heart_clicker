import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const firebaseCountRef = db.ref('/count');

const registerToCounts = (onValue) => {
     firebaseCountRef.on('value', snapshot => onValue(snapshot.val()));
}

const addClick = () => {
    firebaseCountRef.transaction(function(count) {
        return count + 1;
    })
}

export {addClick, registerToCounts}
