import { createContext } from "react";
import io from "socket.io-client";

 // export const socket = io('http://192.168.57.224:8000'); // Localhost

export const socket = io("https://gop-b.onrender.com"); // Production
// export const socket = io(
//   "http://ec2-13-232-71-109.ap-south-1.compute.amazonaws.com/api"
// ); // AWS

export const SocketContext = createContext();
