import { useEffect, useState } from "react"
import AppBar from "../components/Appbar"
import Balance from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch balance
        const balanceResponse = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setBalance(balanceResponse.data.balance);

        // Fetch user data
        const userResponse = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const { firstName, lastName } = userResponse.data;
        setUserName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if(loading){
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <AppBar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <AppBar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-gray-600">Here's what's happening with your account today.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="mb-8">
          <Balance value={parseFloat(Number(balance).toFixed(2))} />
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
