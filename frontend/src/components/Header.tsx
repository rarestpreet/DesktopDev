import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            D
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">Deploydev</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
            Preview
          </span>
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition"
          >
            GitHub
          </a>
          <button className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition shadow">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
};

