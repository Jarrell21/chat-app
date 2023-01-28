import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
])

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className='App'>
        <RouterProvider router={router}/>
      </div>
    </ChakraProvider>
  );
}

export default App;
