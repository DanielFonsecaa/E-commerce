import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);
      navigate("/login");
    } catch (err) {
      console.error("Error during login:", err.message);
      setError("Login failed. Please check your connection and try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      {/* Wrapper for Login and Form */}
      <div className="relative flex flex-col items-center">
        {/* Login title positioned on top-left of the form */}
        <h2 className="absolute -top-8 left-2 text-2xl">Register</h2>

        {/* Form container */}
        <div className="flex flex-col bg-gray-500 w-84 h-52 justify-center rounded-md">
          <div className="flex flex-col px-24 py-4">
            <h2 className="flex justify-start text-xl">Username</h2>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="flex outline-none rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col px-24 py-4">
            <h2 className="flex justify-start text-xl">Email</h2>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex outline-none rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col px-24 pb-4">
            <h2 className="text-xl">Password</h2>
            <input
              type="text"
              name="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex outline-none rounded-sm p-1"
            />
          </div>
          <button onClick={handleSubmit}>Register</button>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
