import { firebaseApp } from './firebaseWorker'
import toast from 'react-hot-toast'
import 'firebase/compat/firestore'
import 'firebase/compat/app'
// import firebase from 'firebase'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, addDoc } from 'firebase/firestore'

const dataWorker = (() => {
  // const settings = {timestampsInSnapshots: true}
  console.log('dataWorker')
  const fire = firebaseApp
  const db = getFirestore(fire)

  
  function addResult(collectionName, resultObj) {
    // console.log('from dataWorker')
    console.log(resultObj)
    addDoc()


    collection(collectionName).add(resultObj)
      .then(function (docRef) {
        let id = docRef.id

        // console.log('Document written with ID:', id)
        let document = db.collection('results').doc(id)
        document.get()
          .then(doc => {
            // let timeSaved = doc.data().timeSaved.toDate().toLocaleDateString()
            toast.success(`result saved with id ${id}`)
            // notify.show(`result saved with id ${id}`, 'success')
            // console.log(timeSaved)

          })

      })
  }
  // const resultsQuery = db.collection('results').where('sessionPoints', '>', 0)
  //   .orderBy('sessionPoints', 'desc').limit(8)
  function getBestScores(collectionName) {
    // let that = this
    // console.log('fetch data started')
    return resultsQuery.get()
      .then(snapshot => {
        let scoresArr = []
        snapshot.forEach(
          doc => {
            let data = doc.data()

            // console.log(data.user + ' ' + data.sessionPoints)
            scoresArr.push(data)
          }
        )
        // console.log(scoresArr)

        return scoresArr
      }
      )
    // return resultsQuery
    // .onSnapshot(function (querySnapshot) {
    //   let scoresArr = []
    //   querySnapshot.forEach(
    //     doc => {
    //       let data = doc.data()
    //
    //       console.log(data.user + ' ' + data.sessionPoints)
    //       scoresArr.push(data)
    //     }
    //   )
    //   console.log(scoresArr)
    //
    //   return scoresArr
    // })

  }


  // db.collection.results
  return {
    // fire,
    // db,
    addResult,
    // getBestScores,
    // resultsQuery
  }
})()

export default dataWorker
// let collection = 'resultStats'
// let resultObj = {
//   littleSecond :{
//     trueAnswers: 3,
//     falseAnswers: 5
//   }
// }
// dataWorker.addResult(collection, resultObj)
