// import React, { useState } from "react";

// const EditVendor = () => {
//   const [activeTab, setActiveTab] = useState("personal");

//   // Default editable vendor data
//   const [vendor, setVendor] = useState({
//     _id: "V123456789",
//     fullName: "John Michael Doe",
//     businessName: "Tech Supplies Inc.",
//     email: "john.doe@techsupplies.com",
//     phoneNumber: "+1 (555) 123-4567",
//     createdby: "admin@example.com",
//     createdAt: "2024-03-15T10:30:00Z",
//     status: "Approved",
//     profilepic: "https://i.pravatar.cc/150?img=12",
//     bankAccountHolderName: "John M. Doe",
//     bankName: "Global Bank",
//     branchName: "Downtown Branch",
//     accountNumber: "XXXX-XXXX-7890",
//     ifscOrSwiftCode: "GLBKUS33XXX",
//     paymentTerms: "Net 30",
//     businessAddress: "123 Business Ave, Suite 100, New York, NY 10001",
//     pickupAddress: "456 Warehouse Blvd, Brooklyn, NY 11201",
//     returnAddress: "789 Returns Lane, Queens, NY 11375",
//     businessType: "Private Limited",
//     businessRegistrationNumber: "REG987654321",
//     taxNumber: "TAX-123456789",
//     businessCategory: "Electronics & IT",
//     websiteUrl: "https://www.techsupplies.example",
//     businessDescription:
//       "We provide high-quality tech components and enterprise IT solutions to businesses across North America.",
//     acceptTermsAndConditions: true,
//     acceptPrivacyPolicy: true,
//     governmentIdType: "Passport",
//     governmentIdNumber: "P12345678",
//     businessRegistrationurl: "https://example.com/docs/business-reg.pdf",
//     GSTINvoiceUrl: "https://example.com/docs/gst-invoice.pdf",
//     governmentIdImageUrl: "https://i.pravatar.cc/300?img=33",
//     chequeImageUrl: "https://i.pravatar.cc/300?img=44",
//     bankbookImageUrl: "https://i.pravatar.cc/300?img=55",
//   });

//   // handle text input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setVendor((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // handle image/document uploads
//   const handleFileChange = (e, fieldName) => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setVendor((prev) => ({
//         ...prev,
//         [fieldName]: fileURL,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Edited Vendor Data:", vendor);
//     alert("✅ Vendor details have been saved (check console).");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       month: "2-digit",
//       day: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     }).replace(",", "");
//   };

//   const InputField = ({ label, name, value, icon, type = "text", fullWidth = false }) => (
//     <div
//       className={`${fullWidth ? "col-span-2" : ""} bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all`}
//     >
//       <div className="flex items-start gap-3">
//         <div className="text-2xl mt-0.5">{icon}</div>
//         <div className="flex-1 min-w-0">
//           <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
//             {label}
//           </label>
//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={handleChange}
//             className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderDocumentUpload = (url, title, field, isImage = false) => (
//     <div className="space-y-2">
//       <label className="block font-semibold text-gray-900">{title}</label>
//       {isImage ? (
//         <div className="relative group">
//           <img
//             src={url}
//             alt={title}
//             className="w-full h-40 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleFileChange(e, field)}
//             className="absolute inset-0 opacity-0 cursor-pointer"
//           />
//         </div>
//       ) : (
//         <div className="relative group flex flex-col items-center justify-center h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors">
//           <div className="text-5xl mb-2">📄</div>
//           <div className="text-sm font-semibold text-gray-700">PDF/Doc</div>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => handleFileChange(e, field)}
//             className="absolute inset-0 opacity-0 cursor-pointer"
//           />
//         </div>
//       )}
//     </div>
//   );

//   const tabs = [
//     { id: "personal", label: "Personal Info", icon: "👤" },
//     { id: "business", label: "Business", icon: "🏢" },
//     { id: "bank", label: "Bank Details", icon: "🏦" },
//     { id: "addresses", label: "Addresses", icon: "📍" },
//     { id: "documents", label: "Documents", icon: "📄" },
//   ];

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
//     >
//       {/* Top Bar */}
//       <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 bg-white/30 backdrop-blur-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 type="button"
//                 onClick={() => window.history.back()}
//                 className="text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </button>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Edit Vendor Profile</h1>
//                 <p className="text-sm text-gray-500">ID: {vendor._id}</p>
//               </div>
//             </div>
//             <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
//               ✓ {vendor.status}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Profile Header */}
//         <div className="bg-[linear-gradient(106.37deg,_#ffe1bc_29.63%,_#ffcfd1_51.55%,_#f3c6f1_90.85%)] rounded-2xl shadow-xl p-8 mb-8 text-white">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <div className="relative">
//               <img
//                 src={vendor.profilepic}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileChange(e, "profilepic")}
//                 className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
//               />
//             </div>
//             <div className="flex-1 text-center md:text-left">
//               <input
//                 name="fullName"
//                 value={vendor.fullName}
//                 onChange={handleChange}
//                 className="text-3xl font-bold bg-transparent border-b border-white/50 focus:outline-none w-full text-white mb-2"
//               />
//               <input
//                 name="businessName"
//                 value={vendor.businessName}
//                 onChange={handleChange}
//                 className="text-xl bg-transparent border-b border-white/50 focus:outline-none w-full text-blue-400 mb-4"
//               />
//               <div className="flex flex-wrap gap-3 justify-center md:justify-start">
//                 <input
//                   name="email"
//                   value={vendor.email}
//                   onChange={handleChange}
//                   className="bg-white/10 border px-4 py-2 rounded-lg text-sm text-white w-64 focus:outline-none"
//                 />
//                 <input
//                   name="phoneNumber"
//                   value={vendor.phoneNumber}
//                   onChange={handleChange}
//                   className="bg-white/10 border px-4 py-2 rounded-lg text-sm text-white w-48 focus:outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
//           <div className="flex overflow-x-auto scrollbar-hide">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex-1 min-w-[140px] px-6 py-4 font-medium text-sm transition-all border-b-2 ${
//                   activeTab === tab.id
//                     ? "border-blue-600 bg-blue-50 text-blue-700"
//                     : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <span className="text-lg">{tab.icon}</span>
//                   <span>{tab.label}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           {/* Personal Info */}
//           {activeTab === "personal" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputField icon="👤" label="Full Name" name="fullName" value={vendor.fullName} />
//               <InputField icon="📧" label="Email" name="email" value={vendor.email} type="email" />
//               <InputField icon="📱" label="Phone Number" name="phoneNumber" value={vendor.phoneNumber} />
//               <InputField icon="🆔" label="Government ID Type" name="governmentIdType" value={vendor.governmentIdType} />
//               <InputField icon="🔢" label="Government ID Number" name="governmentIdNumber" value={vendor.governmentIdNumber} />
//             </div>
//           )}

//           {/* Business */}
//           {activeTab === "business" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputField icon="🏢" label="Business Name" name="businessName" value={vendor.businessName} />
//               <InputField icon="🏷️" label="Business Type" name="businessType" value={vendor.businessType} />
//               <InputField icon="💼" label="Tax Number" name="taxNumber" value={vendor.taxNumber} />
//               <InputField icon="📊" label="Business Category" name="businessCategory" value={vendor.businessCategory} />
//               <InputField icon="🌐" label="Website URL" name="websiteUrl" value={vendor.websiteUrl} />
//               <InputField
//                 icon="📝"
//                 label="Business Description"
//                 name="businessDescription"
//                 value={vendor.businessDescription}
//                 fullWidth
//               />
//             </div>
//           )}

//           {/* Bank */}
//           {activeTab === "bank" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputField icon="👤" label="Account Holder Name" name="bankAccountHolderName" value={vendor.bankAccountHolderName} />
//               <InputField icon="🏦" label="Bank Name" name="bankName" value={vendor.bankName} />
//               <InputField icon="🏢" label="Branch Name" name="branchName" value={vendor.branchName} />
//               <InputField icon="💳" label="Account Number" name="accountNumber" value={vendor.accountNumber} />
//               <InputField icon="🔢" label="IFSC/SWIFT Code" name="ifscOrSwiftCode" value={vendor.ifscOrSwiftCode} />
//             </div>
//           )}

//           {/* Addresses */}
//           {activeTab === "addresses" && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <textarea
//                 name="businessAddress"
//                 value={vendor.businessAddress}
//                 onChange={handleChange}
//                 className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 rows="4"
//               />
//               <textarea
//                 name="pickupAddress"
//                 value={vendor.pickupAddress}
//                 onChange={handleChange}
//                 className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 rows="4"
//               />
//               <textarea
//                 name="returnAddress"
//                 value={vendor.returnAddress}
//                 onChange={handleChange}
//                 className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 rows="4"
//               />
//             </div>
//           )}

//           {/* Documents */}
//           {activeTab === "documents" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {renderDocumentUpload(vendor.businessRegistrationurl, "Business Registration", "businessRegistrationurl")}
//               {renderDocumentUpload(vendor.GSTINvoiceUrl, "GST Invoice", "GSTINvoiceUrl")}
//               {renderDocumentUpload(vendor.governmentIdImageUrl, "Government ID", "governmentIdImageUrl", true)}
//               {renderDocumentUpload(vendor.chequeImageUrl, "Cheque Image", "chequeImageUrl", true)}
//               {renderDocumentUpload(vendor.bankbookImageUrl, "Bank Book", "bankbookImageUrl", true)}
//             </div>
//           )}
//         </div>

//         {/* Footer Actions */}
//         <div className="mt-8 flex justify-center gap-4">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
//           >
//             ← Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
//           >
//             💾 Save Changes
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default EditVendor;

import React, { useState } from "react";
import {
  FaUser,
  FaBuilding,
  FaPhoneAlt,
  FaIdCard,
  FaHashtag,
  FaGlobe,
  FaFileAlt,
  FaRegAddressCard,
  FaHome,
  //FaTruckMoving,
  FaExchangeAlt,
  FaChevronLeft,
} from "react-icons/fa";
import { BsBank, BsPerson, BsFillPersonFill } from "react-icons/bs";

const EditVendor = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // Default editable vendor data
  const [vendor, setVendor] = useState({
    _id: "V123456789",
    fullName: "John Michael Doe",
    businessName: "Tech Supplies Inc.",
    email: "john.doe@techsupplies.com",
    phoneNumber: "+1 (555) 123-4567",
    createdby: "admin@example.com",
    createdAt: "2024-03-15T10:30:00Z",
    status: "Approved",
    profilepic: "https://i.pravatar.cc/150?img=12",
    bankAccountHolderName: "John M. Doe",
    bankName: "Global Bank",
    branchName: "Downtown Branch",
    accountNumber: "XXXX-XXXX-7890",
    ifscOrSwiftCode: "GLBKUS33XXX",
    paymentTerms: "Net 30",
    businessAddress: "123 Business Ave, Suite 100, New York, NY 10001",
    pickupAddress: "456 Warehouse Blvd, Brooklyn, NY 11201",
    returnAddress: "789 Returns Lane, Queens, NY 11375",
    businessType: "Private Limited",
    businessRegistrationNumber: "REG987654321",
    taxNumber: "TAX-123456789",
    businessCategory: "Electronics & IT",
    websiteUrl: "  https://www.techsupplies.example  ",
    businessDescription:
      "We provide high-quality tech components and enterprise IT solutions to businesses across North America.",
    acceptTermsAndConditions: true,
    acceptPrivacyPolicy: true,
    governmentIdType: "Passport",
    governmentIdNumber: "P12345678",
    businessRegistrationurl: "https://example.com/docs/business-reg.pdf  ",
    GSTINvoiceUrl: "https://example.com/docs/gst-invoice.pdf  ",
    governmentIdImageUrl: "https://i.pravatar.cc/300?img=33",
    chequeImageUrl: "  https://i.pravatar.cc/300?img=44",
    bankbookImageUrl: "  https://i.pravatar.cc/300?img=55",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVendor((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVendor((prev) => ({
        ...prev,
        [fieldName]: fileURL,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited Vendor Data:", vendor);
    alert("✅ Vendor details have been saved (check console).");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(",", "");
  };

  const InputField = ({ label, name, value, icon, type = "text", fullWidth = false }) => (
    <div
      className={`${fullWidth ? "col-span-2" : ""} bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all`}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-0.5 text-gray-600">{icon}</div>
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const renderDocumentUpload = (url, title, field, isImage = false) => (
    <div className="space-y-2">
      <label className="block font-semibold text-gray-900">{title}</label>
      {isImage ? (
        <div className="relative group">
          <img
            src={url}
            alt={title}
            className="w-full h-40 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, field)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      ) : (
        <div className="relative group flex flex-col items-center justify-center h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors">
          <div className="text-5xl mb-2">
            <FaFileAlt className="text-blue-600" />
          </div>
          <div className="text-sm font-semibold text-gray-700">PDF/Doc</div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, field)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <FaUser /> },
    { id: "business", label: "Business", icon: <FaBuilding /> },
    { id: "bank", label: "Bank Details", icon: <BsBank /> },
    { id: "addresses", label: "Addresses", icon: <FaHome /> },
    { id: "documents", label: "Documents", icon: <FaFileAlt /> },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
    >
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 bg-white/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Go back"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Edit Vendor Profile</h1>
                <p className="text-sm text-gray-500">ID: {vendor._id}</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              ✓ {vendor.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-[linear-gradient(106.37deg,_#ffe1bc_29.63%,_#ffcfd1_51.55%,_#f3c6f1_90.85%)] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={vendor.profilepic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profilepic")}
                className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <input
                name="fullName"
                value={vendor.fullName}
                onChange={handleChange}
                className="text-3xl font-bold bg-transparent border-b border-white/50 focus:outline-none w-full text-white mb-2"
              />
              <input
                name="businessName"
                value={vendor.businessName}
                onChange={handleChange}
                className="text-xl bg-transparent border-b border-white/50 focus:outline-none w-full text-blue-400 mb-4"
              />
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <input
                  name="email"
                  value={vendor.email}
                  onChange={handleChange}
                  className="bg-white/10 border px-4 py-2 rounded-lg text-md font-semibold text-white w-64 focus:outline-none"
                />
                <input
                  name="phoneNumber"
                  value={vendor.phoneNumber}
                  onChange={handleChange}
                  className="bg-white/10 border px-4 py-2 rounded-lg text-md font-semibold text-white w-48 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] px-6 py-4 font-medium text-sm transition-all border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Personal Info */}
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<FaUser />} label="Full Name" name="fullName" value={vendor.fullName} />
              <InputField icon={<FaRegAddressCard />} label="Email" name="email" value={vendor.email} type="email" />
              <InputField icon={<FaPhoneAlt />} label="Phone Number" name="phoneNumber" value={vendor.phoneNumber} />
              <InputField icon={<FaIdCard />} label="Government ID Type" name="governmentIdType" value={vendor.governmentIdType} />
              <InputField icon={<FaHashtag />} label="Government ID Number" name="governmentIdNumber" value={vendor.governmentIdNumber} />
            </div>
          )}

          {/* Business */}
          {activeTab === "business" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<FaBuilding />} label="Business Name" name="businessName" value={vendor.businessName} />
              <InputField icon={<BsPerson />} label="Business Type" name="businessType" value={vendor.businessType} />
              <InputField icon={<FaHashtag />} label="Tax Number" name="taxNumber" value={vendor.taxNumber} />
              <InputField icon={<FaGlobe />} label="Business Category" name="businessCategory" value={vendor.businessCategory} />
              <InputField icon={<FaGlobe />} label="Website URL" name="websiteUrl" value={vendor.websiteUrl} />
              <InputField
                icon={<FaFileAlt />}
                label="Business Description"
                name="businessDescription"
                value={vendor.businessDescription}
                fullWidth
              />
            </div>
          )}

          {/* Bank */}
          {activeTab === "bank" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<BsFillPersonFill />} label="Account Holder Name" name="bankAccountHolderName" value={vendor.bankAccountHolderName} />
              <InputField icon={<BsBank />} label="Bank Name" name="bankName" value={vendor.bankName} />
              <InputField icon={<FaBuilding />} label="Branch Name" name="branchName" value={vendor.branchName} />
              <InputField icon={<FaHashtag />} label="Account Number" name="accountNumber" value={vendor.accountNumber} />
              <InputField icon={<FaExchangeAlt />} label="IFSC/SWIFT Code" name="ifscOrSwiftCode" value={vendor.ifscOrSwiftCode} />
            </div>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <textarea
                name="businessAddress"
                value={vendor.businessAddress}
                onChange={handleChange}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Business Address"
              />
              <textarea
                name="pickupAddress"
                value={vendor.pickupAddress}
                onChange={handleChange}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
                placeholder="Pickup Address"
              />
              <textarea
                name="returnAddress"
                value={vendor.returnAddress}
                onChange={handleChange}
                className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                rows="4"
                placeholder="Return Address"
              />
            </div>
          )}

          {/* Documents */}
          {activeTab === "documents" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderDocumentUpload(vendor.businessRegistrationurl, "Business Registration", "businessRegistrationurl")}
              {renderDocumentUpload(vendor.GSTINvoiceUrl, "GST Invoice", "GSTINvoiceUrl")}
              {renderDocumentUpload(vendor.governmentIdImageUrl, "Government ID", "governmentIdImageUrl", true)}
              {renderDocumentUpload(vendor.chequeImageUrl, "Cheque Image", "chequeImageUrl", true)}
              {renderDocumentUpload(vendor.bankbookImageUrl, "Bank Book", "bankbookImageUrl", true)}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            ← Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            💾 Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditVendor;