import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import { addDocument, updateDocument, deleteDocument } from './documentSlice';

const DocumentManagement = () => {
  const [newDocTitle, setNewDocTitle] = useState('');
  const [editDocId, setEditDocId] = useState(null);
  const [editDocTitle, setEditDocTitle] = useState('');
  const dispatch = useDispatch();
  const socket = useSocket();
  const documents = useSelector((state) => state.documents);

  const handleAddDocument = () => {
    const newDoc = { id: Date.now(), title: newDocTitle };
    dispatch(addDocument(newDoc));
    socket.emit('add-document', newDoc);
    setNewDocTitle('');
  };

  const handleUpdateDocument = () => {
    const updatedDoc = { id: editDocId, title: editDocTitle };
    dispatch(updateDocument(updatedDoc));
    socket.emit('update-document', updatedDoc);
    setEditDocId(null);
    setEditDocTitle('');
  };

  const handleDeleteDocument = (docId) => {
    dispatch(deleteDocument(docId));
    socket.emit('delete-document', docId);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Document Management</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="New Document Title"
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
        />
        <button onClick={handleAddDocument} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Document
        </button>
      </div>
      {editDocId && (
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 mr-2"
            placeholder="Edit Document Title"
            value={editDocTitle}
            onChange={(e) => setEditDocTitle(e.target.value)}
          />
          <button onClick={handleUpdateDocument} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Update Document
          </button>
        </div>
      )}
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="flex justify-between items-center py-2 border-b">
            <span>{doc.title}</span>
            <div>
              <button
                onClick={() => {
                  setEditDocId(doc.id);
                  setEditDocTitle(doc.title);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteDocument(doc.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManagement;
