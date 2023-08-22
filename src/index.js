import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const rootElement = document.getElementById('root');

const app = (
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(app);
} else {
  console.error("Root element 'root' not found in the document.");
}
