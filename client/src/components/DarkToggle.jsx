import { CircleDotIcon, Moon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const DarkToggle = () => {
  const [darkmode, setDarkmode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;

    if (darkmode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkmode]);

  return (
    <div>
      <button
        onClick={() => setDarkmode(prev => !prev)}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition border border-slate-300 rounded-md"
      >
        {darkmode ? <Moon className='dark:text-accent-dark' /> : <CircleDotIcon className='' />}
      </button>
    </div>
  );
};

export default DarkToggle;
