import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './routes/dashboard/dashboard.component';
import Login from './routes/login/login.component';
import Financas from './routes/dashboard/financas/financas.component';
import { AuthProvider}  from './context/auth.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<div>DashboardInicialPage</div>} />
            <Route path="/dashboard/financas" element={<Financas />}>
              <Route index element={<div>FinancasPáginaInicial</div>} />
            </Route>
          </Route>
          <Route path="/" element={<div>Página Pública Inicial</div>}></Route>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
