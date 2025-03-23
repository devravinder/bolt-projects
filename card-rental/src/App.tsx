import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { useStore } from './store';

function App() {
  const { currentUser } = useStore();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              currentUser
                ? currentUser.role === 'admin'
                  ? <Navigate to="/admin/dashboard" />
                  : <Navigate to="/vehicles" />
                : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/vehicles"
            element={
              currentUser?.role === 'customer' ? (
                <VehiclesPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              currentUser?.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;