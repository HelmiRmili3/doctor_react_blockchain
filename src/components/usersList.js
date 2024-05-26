// import React from "react";

// const UserList = ({ usersData, deleteUsers }) => {
//   return (
//     <div className="bg-white shadow sm:rounded-lg p-6">
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">User List</h2>
//       <ul className="divide-y divide-gray-200">
//         {usersData.map((user, index) => (
//           <li key={index} className="py-4 flex justify-between items-center">
//             <div>
//               <p className="text-sm font-medium text-gray-900">{user.name}</p>
//               <p className="text-sm text-gray-500">{user.address.substring(0, 16)}</p>
//             </div>
//             <button
//               onClick={() => deleteUsers(index)}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;
