// import React from 'react'

// const AddVendor = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Add Vendor</h2>
//       <form className="space-y-3 max-w-md">
//         <div>
//           <label className="block text-sm">Name</label>
//           <input className="w-full border rounded p-2" placeholder="Vendor name" />
//         </div>
//         <div>
//           <label className="block text-sm">Email</label>
//           <input className="w-full border rounded p-2" placeholder="Email" />
//         </div>
//         <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
//       </form>
//     </div>
//   )
// }

// export default AddVendor

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// APIs
const VENDOR_PAYMENTTERMS_API = "www.google.com"; 
const VENDOR_CREATE_API = "www.google.com";

const AddVendor = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    websiteUrl: "",
    governmentIdType: "",
    governmentIdNumber: "",
    businessName: "",
    businessType: "",
    businessRegistrationNumber: "",
    businessDescription: "",
    businessAddress: "",
    returnAddress: "",
    pickupAddress: "",
    taxNumber: "",
    businessCategory: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    bankAccountHolderName: "",
    ifscOrSwiftCode: "",
    currency: "",
    paymentTerms: "",
    acceptPrivacyPolicy: false,
    acceptTermsAndConditions: false,
  });
  const [files, setFiles] = useState({
    businessRegistrationImage: null,
    gstinInvoiceImage: null,
    govidimage: null,
    bankBookImage: null,
    chequeImage: null,
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [paymentTermsOptions, setPaymentTermsOptions] = useState([]);

  const steps = [
    "Basic Info",
    "Business Info",
    "Images",
    "Bank Details",
    "Currency & Terms",
  ];

  // Fetch payment terms on mount
  useEffect(() => {
    fetchPaymentTerms();
  }, []);

  const fetchPaymentTerms = async () => {
    try {
      const response = await fetch(VENDOR_PAYMENTTERMS_API);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPaymentTermsOptions(data.data);
        } else {
          console.error("Failed to fetch payment terms:", data.message);
        }
      } else if (response.status === 401) {
        setSubmitStatus({
          type: "error",
          message: "Session expired. Please log in again.",
        });
      } else {
        console.error("Failed to fetch payment terms:", response.status);
      }
    } catch (error) {
      console.error("Error fetching payment terms:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to load payment terms. Please check your connection.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";
      if (!formData.governmentIdType)
        newErrors.governmentIdType = "Government ID type is required";
      if (!formData.governmentIdNumber)
        newErrors.governmentIdNumber = "Government ID number is required";
    }
    if (step === 2) {
      if (!formData.businessName)
        newErrors.businessName = "Business name is required";
      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
      if (!formData.businessRegistrationNumber)
        newErrors.businessRegistrationNumber =
          "Business registration number is required";
      if (!formData.taxNumber) newErrors.taxNumber = "GSTIN is required";
      if (!formData.businessDescription)
        newErrors.businessDescription = "Business description is required";
      if (!formData.businessAddress)
        newErrors.businessAddress = "Business address is required";
      if (!formData.businessCategory)
        newErrors.businessCategory = "Business category is required";
    }
    if (step === 3) {
      if (!files.businessRegistrationImage)
        newErrors.businessRegistrationImage =
          "Business registration image is required";
      if (!files.gstinInvoiceImage)
        newErrors.gstinInvoiceImage = "GSTIN invoice image is required";
      if (!files.govidimage)
        newErrors.govidimage = "Government ID image is required";
      if (!files.bankBookImage)
        newErrors.bankBookImage = "Bank book image is required";
      if (!files.chequeImage)
        newErrors.chequeImage = "Cheque image is required";
    }
    if (step === 4) {
      if (!formData.bankName) newErrors.bankName = "Bank name is required";
      if (!formData.branchName)
        newErrors.branchName = "Branch name is required";
      if (!formData.accountNumber)
        newErrors.accountNumber = "Account number is required";
      if (!formData.bankAccountHolderName)
        newErrors.bankAccountHolderName = "Account holder name is required";
      if (!formData.ifscOrSwiftCode)
        newErrors.ifscOrSwiftCode = "IFSC/SWIFT code is required";
    }
    if (step === 5) {
      if (!formData.currency) newErrors.currency = "Currency is required";
      if (!formData.paymentTerms)
        newErrors.paymentTerms = "Payment terms are required";
      if (!formData.acceptPrivacyPolicy)
        newErrors.acceptPrivacyPolicy = "You must accept the privacy policy";
      if (!formData.acceptTermsAndConditions)
        newErrors.acceptTermsAndConditions =
          "You must accept the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) {
      setSubmitStatus({
        type: "error",
        message: "Please fix all errors before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          submitData.append(key, files[key]);
        }
      });

      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const headers = { token };
      const response = await fetch(VENDOR_CREATE_API, {
        method: "POST",
        headers,
        body: submitData,
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus({ type: "success", message: data.message });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
          websiteUrl: "",
          governmentIdType: "",
          governmentIdNumber: "",
          businessName: "",
          businessType: "",
          businessRegistrationNumber: "",
          businessDescription: "",
          businessAddress: "",
          returnAddress: "",
          pickupAddress: "",
          taxNumber: "",
          businessCategory: "",
          bankName: "",
          branchName: "",
          accountNumber: "",
          bankAccountHolderName: "",
          ifscOrSwiftCode: "",
          currency: "",
          paymentTerms: "",
          acceptPrivacyPolicy: false,
          acceptTermsAndConditions: false,
        });
        setFiles({
          businessRegistrationImage: null,
          gstinInvoiceImage: null,
          govidimage: null,
          bankBookImage: null,
          chequeImage: null,
        });
        setIsSubmitting(false);
        setTimeout(() => {
          navigate("/zestreact/app/ecommerce/vendors");
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to create vendor",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating vendor:", error);
      let errorMessage =
        "Failed to create vendor. Please check your connection and try again.";
      if (error.message.includes("token")) {
        errorMessage = "Session expired. Please log in again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      setSubmitStatus({ type: "error", message: errorMessage });
      setIsSubmitting(false);
    }
  };

  // Alert ref for auto-dismiss
  const alertRef = useRef(null);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Render Step Indicator
  const renderStepIndicator = () => (
    <div className="mb-6 overflow-x-auto">
      <ul className="flex justify-between relative min-w-[600px] sm:min-w-0">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          let bgColor = "bg-white";
          let borderColor = "border-gray-500";
          let textColor = "text-gray-500";
          if (currentStep > stepNumber) {
            bgColor = "bg-green-500";
            borderColor = "border-green-500";
            textColor = "text-green-500";
          } else if (currentStep === stepNumber) {
            bgColor = "bg-blue-500";
            borderColor = "border-blue-500";
            textColor = "text-blue-500";
          }
          return (
            <li key={index} className="flex flex-col items-center w-full relative">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${bgColor} ${borderColor} text-white z-10 text-sm`}
              >
                {currentStep > stepNumber ? "✓" : stepNumber}
              </div>
              <span className={`mt-2 text-xs font-medium ${textColor} text-center px-1`}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 transform -translate-y-1/2 ${
                    currentStep > stepNumber
                      ? "bg-green-500"
                      : currentStep === stepNumber
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } hidden sm:block`}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  // Step Renderers
  const renderStep1 = () => (
    <div className="col-span-12">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Basic Info</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-3 py-2 pr-16 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                 <span className="text-gray-500 text-xs sm:text-sm">Hide</span>
                ) : (
                  <span className="text-gray-500 text-xs sm:text-sm">Show</span>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.phoneNumber
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Govt ID Number *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.governmentIdNumber
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="governmentIdNumber"
              value={formData.governmentIdNumber}
              onChange={handleInputChange}
            />
            {errors.governmentIdNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.governmentIdNumber}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Govt ID Type *
            </label>
            <select
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.governmentIdType
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="governmentIdType"
              value={formData.governmentIdType}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="Aadhar">Aadhar</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="Voter ID">Voter ID</option>
              <option value="Other">Other</option>
            </select>
            {errors.governmentIdType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.governmentIdType}
              </p>
            )}
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none text-sm sm:text-base"
          onClick={nextStep}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="col-span-12">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Business Info</h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.businessName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Type *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.businessType
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
            />
            {errors.businessType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.businessType}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Registration Number *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.businessRegistrationNumber
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="businessRegistrationNumber"
              value={formData.businessRegistrationNumber}
              onChange={handleInputChange}
            />
            {errors.businessRegistrationNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.businessRegistrationNumber}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GSTIN *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.taxNumber
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleInputChange}
            />
            {errors.taxNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.taxNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Description *
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.businessDescription
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleInputChange}
              rows="3"
            />
            {errors.businessDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.businessDescription}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Address *
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.businessAddress
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              rows="3"
            />
            {errors.businessAddress && (
              <p className="mt-1 text-sm text-red-600">
                {errors.businessAddress}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Address
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
              name="returnAddress"
              value={formData.returnAddress}
              onChange={handleInputChange}
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Address
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleInputChange}
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Category *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.businessCategory
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleInputChange}
            />
            {errors.businessCategory && (
              <p className="mt-1 text-sm text-red-600">
                {errors.businessCategory}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-4">
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none text-sm sm:text-base order-2 sm:order-1"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none text-sm sm:text-base order-1 sm:order-2 mb-2 sm:mb-0"
          onClick={nextStep}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="col-span-12">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Images and URLs</h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-full">
          {[
            {
              name: "businessRegistrationImage",
              label: "Business Registration Image *",
            },
            { name: "gstinInvoiceImage", label: "GSTIN Invoice Image *" },
            { name: "govidimage", label: "Government Id Image *" },
            { name: "bankBookImage", label: "Bank Book Image *" },
            { name: "chequeImage", label: "Cheque Image *" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="file"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none text-sm sm:text-base ${
                  errors[field.name]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                name={field.name}
                onChange={handleFileChange}
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name]}
                </p>
              )}
              {files[field.name] && (
                <p className="mt-1 text-sm text-green-600">
                  File selected: {files[field.name].name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-4">
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none text-sm sm:text-base order-2 sm:order-1"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none text-sm sm:text-base order-1 sm:order-2 mb-2 sm:mb-0"
          onClick={nextStep}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="col-span-12">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Bank Details</h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.bankName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
            />
            {errors.bankName && (
              <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Name *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.branchName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
            />
            {errors.branchName && (
              <p className="mt-1 text-sm text-red-600">{errors.branchName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.accountNumber
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.accountNumber}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.bankAccountHolderName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="bankAccountHolderName"
              value={formData.bankAccountHolderName}
              onChange={handleInputChange}
            />
            {errors.bankAccountHolderName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.bankAccountHolderName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IFSC/SWIFT Code *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.ifscOrSwiftCode
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="ifscOrSwiftCode"
              value={formData.ifscOrSwiftCode}
              onChange={handleInputChange}
            />
            {errors.ifscOrSwiftCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ifscOrSwiftCode}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-4">
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none text-sm sm:text-base order-2 sm:order-1"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none text-sm sm:text-base order-1 sm:order-2 mb-2 sm:mb-0"
          onClick={nextStep}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="col-span-12">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Currency AND Terms & Conditions
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency *
            </label>
            <select
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.currency
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option value="">Select Currency</option>
              <option value="USD">$ - US Dollar</option>
              <option value="EUR">€ - Euro</option>
              <option value="GBP">£ - British Pound</option>
              <option value="INR">₹ - Indian Rupee</option>
            </select>
            {errors.currency && (
              <p className="mt-1 text-sm text-red-600">{errors.currency}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Terms *
            </label>
            <select
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
                errors.paymentTerms
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleInputChange}
            >
              <option value="">Select Payment Terms</option>
              {paymentTermsOptions.map((term) => (
                <option key={term._id} value={term.name}>
                  {term.name}
                </option>
              ))}
            </select>
            {errors.paymentTerms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.paymentTerms}
              </p>
            )}
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              className={`mt-1 h-4 w-4 rounded ${
                errors.acceptPrivacyPolicy
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              name="acceptPrivacyPolicy"
              checked={formData.acceptPrivacyPolicy}
              onChange={handleInputChange}
            />
            <label className="ml-2 block text-sm text-gray-700">
              Accept Privacy Policy *
            </label>
            {errors.acceptPrivacyPolicy && (
              <p className="mt-1 text-sm text-red-600 ml-6">
                {errors.acceptPrivacyPolicy}
              </p>
            )}
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              className={`mt-1 h-4 w-4 rounded ${
                errors.acceptTermsAndConditions
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              name="acceptTermsAndConditions"
              checked={formData.acceptTermsAndConditions}
              onChange={handleInputChange}
            />
            <label className="ml-2 block text-sm text-gray-700">
              Accept Terms And Conditions *
            </label>
            {errors.acceptTermsAndConditions && (
              <p className="mt-1 text-sm text-red-600 ml-6">
                {errors.acceptTermsAndConditions}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-4">
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none text-sm sm:text-base order-2 sm:order-1"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="submit"
          className={`w-full sm:w-auto px-4 py-2 rounded-md focus:outline-none text-sm sm:text-base order-1 sm:order-2 mb-2 sm:mb-0 ${
            isSubmitting
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Alert */}
      {submitStatus && (
        <div
          className={`fixed top-4 right-4 z-50 w-full sm:w-80 p-4 rounded-md shadow-lg animate-fadeIn ${
            submitStatus.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
          ref={alertRef}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm sm:text-base">{submitStatus.message}</span>
            <button
              onClick={() => setSubmitStatus(null)}
              className="text-gray-500 hover:text-gray-700 ml-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Add Vendor</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStepIndicator()}
        <div className="grid grid-cols-12 gap-4">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>
      </form>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AddVendor;