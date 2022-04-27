import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from './baseStyles/theme';
import GlobalStyle from './baseStyles/GlobalStyles';
import App from './components/App';
import { store } from 'redux/store';

import 'services/contactsAPI';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App title="Phonebook" />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
