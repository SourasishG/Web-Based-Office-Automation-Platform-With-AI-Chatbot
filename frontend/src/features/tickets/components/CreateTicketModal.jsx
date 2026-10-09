import { useState } from "react";
import { Ticket, ShieldAlert, Sparkles, Building, CheckSquare } from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassInput } from "../../../components/ui/GlassInput";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * CreateTicketModal - Glass modal form interface to log new IT support tickets
 * 
 * @param {boolean} isOpen - Modal visibility state
 * @param {function} onClose - Modal close handler
 * @param {function} onSubmit - Submit callback (ticketData)
 */
export const CreateTicketModal = ({
  isOpen = false,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("IT Infrastructure");
  const [priority, setPriority] = useState("High");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newTicket = {
      title: title.trim(),
      description: description.trim(),
      category: category,
      priority: priority,
      status: "open",
      requester: {
        name: "Sourasish Ghosh",
        email: "sourasish.ghosh@officeaid.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        department: "Executive",
      },
      assignee: {
        name: "Aarav Sharma",
        email: "aarav.sharma@officeaid.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        role: "VP of Engineering",
      },
      slaTime: "4 hrs left",
      createdDate: new Date().toISOString().split("T")[0],
      createdTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      commentsCount: 0,
    };

    onSubmit(newTicket);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTitle("");
    setCategory("IT Infrastructure");
    setPriority("High");
    setDescription("");
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit IT Support Ticket"
      subtitle="Log technical issues, software requests, access permissions, or facility tickets."
      icon={Ticket}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ticket Title */}
        <GlassInput
          label="Ticket Title *"
          icon={CheckSquare}
          placeholder="e.g. VPN Access Timeout & SSL Certificate Error"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Category & Priority Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-cyan-400" /> Category Tag
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-4 rounded-2xl bg-slate-950/50 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/60"
            >
              <option value="IT Infrastructure" className="bg-slate-900">IT Infrastructure</option>
              <option value="Access & Security" className="bg-slate-900">Access & Security</option>
              <option value="Software & Tools" className="bg-slate-900">Software & Tools</option>
              <option value="Facilities" className="bg-slate-900">Facilities</option>
              <option value="HR Operations" className="bg-slate-900">HR Operations</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full h-11 px-4 rounded-2xl bg-slate-950/50 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/60"
            >
              <option value="Critical" className="bg-slate-900">Critical Priority (SLA: 2 hrs)</option>
              <option value="High" className="bg-slate-900">High Priority (SLA: 6 hrs)</option>
              <option value="Medium" className="bg-slate-900">Medium Priority (SLA: 24 hrs)</option>
              <option value="Low" className="bg-slate-900">Low Priority (SLA: 48 hrs)</option>
            </select>
          </div>
        </div>

        {/* Detailed Issue Description */}
        <GlassTextarea
          label="Detailed Description *"
          placeholder="Describe the issue, error messages, or requested software access..."
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
          <GlassButton variant="ghost" type="button" onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton variant="primary" type="submit" icon={Sparkles}>
            Submit Ticket
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
};

export default CreateTicketModal;
