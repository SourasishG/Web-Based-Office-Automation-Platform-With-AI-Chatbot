import { useState, useEffect, useCallback } from "react";
import { CloudSun, Sun, CloudRain, Wind, Droplets, MapPin, RefreshCw, Zap, CloudFog, CloudLightning, Moon, CloudMoon } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * WeatherWidget - Precise Real-Time Weather & Atmospheric Monitor
 * Fetches hyper-local live weather using Open-Meteo & Browser Geolocation APIs.
 * Includes precise Day vs Night icon switching (Sun vs Moon).
 * 
 * @param {object} weatherData - Optional fallback weather data object
 */
export const WeatherWidget = ({ weatherData }) => {
  const currentHour = new Date().getHours();
  const initialIsDay = currentHour >= 6 && currentHour < 18 ? 1 : 0;

  const [weatherState, setWeatherState] = useState({
    city: weatherData?.city || weatherData?.location || "Kolkata, India",
    temp: weatherData?.temp !== undefined ? weatherData.temp : 28,
    feelsLike: 29,
    condition: weatherData?.condition || "Clear Sky",
    humidity: weatherData?.humidity !== undefined ? weatherData.humidity : 68,
    windSpeed: weatherData?.windSpeed || "12 km/h",
    weatherCode: 0,
    isDay: initialIsDay,
    isLoading: false,
    lastUpdated: null,
  });

  // WMO Weather Code Translator
  const decodeWmoCode = (code) => {
    switch (code) {
      case 0:
        return "Clear Sky";
      case 1:
        return "Mainly Clear";
      case 2:
        return "Partly Cloudy";
      case 3:
        return "Overcast";
      case 45:
      case 48:
        return "Fog & Haze";
      case 51:
      case 53:
      case 55:
        return "Light Drizzle";
      case 61:
      case 63:
      case 65:
        return "Rain Showers";
      case 71:
      case 73:
      case 75:
        return "Snowfall";
      case 80:
      case 81:
      case 82:
        return "Heavy Rain";
      case 95:
      case 96:
      case 99:
        return "Thunderstorm";
      default:
        return "Clear Sky";
    }
  };

  // Weather Condition Icon Render Helper (Aware of Day vs Night)
  const getWeatherIcon = (code, cond, isDay) => {
    const c = cond.toLowerCase();

    // Thunderstorm
    if (code === 95 || code === 96 || code === 99 || c.includes("thunder")) {
      return <CloudLightning className="w-9 h-9 text-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.6)]" />;
    }
    // Rain / Drizzle
    if ((code >= 51 && code <= 82) || c.includes("rain") || c.includes("shower") || c.includes("drizzle")) {
      return <CloudRain className="w-9 h-9 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />;
    }
    // Fog / Haze
    if (code === 45 || code === 48 || c.includes("fog") || c.includes("haze")) {
      return <CloudFog className="w-9 h-9 text-slate-300 drop-shadow-[0_0_15px_rgba(203,213,225,0.4)]" />;
    }

    // Determine Day vs Night
    const hr = new Date().getHours();
    const isNightTime = isDay !== undefined ? isDay === 0 : (hr < 6 || hr >= 18);

    if (isNightTime) {
      if (code === 0 || code === 1 || c.includes("clear")) {
        return <Moon className="w-9 h-9 text-indigo-300 drop-shadow-[0_0_15px_rgba(165,180,252,0.6)]" />;
      }
      return <CloudMoon className="w-9 h-9 text-indigo-300 drop-shadow-[0_0_15px_rgba(165,180,252,0.6)]" />;
    }

    // Daytime
    if (code === 0 || code === 1 || c.includes("clear") || c.includes("sun")) {
      return <Sun className="w-9 h-9 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-spin-slow" />;
    }
    return <CloudSun className="w-9 h-9 text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />;
  };

  // Fetch Live Precise Weather Data
  const fetchPreciseWeather = useCallback(async (lat = 22.5726, lon = 88.3639, defaultCity = "Kolkata, India") => {
    setWeatherState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Fetch Open-Meteo free live forecast API including is_day metric
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m`
      );
      
      if (!weatherRes.ok) throw new Error("Weather fetch failed");
      const weatherJson = await weatherRes.json();
      const current = weatherJson.current;

      // Reverse Geocoding City Name
      let cityLocation = defaultCity;
      try {
        const geoRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        if (geoRes.ok) {
          const geoJson = await geoRes.json();
          const city = geoJson.city || geoJson.locality || geoJson.principalSubdivision;
          const country = geoJson.countryName;
          if (city) {
            cityLocation = country ? `${city}, ${country}` : city;
          }
        }
      } catch {
        // Fallback to default city string
      }

      setWeatherState({
        city: cityLocation,
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        condition: decodeWmoCode(current.weather_code),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
        weatherCode: current.weather_code,
        isDay: current.is_day,
        isLoading: false,
        lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    } catch {
      // Graceful fallback to default values on offline / network restriction
      const hr = new Date().getHours();
      setWeatherState((prev) => ({
        ...prev,
        isDay: hr >= 6 && hr < 18 ? 1 : 0,
        isLoading: false,
        lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));
    }
  }, []);

  // Request browser geolocation on mount
  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (isMounted) fetchPreciseWeather(pos.coords.latitude, pos.coords.longitude);
          },
          () => {
            if (isMounted) fetchPreciseWeather(22.5726, 88.3639, "Kolkata, India");
          },
          { timeout: 8000 }
        );
      } else {
        if (isMounted) fetchPreciseWeather(22.5726, 88.3639, "Kolkata, India");
      }
    };

    const timer = setTimeout(() => {
      loadWeather();
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fetchPreciseWeather]);

  return (
    <GlassPanel
      variant="floating"
      padding="lg"
      className="h-full flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Background Soft Glow Accent */}
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors duration-500 pointer-events-none" />

      {/* Header: Location, Refresh CTA & Live Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">{weatherState.city}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => fetchPreciseWeather()}
            title="Refresh Live Weather"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors focus:outline-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${weatherState.isLoading ? "animate-spin text-cyan-400" : ""}`} />
          </button>

          <GlassBadge variant="cyan" size="sm" dot>
            Live Weather
          </GlassBadge>
        </div>
      </div>

      {/* Main Temperature & Weather Display */}
      <div className="relative z-10 my-3 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold tracking-tight text-white leading-none">
              {weatherState.temp}°
            </span>
            <span className="text-xl font-medium text-slate-400">C</span>
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-xs font-semibold text-slate-200">
              {weatherState.condition}
            </p>
            <span className="text-[11px] text-slate-400">
              (Feels like {weatherState.feelsLike}°)
            </span>
          </div>
        </div>

        <div className="shrink-0 p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          {getWeatherIcon(weatherState.weatherCode, weatherState.condition, weatherState.isDay)}
        </div>
      </div>

      {/* Atmospheric Secondary Metrics Bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400 bg-slate-950/30 px-2.5 py-1.5 rounded-xl border border-white/5">
          <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] block text-slate-500">Humidity</span>
            <span className="font-semibold text-slate-200">{weatherState.humidity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 bg-slate-950/30 px-2.5 py-1.5 rounded-xl border border-white/5">
          <Wind className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] block text-slate-500">Wind Speed</span>
            <span className="font-semibold text-slate-200">{weatherState.windSpeed}</span>
          </div>
        </div>
      </div>

      {/* Footer Timestamp */}
      {weatherState.lastUpdated && (
        <div className="relative z-10 text-[10px] text-slate-500 mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" /> Open-Meteo Real-Time Sync
          </span>
          <span>Updated {weatherState.lastUpdated}</span>
        </div>
      )}
    </GlassPanel>
  );
};

export default WeatherWidget;