import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";


export default function Footers() {
  const year = new Date().getFullYear();
  return (
    <div className='bg-black text-white h-12'>
      <div className="container mx-auto h-full px-4 md:px-0">
        <div className="flex justify-between items-center h-full">
          <div>
            <p>Copyright &copy; {year} Md.Sabit Hasan</p>
          </div>
          <div className="icons flex justify-evenly items-center gap-4">
            <FaGithub />
            <FaLinkedin />
            <FaFacebook />
          </div>
        </div>
      </div>
    </div>
  )
}
