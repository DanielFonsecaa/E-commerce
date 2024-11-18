import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
      setError("Register failed. Please check your connection and try again.");
    }
  };

  return (
    <div className="bg-[url('src/assets/caseBackground.jpg')] bg-no-repeat bg-cover bg-center pt-1 flex-grow flex items-center justify-center">
      <div className="max-w-6xl lg:backdrop-blur-lg w-fit p-4 rounded-xl border-1  shadow-sm shadow-white">
        <h1 className="uppercase tracking-widest font-extrabold text-4xl text-center  p-4 min-w-80">
          Sign up
        </h1>

        <div className="flex flex-col my-3 gap-4">
          <div>
            <p className="pl-2 pb-1">Username</p>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className=" outline-none rounded-xl p-3 w-full"
            />
          </div>
          <div>
            <p className="pl-2 pb-1">Email</p>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="outline-none rounded-xl p-3 w-full"
            />
          </div>
          <div>
            <p className="pl-2 pb-1">Password</p>
            <input
              type="text"
              name="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="outline-none rounded-xl p-3 w-full"
            />
          </div>

          <div>
            <p className="pl-2 pb-1">Confirm Password</p>
            <input
              type="text"
              name="password"
              placeholder="*********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="outline-none rounded-xl p-3 w-full"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="block m-auto bg-blue-700 px-6 py-2 rounded-xl text-white tracking-wider text-2xl mt-5"
          >
            Register
          </button>
          {error && (
            <p className="bg-red-600 w-fit p-4 rounded-xl mt-2 m-auto">
              {error}
            </p>
          )}
        </div>
        <p className="mb-4 mt-4 text-center">
          Already have an account?
          <Link to="/login" className="px-4 font-bold">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Register;
