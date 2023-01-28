import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/Homepage';
import ChatPage from './routes/ChatPage';
import ErrorPage from './routes/ErrorPage';


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
