import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";


const StatCard = ({
  title,
  value,
  increase,
  icon: Icon,
  color
}) => {


  return (

    <motion.div

      whileHover={{
        y: -8,
        scale: 1.03,
      }}

      transition={{
        type: "spring",
        stiffness: 280,
        damping: 18,
      }}

      className="
            rounded-3xl
            border
            border-white/10
            bg-slate-900/70
            p-6
            text-white
            backdrop-blur-xl
            shadow-lg
            "

    >


      <div className="flex items-center justify-between">


        <div
          className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-linear-to-br
                    ${color}
                    `}
        >

          {Icon && <Icon size={26} />}

        </div>



        <div
          className="
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-green-500/10
                    px-3
                    py-1
                    text-sm
                    text-green-400
                    "
        >

          <TrendingUp size={15} />

          {increase}


        </div>


      </div>



      <p
        className="
                mt-6
                text-sm
                uppercase
                tracking-wider
                text-slate-400
                "
      >

        {title}

      </p>



      <h2
        className="
                mt-2
                text-4xl
                font-bold
                "
      >

        {value}

      </h2>



      <div
        className="
                mt-6
                h-2
                overflow-hidden
                rounded-full
                bg-white/10
                "
      >

        <div

          className={`
                    h-full
                    rounded-full
                    bg-linear-to-r
                    ${color}
                    `}

          style={{
            width: "70%"
          }}

        />

      </div>



    </motion.div>


  )

}


export default StatCard;