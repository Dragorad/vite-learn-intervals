import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import {uiConfig} from '../../../appWorkers/firebaseWorker'
import { setIsSigning, setIsSigned, setUserName } from "../../../redux/actions/indexActions"
import { connect } from "react-redux"
import toast from 'react-hot-toast';

const uiConfig = props => ({
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID

    ],
    credentialHelper: 'none',
    callbacks: {
        // Avoid redirects after sign-in.
        // showRedirectLocation: firebase.auth().getRedirectResult().then(result => console.log(result)),
        signInSuccessWithAuthResult: function (authResult) {
            props.setIsSigned(true)
            props.setIsSigning(false)
            let userName = authResult.user.displayName
            toast.success(`Welcome ${userName}`)
            props.setUserName(userName)
        }
    }
})

class SignInScreen extends React.Component {
    state = {
        isSignedIn: false
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                // console.log('user auth state is changing')
                this.props.setIsSigning(true)
                this.setState({ isSignedIn: !!user })
                // this.props.setIsSigned(!this.props.isSigned)
                // this.props.setIsSigning(!this.props.isSigning)
            }
        )
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.props.setIsSigning(false)
        this.props.setIsSigned(true)
        this.unregisterAuthObserver()

    }

    render() {
        return (
            <div className={'sign-in-screen'}>
                <h3>Sign in to Music intervals</h3>
                <StyledFirebaseAuth uiConfig={uiConfig(this.props)} firebaseAuth={firebase.auth()} />
            </div>
        )
    }
}

const mapStateToProps = store => ({
    isSigning: store.isSigning
})

const mapDispatchToProps = dispatch => ({
    setIsSigning: boolean => dispatch(setIsSigning(boolean)),
    setIsSigned: boolean => dispatch(setIsSigned(boolean)),
    setUserName: string => dispatch(setUserName(string)),
})

const UserForm = connect(mapStateToProps, mapDispatchToProps)(SignInScreen)

export default UserForm
