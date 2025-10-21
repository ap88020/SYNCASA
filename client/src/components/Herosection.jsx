import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 text-gray-900 dark:text-white bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-20 left-1/3 -z-10 w-96 h-96 bg-green-400/40 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-1/3 -z-10 w-80 h-80 bg-indigo-400/30 blur-[100px] rounded-full"></div>

      {/* Icon */}
      <div className="mb-6 p-3 rounded-full bg-green-600 text-white shadow-lg">
        <Home size={36} strokeWidth={1.5} />
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight tracking-tight">
        Simplify Your <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">Home Life</span> with{" "}
        <span className="text-green-700 dark:text-green-400">SyncCasa</span>
      </h1>

      {/* Subtext */}
      <p className="max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300 mt-6">
        The all-in-one platform for shared households — manage chores, split bills,
        assign tasks, and keep everyone connected effortlessly.
      </p>

      {/* Call to Action */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/house"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </Link>

        <Link
          to="/about"
          className="text-green-700 dark:text-green-400 font-medium hover:underline"
        >
          Learn More
        </Link>
      </div>

    </section>
  );
};

export default HeroSection;