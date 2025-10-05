import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import TaskManagement from "./pages/TaskManagement";
import BillSplitting from "./pages/BillSplitting";
import GroupChat from "./pages/GroupChat";
import ShopingList from "./pages/ShopingList";

const App = () => {
  return (
    <Routes>
      {/* Home is at / */}
      <Route path="/" element={<Home />} />

      {/* Nested routes under /syn */}
      <Route path="syn" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="task-management" element={<TaskManagement />} />
        <Route path="bill-splitting" element={<BillSplitting />} />
        <Route path="group-chat" element={<GroupChat />} />
        <Route path="shop-list" element={<ShopingList />} />
      </Route>
    </Routes>
  );
};

export default App;
