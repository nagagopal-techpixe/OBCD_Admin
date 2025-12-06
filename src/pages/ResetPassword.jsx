import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  // 🔍 Validate password rules
  const validatePassword = (pwd) => {
    const newErrors = [];

    if (pwd.length < 8)
      newErrors.push("Minimum 8 characters required");

    if (!/[A-Z]/.test(pwd))
      newErrors.push("At least one uppercase letter required");

    if (!/[a-z]/.test(pwd))
      newErrors.push("At least one lowercase letter required");

    if (!/[0-9]/.test(pwd))
      newErrors.push("At least one number required");

    if (!/[!@#$%^&*]/.test(pwd))
      newErrors.push("At least one special character required (!@#$%^&*)");

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Run validations
    const validationErrors = validatePassword(password);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors([]);
    }

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://bteam11.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Reset failed");
      } else {
        setMessage("Password reset successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error, try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors(validatePassword(e.target.value));
          }}
          required
          className="border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />

        {/* ❌ Password validation messages */}
        {errors.length > 0 && (
          <ul className="text-red-600 text-sm">
            {errors.map((err, index) => (
              <li key={index}>• {err}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ResetPassword;
