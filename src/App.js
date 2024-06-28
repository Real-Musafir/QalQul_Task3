import React, { useState, useEffect } from 'react';
import './App.css';
import DocumentList from './features/documents/DocumentList';
import Login from './features/auth/Login';
import EmployeeList from './features/employees/EmployeeList';
import DocumentManagement from './features/documents/DocumentManagement';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { setDocuments, fetchDocuments } from './features/documents/documentSlice';
import { useSocket } from './context/SocketContext';

function App() {
  const [showDocuments, setShowDocuments] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on('update-documents', (docs) => {
      dispatch(setDocuments(docs));
    });
  }, [socket, dispatch]);

  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <nav>
          <ul className="flex space-x-4">
            <li>Menu</li>
            <li>Menu</li>
            <li>Menu</li>
            <li>Menu</li>
          </ul>
        </nav>
        {user && (
          <div className="relative">
            <img src="path/to/profile-pic.jpg" alt="Profile" className="w-10 h-10 rounded-full"/>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <a href="#" className="block px-4 py-2 text-gray-800">My Profile</a>
              <a href="#" className="block px-4 py-2 text-red-600" onClick={() => dispatch(logout())}>Logout</a>
            </div>
          </div>
        )}
      </header>
      <main className="p-4">
        {user ? (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
              onClick={() => setShowDocuments(!showDocuments)}
            >
              {showDocuments ? 'Hide Documents' : 'Show Documents'}
            </button>
            {showDocuments && <DocumentList />}
            <div className="flex space-x-4 mt-4">
              <div className="w-1/3 bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-bold">Why do you create a startup?</h2>
                <div className="mt-4">
                  <img src="path/to/chart.jpg" alt="Chart"/>
                </div>
              </div>
              <div className="w-2/3">
                <EmployeeList />
                <DocumentManagement />
              </div>
            </div>
          </>
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
}

export default App;
