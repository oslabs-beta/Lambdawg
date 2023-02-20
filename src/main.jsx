import React from 'react';
import App from './App.jsx';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import DashboardContainer from './containers/DashboardContainer.jsx';


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );