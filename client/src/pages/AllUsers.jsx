import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";



export default function AllUsers() {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchAllUsers = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/users-details", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = response.data;
      setAllUsers(result.data);

    } catch (error) {
      toast.error("Unauthorized access!", { autoClose: 2000 });
    }
  }

  const handleTokenChange = (token) => {
    if (token) {
      fetchAllUsers(token);
    } else {
      setAllUsers([]);
    }
  };

  useEffect(() => {
    handleTokenChange(token);
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const handleOpenModal = (userId, userName, email, role) => {
    setUserId(userId);
    setUserName(userName);
    setEmail(email);
    setRole(role);
    setOpenModal(true);
  }

  const handleDeleteOpenModal = (userId, userName, email, role) => {
    setUserId(userId);
    setUserName(userName);
    setEmail(email);
    setRole(role);
    setDeleteOpenModal(true);
  }

  const onUpdateSuccess = (updatedUser) => {
    const updatedUsers = allUsers.map(user => {
      if (user._id === updatedUser._id) {
        return updatedUser;
      }
      return user;
    });
    setAllUsers(updatedUsers);
  };


  return (
    <div className="container mx-auto h-auto px-4 md:px-0 relative">
      <p className="bg-slate-200 text-sm mb-5 p-5 text-gray-500 cursor-pointer">Dashboard/All Users</p>
      <div className="bg-gray-50 p-5">
        <h1 className="text-2xl font-bold mb-4">ALL USERS</h1>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-base font-medium">Sr.</th>
                <th className="px-4 py-2 border text-base font-medium">Name</th>
                <th className="px-4 py-2 border text-base font-medium">Email</th>
                <th className="px-4 py-2 border text-base font-medium">Role</th>
                <th className="px-4 py-2 border text-base font-medium">Created Date</th>
                <th className="px-4 py-2 border text-base font-medium">Updated Date</th>
                <th className="px-4 py-2 border text-base font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {
                allUsers && allUsers.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2 border text-base font-medium">{index + 1}</td>
                      <td className="px-4 py-2 border text-base font-medium">{item?.userName}</td>
                      <td className="px-4 py-2 border text-base font-medium">{item?.email}</td>
                      <td className="px-4 py-2 border text-base font-medium">{item.role}</td>
                      <td className="px-4 py-2 border text-base font-medium">{formatDate(item?.createdAt)}</td>
                      <td className="px-4 py-2 border text-base font-medium">{formatDate(item?.updatedAt || item?.createdAt)}</td>
                      <td className="px-4 py-2 border text-base font-medium"><div className="flex justify-evenly">
                        <button onClick={() => handleOpenModal(item._id, item.userName, item.email, item.role)} className="bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white">< MdEdit /></button><button onClick={() => handleDeleteOpenModal(item._id, item.userName, item.email, item.role)} className="bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white">< TiDelete size={20} /></button>
                      </div></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      {
        openModal && <EditUser
          userId={userId}
          userName={userName}
          email={email}
          role={role}
          onCloseModal={() => setOpenModal(false)}
          onUpdateSuccess={onUpdateSuccess}
        />
      }

      {
        openDeleteModal && <DeleteUser
          userId={userId}
          userName={userName}
          email={email}
          role={role}
          onCloseDeleteModal={() => setDeleteOpenModal(false)}
          onDeleteSuccess={fetchAllUsers}
        />
      }
    </div>
  )
}
