import { Lock, Mail, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, reset } from "../feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, message, user } = useSelector(
    (state) => state.auth
  );

  // ✅ Redirect to profile if user is authenticated
  useEffect(() => {
    if (user && (user.name || user.email)) {
      toast.success(`Welcome back, ${user.name || user.email}!`);
      navigate("/profile");
    }
  }, [user, navigate]);

  // ✅ Show toast for success/error messages
  useEffect(() => {
    if (message) {
      if (success) toast.success(message);
      else toast.error(message);
      dispatch(reset());
    }
  }, [message, success, dispatch]);

  // ✅ Clear messages when switching between login/register
  useEffect(() => {
    dispatch(reset());
  }, [state, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (state === "register" && !formData.name) {
      toast.error("Please enter your name");
      return;
    }

    if (formData.password.length < 3) {
      toast.error("Password must be at least 3 characters");
      return;
    }

    const userData = {
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
    };
    if (state === "register") userData.name = formData.name;

    const loadingToast = toast.loading(
      state === "login" ? "Signing you in..." : "Creating your account..."
    );

    try {
      if (state === "register") {
        await dispatch(register(userData)).unwrap();
        toast.success("Account created successfully!");
        navigate("/profile");
      } else {
        await dispatch(login(userData)).unwrap();
        toast.success("Login successful!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error || "Something went wrong!");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchMode = () => {
    setState((prev) => (prev === "login" ? "register" : "login"));
    dispatch(reset());
    toast.success(
      `Switched to ${state === "login" ? "Sign Up" : "Login"} mode`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 dark:bg-primary-dark">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full border border-gray-300/60 rounded-2xl px-8 bg-white py-8 dark:bg-surface-dark"
      >
        <h1 className="text-gray-900 text-3xl mt-2 font-medium text-center dark:text-green-500">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2 text-center dark:text-gray-400">
          {state === "login"
            ? "Please sign in to continue"
            : "Create your account"}
        </p>

        {state !== "login" && (
          <div className="flex items-center mt-4 w-full bg-white dark:bg-gray-800 border border-gray-300/80 dark:border-gray-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User className="text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 w-full bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white dark:bg-gray-800 border border-gray-300/80 dark:border-gray-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail className="text-gray-500 dark:text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 w-full bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white dark:bg-gray-800 border border-gray-300/80 dark:border-gray-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock className="text-gray-500 dark:text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 w-full bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state === "login" && (
          <div className="mt-4 text-left text-indigo-500 dark:text-green-500">
            <button
              className="text-sm"
              type="button"
              onClick={() =>
                toast("Password reset feature coming soon!", { icon: "🔒" })
              }
            >
              Forget password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 dark:bg-green-500 hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Please wait..."
            : state === "login"
            ? "Login"
            : "Sign up"}
        </button>

        <p
          onClick={switchMode}
          className="text-gray-500 text-sm mt-3 text-center cursor-pointer dark:text-gray-400"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-indigo-500 hover:underline dark:text-green-500 dark:hover:text-green-400">
            click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
