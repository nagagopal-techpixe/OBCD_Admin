import React, { useState, useEffect } from "react";
import FormTemplate from "../layouts/FormTemplate";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    match: false,
  });

  const navigate = useNavigate();

  // Validate password
  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === confirmPassword && password !== "",
    });
  }, [password, confirmPassword]);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const allValid = Object.values(passwordValidation).every(Boolean);
    if (!allValid) {
      setError(
        !passwordValidation.match
          ? "Passwords do not match"
          : "Password does not meet all requirements"
      );
      return;
    }

    try {
      await axios.post("https://bteam11.com/api/auth/signup/", {
        fullName,
        email,
        password,
        confirmPassword
      });

      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <FormTemplate
      title="Sign Up"
      onSubmit={handleSignUpSubmit}
      submitText="Create Account"
      width="max-w-lg"
      showBackButton={true}
      contentClassName="p-4"   
       submitButtonClass="mb-6"
    >
      {error && <p className="text-red-600 text-sm sm:col-span-2">{error}</p>}
      {success && <p className="text-green-600 text-sm sm:col-span-2">{success}</p>}

      {/* Full Name */}
      <div className="flex flex-col gap-0.5 sm:col-span-2">
        <label className="font-medium text-gray-700 text-sm">Full Name</label>
        <input
          type="text"
          className="w-full py-1.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-0.5 sm:col-span-2">
        <label className="font-medium text-gray-700 text-sm">Email</label>
        <input
          type="email"
          className="w-full py-1.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
    <div className="flex flex-col gap-0.5 sm:col-span-2">
  <label className="font-medium text-gray-700 text-sm">Password</label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      className="w-full py-1.5 px-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
      placeholder="Create a password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    {/* Eye Button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
    >
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.175-4.825M9.88 9.88a3 3 0 104.243 4.243M3 3l18 18"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      )}
    </button>
  </div>
</div>


      {/* Confirm Password */}
      <div className="flex flex-col gap-0.5 sm:col-span-2">
        <label className="font-medium text-gray-700 text-sm">Confirm Password</label>
        <input
          type="password"
          className="w-full py-1.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Password Validation */}
        <ul className="text-xs mt-1 leading-tight mb-0">
          <li className={passwordValidation.length ? "text-green-500" : "text-gray-500"}>
            Minimum 8 characters
          </li>
          <li className={passwordValidation.uppercase ? "text-green-500" : "text-gray-500"}>
            At least one uppercase letter
          </li>
          <li className={passwordValidation.lowercase ? "text-green-500" : "text-gray-500"}>
            At least one lowercase letter
          </li>
          <li className={passwordValidation.number ? "text-green-500" : "text-gray-500"}>
            At least one number
          </li>
          <li className={passwordValidation.specialChar ? "text-green-500" : "text-gray-500"}>
            At least one special character
          </li>
          <li className={passwordValidation.match ? "text-green-500" : "text-red-500"}>
            Passwords match
          </li>
        </ul>
      </div>

    <Link
  to="/login"
  className="sm:col-span-2 mt-0 flex justify-end text-blue-600 text-sm hover:underline"
>
  Already have an account?
</Link>
    </FormTemplate>
  );
};

export default SignUp;
