import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles.css';

import Navbar from './components/navbar';
import Index from './views/index';
import Rate from './views/rate';
import Table from './views/table';
import ErrorPage from './views/error-page';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/table" element={<Table />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
