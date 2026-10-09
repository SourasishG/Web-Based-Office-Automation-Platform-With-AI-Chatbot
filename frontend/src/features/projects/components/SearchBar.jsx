import React from "react";
import { GlassSearchBar } from "../../../components/ui";

/**
 * SearchBar - Apple Liquid Glass Standalone Project Search Field
 * Wraps GlassSearchBar for modular use across project subviews.
 * 
 * @param {string} value - Search text value
 * @param {function} onChange - Change handler callback
 * @param {string} placeholder - Placeholder text
 * @param {string} className - Additional CSS classes
 */
export const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search projects by title or tag...",
  className = "",
  ...props
}) => {
  return (
    <GlassSearchBar
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      shortcutKey="⌘K"
      className={className}
      {...props}
    />
  );
};

export default SearchBar;