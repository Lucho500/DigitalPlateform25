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
import { Clients } from './pages/Accounting/Clients';
import { Suppliers } from './pages/Accounting/Suppliers';
import { BankReconciliation } from './pages/Accounting/BankReconciliation';
import { InterimClosing } from './pages/Accounting/InterimClosing';
import { AccountingAnalytics } from './pages/Accounting/Analytics';
import { AnnualClosing } from './pages/Accounting/AnnualClosing';
import { PayrollImport } from './pages/Accounting/PayrollImport';
import { Inventory } from './pages/Accounting/Inventory';
import { FixedAssets } from './pages/Accounting/FixedAssets';
import { AuditSupport } from './pages/Accounting/AuditSupport';

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
          <Route path="accounting" element={<Accounting />}>
            <Route path="clients" element={<Clients />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="bank-reconciliation" element={<BankReconciliation />} />
            <Route path="interim-closing" element={<InterimClosing />} />
            <Route path="analytics" element={<AccountingAnalytics />} />
            <Route path="annual-closing" element={<AnnualClosing />} />
            <Route path="payroll-import" element={<PayrollImport />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="fixed-assets" element={<FixedAssets />} />
            <Route path="audit-support" element={<AuditSupport />} />
            <Route index element={<Navigate to="clients" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;