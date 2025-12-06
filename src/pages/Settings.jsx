import React, { useState, useEffect } from "react";

const Setting = () => {
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/100");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user data using token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://bteam11.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setFullName(data.user.fullName);
          setEmail(data.user.email);
          setPhone(data.user.phone || "");
          setProfileImage(data.user.profileImage || "https://i.pravatar.cc/100");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image locally
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle profile update
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await fetch("https://bteam11.com/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ fullName, phone, profileImage })
      });

      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:p-6 p-3">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-center text-gray-700 font-semibold mb-6 md:text-4xl text-2xl uppercase tracking-wide">
          Admin PROFILE
        </h2>

        <div className="flex flex-col items-center mb-6">
         <div className="relative">
  <img
    src={profileImage}
    alt="Profile"
    onClick={() => document.getElementById("fileInput").click()} // trigger hidden input
    className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover cursor-pointer"
  />
  <input
    type="file"
    id="fileInput"
    accept="image/*"
    className="hidden"
    onChange={handleFileChange} // keep your existing function
  />
</div>

        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1 text-sm">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full shadow-[inset_0_0_4px_#00000040] rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1 text-sm">Email</label>
          <input
            type="text"
            value={email}
            disabled
            className="w-full shadow-[inset_0_0_4px_#00000040] bg-gray-100 rounded p-3 text-sm text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1 text-sm">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full shadow-[inset_0_0_4px_#00000040] rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-md font-semibold px-6 py-3 rounded"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
