const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Простая настройка роутов
app.get('/', (req, res) => {
  res.send("Chat server is running");
});

// Слушаем события подключения
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Получаем сообщение от клиента
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    
    // Отправляем сообщение всем клиентам
    io.emit('chat message', msg);
  });

  // Слушаем отключение пользователя
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
