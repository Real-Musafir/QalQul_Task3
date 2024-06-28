import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useSelector } from 'react-redux';

const DocumentEditor = ({ documentId }) => {
  const socket = useSocket();
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!socket) return;

    socket.emit('join-document', documentId);

    socket.on('receive-changes', (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.emit('leave-document', documentId);
    };
  }, [socket, documentId]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('send-changes', newContent);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Document Editor</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        value={content}
        onChange={handleChange}
      />
      <p className="mt-4">Editing as: {user.name}</p>
    </div>
  );
};

export default DocumentEditor;
