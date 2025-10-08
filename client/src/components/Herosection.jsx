import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react"; 

const Herosection = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px -16 lg:px-24 xl:px-40 text-black mx-auto max-w-6xl bg-white dark:bg-surface-dark">
        <div className="absolute top-0 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

        <div className="flex items-center mt-7 ">
          <Home className="w-15 h-15 text-white px-2 py-1 rounded bg-green-600 " strokeWidth={1.4} />{" "}
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px] dark:text-white">
          Welcome to
          <span className=" bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent text-nowrap">
            SyncCasa
          </span>{" "}
        </h1>

        <p className="max-w-md text-center text-base my-7 dark:text-white">
          The ultimate flatmate lifestle management app. Organize task, spit
          bills, ans stay connected with your household effortlessly.
        </p>


        <div className="flex items-center gap-4 mb-7">
          
          <Link
            to="/syn"
            className="bg-green-500 hover:bg-green-600 text-white font-medium rounded px-9 h-12 m-1 ring-offset-2 ring-1 ring-indigo-400 flex items-center transition-colors"
          >
            Get started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
