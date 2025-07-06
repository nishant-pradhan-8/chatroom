import React, { useState } from "react";
import type { Credentials } from "../../../types/type";
import { register } from "../../../service/authService";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateUsername, validatePassword } from "../../../utils/utils";
import { useAppContext } from "../../../store/store";
interface ValidationErrors {
  email?: string;
  username?: string;
  password?: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Credentials>({
    username: "",
    email: "",
    password: "",
  });
  const {setNewRegistration} = useAppContext();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
    
    const usernameError = validateUsername(formData.username || "");
    if (usernameError) errors.username = usernameError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    if (validationErrors[id as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [id]: undefined }));
    }
    
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    try {
      const response = await register(formData);
      if (!response.data) {
        setErrorMessage(response.message || "Unable to create account.");
        return;
      }
     setNewRegistration(true)
      navigate("/");
    } finally {
      setProcessing(false);
    }
  };

  const getInputClassName = (fieldName: keyof ValidationErrors) => {
    const baseClass = "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500";
    return validationErrors[fieldName] 
      ? `${baseClass} border-red-500 focus:ring-red-500` 
      : baseClass;
  };

  return (
    <div className="flex flex-col justify-center h-full px-12 py-8 bg-white rounded-l-2xl w-full max-w-md m-auto">
      <div className="mb-8">
        <span className="inline-block w-3 h-3 bg-purple-600 rounded-full mr-2 align-middle"></span>
        <span className="font-semibold text-lg align-middle">Chat Room</span>
      </div>
      <h1 className="text-4xl font-bold mb-2">
        Hi, <br />
        Welcome
      </h1>
      <p className="text-gray-500 mb-8">
        Want to chat with your friends? Register Now!
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="e.g. rahulbaral10"
            className={getInputClassName("username")}
            value={formData.username || ""}
            onChange={handleChange}
            required
          />
          {validationErrors.username && (
            <p className="text-red-500 text-sm">*{validationErrors.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. stanley@gmail.com"
            className={getInputClassName("email")}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm">*{validationErrors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="e.g. password123"
            className={getInputClassName("password")}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm">*{validationErrors.password}</p>
          )}
        </div>
        <p className={`text-red-500 ${errorMessage ? "block" : "hidden"}`}>
          *{errorMessage}
        </p>
        <button
          disabled={processing}
          type="submit"
          className="bg-purple-600  cursor-pointer text-white rounded-lg py-2 font-semibold hover:bg-purple-700 transition"
        >
          {processing ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-8 text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-purple-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
