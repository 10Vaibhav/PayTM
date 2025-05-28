import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import paytmIcon from "../assets/paytm-icon.svg";

const AppBar = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUserName(`${response.data.firstName} ${response.data.lastName}`);
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (error.response?.status === 401) {
                    navigate("/signin");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md h-16 flex justify-between items-center px-8 sticky top-0 z-50">
            <div className="flex items-center space-x-3">
                <div onClick={()=> navigate("/dashboard")} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <img src={paytmIcon} alt="PayTM" className="w-6 h-6" />
                </div>
                <span className="text-white text-xl font-bold">PayTM App</span>
            </div>
            <div className="flex items-center space-x-6">
                {!loading && userName && (
                    <span className="text-white/90 text-sm font-medium">
                        Welcome, {userName}
                    </span>
                )}
                <button 
                    onClick={() => navigate("/profile")}
                    className="text-white/90 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                </button>
                <button 
                    onClick={handleLogout}
                    className="text-white/90 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default AppBar;