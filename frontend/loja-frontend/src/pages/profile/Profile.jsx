import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import LogOutButton from "../../components/logoutButton/LogOutButton";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  //const [value, setValue] = useState("");
  const token = localStorage.getItem("token");

  const fetchUserInfo = async () => {
    setError(""); // Clear any previous errors

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
      window.location.reload();
    } catch (err) {
      console.error("Error during login:", err.message);
      setError("Login failed. Please check your connection and try again.");
    }
  };

  const handleEditButton = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!id) throw new Error("User ID is missing.");
      if (!username || !email) throw new Error("Invalid input data.");

      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Response error details:", errorDetails);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Update successful");
      fetchUserInfo();
    } catch (err) {
      console.error("Error updating user:", err.message);
      setError("Update failed. Please try again.");
    }
  };

  useEffect(() => {
    //const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.name);
        setEmail(decoded.email);
        setPassword(decoded.password);
        setId(decoded.id);
        console.log("id ---------------", decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <div className="w-screen max-w-4xl m-auto h-screen">
      <div className="w-full mt-20">
        <img
          src="https://picsum.photos/400"
          alt="profile picture"
          className="m-auto rounded-full w-32 mb-16"
        />
        <div className="max-w-3xl m-auto">
          <div className="flex items-center justify-end mb-10">
            <input
              className={`mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] 
          ${isChecked ? "bg-blue-700" : "bg-gray-300"} 
          before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full 
          before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] 
          after:h-5 after:w-5 after:rounded-full after:border-none after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
          after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] 
          ${
            isChecked
              ? "after:translate-x-4 after:bg-blue-700"
              : "after:bg-gray-100"
          }`}
              type="checkbox"
              role="switch"
              id="flexSwitchChecked"
              checked={isChecked}
              onChange={handleToggle}
            />
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="flexSwitchChecked"
            >
              Edit your info
            </label>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="w-1/2 hidden">Options</th>
                <th className="w-1/4 hidden">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/2">
                  <h2 className="font-bold text-2xl p-4">Username</h2>
                </td>
                <td className="">
                  <div className="flex justify-between items-center gap-5">
                    <input
                      type="text"
                      placeholder={username}
                      name="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      readOnly={!isChecked}
                      className="outline-none w-full p-3 bg-gray-100 read-only:bg-gray-300 rounded-lg"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-1/2">
                  <h2 className="font-bold text-2xl p-4">Email</h2>
                </td>
                <td className="w-1/4">
                  <div className="flex justify-between items-center gap-5">
                    <input
                      type="text"
                      placeholder={email}
                      name="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      readOnly={!isChecked}
                      className="outline-none w-full p-3 bg-gray-100 read-only:bg-gray-300 rounded-lg"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-1/2">
                  <h2 className="font-bold text-2xl p-4">Password</h2>
                </td>
                <td className="w-1/4">
                  <div className="flex justify-between items-center gap-5">
                    <input
                      type="text"
                      placeholder={password}
                      name="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      readOnly={!isChecked}
                      className="outline-none w-full p-3 bg-gray-100 read-only:bg-gray-300 rounded-lg"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {isChecked && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleEditButton}
                className="uppercase p-3 rounded-lg tracking-wider bg-black text-white"
              >
                confirm change
              </button>
            </div>
          )}
        </div>
        {error && (
          <p className="bg-red-600 w-full text-center text-xl tracking-wider p-4 rounded-xl mt-5">
            {error}
          </p>
        )}
        <div className="flex justify-end max-w-3xl m-auto mt-5">
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;
