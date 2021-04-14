import io from 'socket.io-client';
const SERVER = "http://localhost:3500"

const socket = io(SERVER);

socket.on('connection', () => {
    console.log("Connected to back-end");
})

export default socket;