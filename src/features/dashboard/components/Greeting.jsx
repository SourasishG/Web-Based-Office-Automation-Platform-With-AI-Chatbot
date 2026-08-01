import { Hand } from "lucide-react";

import WeatherWidget from "./WeatherWidget";


const Greeting = () => {

  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  }

  if (hour >= 17) {
    greeting = "Good Evening";
  }


  return (
    <section className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <div>

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          ✨ Office Aid Dashboard
        </p>


        <h1 className="mt-5 flex items-center gap-3 text-5xl font-bold text-white">

          {greeting},
          
          <span className="text-cyan-400">
            Sourasish
          </span>

          <Hand
            size={42}
            className="text-indigo-400"
          />

        </h1>


        <p className="mt-4 text-lg text-slate-400">
          Welcome back. Here's what's happening across your workplace today.
        </p>

      </div>


      <WeatherWidget />


    </section>
  );
};


export default Greeting;