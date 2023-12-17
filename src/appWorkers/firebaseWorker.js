import {initializeApp} from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'
import {getAuth} from 'firebase/auth'

// export const FirebaseContext = React.createContext(null)


// export class FirebaseApp {
//     constructor() {
//         app.initializeApp(configAPI)
//         this.auth = app.auth()
//     }
// }
export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
