import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import AuthContextProvider from './utils/AuthContext.jsx';
import StylesMUI from "./theme/styles.jsx";
import api from "./utils/api.js";


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>

        <AuthContextProvider>
          <CssBaseline />
            <StylesMUI/>
          <AppRoutes/>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
);
