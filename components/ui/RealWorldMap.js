"use client";

import { useEffect, useState } from "react";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { feature } from "topojson-client";

const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
];

export default function RealWorldMap() {
  const [landPath, setLandPath] = useState(null);
  const [points, setPoints] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [myLocation, setMyLocation] = useState(null);

  const projection = geoNaturalEarth1()
    .scale(310)
    .translate([1000, 500]);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
      .then(res => res.json())
      .then(data => {
        const geo = feature(data, data.objects.land);
        const pathGen = geoPath(projection);
        setLandPath(pathGen(geo));
      });

    const mapped = cities.map(c => ({
      ...c,
      coords: projection([c.lon, c.lat]),
    }));

    setPoints(mapped);

    setRoutes(
      mapped.slice(1).map(c => ({
        from: mapped[0].coords,
        to: c.coords,
      }))
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        setMyLocation(projection([longitude, latitude]));
      });
    }
  }, []);

  if (!landPath) return null;

  return (
    <svg viewBox="0 0 2000 1000" className="w-full h-[360px]">

      <defs>
        <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="50%" stopColor="#8b5cf6"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </linearGradient>
      </defs>

      {/* Map outline */}
      <path d={landPath} fill="none" stroke="url(#flow)" strokeWidth="1.6"/>

      {/* Animated routes */}
      {routes.map((r, i) => (
        <line
          key={i}
          x1={r.from[0]}
          y1={r.from[1]}
          x2={r.to[0]}
          y2={r.to[1]}
          stroke="url(#flow)"
          strokeWidth="1.4"
          strokeDasharray="6 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="12"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* City nodes */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.coords[0]}
          cy={p.coords[1]}
          r="4"
          fill="#8b5cf6"
        />
      ))}

      {/* Live location */}
      {myLocation && (
        <>
          <circle cx={myLocation[0]} cy={myLocation[1]} r="10" fill="#ec4899" opacity="0.4">
            <animate attributeName="r" values="6;16;6" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx={myLocation[0]} cy={myLocation[1]} r="4" fill="#ec4899"/>
        </>
      )}

    </svg>
  );
}
