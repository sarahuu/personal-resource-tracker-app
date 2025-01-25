import { useState } from 'react'
import { Route,Routes } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import WaterLogPage from './pages/WaterLogPage';
import EnergyLogPage from './pages/EnergyLogPage';

import Sidebar from './components/Sidebar';

function App() {
  return(
  <div className='flex h-screen bg-gray-500 text-gray-100 overflow-hidden'>
    {/*Background */}
    <div className='fixed inset-0 z-0'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 '/>
      <div className='absolute inset-0 backdrop-blur-sm'/>
    </div>
    <Sidebar/>
    <Routes>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/water-logs' element={<WaterLogPage/>}/>
      <Route path='/energy-logs' element={<EnergyLogPage/>}/>
    </Routes>
  </div>
  )
}

export default App;
