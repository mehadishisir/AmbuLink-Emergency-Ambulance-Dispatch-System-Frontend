export function DispatchMap() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a1024] shadow-2xl">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/4 size-72 rounded-full bg-rose-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-1/4 size-72 rounded-full bg-teal-500/10 blur-3xl"
      />

      {/* Map SVG */}
      <svg
        viewBox="0 0 600 450"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern
            id="mapGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(148, 163, 184, 0.06)"
              strokeWidth="1"
            />
          </pattern>

          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#f43f5e" stopOpacity="1" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.8" />
          </linearGradient>

          <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid */}
        <rect width="600" height="450" fill="url(#mapGrid)" />

        {/* Fake city blocks - subtle rectangles */}
        <g fill="rgba(30, 41, 59, 0.5)">
          <rect x="60" y="60" width="80" height="60" rx="3" />
          <rect x="160" y="60" width="60" height="90" rx="3" />
          <rect x="240" y="40" width="100" height="70" rx="3" />
          <rect x="360" y="70" width="70" height="80" rx="3" />
          <rect x="450" y="50" width="90" height="60" rx="3" />
          <rect x="80" y="150" width="70" height="100" rx="3" />
          <rect x="170" y="170" width="90" height="60" rx="3" />
          <rect x="280" y="130" width="80" height="100" rx="3" />
          <rect x="380" y="170" width="100" height="70" rx="3" />
          <rect x="500" y="140" width="60" height="90" rx="3" />
          <rect x="60" y="280" width="100" height="80" rx="3" />
          <rect x="180" y="270" width="80" height="90" rx="3" />
          <rect x="290" y="260" width="90" height="70" rx="3" />
          <rect x="400" y="270" width="70" height="90" rx="3" />
          <rect x="500" y="250" width="70" height="80" rx="3" />
          <rect x="120" y="380" width="90" height="50" rx="3" />
          <rect x="240" y="370" width="100" height="60" rx="3" />
          <rect x="370" y="380" width="80" height="50" rx="3" />
        </g>

        {/* Streets - thin lines */}
        <g
          stroke="rgba(100, 116, 139, 0.15)"
          strokeWidth="1"
          fill="none"
        >
          <line x1="0" y1="120" x2="600" y2="120" />
          <line x1="0" y1="240" x2="600" y2="240" />
          <line x1="0" y1="360" x2="600" y2="360" />
          <line x1="150" y1="0" x2="150" y2="450" />
          <line x1="300" y1="0" x2="300" y2="450" />
          <line x1="450" y1="0" x2="450" y2="450" />
        </g>

        {/* Route path */}
        <path
          d="M 130 340 Q 200 340, 220 260 T 320 200 Q 380 180, 440 130"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#routeGlow)"
          className="animate-route-dash"
        />

        {/* Pickup marker (patient) */}
        <g transform="translate(130, 340)">
          <circle
            r="16"
            fill="rgba(244, 63, 94, 0.25)"
            className="animate-marker-ping"
          />
          <circle r="8" fill="#f43f5e" />
          <circle r="3" fill="#ffffff" />
        </g>

        {/* Ambulance marker (on route) */}
        <g transform="translate(300, 220)">
          <circle r="12" fill="rgba(255, 255, 255, 0.08)" />
          <rect
            x="-9"
            y="-6"
            width="18"
            height="12"
            rx="2"
            fill="#f43f5e"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <rect x="-3" y="-2" width="6" height="4" fill="#ffffff" rx="1" />
        </g>

        {/* Hospital marker */}
        <g transform="translate(440, 130)">
          <circle
            r="20"
            fill="rgba(20, 184, 166, 0.15)"
            className="animate-marker-ping"
          />
          <rect
            x="-11"
            y="-11"
            width="22"
            height="22"
            rx="6"
            fill="#0d9488"
          />
          <path
            d="M -4 -1 L 4 -1 M 0 -5 L 0 3"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Dispatch panel overlay */}
      <div className="absolute bottom-4 right-4 w-[240px] rounded-xl border border-white/10 bg-[#0f1730]/95 p-3.5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="animate-marker-ping absolute inline-flex size-full rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-rose-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">
            Dispatch Active
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Ambulance</span>
            <span className="font-mono font-semibold text-white">
              ICU-04
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Priority</span>
            <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-400">
              HIGH
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Status</span>
            <span className="flex items-center gap-1.5 font-semibold text-teal-400">
              <span className="size-1.5 rounded-full bg-teal-400" />
              En route
            </span>
          </div>
        </div>

        <div className="mt-3 h-px bg-white/10" />

        <p className="mt-2.5 text-[10px] leading-relaxed text-slate-500">
          Dispatch interface preview
        </p>
      </div>

      {/* Top-left badge */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#0f1730]/90 px-3 py-1.5 backdrop-blur-xl">
        <span className="size-1.5 rounded-full bg-teal-400" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
          Live Dispatch Map
        </span>
      </div>
    </div>
  );
}