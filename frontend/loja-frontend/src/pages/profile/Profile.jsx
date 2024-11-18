import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import LogOutButton from "../../components/logoutButton/LogOutButton";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("hello");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.name);
        setEmail(decoded.email);
        setPassword(decoded.password);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <div className="max-w-7xl m-auto">
      <div className="">
        <img
          src="https://picsum.photos/400"
          alt="profile picture"
          className="m-auto rounded-full w-32"
        />
        <table>
          <thead>
            <tr>
              <th>Options</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h2>Username</h2>
              </td>
              <td>{username}</td>
            </tr>
            <tr>
              <td>
                <h2>Email</h2>
              </td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>
                <h2>Password</h2>
              </td>
              <td>{password}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <LogOutButton />
    </div>
  );
};

export default Profile;
