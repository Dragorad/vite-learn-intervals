// import {initializeApp} from 'firebase/app'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {firebaseConfig} from './firebaseConfig'; 

// export const FirebaseContext = React.createContext(null)


// export class FirebaseApp {
//     constructor() {
//         app.initializeApp(configAPI)
//         this.auth = app.auth()
//     }
// }
export const firebaseApp = firebase.initializeApp(firebaseConfig)
// export const auth = getAuth(firebaseApp)
