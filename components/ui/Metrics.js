"use client";

import { useEffect, useState } from "react";

function Counter({ value }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let cur = 0;
    const step = value / 60;

    const i = setInterval(() => {
      cur += step;
      if (cur >= value) {
        setN(value);
        clearInterval(i);
      } else setN(Math.floor(cur));
    }, 16);

    return () => clearInterval(i);
  }, [value]);

  return <span>{n}</span>;
}

export default function Metrics() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-12">
      <Metric value={40} label="UI Performance Boost" />
      <Metric value={32} label="Load Time Reduced" />
      <Metric value={25} label="Dev Speed Increased" />
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
      <div className="text-3xl font-bold text-white">
        <Counter value={value} />%
      </div>
      <p className="text-sm text-gray-400 mt-2">{label}</p>
    </div>
  );
}
