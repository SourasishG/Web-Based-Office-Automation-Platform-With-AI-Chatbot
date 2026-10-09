import React from "react";
import { Plus } from "lucide-react";
import { GlassButton } from "../../../components/ui";

/**
 * CreateProjectButton - Apple Liquid Glass Primary CTA Button
 * Trigger for initiating project creation workflows.
 * 
 * @param {function} onClick - Click handler callback
 * @param {string} label - Button text label
 * @param {boolean} isDisabled - Disabled state
 * @param {string} className - Additional CSS classes
 */
export const CreateProjectButton = ({
  onClick,
  label = "New Project",
  isDisabled = false,
  className = "",
  ...props
}) => {
  return (
    <GlassButton
      variant="primary"
      size="md"
      icon={Plus}
      onClick={onClick}
      isDisabled={isDisabled}
      className={className}
      {...props}
    >
      {label}
    </GlassButton>
  );
};

export default CreateProjectButton;