import { useState } from "react";
import {
  Search,
  X,
} from "lucide-react";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  className = "",
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;

    setValue(newValue);

    if (onSearch) {
      onSearch(newValue);
    }
  };

  const clearSearch = () => {
    setValue("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div
      className={`
        relative
        w-full
        ${className}
      `}
    >
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          py-3
          pl-11
          pr-11
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-300
          focus:border-cyan-500/50
          focus:bg-white/10
        "
      />

      {value && (
        <button
          onClick={clearSearch}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-slate-400
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;