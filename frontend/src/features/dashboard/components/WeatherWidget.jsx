import React from "react";
import { CloudSun, Sun, CloudRain, Wind, Droplets, MapPin, RefreshCw } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * WeatherWidget - Apple Liquid Glass Real-Time Weather Panel
 * Displays atmospheric condition, location, temperature, humidity, and wind metrics.
 */
export const WeatherWidget = ({ weatherData }) => {
  const city = weatherData?.location || weatherData?.city || "Kolkata, India";
  const temp = weatherData?.temp !== undefined ? weatherData.temp : 28;
  const condition = weatherData?.condition || "Partly Cloudy";
  const humidity = weatherData?.humidity !== undefined ? weatherData.humidity : 68;
  const windSpeed = weatherData?.windSpeed || weatherData?.wind || "12 km/h";

  // Weather Condition Icon Mapping
  const getWeatherIcon = (cond) => {
    const c = cond.toLowerCase();
    if (c.includes("rain") || c.includes("shower")) {
      return <CloudRain className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />;
    }
    if (c.includes("sun") || c.includes("clear")) {
      return <Sun className="w-10 h-10 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-spin-slow" />;
    }
    return <CloudSun className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />;
  };

  return (
    <GlassPanel
      variant="floating"
      padding="lg"
      className="h-full flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Background Soft Weather Glow Accent */}
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors duration-500 pointer-events-none" />

      {/* Header: Location & Live Status Pill */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">{city}</span>
        </div>

        <GlassBadge variant="cyan" size="sm" dot>
          Live Weather
        </GlassBadge>
      </div>

      {/* Main Temperature & Weather Display */}
      <div className="relative z-10 my-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold tracking-tight text-white leading-none">
              {temp}°
            </span>
            <span className="text-xl font-medium text-slate-400">C</span>
          </div>
          <p className="text-xs font-medium text-slate-300 mt-1.5">
            {condition}
          </p>
        </div>

        <div className="shrink-0 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          {getWeatherIcon(condition)}
        </div>
      </div>

      {/* Atmospheric Secondary Metrics Bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400 bg-slate-950/30 px-2.5 py-1.5 rounded-xl border border-white/5">
          <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] block text-slate-500">Humidity</span>
            <span className="font-semibold text-slate-200">{humidity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 bg-slate-950/30 px-2.5 py-1.5 rounded-xl border border-white/5">
          <Wind className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] block text-slate-500">Wind</span>
            <span className="font-semibold text-slate-200">{windSpeed}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default WeatherWidget;