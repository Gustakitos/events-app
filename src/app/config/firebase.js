import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBcaBQgOcXm4WbeyhpkO2XFesRr9v9Ja0Y",
    authDomain: "revents-1554752341037.firebaseapp.com",
    databaseURL: "https://revents-1554752341037.firebaseio.com",
    projectId: "revents-1554752341037",
    storageBucket: "",
    messagingSenderId: "506022462764"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase