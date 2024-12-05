import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const api = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handlePasswordChange = async () => {
    setMessage("");
    setIsError(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setIsError(true);
      setMessage("All fields are required");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    if (newPassword.length < 5) {
      setIsError(true);
      setMessage("New password must be at least 5 characters long");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage("New password and confirmation do not match");
      setTimeout(() => setMessage(""), 5000);
      return;
    }
    try {
      const token = localStorage.getItem("token"); // Replace with your token logic

      const response = await fetch(`${api}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        setIsError(true);
        setMessage(errorDetails.message);
        console.error("Response error details:", errorDetails);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Password updated successfully:", response.data);
      setMessage("Password updated successfully, You will be logged out");
      setIsChecked(!isChecked);
      handleLogout();
    } catch (error) {
      console.error("Error updating password:", error.response.data);
      setMessage("Error changing password");
    } finally {
      // Automatically clear the message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 5000);
  };

  const token = localStorage.getItem("token");

  const handleEditButton = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      if (!id) throw new Error("User ID is missing.");
      if (!username || !email) throw new Error("Invalid input data.");

      const response = await fetch(`${api}/users/${id}`, {
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
      setMessage("Update successful, Login again to update your account");
      setIsChecked(!isChecked);
      //----------------------------------------------------------------------------------------------------------------------------------------------
    } catch (err) {
      console.error("Error updating user:", err.message);
      setIsError(!isError);
      setMessage("Update failed. Please try again.");
      //setError("Update failed. Please try again.");
    } finally {
      // Automatically clear the message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
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
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <div className="w-screen max-w-4xl m-auto min-h-fit">
      <div className=" m-20">
        <img
          src="https://picsum.photos/400"
          alt="profile picture"
          className=" rounded-full w-32 mb-16 m-auto"
        />

        <div id="start" className="max-w-3xl m-auto">
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
          <article className="flex flex-grow flex-col gap-3 lg:gap-6">
            <div className="flex flex-col lg:flex-row justify-between">
              <h2 className="font-bold lg:text-2xl text-xl pl-2">Username</h2>
              <div className="flex justify-between items-center gap-3">
                <input
                  type="text"
                  placeholder={username}
                  name="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  readOnly={!isChecked}
                  className="outline-none w-full p-3 read-only:bg-gray-300 rounded-lg border-[1px] border-black read-only:border-0"
                />
                <div className="w-6"></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between">
              <h2 className="font-bold lg:text-2xl text-xl pl-2">Email</h2>
              <div className="flex justify-between items-center gap-3">
                <input
                  type="text"
                  placeholder={email}
                  name="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  readOnly={!isChecked}
                  className="outline-none w-full p-3 read-only:bg-gray-300 rounded-lg border-[1px] border-black read-only:border-0"
                />
                <div className="w-6"></div>
              </div>
            </div>

            <div
              className={`${
                isChecked ? "" : "hidden"
              } flex flex-col lg:flex-row justify-between`}
            >
              <h2 className="font-bold lg:text-2xl text-xl pl-2">
                Current Password
              </h2>
              <div className="flex justify-between items-center gap-3">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current password"
                  name="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="outline-none w-full p-3 rounded-lg border-[1px] border-black"
                />
                <span
                  onClick={toggleCurrentPasswordVisibility}
                  className="cursor-pointer"
                >
                  {showCurrentPassword ? (
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

            <div
              className={`${
                isChecked ? "" : "hidden"
              } flex flex-col lg:flex-row justify-between`}
            >
              <h2 className="font-bold lg:text-2xl text-xl pl-2">
                New Password
              </h2>
              <div className="flex justify-between items-center gap-3">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  name="confirmPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={5}
                  className="outline-none w-full p-3 rounded-lg border-[1px] border-black"
                />
                <span
                  onClick={toggleNewPasswordVisibility}
                  className="cursor-pointer"
                >
                  {showNewPassword ? (
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

            <div
              className={`${
                isChecked ? "" : "hidden"
              } flex flex-col lg:flex-row justify-between`}
            >
              <h2 className="font-bold lg:text-2xl text-xl pl-2">
                Confirm Password
              </h2>
              <div className="flex justify-between items-center gap-3">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={5}
                  className="outline-none w-full p-3 rounded-lg border-[1px] border-black"
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? (
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
          </article>
          {message && (
            <div
              className={`${
                isError ? "bg-red-600" : "bg-green-600"
              } relative w-full text-center text-xl tracking-wider pl-2 rounded-xl mt-5`}
            >
              <button
                className="absolute top-2 right-3 text-white text-3xl font-bold size-9 cursor-pointer"
                onClick={() => setMessage("")}
              >
                &times;
              </button>

              <p>{message}</p>
            </div>
          )}
          {isChecked && (
            <div className="flex justify-end mt-4 gap-3 text-white">
              <Link
                to="#start"
                onClick={handlePasswordChange}
                className="p-3 rounded-lg bg-black uppercase tracking-widest"
              >
                confirm password
              </Link>
              <Link
                to="#start"
                onClick={handleEditButton}
                className="p-3 rounded-lg bg-black uppercase tracking-widest"
              >
                confirm name
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-end max-w-3xl m-auto mt-5">
          <button
            onClick={handleLogout}
            className="p-4 bg-black text-white rounded-lg  tracking-widest"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
