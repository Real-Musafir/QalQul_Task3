import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import { setOnlineUsers } from '../users/onlineUsersSlice';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const onlineUsers = useSelector((state) => state.onlineUsers);

  const employees = [
    { name: 'Logan Henderson', email: 'logan@company.com', department: 'Accounting', lastLogin: 'September 20, 2019' },
    { name: 'Susie Carlson', email: 'susie@company.com', department: 'Development', lastLogin: 'September 22, 2019' },
    { name: 'Markus Benes', email: 'markus@company.com', department: 'Development', lastLogin: 'September 18, 2019' },
    { name: 'Marie Stephens', email: 'marie@company.com', department: 'Human Resources', lastLogin: 'September 20, 2019' },
    { name: 'Jacob Gibson', email: 'jacob@company.com', department: 'Sales', lastLogin: 'September 22, 2019' },
  ];

  useEffect(() => {
    if (!socket) return;

    socket.on('update-users', (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, [socket, dispatch]);

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-4/5 mx-auto">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Employee</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Last login</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Department</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.email}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${employee.name}`} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm leading-5 font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm leading-5 text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-gray-900">{employee.lastLogin}</div>
                  <div className="text-sm leading-5 text-gray-500">{new Date(employee.lastLogin).toDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-500">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <span className={onlineUsers.some(u => u.email === employee.email) ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"}>
                    {onlineUsers.some(u => u.email === employee.email) ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;