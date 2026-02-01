import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    } else {
      setName(storedName || "User");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="min-h-150 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome <span className="text-blue-600">{name}</span>
      </h1>

      <button
        onClick={logout}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
