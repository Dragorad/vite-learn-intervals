import { createContext } from "react"
// import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/views/Footer'
import Routes from './Routes'
import store from './redux/store/indexStore'
import { Provider } from 'react-redux'
import Navbar from './components/views/NavBar/Navbar.jsx'
import CustomToaster from './components/common/toaster/customToaster.jsx'

const AppContext = createContext(null);
const ContextProvider = ({ children }) => {
  return <AppContext.Provider value={{ saveResultEnabled: false }}>{children}</AppContext.Provider>;
}
const App = () => {
  console.log('rrender app')
  return (
    <ContextProvider>


      <Provider store={store}>
        {/* <div>React Vite Learn</div> */}
        <Navbar />
        <CustomToaster />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Footer />
      </Provider>
    </ContextProvider>


  )
}

export default App
