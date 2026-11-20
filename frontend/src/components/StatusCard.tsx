import React, { useEffect, useState } from 'react';

interface BackendHealth {
  status: string;
  uptime: number;
  timestamp: string;
  version: string;
  memoryUsage?: {
    rssMb: number;
    heapUsedMb: number;
  };
}

export const StatusCard: React.FC = () => {
  const [health, setHealth] = useState<BackendHealth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/health');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data: BackendHealth = await res.json();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to reach API');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <h3 className="text-sm font-semibold text-slate-300">Control-Plane API Status</h3>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            loading
              ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
              : health?.status === 'ok'
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                : 'bg-rose-950/80 text-rose-400 border border-rose-800'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              loading ? 'bg-amber-400' : health?.status === 'ok' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
            }`}
          />
          {loading ? 'Checking...' : health?.status === 'ok' ? 'Healthy' : 'Degraded'}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-500">Uptime</span>
          <p className="font-mono text-slate-200 mt-0.5">
            {health ? `${health.uptime}s` : error ? 'Offline' : '...'}
          </p>
        </div>
        <div>
          <span className="text-slate-500">API Version</span>
          <p className="font-mono text-slate-200 mt-0.5">{health?.version ?? '0.1.0'}</p>
        </div>
        <div>
          <span className="text-slate-500">Memory (Heap)</span>
          <p className="font-mono text-slate-200 mt-0.5">
            {health?.memoryUsage ? `${health.memoryUsage.heapUsedMb} MB` : 'N/A'}
          </p>
        </div>
        <div>
          <span className="text-slate-500">Connection</span>
          <p className="font-mono text-slate-200 mt-0.5">
            {error ? <span className="text-rose-400">{error}</span> : 'Connected (/api/health)'}
          </p>
        </div>
      </div>
    </div>
  );
};

