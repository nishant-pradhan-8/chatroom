import { useState } from "react";
import type { Credentials } from "../../../types/type";
import { login } from "../../../service/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState<Credentials>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [processing, setProcessing] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await login(formData);
      if (!response.data) {
        setErrorMessage(response.message || "Unable to login.");
        return;
      }
      navigate("/");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full px-12 py-8 bg-white rounded-l-2xl w-full max-w-md m-auto">
      <div className="mb-8">
        <span className="inline-block w-3 h-3 bg-purple-600 rounded-full mr-2 align-middle"></span>
        <span className="font-semibold text-lg align-middle">Chat Room</span>
      </div>
      <h1 className="text-4xl font-bold mb-2">
        Hi, <br />
        Welcome Back
      </h1>
      <p className="text-gray-500 mb-8">Ready to chat with your friends?</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. stanley@gmail.com"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="e.g. password123"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <p className={`text-red-500 ${errorMessage ? "block" : "hidden"}`}>
          *{errorMessage}
        </p>
        <button
          type="submit"
          disabled={processing}
          className="bg-purple-600 cursor-pointer text-white rounded-lg py-2 font-semibold hover:bg-purple-700 transition"
        >
          {processing ? "Logging In..." : "LogIn"}
        </button>
      </form>
      <p className="mt-8 text-sm cursor-pointer text-gray-500">
        Don't have an account?{" "}
        <a href="/register" className="text-purple-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
