import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="space-y-6">
            <InputBox
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => setUsername(e.target.value)}
              type="email"
            />
            <InputBox
              label="Password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Button
              onClick={handleSignin}
              label={loading ? "Signing in..." : "Sign in"}
              variant="primary"
            />

            <div className="text-center">
              <BottomWarning
                label="Don't have an account?"
                buttonText="Sign up"
                to="/signup"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
