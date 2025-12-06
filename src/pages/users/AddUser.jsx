// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddUser = ({ onSubmit }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     department: "",
//     status: "active",
//     salary: "",
//     joinDate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSubmit) onSubmit(formData);
//   };

//   return (
//     <div className="min-h-full flex items-center justify-center  p-10">
//       <div className="w-full max-w-4xl backdrop-blur-lg bg-white/70 shadow-2xl rounded-2xl border border-white/40 p-8 transition-all duration-300 hover:shadow-blue-200 bg-gradient-to-br from-blue-100 via-white to-indigo-100">
//         {/* Title */}
//         <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
//           Add New User
//         </h2>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 sm:grid-cols-2 gap-6 "
//         >
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               required
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Role
//             </label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               required
//             >
//               <option value="">Select Role</option>
//               <option value="Developer">Developer</option>
//               <option value="Designer">Designer</option>
//               <option value="Manager">Manager</option>
//               <option value="QA Engineer">QA Engineer</option>
//               <option value="HR">HR</option>
//             </select>
//           </div>

//           {/* Department */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Department
//             </label>
//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               required
//             >
//               <option value="">Select Department</option>
//               <option value="Engineering">Engineering</option>
//               <option value="Design">Design</option>
//               <option value="Management">Management</option>
//               <option value="Marketing">Marketing</option>
//               <option value="Sales">Sales</option>
//             </select>
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Status
//             </label>
//             <div className="flex items-center gap-4 mt-2">
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="status"
//                   value="active"
//                   checked={formData.status === "active"}
//                   onChange={handleChange}
//                   className="text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-gray-700 text-sm">Active</span>
//               </label>
//               <label className="flex items-center gap-1">
//                 <input
//                   type="radio"
//                   name="status"
//                   value="inactive"
//                   checked={formData.status === "inactive"}
//                   onChange={handleChange}
//                   className="text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-gray-700 text-sm">Inactive</span>
//               </label>
//             </div>
//           </div>

//           {/* Salary */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Salary
//             </label>
//             <input
//               type="number"
//               name="salary"
//               value={formData.salary}
//               onChange={handleChange}
//               placeholder="Enter salary in USD"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//             />
//           </div>

//           {/* Joining Date */}
//           <div className="sm:col-span-2">
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Joining Date
//             </label>
//             <input
//               type="date"
//               name="joinDate"
//               value={formData.joinDate}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               required
//             />
//           </div>

//           {/* Actions */}
//           <div className="sm:col-span-2 mt-6 flex justify-center gap-4">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="px-6 py-2.5 rounded-full border border-gray-300 text-white font-medium bg-red-400 hover:bg-red-500 shadow-sm hover:shadow transition hover:scale-[1.02] transition-transform duration-200"
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               className="px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
//             >
//               Add User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUser;

// 📄 src/pages/AddUser.jsx
import React, { useState } from "react";
import FormTemplate from "../../layouts/FormTemplate"; // adjust path as needed

const AddUser = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "active",
    salary: "",
    joinDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <FormTemplate title="Add New User" onSubmit={handleSubmit} submitText="Add User">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        >
          <option value="">Select Role</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
          <option value="QA Engineer">QA Engineer</option>
          <option value="HR">HR</option>
        </select>
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Department
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Management">Management</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Status
        </label>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.status === "active"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm">Active</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formData.status === "inactive"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm">Inactive</span>
          </label>
        </div>
      </div>

      {/* Salary */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Salary
        </label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter salary in USD"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      {/* Joining Date */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Joining Date...
        </label>
        <input
          type="date"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        />
      </div>
    </FormTemplate>
  );
};

export default AddUser;
