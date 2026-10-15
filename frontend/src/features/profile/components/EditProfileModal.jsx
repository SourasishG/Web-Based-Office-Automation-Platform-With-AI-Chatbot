import { useState, useEffect, useRef } from "react";
import {
  User,
  Briefcase,
  Building2,
  Phone,
  MapPin,
  Plus,
  X,
  Loader2,
  Save,
  CheckCircle2,
  AlertCircle,
  Camera,
  Trash2,
} from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassButton } from "../../../components/ui/GlassButton";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import employeeService from "../../../services/employeeService";
import useAuth from "../../../hooks/useAuth";

const STATUS_OPTIONS = [
  { value: "ONLINE", label: "Online & Available", color: "bg-emerald-400" },
  { value: "BUSY", label: "Busy / In a Meeting", color: "bg-rose-400" },
  { value: "AWAY", label: "Away from Desk", color: "bg-amber-400" },
  { value: "OFFLINE", label: "Offline", color: "bg-slate-400" },
];

export const EditProfileModal = ({ isOpen, onClose, user, onSaveSuccess }) => {
  const { updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [presenceStatus, setPresenceStatus] = useState("ONLINE");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Synchronize form with incoming user profile
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAvatarUrl(user.avatarUrl || user.avatar || "");
      setJobTitle(user.jobTitle || user.designation || "");
      setDepartment(user.department || "");
      setPhone(user.phone || "");
      setLocation(user.location || "");
      setPresenceStatus(user.presenceStatus || "ONLINE");
      setSkills(Array.isArray(user.skills) ? [...user.skills] : []);
      setError("");
      setSuccess(false);
    }
  }, [user, isOpen]);

  const handleAddSkill = (e) => {
    e?.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Convert uploaded image file to lightweight compressed data URL
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    // Limit original file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError("Image file is too large. Please select an image under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new Image();
      img.onload = () => {
        // High-quality downscale to max 400x400 for optimal fast avatars
        const maxDimension = 400;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.88);
        setAvatarUrl(compressedDataUrl);
        setError("");
      };
      img.onerror = () => {
        setError("Unable to process the selected image.");
      };
      img.src = loadEvent.target.result;
    };
    reader.onerror = () => {
      setError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("First and last name are required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        avatarUrl: avatarUrl || null,
        jobTitle: jobTitle.trim(),
        department: department.trim(),
        phone: phone.trim(),
        location: location.trim(),
        presenceStatus,
        skills,
      };

      const updated = await employeeService.updateEmployee(user.id, payload);

      // Update global auth context
      updateUser(updated);

      setSuccess(true);
      if (onSaveSuccess) onSaveSuccess(updated);

      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 700);
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Executive Profile"
      subtitle="Update your organizational credentials and technical attributes"
      icon={User}
      maxWidth="lg"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <GlassButton
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </GlassButton>
          <GlassButton
            variant="primary"
            size="md"
            icon={isLoading ? Loader2 : success ? CheckCircle2 : Save}
            onClick={handleSave}
            disabled={isLoading}
            className={success ? "bg-emerald-600/60 border-emerald-500/40" : ""}
          >
            {isLoading ? "Saving..." : success ? "Saved!" : "Save Changes"}
          </GlassButton>
        </div>
      }
    >
      <form onSubmit={handleSave} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Picture Uploader */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/3 border border-white/10">
          <div className="relative group shrink-0">
            <GlassAvatar
              src={avatarUrl}
              name={`${firstName} ${lastName}`}
              size="lg"
              glow
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload new picture"
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-cyan-300"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white">Profile Picture</p>
            <p className="text-[11px] text-slate-400 truncate">
              Upload your custom photo (PNG, JPG, or WEBP up to 10MB)
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{avatarUrl ? "Change Photo" : "Upload Photo"}</span>
              </button>

              {avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Remove profile picture"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
            />
          </div>
        </div>

        {/* Role & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Job Title / Designation
            </label>
            <div className="relative">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. VP of Engineering"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Department
            </label>
            <div className="relative">
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Engineering, Executive"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
          </div>
        </div>

        {/* Phone & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Office Location
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
          </div>
        </div>

        {/* Presence Status */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Presence Status
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = presenceStatus === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPresenceStatus(opt.value)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-[11px] font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/10 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white"
                      : "bg-white/3 border-white/5 text-slate-400 hover:bg-white/6 hover:text-slate-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${opt.color} shrink-0`} />
                  <span className="truncate">{opt.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Tag Editor */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Technical & Professional Competencies
          </label>
          <div className="flex gap-2 mb-2.5">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="Add skill (e.g. Next.js, System Architecture)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-xl bg-white/2 border border-white/5">
            {skills.length === 0 ? (
              <span className="text-[11px] text-slate-500 italic">No skills listed yet.</span>
            ) : (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-linear-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/30 text-slate-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      </form>
    </GlassModal>
  );
};

export default EditProfileModal;
