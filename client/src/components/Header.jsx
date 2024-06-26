import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';


export default function Navbar() {

  const navigate = useNavigate();
  const { logout, token, userData, isAuthenticated } = useContext(AuthContext);
  const [profMenu, setProfMenu] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logout Successfully!", { autoClose: 2000 });
    navigate('/login');
  }

  return (
    <nav className='h-16 shadow-md'>
      <div className="container mx-auto h-full px-4 md:px-0">
        <div className="flex justify-between items-center h-full">
          <div className="logo">
            <h1 className="font-extrabold text-3xl"><Link to='/' >getElectro</Link></h1>
          </div>

          {/* Search Items */}
          <div className="search-bar hidden lg:flex justify-center items-center max-w-sm w-full flex-1">
            <input className='bg-gray-100 w-full py-2 pl-2 outline-none' type="search" name="search" id="search" placeholder='Search items...' />
            <button className='bg-black py-3 px-3 text-white cursor-pointer'>
              <FaSearch />
            </button>
          </div>

          {/* Usr Info, Cart & Login */}
          <div className="userInfo flex gap-7 items-center">
            <div className='text-3xl cursor-pointer'>
              <div className='relative group flex justify-center'>
                {isAuthenticated ? (
                  <div>
                    {userData.profilePic ? (
                      <img
                        onClick={() => setProfMenu(!profMenu)}
                        className="rounded-full h-10 w-10 object-cover"
                        src={userData.profilePic}
                        alt="Profile"
                      />
                    ) : (
                      <span onClick={() => setProfMenu(!profMenu)} className="text-base font-semibold py-0">{userData.email}</span>
                    )}
                  </div>
                ) : (
                  <FaUserCircle className="h-10 w-10" />
                )}
                {
                  profMenu && isAuthenticated && (
                    <div className='absolute shadow-lg rounded bg-white top-12 h-fit p-3 pt-0 font-semibold'>
                      <nav>
                        <Link onClick={() => setProfMenu(!profMenu)} className='whitespace-nowrap text-base hover:bg-slate-100 p-2 z-50' to={"admin-panel/all-products"}>Dashboard</Link>
                      </nav>
                    </div>
                  )
                }
              </div>
            </div>

            <div className=' text-xl cursor-pointer relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-red-600 text-white flex justify-center items-center rounded-full h-4 w-4 p-2 absolute -top-2 -right-2'>
                <p className='text-xs'>0</p>
              </div>
            </div>

            {
              token ? <div><button onClick={handleLogout} className='bg-black text-white py-2 px-6 font-semibold'>Logout</button></div> : <Link className='bg-black text-white py-2 px-6 font-semibold' to='/login' ><button></button>Login</Link>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}
