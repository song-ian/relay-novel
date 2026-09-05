import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'room'
  const [currentRoomId, setCurrentRoomId] = useState(null);

  const handleCreateRoom = (roomId) => {
    setCurrentRoomId(roomId);
    setCurrentPage('room');
  };

  const handleJoinRoom = (roomId) => {
    setCurrentRoomId(roomId);
    setCurrentPage('room');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setCurrentRoomId(null);
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <HomePage onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      ) : (
        <RoomPage roomId={currentRoomId} onGoHome={handleGoHome} />
      )}
    </div>
  );
}

export default App;