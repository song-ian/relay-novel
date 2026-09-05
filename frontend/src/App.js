import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'room'
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [currentRoomName, setCurrentRoomName] = useState('');

  const handleCreateRoom = (roomId, roomName) => {
    setCurrentRoomId(roomId);
    setCurrentRoomName(roomName);
    setCurrentPage('room');
  };

  const handleJoinRoom = (roomName) => {
    // 실제로는 백엔드에서 방 정보를 조회해야 함
    // 지금은 임시로 방 이름으로 roomId 생성
    const tempRoomId = 'ROOM-' + roomName.substring(0, 5).toUpperCase();
    setCurrentRoomId(tempRoomId);
    setCurrentRoomName(roomName);
    setCurrentPage('room');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setCurrentRoomId(null);
    setCurrentRoomName('');
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <HomePage onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      ) : (
        <RoomPage roomId={currentRoomId} roomName={currentRoomName} onGoHome={handleGoHome} />
      )}
    </div>
  );
}

export default App;
