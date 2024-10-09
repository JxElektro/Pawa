import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import PetProfile from './screens/PetProfile';
import MedicalHistory from './screens/MedicalHistory';
import Calendar from './screens/Calendar';
import Community from './screens/Community';
import AIBitacora from './screens/AIBitacora';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <GlobalStyle />
        <Helmet>
          <title>Pawa - Pet Management App</title>
        </Helmet>
        <ToastContainer position="top-right" autoClose={5000} />
        <Layout>
          <Routes>
            <Route path="/" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
            <Route path="/pet/:id" element={<ErrorBoundary><PetProfile /></ErrorBoundary>} />
            <Route path="/medical-history/:id" element={<ErrorBoundary><MedicalHistory /></ErrorBoundary>} />
            <Route path="/calendar" element={<ErrorBoundary><Calendar /></ErrorBoundary>} />
            <Route path="/community" element={<ErrorBoundary><Community /></ErrorBoundary>} />
            <Route path="/ai-bitacora" element={<ErrorBoundary><AIBitacora /></ErrorBoundary>} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;