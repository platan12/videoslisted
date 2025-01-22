import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VideoList from './compenents/VideoList';
import VideoPlayer from './compenents/VideoPlayer';
import ListsPage from './compenents/ListsPage';
import Login from './compenents/Login';
import { getAuth } from 'firebase/auth';
import './App.css';

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>App de Vídeos</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/lists"
              element={
                <PrivateRoute>
                  <ListsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/videos/:listName"
              element={
                <PrivateRoute>
                  <VideoList />
                </PrivateRoute>
              }
            />
              <Route path="/video/:id" element={<VideoPlayer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
