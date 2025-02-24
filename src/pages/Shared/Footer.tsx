import logo from "../../assets/images/Logo2.png";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { MdOutlineWifiCalling3 } from "react-icons/md";
const Footer = () => {
  return (
    <div className="bg-[#1b2f3e] px-2 md:px-0">
      <div className="">
        <div className="max-w-7xl mx-auto flex justify-between text-white pt-5">
          <div className="w-32">
            <img src={logo} alt="" />
          </div>
          <div className="font-bold text-2xl uppercase flex flex-col items-center">
            <h1>Follow Us</h1>
            <div className="flex space-x-5 mt-2">
              <a
                href="https://www.facebook.com/kazi.m.shahed.3"
                target="_blank"
              >
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/_kazi_shahed/" target="_blank">
                <FaInstagram />
              </a>
              <a href="https://x.com/KaziMohamm1908" target="_blank">
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/kazimdshahed/"
                target="_blank"
              >
                <CiLinkedin />
              </a>
            </div>
          </div>
        </div>
        <hr className="max-w-7xl mx-auto text-gray-200 my-5" />
        <div className="max-w-7xl mx-auto text-white flex flex-col md:flex-row justify-between gap-y-2 md:gap-y-0">
          <div className="flex flex-col space-y-1">
            <a>
              <FaHome className="text-2xl" />
            </a>
            <h1 className="text-2xl font-bold">SAWARI DHAKA</h1>
            <div className="flex space-x-2 items-center">
              <a href="">
                <MdOutlineWifiCalling3 />
              </a>
              <h1> 01330460307</h1>
            </div>
            <div>
              <h1 className="text-gray-300">Mirpur</h1>
              <h1 className="text-gray-300">
                Sawari, H-25, R-5, Block-A, Mirpur-2, Dhaka
              </h1>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <a>
              <FaHome className="text-2xl" />
            </a>
            <h1 className="text-2xl font-bold">SAWARI CHATTOGRAM</h1>
            <div className="flex space-x-2 items-center">
              <a href="">
                <MdOutlineWifiCalling3 />
              </a>
              <h1> 01330460309</h1>
            </div>
            <div>
              <h1 className="text-gray-300">Chandgao</h1>
              <h1 className="text-gray-300">
                Khalekh Mansion, Out Signal, Chandgao, Chittagong
              </h1>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <a>
              <FaHome className="text-2xl" />
            </a>
            <h1 className="text-2xl font-bold">SAWARI SYLHET</h1>
            <div className="flex space-x-2 items-center">
              <a href="">
                <MdOutlineWifiCalling3 />
              </a>
              <h1> 01330460307</h1>
            </div>
            <div>
              <h1 className="text-gray-300">Beanibazar</h1>
              <h1 className="text-gray-300">
                Shurab Ali Market, Beanibazar, Sylhet
              </h1>
            </div>
          </div>
        </div>
        <div className="text-white flex justify-between md:justify-around items-center bg-[#1e3342] py-4 my-5 text-sm">
          <a href="#" className="hover:underline text-center">Servicing</a>
          <a href="#" className="hover:underline text-center">Privacy Policy</a>
          <a href="#" className="hover:underline text-center">Terms and Conditions</a>
        </div>
        <div className="max-w-7xl mx-auto">
          <p className="text-white text-center pb-5">
            Copyright © {new Date().getFullYear()} - All right reserved by
            Sawari Limited
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
