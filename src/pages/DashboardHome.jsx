import React, { useEffect, useState } from 'react';
import AreaChart from '../Components/Charts/AreaChat';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCarousel: 0,
    totalVideos: 0,
    // readyToDownload: 0,
  });

  // Fetch stats from backend only once
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");   // ✅ FIXED: Define token

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch("https://bteam11.com/api/auth/instagram/stats", {
        headers: {
          "Authorization": `Bearer ${token}`,   // ✅ FIXED: Send token
        },
      });

      const data = await response.json();
      setStats(data);

    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats(); // Load stats on page load
  }, []);

  return (
    <div className="space-y-6 p-3">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Posts</p>
          <p className="text-4xl font-bold text-gray-900">{stats.totalPosts}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Carousel</p>
          <p className="text-4xl font-bold text-gray-900">{stats.totalCarousel}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Videos</p>
          <p className="text-4xl font-bold text-gray-900">{stats.totalVideos}</p>
        </div>

        {/* <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Ready to Download</p>
          <p className="text-4xl font-bold text-gray-900">{stats.readyToDownload}</p>
        </div> */}
      </div>

      {/* Chart */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <AreaChart stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
