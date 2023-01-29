import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import ChatProvider from './context/ChatProvider';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);


root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <ChatProvider>
        <ColorModeScript />
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);