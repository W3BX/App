import socketIOClient from 'socket.io-client';
const connection_key = process.env.CONNECTION_KEY_LOCAL

const Socket = socketIOClient(connection_key);

export default Socket 
