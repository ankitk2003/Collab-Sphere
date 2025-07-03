import React, { useEffect, useState } from "react";
import BusinesssNav from "./BusinessNav";
import Banner from "../images/Banner.jpg";
import axios from "axios";
import { use } from "react";

function Profile() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <>
      {role === "business" ? <BusinessProfile /> : <CreatorProfile/>}
    </>
  );
}

export default Profile;

const BusinessProfile = () => {
  const token = localStorage.getItem("token");
  const [profile, SetProfile] = useState([]);
  const [profileCardData, setProfileCardData] = useState(null);
  const senderId = localStorage.getItem("senderId");

  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/business/get-posts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data.posts);
        const filteredData = res.data.posts.filter(
          (post) => post.userId&&post.userId._id === senderId // filter the post which account i have logged in , so fetch it from local host .
        );
        // console.log(filteredData)
        SetProfile(filteredData);

        if (filteredData.length > 0) {
          setProfileCardData(filteredData[0].userId);
        }
      } catch (e) {
        console.log("error in fetching data", e);
      }
    };
    FetchProfile();
  }, [token]);
  //   useEffect(()=>{
  //  console.log(profile,profileCardData)
  //   },[profile,profileCardData])

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/business/delete-post/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      SetProfile((prev) => prev.filter((p) => p._id !== postId));
    } catch (e) {
      console.error("Failed to delete post:", e);
    }
  };

  return (
    <>
      <BusinesssNav />
      <div className="flex justify-center w-full mt-4">
        <img
          src={Banner}
          alt="Banner"
          className="max-w-full h-auto rounded-xl shadow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-10 mt-8">
        {/* Profile Card */}
        <div className="col-span-1 bg-white shadow-lg rounded-2xl p-6 h-fit">
          {profileCardData && (
            <>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={
                    profileCardData.profilePhoto ||
                    "https://via.placeholder.com/100"
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {profileCardData.businessName}
                  </h2>
                  <p className="text-gray-500 capitalize">
                    {profileCardData.industry}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created on: {profileCardData.posted}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Campaign Goals:</span>{" "}
                  {profileCardData.campaignGoals}
                </p>
                <p>
                  <span className="font-medium">Budget Range:</span>{" "}
                  {profileCardData.budgetRange}
                </p>
                <p>
                  <span className="font-medium">Target Audience:</span>{" "}
                  {profileCardData.targetAudience.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  <a
                    href={`https://${profileCardData.websiteUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profileCardData.websiteUrl}
                  </a>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Posts Section */}
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 ">
            Your Posts
          </h2>
          {profile.length > 0 ? (
            profile.map((post, index) => (
              <div
                key={index}
                className="relative bg-white shadow-md rounded-xl p-5 mb-6 hover: shadow-2xl hover:bg-slate-50"
              >
                {/* Three dot menu */}
                <div className="absolute top-3 right-3">
                  <div className="relative group">
                    <button className="text-gray-600 text-xl font-bold">
                      ⋯
                    </button>
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Platform:</span>{" "}
                  {post.platform}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Description:</span>{" "}
                  {post.description}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Budget:</span> ${post.budget}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Target Audience:</span>{" "}
                  {post.targetAudience.join(", ")}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Posted On:</span>{" "}
                  {post.postedOn
                    ? new Date(post.postedOn).toLocaleDateString("en-GB")
                    : "No date"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              You didn't post anything yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};


const CreatorProfile = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/creator/user-profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(res.data.userData);
      } catch (e) {
        console.log("error in fetching data", e);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return null; 

  return (
    <>
      {/* Full-width Banner */}
      <div className="w-full px-4 md:px-6 mt-4">
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-60 md:h-72 object-cover rounded-xl shadow"
        />
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded-xl shadow">
        <div className="flex items-center space-x-4">
          <img
            src={profile.profilePhoto || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.userId.username}</h2>
            <p className="text-gray-600">{profile.niche}</p>
            <p className="text-gray-500">{profile.userId.email}</p>
          </div>
        </div>

        <div className="mt-4">
          <p><strong>Followers:</strong> {profile.followerCount}</p>
          <p><strong>Engagement Rate:</strong> {profile.engagementRate}</p>
          <p><strong>Platform:</strong> {profile.platformName}</p>
          <p><strong>Platform Link:</strong> <a href={profile.platformLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">{profile.platformLink}</a></p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      </div>
    </>
  );
};