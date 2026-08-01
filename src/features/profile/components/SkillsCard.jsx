import ProfileData from "../data/ProfileData";

const SkillsCard = () => {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >
      <h2 className="mb-6 text-xl font-semibold text-white">
        Skills
      </h2>

      <div className="flex flex-wrap gap-3">
        {ProfileData.skills.map((skill) => (
          <div
            key={skill}
            className="
              rounded-full
              border
              border-cyan-500/20
              bg-cyan-500/10
              px-4
              py-2
              text-sm
              font-medium
              text-cyan-300
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-400
              hover:bg-cyan-500/20
              hover:text-white
            "
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsCard;