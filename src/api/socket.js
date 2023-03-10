import { io } from 'socket.io-client';
export const socketClient = io.connect('http://localhost:8000', {
  transports: ['websocket'],
});
