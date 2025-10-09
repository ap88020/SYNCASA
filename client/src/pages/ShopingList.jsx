import { ShoppingCart } from "lucide-react";
import React from "react";

const ShopingList = () => {
  return (
    <div className="h-screen flex flex-col p-6 space-y-6 dark:bg-primary-dark">
      <h1 className="text-slate-500 dark:text-white text-2xl">Shop List</h1>
      <div className="flex flex-col items-center space-y-2 shadow shadow-gray-600 dark:shadow dark:shadow-gray-200 text-white p-6 rounded-lg">
        <ShoppingCart className="text-gray-600 w-32 h-24 font-bold" />
        <p className="dark:text-blue-100 text-gray-600">Shop Feature Coming Soon</p>
        <div className="text-slate-600 font-semibold dark:text-white">
          Share your shopig list with your house hold members.
        </div>
      </div>
    </div>
  );
};

export default ShopingList;
