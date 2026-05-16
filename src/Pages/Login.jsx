/*

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const validate = () => {
    let temp = {};

    if (!email) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) temp.email = "Email is invalid";

    if (!password) temp.password = "Password is required";
    else if (!/^\d{6}$/.test(password))
      temp.password = "Password must be exactly 6 digits";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) navigate("/Dashboard");
      else setResponseMsg(data.message);
    } catch {
      setResponseMsg("Server error");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPassword(value); // digits only
  };

  useEffect(() => {
    if (responseMsg) alert(responseMsg);
  }, [responseMsg]);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-4 shadow"
        style={{
          width: "90%",      // mobile: almost full width
          maxWidth: "500px", // default max width
        }}
      >
        <h3 className="text-center mb-3">School Login</h3>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

         
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>

      <style>
        {`
          @media (min-width: 768px) and (max-width: 992px) {
            .card {
              max-width: 600px !important; 
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
*/



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const validate = () => {
    let temp = {};

    if (!email) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) temp.email = "Email is invalid";

    if (!password) temp.password = "Password is required";
    else if (!/^\d{6}$/.test(password))
      temp.password = "Password must be exactly 6 digits";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("https://school-backend-blond.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) navigate("/Dashboard");
      else setResponseMsg(data.message);
    } catch {
      setResponseMsg("Server error");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPassword(value); // digits only
  };

  useEffect(() => {
    if (responseMsg) alert(responseMsg);
  }, [responseMsg]);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-4 shadow"
        style={{
          width: "90%",      // mobile: almost full width
          maxWidth: "500px", // default max width
        }}
      >
        <h3 className="text-center mb-3">School Login</h3>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

         
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>

      <style>
        {`
          @media (min-width: 768px) and (max-width: 992px) {
            .card {
              max-width: 600px !important; 
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
