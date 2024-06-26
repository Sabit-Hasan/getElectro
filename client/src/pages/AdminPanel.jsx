import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

export default function AdminPanel() {
  const { userData } = useContext(AuthContext);
  const { userName, email, profilePic, role } = userData;
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="min-h-[calc(100vh-112px)] flex">
        <button className="bg-gray-900 text-white p-2 rounded-md border-r-2" onClick={handleClick}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <aside className={`bg-gray-900 min-h-full w-full max-w-60 text-white ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-center items-center flex-col py-5 border-b-2">
            {profilePic ? (
              <img className="rounded-full h-20 w-20 object-cover cursor-pointer" src={userData.profilePic} alt="Profile Pic" />
            ) : <FaUserCircle className="h-20 w-20" />}
            <p className="capitalized text-xl font-semibold">{userName} (<span>{role}</span>)</p>
            <p className="text-base text-gray-200">{email}</p>
            <Link to="profile" className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-7 mt-4 rounded">Profile</Link>
          </div>

          {/* Navigation Links */}
          <div>
            <nav>
              {
                role === "Admin" ? <div className="grid p-4">
                  <Link to="all-users" className="px-2 py-3 hover:bg-slate-600">All User</Link>
                  <Link to="all-products" className="px-2 py-3 hover:bg-slate-600">Products</Link>
                </div> : <div className="grid p-4">
                  <Link to="" className="px-2 py-3 hover:bg-slate-600">My Orders</Link>
                </div>
              }
            </nav>
          </div>
        </aside>
        <main className="w-full px-5 py-5 relative">
          <Outlet />
        </main>
      </div>
    </>
  );
}
