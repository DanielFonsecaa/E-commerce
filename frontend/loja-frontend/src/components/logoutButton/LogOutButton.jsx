import { useNavigate } from "react-router-dom";
const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default LogOutButton;
