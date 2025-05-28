import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        password,
        firstName,
        lastName
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join PayTM to start sending money</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InputBox
                label="First Name"
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputBox
                label="Last Name"
                placeholder="Enter last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <InputBox
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => setUsername(e.target.value)}
              type="email"
            />

            <InputBox
              label="Password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Button
              onClick={handleSignup}
              label={loading ? "Creating account..." : "Create Account"}
              variant="primary"
            />

            <div className="text-center">
              <BottomWarning
                label="Already have an account?"
                buttonText="Sign in"
                to="/signin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
