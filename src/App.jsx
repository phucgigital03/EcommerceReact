import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './components/products/Products'
import Home from './components/homes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/shared/NavBar'
import About from './components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
  )
}

export default App
