import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import UserList from './components/UserList';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header';

const App = () => {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              } />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/users" element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default App;
