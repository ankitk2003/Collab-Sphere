import React from "react";
import { useNavigate } from "react-router-dom";
import founder1 from "../images/founder1.jpg";
import founder2 from "../images/founder2.jpg";
import founder3 from "../images/founder3.jpg";
import founder4 from "../images/founder4.jpg";

import {
  FaBullhorn,
  FaStar,
  FaGift,
  FaHandshake,
  FaCalendarAlt,
  FaRegImage,
  FaLightbulb,
  FaCogs,
} from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSnapchatGhost,
  FaTelegramPlane,
} from "react-icons/fa";

import { FaUsers } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineSpeed } from "react-icons/md";
import { BiHappy } from "react-icons/bi";
function Home() {
  const navigate = useNavigate();
  const serviceIcons = [
    { name: "Sponsored Posts", icon: <FaBullhorn /> },
    { name: "Product Reviews", icon: <FaStar /> },
    { name: "Giveaways and Contests", icon: <FaGift /> },
    { name: "Brand Ambassadorship", icon: <FaHandshake /> },
    { name: "Event Promotion", icon: <FaCalendarAlt /> },
    { name: "Story Features", icon: <FaRegImage /> },
    { name: "Campaign Ideation", icon: <FaLightbulb /> },
    { name: "Collaborative Products", icon: <FaCogs /> },
  ];

  return (
    <>
      <div className="md:bg-white h-51.6 w-screen flex justify-between mt-1 sticky top-0">
        <div
          id="first-div"
          className="flex  md:w-3/12 flex justify-between w-screen"
        >
          <span className="w-200 h-35 ml-8 font-bold text-lg mt-1.4">
            Collab_Sphere
          </span>
          <select id="dropdown" name="options">
            <option value="option1">Explore</option>
            <option value="option1">Podcast</option>
            <option value="option2">Blog</option>
            <option value="option3">Answers</option>
          </select>
        </div>

        <div
          className="flex justify-evenly md:w-3/12 flex justify-between"
          id="second-div"
        >
          <button
            className="bg-white text-green-400 shadow-sm border-2 px-3 py-1 hover:bg-green-400 hover:text-white focus:outline-none"
            onClick={() => {
              navigate("/choose-role");
            }}
          >
            Signup
          </button>
          <button
            className="md:mr-56 hover:text-green-400 ml-5"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-[#013a12] h-[425px] w-[1285px] mt-5">
          <div className="flex justify-center">
            <div className="text-white  text-5xl mt-20">
              <span className="font-semibold tracking-widest">
                Scale your business
              </span>
              <br />
              <span className="font-semibold tracking-widest">with</span>{" "}
              <span className="ml-3 tracking-wider font-mono">Influencers</span>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <input
              type="text"
              placeholder="Search..."
              className="w-[588px] px-4 py-2 pl-10 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div
            className="text-white flex justify-center mt-16 tracking-widest opacity-75"
            id="brand-div"
          >
            <span>Trusted by :-</span> <span className="ml-4">BEWAKOOF</span>
            <span className="ml-4">Snitch</span>
            <span className="ml-4">Hopscotch</span>
            <span className="ml-4">ASOS</span>
            <span className="ml-4">Boohoo</span>
          </div>
        </div>
      </div>

      <div
        id="services-id"
        className="flex flex-wrap justify-center gap-4 mt-5"
      >
        {serviceIcons.map((service, index) => (
          <div
            key={index}
            className="text-black h-[150px] w-[150px] border-[1px]  p-4 flex flex-col items-center rounded-3xl shadow-lg"
          >
            <div className="text-grey-500 text-2xl mb-3">{service.icon}</div>
            <div className="text-lg font-semibold mt-1">{service.name}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 te">
        <div className="font-bold text-2xl">
          promote your businesses thorugh :-
        </div>
      </div>
      <div className="flex justify-center>">
        <div className="flex flex-wrap justify-center gap-36 w-[1285px] mt-5 ml-12">
          {/* Facebook */}
          <FaFacebook className="text-blue-600 text-[100px] cursor-pointer hover:scale-110" />
          {/* Instagram */}
          <FaInstagram className="text-pink-500 text-[100px] cursor-pointer hover:scale-110" />
          {/* YouTube */}
          <FaYoutube className="text-red-600 text-[100px] cursor-pointer hover:scale-110" />
          {/* Snapchat */}
          <FaSnapchatGhost className="text-yellow-400 text-[100px] cursor-pointer hover:scale-110" />
          {/* Telegram */}
          <FaTelegramPlane className="text-blue-400 text-[100px] cursor-pointer hover:scale-110" />
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="bg-[#e8faf4] w-full max-w-[1267px] h-auto flex flex-wrap lg:flex-nowrap justify-between mt-10 p-4"
          id="main-div"
        >
          {/* Left Div */}
          <div
            id="left-div"
            className="flex flex-col flex-1 items-start lg:ml-28 space-y-5"
          >
            <div id="first-div" className="mt-5">
              <span className="font-semibold text-lg">Collab_sphere</span>
              <span className="ml-1 font-light">pro</span>
            </div>
            <div
              id="second-div"
              className="mt-5 font-semibold text-xl lg:text-2xl text-center lg:text-left"
            >
              <span>the</span>
              <span className="ml-1 text-[#7ed957]">Premium</span>
              <span className="ml-1">marketing</span>
              <br />
              <span>solution for every business</span>
            </div>
            <div id="third-div" className="flex flex-wrap gap-5 mt-10">
              <div className="border-[2px] border-black p-4 text-sm font-semibold rounded-md border-opacity-50 w-full lg:w-[45%]">
                More tools, more productivity, and more success—upgrade to Pro
                today!
              </div>
              <div className="border-[2px] border-black p-4 text-sm font-semibold rounded-md border-opacity-50 w-full lg:w-[45%]">
                Experience collaboration without limits. Go Pro with Collab
                Sphere
              </div>
            </div>
            <div id="fourth-div" className="flex flex-wrap gap-5">
              <div className="border-[2px] border-black mt-5 p-4 text-sm font-semibold rounded-md border-opacity-50 w-full lg:w-[45%]">
                Upgrade to Pro—Where Cutting-Edge Innovation Meets Seamless
                Efficiency
              </div>
              <div className="border-[2px] border-black mt-5 p-4 text-sm font-semibold rounded-md border-opacity-50 w-full lg:w-[45%]">
                Work smarter, faster, and better with Collab Sphere Pro’s
                advanced features
              </div>
            </div>
            <div id="button-div" className="flex justify-start mt-4">
              <button className="border-[1px] border-black px-3 py-1 text-white bg-[#013a12] rounded-md">
                Try now
              </button>
            </div>
          </div>

          {/* Right Div */}
          <div
            id="right-div"
            className="flex justify-center flex-1 mt-10 lg:mt-0 lg:mr-36"
          >
            <div className="w-full max-w-[360px] border-[2px] border-black p-6 bg-[#013a12] text-white mt-20 mb-20">
              The Pro version of Collab Sphere takes your productivity to new
              heights with a suite of exclusive features designed to streamline
              collaboration and maximize efficiency. With advanced tools,
              enhanced security, and unlimited access to premium resources, the
              Pro version empowers you to work smarter, faster, and more
              effectively.
            </div>
          </div>
        </div>
      </div>

      {/* div for four logos*/}
      <div className="flex flex-wrap justify-center py-8 bg-white w-full max-w-[1267px] mx-auto">
        <div className="text-center space-y-2 p-4 w-full sm:w-1/2 lg:w-1/4">
          <FaUsers className=" text-8xl mx-auto" />
          <p className="text-gray-700 font-medium">
            Access a pool of top talent across 700 categories
          </p>
        </div>
        <div className="text-center space-y-2 p-4 w-full sm:w-1/2 lg:w-1/4">
          <AiOutlineSearch className=" text-8xl mx-auto" />
          <p className="text-gray-700 font-medium">
            Enjoy a simple, easy-to-use matching experience
          </p>
        </div>
        <div className="text-center space-y-2 p-4 w-full sm:w-1/2 lg:w-1/4">
          <MdOutlineSpeed className=" text-8xl mx-auto" />
          <p className="text-gray-700 font-medium">
            Get quality work done quickly and within budget
          </p>
        </div>
        <div className="text-center space-y-2 p-4 w-full sm:w-1/2 lg:w-1/4">
          <BiHappy className="text-8xl mx-auto" />
          <p className="text-gray-700 font-medium">
            Only pay when you’re happy
          </p>
        </div>
      </div>

      <div id="button-div" className="flex justify-center ">
        <button className="border-[1px] border-black mt-4 ml-5 px-3 py-1 text-white bg-[#013a12] rounded-md">
          Join now
        </button>
      </div>

      {/*client div*/}
      <div id="clients-div" className="mt-4">
        <div className="ml-20">
          <p className="font-bold text-3xl">Our trusted clients</p>
        </div>
        <div id="image-parent-div" className="flex justify-evenly mt-5">
          <div className="size-40 border-[2px] border-black border-opacity-10">
            <img
              src={founder1}
              alt="Placeholder 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-40 border-[2px] border-black border-opacity-10">
            <img
              src={founder2}
              alt="Placeholder 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-40 border-[2px] border-black border-opacity-10">
            <img
              src={founder3}
              alt="Placeholder 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="size-40 border-[2px] border-black border-opacity-10 ">
            <img
              src={founder4}
              alt="Placeholder 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>


      <div id="quote-div" className="flex justify-center mt-10">
        <div className="w-[1250px] h-[270px] bg-[#4d1727] flex justify-center text-6xl tracking-wide rounded-md">
            <span className="text-white mt-24">Brands and influencers at your<span className="text-[#ff914d] ml-2">fingertips</span></span>
        </div>

      </div>
    </>
  );
}

export default Home;
