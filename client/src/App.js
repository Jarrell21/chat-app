import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import StartingPage from './pages/StartingPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
      <div className='App'>
        <Routes>
          <Route path="/" element={<StartingPage />} exact />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </div>
  );
}

export default App;
