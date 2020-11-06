import io from "socket.io-client";
const ENDPOINT = 'https://simple-react-share-calculator.herokuapp.com/';



export const socket = io(ENDPOINT);