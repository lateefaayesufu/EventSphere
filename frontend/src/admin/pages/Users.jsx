import React, { useState } from "react";

// This component displays and manages a list of users.
const Users = () => {
  // Mock data for users. In a real application, you would fetch this from an API.
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Student",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Faculty",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      role: "Alumni",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      role: "Student",
      status: "Active",
    },
  ]);

  // Function to handle editing a user.
  const handleEdit = (id) => {
    console.log(`Editing user with ID: ${id}`);
    // This is where you would navigate to an edit form or open a modal.
  };

  // Function to handle deleting a user.
  const handleDelete = (id) => {
    console.log(`Deleting user with ID: ${id}`);
    // In a real app, you'd send an API request to delete the user.
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-6">User Management</h3>
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {user.name}
                  </h4>
                  <p className="text-gray-400 mb-2">{user.email}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-semibold">
                      {user.role}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${
                        user.status === "Active"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 ml-6">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 text-red-300 px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg py-8">
              No users to display.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
