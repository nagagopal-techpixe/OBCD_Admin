import React, { useEffect, useState } from "react";
import ReusableTable from "../../layouts/ReusableTable";

const ExamplePage = () => {
  const [instagramMedia, setInstagramMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMedia = async () => {
    try {
      const res = await fetch("https://bteam11.com/api/auth/instagram");
      const data = await res.json();
      setInstagramMedia(data);
      setLoading(false);
    } catch (err) {
      console.error("Frontend Fetch Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
    const interval = setInterval(loadMedia, 900000); // refresh every 15min
    return () => clearInterval(interval);
  }, []);

  // Parent handler: accepts (id, newPrompt)
  const handleEditPrompt = async (id, newPrompt) => {
    // optimistic update locally
    setInstagramMedia(prev =>
      prev.map(m => (m.mediaId === id ? { ...m, prompt: newPrompt } : m))
    );

    try {
      await fetch(`https://bteam11.com/api/auth/prompt/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: newPrompt }),
      });
      // optionally re-fetch or update based on response
    } catch (err) {
      console.error("Failed saving prompt:", err);
      // optionally revert optimistic update or show error toast
    }
  };

  // Parent handler: accepts (id, newTool)
  const handleEditTool = async (id, newTool) => {
    setInstagramMedia(prev =>
      prev.map(m => (m.mediaId === id ? { ...m, tool: newTool } : m))
    );

    try {
      await fetch(`https://bteam11.com/api/auth/tool/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: newTool }),
      });
    } catch (err) {
      console.error("Failed saving tool:", err);
    }
  };

  // Parent handler: accepts (id, newComment)
  const handleEditComment = async (id, newComment) => {
  // Update locally in state
  setInstagramMedia(prev =>
    prev.map(m => (m.mediaId === id ? { ...m, adminComment: newComment } : m))
  );

  try {
    // Update in backend
    await fetch(`https://bteam11.com/api/auth/comment/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ comment: newComment })
    });
  } catch (err) {
    console.error("Failed saving admin comment:", err);
  }
};


  return loading ? (
    <p className="text-center p-4">Loading...</p>
  ) : (
    <div className="p-4 sm:p-6">
      <ReusableTable
        title="Uploaded Images"
        data={instagramMedia}
        onEditPrompt={handleEditPrompt}
        onEditTool={handleEditTool}
        onEditComment={handleEditComment}
      />
    </div>
  );
};

export default ExamplePage;
