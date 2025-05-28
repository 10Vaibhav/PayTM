import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const userData = {
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          password: "",
        };
        setFormData(userData);
        setOriginalData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    try {
      // Only include fields that have been changed
      const updateData = {};
      if (formData.firstName !== originalData.firstName) {
        updateData.firstName = formData.firstName;
      }
      if (formData.lastName !== originalData.lastName) {
        updateData.lastName = formData.lastName;
      }
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      // Only proceed with update if there are changes
      if (Object.keys(updateData).length > 0) {
        await axios.put(
          "http://localhost:3000/api/v1/user",
          updateData,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setMessage("Profile updated successfully!");
        // Update original data after successful update
        setOriginalData({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        setFormData(prev => ({ ...prev, password: "" }));
      } else {
        setMessage("No changes to update");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(error.response?.data?.message || "Error updating profile");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
          
          {message && (
            <div className={`p-4 mb-4 rounded-md ${
              message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 