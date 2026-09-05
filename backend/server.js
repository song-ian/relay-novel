const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 메모리 저장소 (실제로는 데이터베이스 사용)
const rooms = {};

// API 라우트

// 1. 새 방 만들기
app.post('/api/rooms', (req, res) => {
  const { roomId, roomName } = req.body;
  
  if (!roomId || !roomName) {
    return res.status(400).json({ error: '방 ID와 이름이 필요합니다' });
  }

  if (rooms[roomId]) {
    return res.status(409).json({ error: '이미 존재하는 방입니다' });
  }

  rooms[roomId] = {
    roomId,
    roomName,
    story: '',
    createdAt: new Date(),
    contributors: []
  };

  res.status(201).json({
    message: '방이 생성되었습니다',
    room: rooms[roomId]
  });
});

// 2. 방 정보 조회
app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  
  if (!rooms[roomId]) {
    return res.status(404).json({ error: '방을 찾을 수 없습니다' });
  }

  res.json(rooms[roomId]);
});

// 3. 이야기에 텍스트 추가
app.post('/api/rooms/:roomId/add-text', (req, res) => {
  const { roomId } = req.params;
  const { text, author } = req.body;

  if (!rooms[roomId]) {
    return res.status(404).json({ error: '방을 찾을 수 없습니다' });
  }

  if (!text) {
    return res.status(400).json({ error: '텍스트가 필요합니다' });
  }

  rooms[roomId].story += (rooms[roomId].story ? '\n' : '') + text;
  
  if (author && !rooms[roomId].contributors.includes(author)) {
    rooms[roomId].contributors.push(author);
  }

  res.json({
    message: '텍스트가 추가되었습니다',
    room: rooms[roomId]
  });
});

// 4. 주제 추천
app.get('/api/prompts/random', (req, res) => {
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

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  res.json({ prompt: randomPrompt });
});

// 5. 모든 방 목록 (선택사항)
app.get('/api/rooms', (req, res) => {
  const roomList = Object.values(rooms).map(room => ({
    roomId: room.roomId,
    roomName: room.roomName,
    createdAt: room.createdAt,
    contributorCount: room.contributors.length
  }));
  res.json(roomList);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`http://localhost:${PORT}`);
});