import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Soda from './Soda'
import Chips from './Chips'
import Cookies from './Cookies'
import Home from './Home'

function App() {

  return (
    <>

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/soda" element={<Soda/>} />
          <Route path="/chips" element={<Chips/>} />
          <Route path="/cookies" element={<Cookies/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
