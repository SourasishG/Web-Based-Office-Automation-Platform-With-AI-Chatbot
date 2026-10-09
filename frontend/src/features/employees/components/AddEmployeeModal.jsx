import { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Building, ShieldCheck, Sparkles } from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassInput } from "../../../components/ui/GlassInput";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * Inner Form Component - Resets state naturally on key change
 */
const EmployeeForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || "",
    department: initialData?.department || "Engineering",
    roleLevel: initialData?.roleLevel || "Specialist",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
    skills: Array.isArray(initialData?.skills)
      ? initialData.skills.join(", ")
      : initialData?.skills || "",
    avatar: initialData?.avatar || "",
  });

  const isEditing = Boolean(initialData?.id);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const formattedSkills = formData.skills
      ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Workplace Specialist"];

    const payload = {
      ...initialData,
      id: initialData?.id || `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name.trim(),
      title: formData.title.trim() || "Team Member",
      department: formData.department,
      roleLevel: formData.roleLevel,
      email: formData.email.trim(),
      phone: formData.phone.trim() || "+91 98765 43210",
      location: formData.location.trim() || "Remote Workspace",
      skills: formattedSkills,
      avatar: formData.avatar.trim() || undefined,
      status: initialData?.status || "online",
      projectsAssigned: initialData?.projectsAssigned || 0,
      tasksCompleted: initialData?.tasksCompleted || 0,
      performanceScore: initialData?.performanceScore || 5.0,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassInput
          label="Full Name *"
          icon={User}
          placeholder="e.g. Sourasish Ghosh"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <GlassInput
          label="Job Title *"
          icon={Briefcase}
          placeholder="e.g. Senior Software Engineer"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      {/* Department & Role Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-cyan-400" /> Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            className="w-full h-11 px-4 rounded-2xl bg-slate-950/50 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/60"
          >
            <option value="Engineering" className="bg-slate-900">Engineering</option>
            <option value="Design" className="bg-slate-900">Design</option>
            <option value="Product" className="bg-slate-900">Product</option>
            <option value="Marketing" className="bg-slate-900">Marketing</option>
            <option value="HR" className="bg-slate-900">Human Resources (HR)</option>
            <option value="Executive" className="bg-slate-900">Executive</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Role Tier
          </label>
          <select
            value={formData.roleLevel}
            onChange={(e) => handleChange("roleLevel", e.target.value)}
            className="w-full h-11 px-4 rounded-2xl bg-slate-950/50 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/60"
          >
            <option value="Specialist" className="bg-slate-900">Specialist / Contributor</option>
            <option value="Lead" className="bg-slate-900">Team / Department Lead</option>
            <option value="Admin" className="bg-slate-900">Administrator</option>
          </select>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassInput
          label="Corporate Email *"
          type="email"
          icon={Mail}
          placeholder="e.g. sourasish@officeaid.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />

        <GlassInput
          label="Phone Number"
          type="tel"
          icon={Phone}
          placeholder="e.g. +91 98765 43210"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      {/* Location & Avatar URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassInput
          label="Work Location"
          icon={MapPin}
          placeholder="e.g. Kolkata, India"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />

        <GlassInput
          label="Avatar Image URL (Optional)"
          icon={Sparkles}
          placeholder="https://images.unsplash.com/..."
          value={formData.avatar}
          onChange={(e) => handleChange("avatar", e.target.value)}
        />
      </div>

      {/* Skills Tag Input */}
      <GlassInput
        label="Skill Sets (Comma separated)"
        icon={Sparkles}
        placeholder="e.g. React 19, System Architecture, Node.js, UI/UX"
        value={formData.skills}
        onChange={(e) => handleChange("skills", e.target.value)}
      />

      {/* Action Buttons */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
        <GlassButton variant="ghost" type="button" onClick={onClose}>
          Cancel
        </GlassButton>
        <GlassButton variant="primary" type="submit">
          {isEditing ? "Save Changes" : "Create Employee Profile"}
        </GlassButton>
      </div>
    </form>
  );
};

/**
 * AddEmployeeModal - Glass modal container
 */
export const AddEmployeeModal = ({
  isOpen = false,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const isEditing = Boolean(initialData?.id);

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Employee Profile" : "Add New Employee"}
      subtitle={
        isEditing
          ? "Update team member details, department, and role permissions."
          : "Register a new verified employee into the workplace roster."
      }
      icon={User}
      maxWidth="max-w-2xl"
    >
      <EmployeeForm
        key={initialData?.id || "new-emp-form"}
        initialData={initialData}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </GlassModal>
  );
};

export default AddEmployeeModal;
