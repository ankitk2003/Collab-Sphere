import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

function BusinesssNav() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  //fetching the username

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("senderId");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center w-full px-6 py-3 shadow-md bg-white">
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <span className="ml-4 font-bold text-lg">Collab_Sphere</span>
        </div>

        {/* Middle - Search Bar */}
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
<span className="flex items-center gap-1 font-bold hover:cursor-pointer" onClick={()=>{
    navigate("/business-post")
}}>
  Create post
  <IoIosAddCircleOutline className="text-2xl mt-1" />
</span>


        {/* Right Side - Notification & Profile Icons */}
        <div className="flex items-center space-x-6 text-xl text-gray-600 relative">
          <AiOutlineBell className="cursor-pointer hover:text-green-400 text-2xl" />

          {/* Profile Icon with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <AiOutlineUser className="cursor-pointer hover:text-green-400 text-2xl" />

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div className="absolute right-0  w-48 bg-white border rounded-lg shadow-lg">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Welcome Message */}
    </>
  );
}
export default BusinesssNav;