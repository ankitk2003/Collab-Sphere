
import React, { useState } from "react";
import BusinesssNav from "./BusinessNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAPIBase } from "../utils/getBASEAPI";
import { chatSession } from "../script/index";  // Import your Gemini config here

const API_BASE = getAPIBase();

function BusinessPost() {
  return (
    <div>
      <BusinesssNav />
      <CreateCampaignForm />
    </div>
  );
}

const CreateCampaignForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAudience: "",
    budget: "",
    platform: "",
  });

  const [loadingAI, setLoadingAI] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async (e) => {
    e.preventDefault();
    setLoadingAI(true);
    try {
     const prompt = `
You are an expert marketing copywriter.

Write a compelling, friendly, and professional campaign post description for a brand seeking collaborations with content creators.

Details:
- Campaign Title: ${formData.title}
- Target Audience: ${formData.targetAudience}
- Budget: ${formData.budget}
- Platform: ${formData.platform}

The post should:
- Clearly describe the type of collaboration or promotion expected from content creators.
- Invite creators to collaborate with the brand.
- Be engaging and inspiring.
- Include a strong call-to-action encouraging creators to apply or reach out.

Keep the tone approachable, creative, and professional.
`;


      const result = await chatSession.sendMessage(prompt);
      const response = await result.response;
      const generatedText = response.text();
      setFormData((prev) => ({
        ...prev,
        description: generatedText,
      }));
    } catch (error) {
      if(error.message.includes(502)){
  alert("Gemini is busy , try after some time")
      }
      console.error("AI Error:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        postedOn: new Date(),
      };

      const res = await axios.post(
        `${API_BASE}/api/v1/business/create-post`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/business-dashboard");
      console.log(res);
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-2xl space-y-6 mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create New Campaign</h2>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter campaign title"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Target Audience
        </label>
        <input
          type="text"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Gen Z, Tech Enthusiasts"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Budget ($)
        </label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Platform
        </label>
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a platform</option>
          <option value="Instagram">Instagram</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
          <option value="Twitter">Twitter</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your campaign"
          rows={4}
          required
        />
      </div>

      <button
        onClick={handleGenerateDescription}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
        disabled={loadingAI}
      >
        {loadingAI ? "Generating..." : "Generate Description with AI"}
      </button>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Submit Campaign
      </button>
    </form>
  );
};

export default BusinessPost;
