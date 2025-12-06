// 📄 src/pages/Login.jsx
import React, { useState } from "react";
import FormTemplate from "../layouts/FormTemplate";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://bteam11.com/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data",data)

      console.log("data",data.message)
      console.log("role",data.data.role)


      if (!response.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.data.role);
     

      // Redirect based on role
      if (data.data.role === "admin") {
        window.location.href = "/";
      } else {
        window.location.href = "/user7";
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <FormTemplate
      title="Login"
      onSubmit={handleLoginSubmit}
      submitText={loading ? "Logging in..." : "Login"}
      width="max-w-xl"
      showBackButton={false}
    >
      {/* Email */}
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label className="font-medium text-gray-700 text-sm">Email</label>
        <input
          type="email"
          className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password + Eye Toggle */}
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label className="font-medium text-gray-700 text-sm">Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full py-2.5 px-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Eye Button */}
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="sm:col-span-2 flex justify-end mt-1">
        <button className="font-medium text-sm text-blue-600 hover:underline" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </button>
      </div>
    </FormTemplate>
  );
};

export default Login;
