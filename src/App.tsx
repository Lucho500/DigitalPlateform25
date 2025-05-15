import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Documents } from './pages/Documents';
import { Analytics } from './pages/Analytics';
import { Messages } from './pages/Messages';
import { Experts } from './pages/Experts';
import { Declarations } from './pages/Declarations';
import { Settings } from './pages/Settings';
import { Payroll } from './pages/Payroll';
import { Administrative } from './pages/Administrative';
import { Accounting } from './pages/Accounting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="documents" element={<Documents />} />
          <Route path="declarations" element={<Declarations />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="messages" element={<Messages />} />
          <Route path="experts" element={<Experts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="administrative" element={<Administrative />} />
          <Route path="accounting/*" element={<Accounting />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;