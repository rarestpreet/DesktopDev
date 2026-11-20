import React from 'react';

export const ProjectOverview: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Connect GitHub Repository',
      desc: 'Seamless integration via GitHub App permissions for secure access without storing long-lived personal access tokens.',
    },
    {
      step: '02',
      title: 'Automated Manifest Inspection',
      desc: 'Auto-detects runtime requirements (Node, Java, Python, Go, Dockerfiles) and generates reproducible build plans.',
    },
    {
      step: '03',
      title: 'Containerized Builds & Deployment',
      desc: 'Isolated single-use sandboxes execute builds and deploy to Docker runtime with live logs streamed directly to the dashboard.',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-8">
      <h2 className="text-xl font-bold tracking-tight text-white mb-2">Platform Overview</h2>
      <p className="text-sm text-slate-400 mb-6">
        Designed strictly according to the architecture and operating guidelines in{' '}
        <code className="text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded text-xs">agents/AGENTS.md</code>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item) => (
          <div key={item.step} className="rounded-lg border border-slate-800/80 bg-slate-950/50 p-5">
            <span className="font-mono text-xs font-semibold text-indigo-400">{item.step}</span>
            <h4 className="font-semibold text-white mt-1 text-sm">{item.title}</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

