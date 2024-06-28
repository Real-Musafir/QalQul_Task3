import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    if (user) {
      newSocket.emit('login', user);
    }

    return () => {
      if (user) {
        newSocket.emit('logout', user);
      }
      newSocket.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
