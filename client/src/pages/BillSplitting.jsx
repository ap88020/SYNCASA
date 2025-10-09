import React from "react";
import {FileText} from 'lucide-react'

const BillSplitting = () => {
  return (
    <div className="h-screen flex flex-col p-6 space-y-6 dark:bg-primary-dark">
      <h1 className="text-slate-500 dark:text-white text-2xl">Bill & Expenses</h1>
      <div className="flex flex-col items-center space-y-2 shadow shadow-gray-600 dark:shadow dark:shadow-gray-200 text-white p-6 rounded-lg">
        < FileText className="text-gray-600 w-32 h-24 font-bold"/>
        <p className="dark:text-blue-100 text-gray-600">
          Bill Management Coming Soon
        </p>
        <div className="text-slate-600 font-semibold dark:text-white">Track Shared expenses , split bills, and manage payments with your house hold members.</div>
      </div>
    </div>
  );
};

export default BillSplitting;
