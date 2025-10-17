import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import TaskManagement from "./pages/TaskManagement";
import BillSplitting from "./pages/BillSplitting";
import GroupChat from "./pages/GroupChat";
import ShopingList from "./pages/ShopingList";
import Register from "./components/Register";
import { Toaster , toast } from 'react-hot-toast'
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-primary dark:bg-primary-dark">
      < Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Register />} />
        < Route path="profile" element={<Profile/>}/>
        <Route path="syn" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="task-management" element={<TaskManagement />} />
          <Route path="bill-splitting" element={<BillSplitting />} />
          <Route path="group-chat" element={<GroupChat />} />
          <Route path="shop-list" element={<ShopingList />} />
        </Route>
      </Routes>
      < Toaster position="top-bottom" />
      < Footer />
    </div>
  );
};

export default App;
