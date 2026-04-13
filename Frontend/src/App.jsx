
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'


import ProfilePage from './pages/dashboard/Profilepage'
import OffersPage from "./pages/dashboard/JobOffersPage";
import DocumentPage from "./pages/dashboard/DocumentPage";
import DocumentDetailsPage from "./pages/dashboard/DocumentDetailsPage";


function App() {
  return (
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
        <Route index element={<ProfilePage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="documents" element={<DocumentPage />} />
          <Route path="documents/:id" element={<DocumentDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
