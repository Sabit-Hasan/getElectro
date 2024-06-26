import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import axios from "axios";

export default function DeleteUser({ userId, userName, email, onCloseDeleteModal, role, onDeleteSuccess }) {
    const { userData, token } = useContext(AuthContext);

    const handleDelete = async () => {
        const currentUserId = userData.id;
        const currentUserRole = userData.role;

        try {
            if (currentUserRole === 'Admin' && currentUserId === userId) {
                throw new Error("You can't delete yourself!", { autoClose: 2000 });
            }

            const response = await axios.delete(`http://localhost:8000/api/user-delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onDeleteSuccess(token);
            onCloseDeleteModal();
            toast.success("User deleted successfully!");
        } catch (error) {
            toast.error(error.message, { autoClose: 2000 });
        }
    }
    return (
        <>
            <div className="bg-gray-200 shadow-lg rounded-lg p-3 z-10 absolute top-60 left-1/2 transform -translate-x-1/2 -translate-y-60 w-80">
                <h1 className="text-xl font-bold pb-5 text-red-500">Delete User</h1>
                <div className="flex flex-col gap-3">
                    <p>Name: {userName}</p>
                    <p>Email: {email}</p>
                    <p>Role: {role}</p>
                </div>

                <div className="flex justify-between items-center my-5">
                    <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                        DELETE
                    </button>
                    <button onClick={onCloseDeleteModal} className="bg-black text-white font-bold py-2 px-4 rounded">CANCEL</button>
                </div>
                <div onClick={onCloseDeleteModal} className="cursor-pointer m-2 absolute top-0 right-0 bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white"><RxCross2 /></div>
            </div>
        </>
    );
}