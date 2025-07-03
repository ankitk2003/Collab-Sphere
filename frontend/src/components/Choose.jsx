import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Choose() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
  };
  const handleSignup = () => {
    console.log(selected);
    if (selected === "creator") {      
      localStorage.setItem("role", "creator");
      navigate("/signup");
    } else if (selected === "business") {
      localStorage.setItem("role", "business");
      navigate("/signup");
    }
  };

  return (
    <>
      <div className="w-screen h-35 ml-8 font-bold text-lg mt-1.4">
        Collab_Sphere
      </div>
      <div className="flex justify-center flex-wrap text-6xl mt-5">
        I am a business owner looking for influencers.
      </div>
      <div className="flex justify-center mt-20">
        {/* Creator Div */}
        <div
          id="creator-div"
          className={`border-[2px] border-black h-[200px] w-[200px] flex justify-center cursor-pointer ${
            selected === "business" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleSelect("business")}
        >
          <p className="ml-5 mt-16 font-semibold">join as a business man</p>
        </div>

        {/* Business Div */}
        <div
          id="business-div"
          className={`border-[2px] border-black h-[200px] w-[200px] flex justify-center ml-10 cursor-pointer ${
            selected === "creator" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleSelect("creator")}
        >
          <p className="ml-5 mt-16 font-semibold">
            Join as a influencer or Creator.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        {selected && (
          <button
            className="px-5 py-3 bg-green-500 text-white font-bold rounded"
            onClick={handleSignup}
          >
            {selected === "creator"
              ? "Proceed as an Influencer"
              : "Proceed as an Business owner"}
          </button>
        )}
      </div>
    </>
  );
}

export default Choose;
