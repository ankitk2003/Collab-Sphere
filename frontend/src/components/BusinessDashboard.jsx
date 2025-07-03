import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import BusinesssNav from "./BusinessNav";
import { IoIosAddCircleOutline } from "react-icons/io";

function BusinessDashboard() {
  return (
    <div>
      <BusinesssNav/>
      {/* <NavComponent /> */}
      <Welcome />
      <Creators />
    </div>
  );
}

// function NavComponent() {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   //fetching the username

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center w-full px-6 py-3 shadow-md bg-white">
//         {/* Left Side - Logo */}
//         <div className="flex items-center">
//           <span className="ml-4 font-bold text-lg">Collab_Sphere</span>
//         </div>

//         {/* Middle - Search Bar */}
//         <div className="w-1/3">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>
// <span className="flex items-center gap-1 font-bold hover:cursor-pointer">
//   Create post
//   <IoIosAddCircleOutline className="text-2xl mt-1" />
// </span>


//         {/* Right Side - Notification & Profile Icons */}
//         <div className="flex items-center space-x-6 text-xl text-gray-600 relative">
//           <AiOutlineBell className="cursor-pointer hover:text-green-400 text-2xl" />

//           {/* Profile Icon with Hover Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={() => setDropdownOpen(true)}
//             onMouseLeave={() => setDropdownOpen(false)}
//           >
//             <AiOutlineUser className="cursor-pointer hover:text-green-400 text-2xl" />

//             {/* Dropdown List */}
//             {isDropdownOpen && (
//               <div className="absolute right-0  w-48 bg-white border rounded-lg shadow-lg">
//                 <ul className="py-2">
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => navigate("/profile")}
//                   >
//                     Profile
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => navigate("/settings")}
//                   >
//                     Settings
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Welcome Message */}
//     </>
//   );
// }

function Welcome() {
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    async function fetchName() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/business/user-data",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Ensure we correctly extract businessName from the API response
        // setBusinessProfile(res.data.user);
        // console.log(businessProfile);
        setBusinessName(res.data.user.businessName || "");
        localStorage.setItem("senderId", res.data.user._id);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchName();
  }, []);

  useEffect(() => {
    console.log(businessName);
  }, [businessName]); // Now logs correctly when businessName updates

  return (
    <div className="flex justify-center mt-5">
      <div className="w-[1300px] h-[200px] bg-[#013a12] text-white text-3xl flex items-start px-20 py-10">
        <span className="mt-2">Welcome to Collab_sphere, </span>
        <span className="text-yellow-600 mt-2 ml-2">{businessName}</span>
      </div>
    </div>
  );
}

function Creators() {
  const [creatorsByNiche, setCreatorsByNiche] = useState({});

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/v1/creator/all-profiles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data.profiles);
        const grouped = res.data.profiles.reduce((acc, creator) => {
          const niche = creator.niche || "Other";
          if (!acc[niche]) acc[niche] = [];
          acc[niche].push(creator);
          return acc;
        }, {});

        setCreatorsByNiche(grouped);
      } catch (e) {
        console.error("Error in fetching creators:", e);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="px-6 py-4">
      {Object.entries(creatorsByNiche).map(([niche, creators]) => (
        <div key={niche} className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 ml-10">
            {niche}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-10">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CreatorCard({ creator }) {
  const navigate = useNavigate();
  const senderId = localStorage.getItem("senderId");
  // console.log(senderId);
  return (
    <>
      <div
        id="main-div"
        className="max-w-sm w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex flex-col items-center p-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {creator.username}
          </h3>

          <p className="text-sm text-gray-600 text-center mb-2 h-12 overflow-hidden text-ellipsis line-clamp-2">
            {creator.bio}
          </p>

          <div className="flex justify-between w-full text-sm text-gray-700 mt-2">
            <span>👥 {creator.followerCount}</span>
            <span>📈 {creator.engagementRate}</span>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Creator on{" "}
            <span className="font-medium text-gray-700">
              {creator.platformName}
            </span>
          </p>
          <button
            className="bg-green-500 rounded-2xl text-white p-2 mt-2"
            onClick={() =>
              navigate("/chat", {
                state: {
                  senderId: localStorage.getItem("senderId"),
                  recieverId: creator.userId,
                },
              })
            }
          >
            Chat
          </button>
        </div>
      </div>
    </>
  );
}

export default BusinessDashboard;
