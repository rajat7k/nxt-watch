import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import GamingPage from './pages/GamingPage';
import SavedVideosPage from './pages/SavedVedioPage';
import ProtectedRoute from './components/ProtecedRoute';
import VideoDetailPage from './pages/VedioDetailPage';
import PublicRoute from './components/PublicRoute';
import NoRouteFoundPage from './pages/NoRouteFoundPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <PublicRoute><LoginPage/> </PublicRoute>}  />
        <Route path='/' element={ <ProtectedRoute><HomePage/></ProtectedRoute> } />
        <Route path='/trending' element={ <ProtectedRoute><TrendingPage/></ProtectedRoute> } />
        <Route path='/gaming' element={ <ProtectedRoute><GamingPage/> </ProtectedRoute>} />
        <Route path='/saved-videos' element={ <ProtectedRoute><SavedVideosPage/></ProtectedRoute> } />
        <Route path='/video/detail/:id' element={ <ProtectedRoute> <VideoDetailPage/> </ProtectedRoute> } />

        <Route path='*' element={<ProtectedRoute> <NoRouteFoundPage/> </ProtectedRoute>} />

      </Routes>
    </Router>
  )
}
