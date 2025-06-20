import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Registration } from './pages/registration/Registration'
import { Services } from './pages/services/Services'
import { Contact } from './pages/contact/Contact'
import { Gallry } from './pages/gallery/Gallry'
import { Appointment } from './pages/appointment/Appointment'
import { Admin } from './pages/admin/Admin'
import Layout from './layout/Layout'
import Footer from './layout/Footer'
import ServicesDetails from './components/servicesDetails/ServicesDetails';
import AdminAppointments from './components/adminAppoinments/AdminAppointments'
import AdminContact from './components/adminContact/AdminContact'

function App() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path='/' element={ <Home /> } /> 
        <Route path='/login' element={ <Login /> } /> 
        <Route path='/registration' element={ <Registration /> } /> 
        <Route path='/services' element={ <Services /> } /> 
        <Route path='/services/:id' element={ <ServicesDetails /> } />
        <Route path='/contact' element={ <Contact /> } /> 
        <Route path='/gallery' element={ <Gallry /> } />
        <Route path='/appointment' element={ <Appointment /> } />

        <Route path='/admin/dashboard' element={ <Admin /> } />
        <Route path='/admin/dashboard/appointments' element={<AdminAppointments />} />
        <Route path='/admin/dashboard/contacts' element={<AdminContact />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
