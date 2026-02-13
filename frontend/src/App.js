import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { useSelector } from 'react-redux';
import Login from './components/Login';


import MainPage from './components/MainPage';
import './App.css';

const RequireAuth = ({ children }) => {
    const { user } = useSelector(state => state.auth);

    return user ? children : <Navigate to="/" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/main"
                    element={
                        <RequireAuth>
                            <MainPage />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;