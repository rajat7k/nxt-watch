import React from 'react'
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
import StoreState from './Context/StoreState';
import { routePath } from './constants/RouteConstants';
import './App.css';

export default function App() {
  return (
   <StoreState>
     <Router>
      <Routes>
        <Route path={routePath.loginPage} element={ <PublicRoute><LoginPage/> </PublicRoute>}  />

        <Route path={routePath.homePage} element={ <ProtectedRoute><HomePage/></ProtectedRoute> } />
        <Route path={routePath.trendingPage} element={ <ProtectedRoute><TrendingPage/></ProtectedRoute> } />
        <Route path={routePath.gamingPage} element={ <ProtectedRoute><GamingPage/> </ProtectedRoute>} />
        <Route path={routePath.savedVideoPage} element={ <ProtectedRoute><SavedVideosPage/></ProtectedRoute> } />
        <Route path={`${routePath.videoDetailPage}/:id`} element={ <ProtectedRoute> <VideoDetailPage/> </ProtectedRoute> } />

        <Route path='*' element={<ProtectedRoute> <NoRouteFoundPage/> </ProtectedRoute>} />
      </Routes>
    </Router>
   </StoreState>
  )
}
