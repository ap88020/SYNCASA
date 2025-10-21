import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import TaskManagement from "./pages/TaskManagement";
import BillSplitting from "./pages/BillSplitting";
import GroupChat from "./pages/GroupChat";
import ShopingList from "./pages/ShopingList";
import Register from "./components/Register";
import { Toaster, toast } from "react-hot-toast";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HouseholdCreation from "./pages/HouseholdCreation";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ token, children }) => {
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        if (decoded.exp * 1000 < Date.now()) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          setToken(null);
        } else {
          setToken(storedToken);
        }
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, []);

  // ✅ Correct way: Check if current path matches any of the hidden routes
  const hideLayout = 
    location.pathname === "/house" || 
    location.pathname === "/profile";

    const footerHide = location.pathname === "/syn"

  return (
    <div className="bg-primary dark:bg-primary-dark min-h-screen flex flex-col">
      {/* 👇 Conditionally render Navbar/Footer */}
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute token={token}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/house"
            element={
              <ProtectedRoute token={token}>
                <HouseholdCreation />
              </ProtectedRoute>
            }
          />

          <Route path="/syn" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="task-management" element={<TaskManagement />} />
            <Route path="bill-splitting" element={<BillSplitting />} />
            <Route path="group-chat" element={<GroupChat />} />
            <Route path="shop-list" element={<ShopingList />} />
          </Route>
        </Routes>
      </main>

      <Toaster position="top-bottom" />
      {!hideLayout && !footerHide && <Footer />}
    </div>
  );
};

export default App;