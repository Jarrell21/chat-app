import { ColorModeScript } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import Homepage from './routes/Homepage';
import ChatPage from './routes/ChatPage';
import ErrorPage from './routes/ErrorPage';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
])

root.render(
  <StrictMode>
    <ColorModeScript />
    <RouterProvider router={router}/>
    <App />
  </StrictMode>
);