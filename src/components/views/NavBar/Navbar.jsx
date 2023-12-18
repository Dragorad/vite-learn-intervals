import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../redux/actions/indexActions'
import LanguageButtons from './LanguageButtons'
import { Link } from 'react-router-dom'
// import StatusArea from '../workArea/StatusArea'
import languagesText from '../../../LanguagesData/LanguagesText'
import toast from 'react-hot-toast'
// import firebase from 'firebase'
import SignInScreen from '../userForms/SignInScreen'
import SaveResultButton from './SaveResultButton.jsx'

function mapStateToProps(store) {
    return {
        isSigned: store.isSigned,
        isSigning: store.isSigning,
        userName: store.userName,
        language: store.languageSelected,
        testRendered: store.testRendered,
        numberOfTasks: store.testIntervalData.numberOfTasks,
        sessionPoints: store.sessionPoints,
        sessionAnswers: store.sessionAnswers,
        pointsPerAnswer: store.pointsPerAnswer,
        testIntervalData: store.testIntervalData
    }
}

const mapDispatchToProps = {
    ...actions
}

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idxClick: 0,
            answerVisible: false,
            answeringDisabled: false,
            testFinished: false,
            langButtonTxt: ['БГ', 'EN'],
            isSigning: false
        }
    }

    loginClicked(e) {
        e.preventDefault()

        this.props.setIsSigning(true)
        // this.setState({isSigning: true})
    }

    signingOut(event) {
        event.preventDefault()
        firebase.auth().signOut()
            .then(res => {
                toast.success(`User ${this.props.userName} has logged out`)
                this.setState({ signingIn: false })
                this.props.setIsSigned(false)
                this.props.setUserName('guest')
                this.props.setTimerWorking(false)
            })
    }

    componentWillUnmount() {
        this.unregisterAuthObserver()
    }

    render() {

        let userName = this.props.userName
        let isSigning = this.props.isSigning

        let addTxt = languagesText[this.props.language].header.titleTxt
        return (
            <header className='navbar'>
                <div className='nav-left'>
                    <h1 className={'summary-field'}> Intervals L</h1>
                    <h4 className={'summary-field'}>
                        {userName === 'guest' ?
                            addTxt :
                            <strong style={{ 'color': 'black' }}> Welcome {userName}</strong>}</h4>
                </div>
                {/* {this.props.testRendered && <StatusArea/>} */}
                <div className='nav-buttons'>
                    {this.props.testRendered && this.props.isSigned && <SaveResultButton />}

                    {this.props.isSigned ?
                        <button onClick={this.signingOut.bind(this)}
                        >Sign Out </button>
                        : <button
                            onClick={this.loginClicked.bind(this)}
                            style={{ display: isSigning ? 'none' : 'block' }}
                            className={'summary-field link'}>Login
                        </button>}
                    {this.props.isSigning && <SignInScreen />}
                </div>
                < LanguageButtons
                    strings={this.state.langButtonTxt} />
                <a href='/' className='button'>Help</a>
                {/* < Link
                    className={'button'}
                    to='/'>
                        Help </Link> */}


            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
