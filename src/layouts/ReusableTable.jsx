import React, { useState } from "react";
import { Eye, Edit, Wrench, Pencil, X } from "lucide-react";

/**
 * ReusableTable (card grid)
 * - data: array of items (must include mediaId, image, prompt, tool, updatedAt)
 * - onEditPrompt(id, newPrompt) -> optional async handler
 * - onEditTool(id, newTool) -> optional async handler
 *
 * Popups are card-local and will NOT show globally.
 */
const ReusableTable = ({
  data = [],
  title = "Uploaded Images",
  onEditPrompt,
  onEditTool,
  onEditComment, // new prop
}) => {
  const [activeCardId, setActiveCardId] = useState(null); // mediaId
  const [popupType, setPopupType] = useState(null); // "viewPrompt" | "editPrompt" | "viewTool" | "editTool" | "viewComment" | "editComment"
  const [tempValue, setTempValue] = useState("");

  const openPopup = (item, type) => {
    setActiveCardId(item.mediaId);
    setPopupType(type);

    if (type === "editPrompt" || type === "viewPrompt") setTempValue(item.prompt || "");
    if (type === "editTool" || type === "viewTool") setTempValue(item.tool || "");
    if (type === "editComment" || type === "viewComment") setTempValue(item.adminComment || "");
  };

  const closePopup = () => {
    setActiveCardId(null);
    setPopupType(null);
    setTempValue("");
  };

  const saveChange = async () => {
    if (!activeCardId || !popupType) return;

    try {
      if (popupType === "editPrompt" && typeof onEditPrompt === "function") {
        await onEditPrompt(activeCardId, tempValue);
      } else if (popupType === "editTool" && typeof onEditTool === "function") {
        await onEditTool(activeCardId, tempValue);
      } else if (popupType === "editComment" && typeof onEditComment === "function") {
        await onEditComment(activeCardId, tempValue);
      }
      closePopup();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="text-xl sm:text-2xl font-bold mb-6 text-center">{title}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 && (
          <div className="text-center text-gray-500 col-span-full py-10">No items found.</div>
        )}

        {data.map((item, index) => {
          const isActive = activeCardId === item.mediaId;
          return (
            <div
              key={item.mediaId || index}
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition h-80"
            >
              {/* Media */}
              {item.video ? (
                <video
                  src={item.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.prompt || `media-${index}`}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              <div className="absolute inset-0 bg-black/5 transition"></div>

              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openPopup(item, "viewPrompt")}
                    className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition"
                    aria-label="View prompt"
                  >
                    <Eye size={16} className="text-white" />
                  </button>

                  <button
                    onClick={() => openPopup(item, "editPrompt")}
                    className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition"
                    aria-label="Edit prompt"
                  >
                    <Edit size={16} className="text-white" />
                  </button>

                  <button
                    onClick={() => openPopup(item, "viewTool")}
                    className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition"
                    aria-label="View tool"
                  >
                    <Wrench size={16} className="text-white" />
                  </button>

                  <button
                    onClick={() => openPopup(item, "editTool")}
                    className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition"
                    aria-label="Edit tool"
                  >
                    <Pencil size={16} className="text-white" />
                  </button>

                  {/* NEW COMMENT BUTTONS */}
                  <button
                    onClick={() => openPopup(item, "viewComment")}
                    className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition"
                    aria-label="View comment"
                  >
                    <Eye size={16} className="text-yellow-300" />
                  </button>

                  <button
                    onClick={() => openPopup(item, "editComment")}
                    className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition"
                    aria-label="Edit comment"
                  >
                    <Pencil size={16} className="text-yellow-300" />
                  </button>
                </div>

                <div className="text-gray-300 text-xs mt-2">
                  Updated:{" "}
                  {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "Unknown"}
                </div>
              </div>

              {/* Card-local popup */}
              {isActive && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-white rounded-xl p-4 shadow-lg relative">
                    <button
                      onClick={closePopup}
                      className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                      aria-label="Close popup"
                    >
                      <X size={18} />
                    </button>

                    <h3 className="text-lg font-semibold mb-2">
                      {popupType === "viewPrompt" && "Prompt"}
                      {popupType === "editPrompt" && "Edit Prompt"}
                      {popupType === "viewTool" && "Tool"}
                      {popupType === "editTool" && "Edit Tool"}
                      {popupType === "viewComment" && "Admin Comment"}
                      {popupType === "editComment" && "Edit Admin Comment"}
                    </h3>

                    {(popupType === "viewPrompt" ||
                      popupType === "viewTool" ||
                      popupType === "viewComment") && (
                      <div className="mb-3 text-sm text-gray-700 whitespace-pre-wrap">
                        {tempValue ||
                          (popupType === "viewPrompt"
                            ? item.prompt
                            : popupType === "viewTool"
                            ? item.tool
                            : item.adminComment) || "N/A"}
                      </div>
                    )}

                    {(popupType === "editPrompt" ||
                      popupType === "editTool" ||
                      popupType === "editComment") && (
                      <>
                        <textarea
                          rows={5}
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="w-full border rounded p-2 text-sm"
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={saveChange}
                            className="flex-1 py-2 rounded bg-black text-white hover:bg-gray-900"
                          >
                            Save
                          </button>
                          <button
                            onClick={closePopup}
                            className="py-2 px-4 rounded border"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReusableTable;

