// 📄 src/components/FormTemplate.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Reusable Form Template
 * -------------------------
 * Props:
 * @param {string} title - Page title
 * @param {function} onSubmit - Function to handle form submission
 * @param {ReactNode} children - Form fields
 * @param {string} submitText - Text for submit button
 * @param {boolean} showBackButton - Whether to show Back button (default: true)
 */

const FormTemplate = ({
  title = "Form Title",
  onSubmit,
  children,
  submitText = "Submit",
  width = "max-w-4xl",
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full w-full items-center justify-center p-6 overflow-hidden">
      <div className={`w-full ${width} backdrop-blur-lg bg-white/70 shadow-[0_0_15px_0_rgba(0,0,0,0.2)] rounded-2xl border border-white/40 p-8 sm:p-10 transition-all duration-300  bg-gradient-to-br from-blue-100 via-white to-indigo-100`}>
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          {title}
        </h2>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {children}

          {/* Action Buttons */}
          <div className="sm:col-span-2 mt-2 flex justify-center items-around gap-4">
            {showBackButton && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="sm:px-6 px-4 sm:py-2.5 py-2 rounded-full border border-gray-300 text-white font-medium bg-red-400 hover:bg-red-500 shadow-sm hover:shadow transition hover:scale-[1.02] duration-200"
              >
                Back
              </button>
            )}

            <button
              type="submit"
              className="sm:px-8 px-4 sm:py-2.5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-200"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTemplate;
