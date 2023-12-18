
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App'
import registerServiceWorker from './registerServiceWorker'

const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'))
export const ImgLoader = <img src="music-player-circle-start.svg" alt='Loading' />
root.render(
    <Suspense fallback={ImgLoader}>
        <App />
    </Suspense>
)
registerServiceWorker()
