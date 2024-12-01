import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Login successful:", data);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Error during login:", err.message);
      setError("Login failed. Please check your connection and try again.");
    }
  };

  return (
    <div className="bg-[url('src/assets/caseBackground.jpg')] bg-no-repeat bg-cover bg-center pt-1 flex-grow flex items-center justify-center h-screen">
      <div className="max-w-6xl lg:backdrop-blur-lg w-fit p-4 rounded-xl border-1  shadow-sm shadow-white">
        <h1 className="uppercase tracking-widest font-extrabold text-4xl text-center  p-4">
          Welcome back
        </h1>

        <div className="flex flex-col ">
          <form action="POST">
            <div className="flex flex-col gap-5 my-3">
              <div className="flex justify-between items-center gap-3">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="outline-none rounded-xl p-3 w-full"
                />
                <div className="w-6"></div>
              </div>

              <div className="flex justify-between items-center gap-3">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="outline-none rounded-xl p-3 w-full"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                >
                  {showPassword ? (
                    <img
                      src="src/assets/eye-open.svg"
                      alt="Show password"
                      className="w-6"
                    />
                  ) : (
                    <img
                      src="src/assets/eye-closed.svg"
                      alt="Hide password"
                      className="w-6"
                    />
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="block m-auto bg-blue-700 px-6 py-2 rounded-xl text-white tracking-wider text-2xl mt-5"
            >
              Login
            </button>
            {error && (
              <p className="bg-red-600 w-fit p-4 rounded-xl mt-5">{error}</p>
            )}
          </form>
        </div>
        <p className="mb-4 mt-8 text-center">
          Still do not have an account?
          <Link to="/register" className="px-4 font-bold">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
