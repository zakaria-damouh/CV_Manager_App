import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import HeaderMain from './components/layoutComponents/HeaderMain'
import Footer from './components/layoutComponents/Footer'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/dashboard/Profilepage'


function App() {
  return (
    <>
    <BrowserRouter>
    <HeaderMain />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard/*' element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
