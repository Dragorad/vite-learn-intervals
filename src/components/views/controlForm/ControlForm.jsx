import React, { Component } from 'react'
import jquery from 'jquery'
import ControlFields from './ControlFields.jsx'
import IntervalButtonsWrap from './IntervalButtonsWrap.jsx'
import { connect } from 'react-redux'
import * as actions from '../../../redux/actions/indexActions.js'
import languagesText from '../../../LanguagesData/LanguagesText.js'
import muzWorker from '../../../appWorkers/intervalWorker.js'
import toast from 'react-hot-toast'

let $ = jquery
let testIntervalData = {
    timeForAnswer: 0,
    numberOfTasks: 0
}

function mapForMuzWorkerGenerateTest(intervalsForTest, language) {

    testIntervalData['intervalsForTest'] = intervalsForTest.serializeArray().map(function (el) {
        // console.log(el)
        let elName = Object.values(muzWorker.intervals).find(elem => elem.name[language] === el.name)
        return {
            name: elName.name,
            trueAnswers: 0,
            falseAnswers: 0
        }

    }
    )
}

class ControlForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.redirectPage.bind(this)
    }

    redirectPage() {
        this.props.push('/work-pane', testIntervalData)
    }

    handleInputChange(event) {
        event.preventDefault()
        let target = event.target
        let value = target.value
        testIntervalData[target.name] = Number(target.value)
        this.setState({ [target]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        let intervalsForTest = $('input[type="checkbox"]:checked').not(
            $('#select-all'))
        let alerts = languagesText[this.props.language].alerts
        let { timeForAnswer, numberOfTasks } = testIntervalData
        if (timeForAnswer < 2 || timeForAnswer > 20) {
            toast.info(alerts.alertTime)
            return
        }
        if (numberOfTasks < 2) {
            toast.warning(alerts.alertTasks)
            return
        }
        let language = this.props.language

        mapForMuzWorkerGenerateTest(intervalsForTest, language)

        if (intervalsForTest.length === 0) {
            toast.error(alerts.alertIntervals)
        } else {
            let bgIntervalsForTest = [...testIntervalData.intervalsForTest].map(el => el.name.bg)
            this.props.generateTestArr(
                bgIntervalsForTest,
                numberOfTasks
            )
            this.props.setTestIntervalData(testIntervalData)
            this.props.setPointsPerAnswer(testIntervalData)
            this.props.history.push('/work-pane')
        }
    }

    componentDidMount() {
        let boxes = $('input[type = "checkbox"]')
        let selectAllBox = $('#select-all')
        let deselectAllBox = $('#deselect-all')
        let simpleBoxes = boxes.filter((i, el) => Number(el.value) < 13)
        // // console.log(selectAllBox)
        selectAllBox.on('click', function () {
            simpleBoxes.prop('checked', true)
        })
        deselectAllBox.on('click', function () {
            boxes.prop('checked', false)
        })
    }

    render() {
        return (
            <form
                method='GET'
                action='#/conditions'
                className='control-form'
                onSubmit={this.handleSubmit}
            >
                <div className='fields-wrap'>
                    <ControlFields
                        handleInputChange={this.handleInputChange}
                    />

                    <IntervalButtonsWrap
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    testArr: state.testArr,
    language: state.languageSelected
})
const mapDispatchToProps = dispatch => ({
    setTestIntervalData: testIntervalData =>
        dispatch(actions.setTestIntervalData(testIntervalData)),
    generateTestArr: (intervalsForTest, numberOfTasks) =>
        dispatch(actions.generateTestArr(intervalsForTest, numberOfTasks)),
    setPointsPerAnswer: testIntervalData =>
        dispatch(actions.setPointsPerAnswer(testIntervalData))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlForm)
