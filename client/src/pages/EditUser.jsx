import axios from "axios";
import { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function EditUser({ userId, userName, email, onCloseModal, onUpdateSuccess }) {
    const [userRole, setUserRole] = useState('User');
    const { userData, token } = useContext(AuthContext);

    const handleRoleChange = (e) => {
        const input = e.target.value;
        setUserRole(input);
    };

    const handleUpdate = async () => {
        const currentUserRole = userData.role;
        const currentUserId = userData.id;

        try {
            if (currentUserRole === 'Admin' && currentUserId === userId) {
                throw new Error("You can't update yourself!");
            }

            const response = await axios.put(`http://localhost:8000/api/user-update/${userId}`, { role: userRole }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onUpdateSuccess(response.data.user);
            onCloseModal();
            toast.success("User role updated successfully!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-6">
                <div className="bg-gray-200 shadow-lg rounded-lg p-3 max-w-md w-full">
                    <div className="relative">
                        <div onClick={onCloseModal} className="cursor-pointer m-2 absolute top-0 right-0 bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white">
                            <RxCross2 />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold pb-5">Edit User</h1>
                    <div className="flex flex-col gap-3">
                        <p>Name: {userName}</p>
                        <p>Email: {email}</p>
                    </div>

                    <div className="flex justify-between items-center my-5">
                        <p>Role:</p>
                        <select value={userRole} onChange={handleRoleChange} className="block ml-4 w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center my-5">
                        <button onClick={handleUpdate} className="bg-black w-full hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                            UPDATE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
