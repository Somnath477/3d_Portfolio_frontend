export default function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-[1px] ${className}`}
    >
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient" />

      {/* Glass content */}
      <div className="relative backdrop-blur-2xl bg-black/40 border border-white/10 rounded-3xl p-10">
        {children}
      </div>
    </div>
  );
}
