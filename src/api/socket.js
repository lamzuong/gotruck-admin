import { io } from 'socket.io-client';
export const socketClient = io.connect('http://18.139.161.100:8000', {
  transports: ['websocket'],
});
