import * as firebase from 'firebase'
import 'firebase/firestore';

let config = {
    apiKey: "AIzaSyD-vyAcZ-BF7MiJ6RVX5Py5ZNdl7T5C8l4",
    authDomain: "dashboard-998fa.firebaseapp.com",
    databaseURL: "https://dashboard-998fa.firebaseio.com",
    projectId: "dashboard-998fa",
    storageBucket: "dashboard-998fa.appspot.com",
    messagingSenderId: "100447578947",
    appId: "1:100447578947:web:30eeeb51c90f2b8d875df6"
};


export default !firebase.apps.length
    ? firebase.initializeApp(config).database()
    : firebase.app().database();

export const db = firebase.database();

