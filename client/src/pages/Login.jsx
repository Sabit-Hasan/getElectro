import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";


export default function Login() {

    const [eyeOpen, setEyeOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/login", formData);
            const data = response.data;
            
            if (data.success) {
                toast.success(data.message, { autoClose: 2000 });
                login(data.token, data.user);
                navigate('/');
                return;
            }

            if (data.error) { 
                toast.error(data.message, { autoClose: 2000 });
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 2000 });
        }
    }

    return (
        <>
            <section className="login">
                <div className="container mx-auto h-auto px-4 md:px-0">
                    <div className="form mx-auto w-full max-w-md my-10 py-10 bg-gray-100 px-10">
                        <form onSubmit={handleSubmit}>
                            <h3 className="font-bold text-2xl letter-space-2 tracking-wider mb-5">LOGIN INFORMATION</h3>
                            <div className="login-input w-full my-3">
                                <label htmlFor="email">Email:</label>
                                <input onChange={handleChange} value={formData.email} className="w-full py-2 pl-2 outline-none" type="email" name="email" id="email" />
                            </div>
                            <div className="login-input w-full">
                                <label htmlFor="password">Password:</label>
                                <div className="relative">
                                    <input onChange={handleChange} value={formData.password} className="w-full py-2 pl-2 outline-none" type={eyeOpen ? 'text' : 'password'} name="password" id="password" />
                                    <span onClick={() => setEyeOpen(!eyeOpen)} className="absolute top-2.5 right-3 text-xl cursor-pointer">
                                        {
                                            eyeOpen ? < FaEye /> : <FaEyeSlash />
                                        }
                                    </span>
                                    <Link to='/forgetPassword' className="text-end block py-1 cursor-pointer">Forget Password?</Link>
                                </div>
                            </div>
                            <div className="login-btn my-5">
                                <button className='bg-black text-white py-2 px-7 font-semibold' type="submit">LOGIN</button>
                            </div>
                            <p>Don't have an account? Go to <span className="font-bold"><Link to="/register">Register</Link></span></p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
