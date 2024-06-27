import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <nav>
          <ul className="flex space-x-4">
            <li>Menu</li>
            <li>Menu</li>
            <li>Menu</li>
            <li>Menu</li>
          </ul>
        </nav>
        <div className="relative">
          <img src="path/to/profile-pic.jpg" alt="Profile" className="w-10 h-10 rounded-full"/>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
            <a href="#" className="block px-4 py-2 text-gray-800">My Profile</a>
            <a href="#" className="block px-4 py-2 text-red-600">Logout</a>
          </div>
        </div>
      </header>
      <main className="p-4">
        <div className="flex space-x-4">
          <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Why do you create a startup?</h2>
            <div className="mt-4">
              <img src="path/to/chart.jpg" alt="Chart"/>
            </div>
          </div>
          <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Employees</h2>
            <ul>
              <li className="flex justify-between items-center py-2">
                <div>
                  <p className="font-bold">Logan Henderson</p>
                  <p className="text-gray-600">logan@company.com</p>
                </div>
                <div className="text-right">
                  <p>September 20, 2019</p>
                  <p className="text-green-600">Active</p>
                </div>
              </li>
              {/* Add more employees here */}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
