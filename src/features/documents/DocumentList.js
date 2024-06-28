import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocuments } from './documentSlice';

const DocumentList = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Document List</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="flex justify-between items-center py-2 border-b">
            <p>{doc.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
