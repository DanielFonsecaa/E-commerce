import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import LogOutButton from "../../components/logoutButton/LogOutButton";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  useEffect(() => {
    setUsername(decode.name);
    setEmail(decode.email);
  }, [decode]);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>Your email: {email}</p>
      <LogOutButton />
    </div>
  );
};

export default Profile;
