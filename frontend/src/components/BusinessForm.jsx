import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessForm = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const[loading,setLoading]=useState(false);
  const websiteUrlRef = useRef();
  const targetAudienceRef = useRef();
  const businessNameRef = useRef();

  async function handleSubmit() {
      setLoading(true); // Show loader

    try {
      const token = localStorage.getItem("token");

      const websiteUrl = websiteUrlRef.current.value;
      const targetAudience = targetAudienceRef.current.value
        .split(",")
        .map((item) => item.trim());
      const businessName = businessNameRef.current.value;

      const formData = new FormData();
      formData.append("industry", industry);
      formData.append("websiteUrl", websiteUrl);
      formData.append("businessName", businessName);
      formData.append("targetAudience", JSON.stringify(targetAudience));
      if (selectedPhoto) {
        formData.append("profilePhoto", selectedPhoto);
      }

      const res = await axios.post(
        "http://localhost:3000/api/v1/business/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data.message);
      navigate("/business-dashboard");
    } catch (error) {
      console.log("Error submitting form", error);
    }finally{
      setLoading(false)
    }
  }

  return (

    <>
 {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        </div>
      )}

    <div className="container mx-auto p-5">
      <div id="logo">
        <span className="font-bold ml-5 text-xl">Collab_sphere</span>
      </div>

      <div className="text-center text-lg font-bold mt-5">
        <p>Complete your business profile to start collaborating.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6">
        <div className="w-full md:flex-1 p-5">
          <div className="mb-4">
            <label className="block text-sm font-medium">Industry</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Business Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter business name"
              ref={businessNameRef}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Website URL</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter website URL"
              ref={websiteUrlRef}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Target Audience</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter target audience (comma separated)"
              ref={targetAudienceRef}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setSelectedPhoto(e.target.files[0])}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="border-gray-600 border-[1px] p-2 bg-green-500 text-white hover:text-black hover:bg-white rounded-md"
              onClick={handleSubmit}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BusinessForm;
