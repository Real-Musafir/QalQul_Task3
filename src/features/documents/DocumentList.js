import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import { setDocuments } from './documentSlice';

const DocumentList = ({ setEditingDocumentId }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const documents = useSelector((state) => state.documents);

  useEffect(() => {
    if (!socket) return;

    socket.on('update-documents', (docs) => {
      dispatch(setDocuments(docs));
    });
  }, [socket, dispatch]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Document List</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="flex justify-between items-center py-2 border-b">
            <span onClick={() => setEditingDocumentId(doc.id)}>{doc.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
