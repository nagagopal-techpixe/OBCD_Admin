import React, { useEffect, useState } from "react";
import ReusableTable from "../../layouts/ReusableTable";

const UserList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update prompt
  const handlePromptChange = async (id, value) => {
    setVideos((prev) =>
      prev.map((v) => (v.mediaId === id ? { ...v, prompt: value } : v))
    );

    await fetch(`https://bteam11.com/api/auth/videos/prompt/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: value }),
    });
  };

  // Update tool
  const handleToolChange = async (id, value) => {
    setVideos((prev) =>
      prev.map((v) => (v.mediaId === id ? { ...v, tool: value } : v))
    );

    await fetch(`https://bteam11.com/api/auth/videos/tool/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: value }),
    });
  };

  const handleCommentChange = async (id, newComment) => {
  // Update locally in state
  setVideos(prev =>
    prev.map(m => (m.mediaId === id ? { ...m, adminComment: newComment } : m))
  );

  try {
    // Update in backend
    await fetch(`https://bteam11.com/api/auth/videos/comment/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ comment: newComment })
    });
  } catch (err) {
    console.error("Failed saving admin comment:", err);
  }
};

  // Fetch videos from backend
  const loadVideos = async () => {
    const res = await fetch("https://bteam11.com/api/auth/videos");
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos(); // first load
    const interval = setInterval(loadVideos, 900000); // refresh every 15 min
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { key: "sno", label: "S.no" },
    { key: "video", label: "Video" },
    { key: "uploadTime", label: "Upload Time" },
    { key: "promptInput", label: "Video Prompt" },
    { key: "toolInput", label: "Video Tool" },
  ];

  const tableData = videos.map((item, index) => ({
    ...item,
    sno: index + 1,
    uploadTime: new Date(item.timestamp).toLocaleString(),
    video: (
      <video
        src={item.video || item.image}
        controls
        className="w-40 h-24 rounded"
      />
    ),
    promptInput: (
      <textarea
        className="border p-1 rounded w-full"
        placeholder="enter prompt..."
        value={item.prompt || ""}
        onChange={(e) => handlePromptChange(item.mediaId, e.target.value)}
      />
    ),
    toolInput: (
      <input
        className="border p-1 rounded w-full"
        placeholder="enter tool..."
        value={item.tool || ""}
        onChange={(e) => handleToolChange(item.mediaId, e.target.value)}
      />
    ),
  }));

  return loading ? (
    <p className="text-center p-4">Loading videos...</p>
  ) : (
   <ReusableTable
        
  title="Uploaded Videos"
  data={videos}
  onEditPrompt={handlePromptChange}
  onEditTool={handleToolChange}
  onEditComment={handleCommentChange}

  
/>

    // <ReusableTable title="Uploaded Videos"columns={columns} data={tableData} showActions={false} />
  );
};

export default UserList;
