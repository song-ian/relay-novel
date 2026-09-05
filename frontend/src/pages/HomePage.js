import React, { useState } from 'react';
import '../styles/HomePage.css';

function HomePage({ onCreateRoom, onJoinRoom }) {
  const [roomName, setRoomName] = useState('');
  const [mode, setMode] = useState(null); // 'create', 'join', null

  // 주제 추천 리스트
  const prompts = [
    "전생했더니 슬라임이였다.",
    "평범한 직장인인 줄 알았는데 사실 용사였다.",
    "매일 아침 깨어나면 다른 세계에 있다.",
    "내가 쓴 소설이 현실이 되었다.",
    "나는 주인공이 아닌 조연이다.",
    "죽은 줄 알았는데 게임 세계로 떨어졌다.",
    "이 세상은 누군가의 꿈이다.",
    "나는 여행자일 뿐이다.",
    "시간이 거꾸로 흐르는 세상에서 깨어났다.",
    "내 그림자가 나를 따라다닌다."
  ];

  const generateRoomId = () => {
    return 'ROOM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      alert('방 이름을 입력해주세요!');
      return;
    }
    const newRoomId = generateRoomId();
    onCreateRoom(newRoomId, roomName); // 방 이름도 함께 전달
  };

  const handleJoinRoom = () => {
    if (!roomName.trim()) {
      alert('방 이름을 입력해주세요!');
      return;
    }
    // 실제로는 백엔드에서 방 존재 확인 후 입장
    onJoinRoom(roomName);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="title">📖 릴레이 소설</h1>
        <p className="subtitle">함께 만드는 이야기의 마법</p>

        {mode === null && (
          <div className="mode-selection">
            <button 
              className="mode-btn create-btn"
              onClick={() => {
                setMode('create');
                setRoomName('');
              }}
            >
              ✨ 새 방 만들기
            </button>
            <button 
              className="mode-btn join-btn"
              onClick={() => {
                setMode('join');
                setRoomName('');
              }}
            >
              🔗 방 참여하기
            </button>
          </div>
        )}

        {mode === 'create' && (
          <div className="form-container">
            <h2>새 릴레이 소설 방 만들기</h2>
            <input
              type="text"
              placeholder="방 이름을 입력하세요 (예: 판타지 모험)"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="input-field"
            />
            <button className="prompt-btn" onClick={() => setRoomName(getRandomPrompt())}>
              🎲 주제 추천받기
            </button>
            {roomName && <p className="selected-prompt">\"{roomName}\"</p>}
            <button className="submit-btn" onClick={handleCreateRoom}>
              방 만들기
            </button>
            <button className="back-btn" onClick={() => setMode(null)}>
              ← 돌아가기
            </button>
          </div>
        )}

        {mode === 'join' && (
          <div className="form-container">
            <h2>기존 릴레이 방 참여하기</h2>
            <input
              type="text"
              placeholder="방 이름을 입력하세요 (예: 판타지 모험)"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="input-field"
            />
            <button className="submit-btn" onClick={handleJoinRoom}>
              방 참여하기
            </button>
            <button className="back-btn" onClick={() => setMode(null)}>
              ← 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
