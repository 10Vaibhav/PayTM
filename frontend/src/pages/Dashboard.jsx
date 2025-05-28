import { useEffect, useState } from "react"
import AppBar from "../components/Appbar"
import Balance from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if(loading){
    return <div>
      Loading...
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <Balance value={parseFloat(Number(balance).toFixed(2))} />
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
