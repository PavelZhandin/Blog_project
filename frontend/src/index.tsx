import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssBaseline />
    {/* <ThemeProvider theme={{}}> */}
    <BrowserRouter>
        <App />
    </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
