import React from 'react';
import { Header } from './components/Header';
import { StatusCard } from './components/StatusCard';
import { ProjectOverview } from './components/ProjectOverview';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600 selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <section className="text-center sm:text-left space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-medium">
            <span>Phase 0: Foundations & Boilerplate</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Deploy your code with zero friction.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Connect a GitHub repository. Deploydev analyzes your manifests, executes isolated builds, runs plain
            Docker containers, and streams real-time deployment logs.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProjectOverview />
          </div>
          <div className="lg:col-span-1">
            <StatusCard />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Deploydev &bull; Operator-run Cloud Deployment Platform</p>
      </footer>
    </div>
  );
};

export default App;

