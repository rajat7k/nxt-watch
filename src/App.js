import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import GamingPage from './pages/GamingPage';
import SavedVideosPage from './pages/SavedVedioPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <LoginPage/> }  />
        <Route path='/' element={<HomePage/>} />
        <Route path='/trending' element={ <TrendingPage/> } />
        <Route path='/gaming' element={ <GamingPage/> } />
        <Route path='/saved-videos' element={ <SavedVideosPage/> } />
      </Routes>
    </Router>
  )
}
