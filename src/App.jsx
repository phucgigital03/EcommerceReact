// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Products from './components/products/Products'
import Home from './components/homes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/shared/NavBar'
import About from './components/About'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './components/cart/Cart'
import LogIn from './components/auth/LogIn'
import PrivateRoutes from './components/PrivateRoutes'
import Register from './components/auth/Register'

function App() {

  return (
    <>
      <Router>
        <NavBar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>

          <Route path='/' element={<PrivateRoutes publicPage/>}>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/register' element={<Register/>}/>
          </Route>
        </Routes>
      </Router>

      <Toaster position="top-center"/>
    </>
  )
}

export default App
