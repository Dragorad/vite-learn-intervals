import React, { Component } from 'react'
import muzWorker from '../../../appWorkers/intervalWorker'
import IntervalGroup from './IntervalGroup'

let {intervals} = muzWorker
// let {secondMinor, secondMajor, thirdMinor, thirdMajor, ...rest} = intervals
// let {fourthPerfect, fourthAug, fifthDiminished, fifthPerfect} = rest
// let {sixthMinor, sixthMajor, seventhMinor, seventhMajor} = rest1


let fourthIntervals = [
  // intervals.octave,
  {
    idx: 13,
    name: {
      bg: 'избери всички',
      en: 'select-all'
    }
  },
  {
    idx: 14,
    name: {
      bg: 'освободи всички',
      en: 'deselect-all'
    }
  }]
let intervalsArr = Object.values(intervals)

// console.log(intervalsArr)
let intervalsGroups = [intervalsArr, fourthIntervals]

class IntervalButtonsWrap extends Component {
  constructor (props) {
    super(props)
    this.props.handleSubmit.bind(this)
    this.props.handleInputChange.bind(this)
  }
  
  render () {
    return (<div className='interval-buttons-wrap'>
        {intervalsGroups.map((groupX, i) => {
          return (
            <IntervalGroup
              handleInputChange={this.props.handleInputChange.bind(this)}
              handleEvent={this.props.handleEvent}
              key={i}
              group={groupX}
            />
          )
        })
        }
        <button value="send"
                onClick={this.props.handleSubmit.bind(this)}>GENERATE TEST/ ГЕНЕРИРАЙ ТЕСТ
        </button>
      </div>
    )
  }
}

export default IntervalButtonsWrap
