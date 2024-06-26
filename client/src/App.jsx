import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


export default function App() {
  return (
    <>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-112px)]">
          <Outlet />
        </main>
        <Footer />
    </>
  )
}