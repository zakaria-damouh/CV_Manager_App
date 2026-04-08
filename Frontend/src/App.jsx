
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'


import ProfilePage from './pages/dashboard/Profilepage'
import ExperiencePage from "./pages/dashboard/ExperiencePage";
import LanguagesPage from "./pages/dashboard/LanguagesPage";
import FormationPage from "./pages/dashboard/FormationPage";
import SkillsPage from "./pages/dashboard/SkillsPage";
import OffersPage from "./pages/dashboard/JobOffersPage";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} />
        </Route>

         {/* Dashboard pages */}
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='profile' element={<ProfilePage />} />
          <Route path="experiences" element={<ExperiencePage />} />
          <Route path="languages" element={<LanguagesPage />} />
          <Route path="formations" element={<FormationPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="offers" element={<OffersPage />} />

       
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
