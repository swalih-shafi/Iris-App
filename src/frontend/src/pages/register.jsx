import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    try {
      if (!payload.username || !payload.email || !payload.password) {
        setError("All fields are required");
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.detail && Array.isArray(data.detail)) {
          const messages = data.detail.map((d) => `${d.loc[1]}: ${d.msg}`);
          setError(messages.join(" | "));
        } else {
          setError(data.error || "Registration failed");
        }
        return;
      }

      if (res.ok && data.user_id) {
        setSuccess("✅ Registered successfully!");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Register</h2>

        {error && (
          <div className="alert error">
            {error.split("|").map((msg, i) => (
              <p key={i}>{msg.trim()}</p>
            ))}
          </div>
        )}

        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p className="redirect">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
