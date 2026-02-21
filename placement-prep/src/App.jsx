import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Results from './pages/Results';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

import InternalTest from './pages/InternalTest';
import Ship from './pages/Ship';
import Proof from './pages/Proof';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="history" element={<History />} />
                <Route path="results" element={<Results />} />
                <Route path="practice" element={<Practice />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="resources" element={<Resources />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            {/* Internal Verification Routes */}
            <Route path="/prp/07-test" element={<InternalTest />} />
            <Route path="/prp/08-ship" element={<Ship />} />
            <Route path="/prp/proof" element={<Proof />} />
        </Routes>
    );
}

export default App;
