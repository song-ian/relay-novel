import React, { useState, useEffect } from 'react';
import '../styles/RoomPage.css';

function RoomPage({ roomId, onGoHome }) {
  const [story, setStory] = useState('');
  const [newText, setNewText] = useState('');
  const [roomName, setRoomName] = useState('새로운 릴레이 소설');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 실제로는 백엔드에서 방 정보와 이야기 불러오기
    console.log(`Room ${roomId} loaded`);
  }, [roomId]);

  const handleAddText = () => {
    if (!newText.trim()) {
      alert('내용을 입력해주세요!');
      return;
    }
    setStory(story + '\n' + newText);
    setNewText('');
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="room-container">
      <div className="room-header">
        <h1>{roomName}</h1>
        <div className="room-info">
          <span className="room-id">
            ID: {roomId}
            <button className="copy-btn" onClick={handleCopyRoomId}>
              {copied ? '✓ 복사됨!' : '📋 복사'}
            </button>
          </span>
        </div>
        <button className="home-btn" onClick={onGoHome}>← 홈으로</button>
      </div>

      <div className="room-content">
        <div className="story-display">
          <h2>📖 현재 이야기</h2>
          <div className="story-box">
            {story ? story : '아직 글이 없습니다. 첫 번째 글을 작성해보세요!'}
          </div>
        </div>

        <div className="story-input">
          <h2>✍️ 이야기 이어가기</h2>
          <textarea
            placeholder="여기에 계속해서 글을 작성하세요..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="textarea"
            rows="5"
          />
          <div className="button-group">
            <button className="add-btn" onClick={handleAddText}>
              추가하기
            </button>
            <span className="char-count">
              {newText.length}자
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;