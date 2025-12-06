import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Building,
  Banknote,
  MapPin,
  FileText,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Link as LinkIcon,
  Check,
  //X,
  Eye,
  Download,
  File,
  IdCard,
  Receipt,
  BookOpen,
  ChevronLeft,
} from "lucide-react";

const ViewVendor = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // Dummy vendor data
  const vendor = {
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
    websiteUrl: "    https://www.techsupplies.example    ",
    businessDescription: "We provide high-quality tech components and enterprise IT solutions to businesses across North America.",
    acceptTermsAndConditions: true,
    acceptPrivacyPolicy: true,
    governmentIdType: "Passport",
    governmentIdNumber: "P12345678",
    businessRegistrationurl: "https://example.com/docs/business-reg.pdf    ",
    GSTINvoiceUrl: "https://example.com/docs/gst-invoice.pdf    ",
    governmentIdImageUrl: "https://i.pravatar.cc/300?img=33",
    chequeImageUrl: "    https://i.pravatar.cc/300?img=44",
    bankbookImageUrl: "    https://i.pravatar.cc/300?img=55",
  };

  // Format date
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

  // Document preview renderer
  const renderDocumentPreview = (url, title, isImage = false) => {
    if (!url)
      return (
        <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-400 text-sm">No document available</p>
        </div>
      );

    if (isImage) {
      return (
        <div className="group relative">
          <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
            <img
              src={url}
              alt={title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => window.open(url, "_blank")}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
            >
              <Eye size={16} /> View
            </button>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = url;
                link.download = title;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
            >
              <Download size={16} /> Download
            </button>
          </div>
        </div>
      );
    } else {
      const fileExtension = url.split(".").pop()?.toUpperCase() || "FILE";
      return (
        <div className="group relative">
          <div className="flex flex-col items-center justify-center h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <File size={48} className="text-blue-600 mb-2" />
            <div className="text-sm font-semibold text-gray-700">{fileExtension}</div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => window.open(url, "_blank")}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
            >
              <Eye size={14} /> View
            </button>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = url;
                link.download = title;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>
      );
    }
  };

  const DataField = ({ icon: Icon, label, value, fullWidth = false }) => (
    <div className={`${fullWidth ? "col-span-2" : ""} bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon size={24} className="text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</div>
          <div className="text-sm sm:text-base font-medium text-gray-900 break-words">{value}</div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "business", label: "Business", icon: Building },
    { id: "bank", label: "Bank Details", icon: Banknote },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 bg-white/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border ">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-4 ">
              <button
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vendor Profile</h1>
                <p className="text-sm text-gray-500">ID: {vendor._id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
                <CheckCircle size={16} className="text-green-600" /> {vendor.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header */}
        <div className="bg-[linear-gradient(106.37deg,_#ffe1bc_29.63%,_#ffcfd1_51.55%,_#f3c6f1_90.85%)] rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="relative">
              {vendor.profilepic ? (
                <img
                  src={vendor.profilepic}
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-2xl">
                  <User size={48} className="text-white opacity-80" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center border-4 border-white shadow-lg">
                <Check size={20} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{vendor.fullName}</h2>
              <p className="text-lg md:text-xl text-blue-400 mb-3 md:mb-4">{vendor.businessName}</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
                <a href={`mailto:${vendor.email}`} className="flex items-center gap-2 border bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                  <Mail size={20} />
                  <span className="text-sm sm:text-md font-semibold">{vendor.email}</span>
                </a>
                <a href={`tel:${vendor.phoneNumber}`} className="flex items-center gap-2 border bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                  <Phone size={20} />
                  <span className="text-sm sm:text-md font-semibold">{vendor.phoneNumber}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={28} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DataField icon={IdCard} label="Vendor ID" value={vendor._id} />
                <DataField icon={User} label="Full Name" value={vendor.fullName} />
                <DataField icon={Mail} label="Email Address" value={vendor.email} />
                <DataField icon={Phone} label="Phone Number" value={vendor.phoneNumber} />
                <DataField icon={User} label="Created By" value={vendor.createdby || "N/A"} />
                <DataField icon={Calendar} label="Created At" value={formatDate(vendor.createdAt)} />
                <DataField icon={IdCard} label="Government ID Type" value={vendor.governmentIdType} />
                <DataField icon={IdCard} label="Government ID Number" value={vendor.governmentIdNumber} />
              </div>
            </div>
          )}

          {/* Business Tab */}
          {activeTab === "business" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Building size={28} className="text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Business Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DataField icon={Building} label="Business Name" value={vendor.businessName} />
                <DataField icon={Building} label="Business Type" value={vendor.businessType} />
                <DataField icon={FileText} label="Registration Number" value={vendor.businessRegistrationNumber} />
                <DataField icon={FileText} label="Tax Number" value={vendor.taxNumber} />
                <DataField icon={FileText} label="Business Category" value={vendor.businessCategory} />
                <DataField
                  icon={LinkIcon}
                  label="Website URL"
                  value={
                    vendor.websiteUrl ? (
                      <a href={vendor.websiteUrl.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {vendor.websiteUrl.trim()}
                      </a>
                    ) : "N/A"
                  }
                />
                <DataField
                  icon={Check}
                  label="Terms Accepted"
                  value={vendor.acceptTermsAndConditions ? "Yes" : "No"}
                />
                <DataField
                  icon={Check}
                  label="Privacy Policy Accepted"
                  value={vendor.acceptPrivacyPolicy ? "Yes" : "No"}
                />
                <DataField
                  icon={FileText}
                  label="Business Description"
                  value={vendor.businessDescription}
                  fullWidth
                />
              </div>
            </div>
          )}

          {/* Bank Tab */}
          {activeTab === "bank" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Banknote size={28} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Bank Details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DataField icon={User} label="Account Holder Name" value={vendor.bankAccountHolderName} />
                <DataField icon={Banknote} label="Bank Name" value={vendor.bankName} />
                <DataField icon={Building} label="Branch Name" value={vendor.branchName} />
                <DataField icon={Banknote} label="Account Number" value={vendor.accountNumber} />
                <DataField icon={FileText} label="IFSC/SWIFT Code" value={vendor.ifscOrSwiftCode} />
                <DataField icon={FileText} label="Payment Terms" value={vendor.paymentTerms} />
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin size={28} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Address Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Building size={24} className="text-blue-700" />
                    <h4 className="font-bold text-lg text-gray-900">Business Address</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{vendor.businessAddress}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <File size={24} className="text-green-700" />
                    <h4 className="font-bold text-lg text-gray-900">Pickup Address</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{vendor.pickupAddress}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 rounded-xl border-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronLeft size={24} className="text-orange-700 rotate-180" />
                    <h4 className="font-bold text-lg text-gray-900">Return Address</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{vendor.returnAddress}</p>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FileText size={28} className="text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Documents & Verification</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText size={20} /> Business Registration
                  </h4>
                  {renderDocumentPreview(vendor.businessRegistrationurl?.trim(), "Business Registration Document")}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Receipt size={20} /> GST Invoice
                  </h4>
                  {renderDocumentPreview(vendor.GSTINvoiceUrl?.trim(), "GST Invoice Document")}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <IdCard size={20} /> Government ID
                  </h4>
                  {renderDocumentPreview(vendor.governmentIdImageUrl, "Government ID Image", true)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Banknote size={20} /> Cheque Image
                  </h4>
                  {renderDocumentPreview(vendor.chequeImageUrl?.trim(), "Cheque Image", true)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen size={20} /> Bank Book
                  </h4>
                  {renderDocumentPreview(vendor.bankbookImageUrl?.trim(), "Bank Book Image", true)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Back to List
          </button>
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <FileText size={18} /> Print Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewVendor