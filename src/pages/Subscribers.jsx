import React, { useEffect, useState } from "react";

const Subscribers = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [openPost, setOpenPost] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch data
  useEffect(() => {
    setLoading(true);

    fetch(`https://bteam11.com/api/auth/subscribedata?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPosts(res.data);
          setPages(res.pages);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  if (loading) {
    return <div className="p-6">Loading subscribers...</div>;
  }

  // Filter emails by date
  const filteredPosts = posts
    .map((post) => {
      const filteredEmails = post.emailIds.filter((e) => {
        const emailDate = new Date(e.subscribedAt || post.createdAt); // fallback if no subscribedAt
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate + "T23:59:59") : null;

        if (from && emailDate < from) return false;
        if (to && emailDate > to) return false;

        return true;
      });

      return {
        ...post,
        emailIds: filteredEmails,
      };
    })
    .filter((post) => post.emailIds.length > 0); // remove posts with zero emails

  // CSV export
  const exportCSV = () => {
    const rows = [["Media ID", "Email", "Subscribed At"]];

    filteredPosts.forEach((post) => {
      post.emailIds.forEach((e) => {
        rows.push([
          post.mediaId,
          e.email || e, // support string or object
          new Date(e.subscribedAt || post.createdAt).toLocaleString(),
        ]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "subscribers_by_date.csv";
    link.click();
  };

  return (
   <div className="p-6">
  <div className="flex flex-wrap justify-between items-center mb-6">
    {/* TITLE */}
    <h2 className="text-2xl font-bold mb-4 md:mb-0">Post Subscribers</h2>

    {/* FILTER + CSV + RESET */}
    <div className="flex flex-wrap gap-4 items-center">
      <div>
        <label className="block text-sm mb-1">From Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={exportCSV}
        className="px-4 py-2 bg-green-600 text-white rounded mt-6"
      >
        Export CSV
      </button>

      <button
        onClick={() => {
          setFromDate("");
          setToDate("");
        }}
        className="px-4 py-2 bg-gray-500 text-white rounded mt-6"
      >
        Reset Filter
      </button>
    </div>
  </div>

  {/* TABLE */}
  <div className="overflow-x-auto">
   <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Media</th>
              <th className="border px-4 py-2">Subscribers</th>
              <th className="border px-4 py-2">Created</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              filteredPosts.map((post, index) => (
                <React.Fragment key={post._id}>
                  <tr className="hover:bg-gray-100">
                    <td className="border px-4 py-2">
                      {(page - 1) * 10 + index + 1}
                    </td>

                    <td className="border px-4 py-2">
                      {post.mediaType === "image" && (
                        <img
                          src={post.mediaUrl}
                          alt="media"
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      {post.mediaType === "video" && (
                        <video
                          src={post.mediaUrl}
                          className="w-20 h-20 rounded"
                          controls
                        />
                      )}
                    </td>

                    <td className="border px-4 py-2 text-center">
                      {post.emailIds.length}
                    </td>

                    <td className="border px-4 py-2">
                      {new Date(post.createdAt).toLocaleString()}
                    </td>

                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() =>
                          setOpenPost(openPost === post._id ? null : post._id)
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        {openPost === post._id ? "Hide Emails" : "View Emails"}
                      </button>
                    </td>
                  </tr>

                  {openPost === post._id && (
                    <tr>
                      <td colSpan="5" className="border px-6 py-4 bg-gray-50">
                        <h4 className="font-semibold mb-2">Subscribers Emails</h4>

                        {post.emailIds.length === 0 ? (
                          <p className="text-gray-500">No emails</p>
                        ) : (
                          <ul className="space-y-2">
                            {post.emailIds.map((item, i) => (
                              <li
                                key={i}
                                className="flex justify-between items-center border-b pb-1"
                              >
                                <span className="text-gray-800">
                                  {item.email || item}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(item.subscribedAt || post.createdAt).toLocaleString()}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
  </div>

  {/* PAGINATION */}
  <div className="flex justify-center gap-3 mt-6">
     <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
  </div>
</div>

  );
};

export default Subscribers;
