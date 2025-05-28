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
        setUserName(`${firstName} ${lastName}`.toUpperCase());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {userName}</h1>
            <Balance value={parseFloat(Number(balance).toFixed(2))} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
