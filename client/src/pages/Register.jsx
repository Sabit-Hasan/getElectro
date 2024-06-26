import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageBase64 from "../helper/imageBase64";
import UserPic from "../assets/images/user.png";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {

  const [eyeOpen, setEyeOpen] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const image = await imageBase64(file);

    setFormData((prev) => ({
      ...prev,
      profilePic: image,
    }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", formData);
      const data = response.data;

      if (data.success) {
        toast.success(response.data.message, { autoClose: 2000 });
        
        navigate('/login');
        return;
      }

      if (data.error) { 
        toast.error(response.data.message, { autoClose: 2000 });
        return;
      }

    } catch (error) {
      toast.error("Use registration failed!", { autoClose: 2000 });
    }

  }

  return (
    <>
      <section className="register">
        <div className="container mx-auto h-auto px-4 md:px-0">
          <div className="form mx-auto w-full max-w-md my-10 py-10 bg-gray-100 px-10">
            <form onSubmit={handleSubmit}>
              <h3 className="font-bold text-2xl letter-space-2 tracking-wider mb-5">REGISTRATION</h3>

              {/* User Profile Pic */}
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  <img className="h-16 w-16 object-cover rounded-full" src={formData.profilePic || UserPic} />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input onChange={handleUploadPic} type="file" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                  "/>
                </label>
              </div>

              {/* User Name */}
              <div className="login-input w-full my-3">
                <label htmlFor="userName">User Name:</label>
                <input onChange={handleChange} value={formData.userName} className="w-full py-2 pl-2 outline-none" type="text" name="userName" id="userName" required />
              </div>

              {/* User Email */}
              <div className="login-input w-full my-3">
                <label htmlFor="email">Email:</label>
                <input onChange={handleChange} value={formData.email} className="w-full py-2 pl-2 outline-none" type="email" name="email" id="email" required />
              </div>

              {/* User Password */}
              <div className="login-input w-full">
                <label htmlFor="password">Password:</label>
                <div className="relative">
                  <input onChange={handleChange} value={formData.password} className="w-full py-2 pl-2 outline-none" type={eyeOpen ? 'text' : 'password'} name="password" id="password" required />
                  <span onClick={() => setEyeOpen(!eyeOpen)} className="absolute top-2.5 right-3 text-xl cursor-pointer">
                    {
                      eyeOpen ? < FaEye /> : <FaEyeSlash />
                    }
                  </span>
                </div>
              </div>

              {/* User Confirm Password */}
              <div className="login-input w-full my-3">
                <label htmlFor="password">Confirm Password:</label>
                <div className="relative">
                  <input onChange={handleChange} value={formData.confirmPassword} className="w-full py-2 pl-2 outline-none" type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" required />
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-2.5 right-3 text-xl cursor-pointer">
                    {
                      showConfirmPassword ? < FaEye /> : <FaEyeSlash />
                    }
                  </span>
                </div>
              </div>

              {/* Form Button */}
              <div className="login-btn my-5">
                <button className='bg-black text-white py-2 px-7 font-semibold' type="submit">REGISTER</button>
              </div>
              <p>Already have an account? Go to <span className="font-bold"><Link to="/login">Login</Link></span></p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
