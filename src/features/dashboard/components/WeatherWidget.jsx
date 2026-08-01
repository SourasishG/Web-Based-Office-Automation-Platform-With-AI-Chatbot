import useWeather from "../../../hooks/useWeather";

const WeatherWidget = () => {

  const { weather, loading } = useWeather();


  if (loading) {
    return (
      <div className="text-slate-400">
        Loading...
      </div>
    );
  }


  if (!weather) {
    return (
      <div className="text-slate-400">
        Weather unavailable
      </div>
    );
  }


  return (
    <div className="
      rounded-3xl
      border
      border-white/10
      bg-slate-900/60
      px-6
      py-5
      text-white
    ">

      <div className="text-2xl font-bold">
        {weather.temp}°C
      </div>

      <div className="text-slate-400">
        {weather.condition}
      </div>

    </div>
  );
};

export default WeatherWidget;