import React, { type ReactElement, type NextPage, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaCircle, FaUserMinus } from "react-icons/fa";
import userData from "../../data/users.json"; //

interface UserStatusProps {
  isLive: boolean;
}

interface LastSession {
  deviceFingerprint: string;
  ipAddress: string;
  browser: string;
  os: string;
  location: string;
  lastLogin: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isLive: boolean;
  lastSession?: LastSession;
}

const UserStatus = ({ isLive }: UserStatusProps): ReactElement => {
  return isLive ? (
    <span className="inline-flex items-center text-green-600">
      <FaCircle className="mr-1 text-green-600" />
      Live
    </span>
  ) : (
    <span className="inline-flex items-center text-red-600">
      <FaCircle className="mr-1 text-red-600" />
      Offline
    </span>
  );
};

const Admin: NextPage = () => {
  const [users, setUsers] = useState<User[]>(userData);

  const [totalSeats, setTotalSeats] = useState(5); // this value needs to come from server, from the org plan

  const isFull = totalSeats <= users.length;

  // Derived state
  const availableSeats = totalSeats - users.length;

  // Handlers
  // Handlers
  const handleAssignUser = () => {
    if (isFull) {
      alert("No more seats available. Please upgrade.");
      return;
    }
    // Fake adding user
    // Could open a modal, but let's keep it simple with prompts
    const email = prompt("Enter user email:");
    if (!email) return;

    // Check for duplicate email
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (exists) {
      alert("User with this email already exists.");
      return;
    }

    const name = prompt("Enter user name:");
    if (!name) return;

    // For this demo, just increment an ID or generate one
    const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser = {
      id: newId,
      name,
      email,
      role: "Staff",
      isLive: false,
    };

    // Add user to state
    setUsers((prev) => [...prev, newUser]);

    alert(`User "${name}" added successfully!`);
  };

  function handleUpgrade() {
    alert("Upgrade clicked - redirect to upgrade flow or show a modal");
  }

  const handleEdit = (userId: number) => {
    // Edit seat assignment (open modal, etc.)
    alert(`Edit user ID: ${userId}`);
  };

  const handleView = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const { deviceFingerprint, ipAddress, browser, os, location, lastLogin } =
      user.lastSession ?? {};

    const info = `
            User Info
            ---------
            ID: ${user.id}
            Name: ${user.name}
            Email: ${user.email}
            Role: ${user.role}

            Last Session Details
            --------------------
            Device Fingerprint: ${deviceFingerprint ?? "N/A"}
            IP Address:         ${ipAddress ?? "N/A"}
            Browser:            ${browser ?? "N/A"}
            OS:                 ${os ?? "N/A"}
            Location:           ${location ?? "N/A"}
            Last Login:         ${lastLogin ?? "N/A"}`;

    alert(info);
  };

  const handleRemoveSeat = (userId: number) => {
    // This is where you'd revoke the seat from the user
    // For example, you'd make an API call to free up the seat.
    alert(`Remove seat for user ID: ${userId}`);

    // Example: decrement usedSeats by 1 (if we want to free that seat),
    // and remove the user from the list or mark them as no-seat.
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Decide which text and handler to use
  const buttonText = isFull ? "Upgrade" : "Assign User";
  const buttonAction = isFull ? handleUpgrade : handleAssignUser;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-sm">
        {/* Header Section */}
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Admin Seat Management
            </h1>
            <p className="mt-1 text-gray-600">
              Manage your seats and users here.
            </p>
          </div>
          <div className="mt-4 flex items-center md:mt-0">
            <div className="mr-4">
              <span className="text-sm text-gray-600">Total Seats: </span>
              <span className="font-bold text-gray-800">{totalSeats}</span>
            </div>
            <div className="mr-4">
              <span className="text-sm text-gray-600">Used Seats: </span>
              <span className="font-bold text-gray-800">{users.length}</span>
            </div>
            <div className="mr-4">
              <span className="text-sm text-gray-600">Available Seats: </span>
              <span
                className={`font-bold ${availableSeats > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {availableSeats}
              </span>
            </div>
            <button
              onClick={buttonAction}
              className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${
                isFull
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } `}
            >
              <FaPlus className="mr-2" />
              {buttonText}
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Role
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  State
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-sm font-medium text-gray-700"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <UserStatus isLive={user.isLive} />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit User Seat"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleView(user.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="View User Info"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleRemoveSeat(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove Seat"
                      >
                        <FaUserMinus />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
