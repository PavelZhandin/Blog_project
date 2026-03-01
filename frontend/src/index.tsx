import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import "./index.scss";
import { theme } from "./theme";
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={ theme }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
