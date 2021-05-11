import io from 'socket.io-client';
const SERVER = "https://books-away.herokuapp.com"

const socket = io(SERVER);

export default socket;