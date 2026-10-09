import { Mail, Star, MessageSquare, Edit, Trash2 } from "lucide-react";
import { GlassTable } from "../../../components/ui/GlassTable";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * EmployeeTable - Apple Liquid Glass Table Layout for Employees
 * Displays staff records in tabular format with quick sorting, status badges, and action triggers.
 * 
 * @param {Array} employees - Array of employee object records
 * @param {function} onMessageClick - Message button handler callback
 * @param {function} onEditClick - Edit employee button handler callback
 * @param {function} onDeleteClick - Delete employee button handler callback
 */
export const EmployeeTable = ({ employees = [], onMessageClick, onEditClick, onDeleteClick }) => {
  const getDepartmentVariant = (dept) => {
    switch (dept) {
      case "Executive": return "purple";
      case "Engineering": return "cyan";
      case "Design": return "blue";
      case "Product": return "success";
      case "Marketing": return "warning";
      case "HR": return "danger";
      default: return "ghost";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "online":
        return <GlassBadge variant="cyan" size="sm">Online</GlassBadge>;
      case "meeting":
        return <GlassBadge variant="warning" size="sm">In Call</GlassBadge>;
      case "away":
        return <GlassBadge variant="purple" size="sm">Away</GlassBadge>;
      default:
        return <GlassBadge variant="ghost" size="sm">Offline</GlassBadge>;
    }
  };

  const headers = ["Employee", "Role & Title", "Department", "Presence", "Projects / Tasks", "Rating", "Actions"];

  const rows = employees.map((emp) => [
    // Employee Identity
    <div key={`emp-${emp.id}`} className="flex items-center gap-3 min-w-[200px]">
      <GlassAvatar
        src={emp.avatar}
        name={emp.name}
        size="md"
        status={emp.status}
      />
      <div>
        <h4 className="font-semibold text-white text-sm">{emp.name}</h4>
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <Mail className="w-3 h-3" /> {emp.email}
        </p>
      </div>
    </div>,

    // Role & Title
    <div key={`role-${emp.id}`} className="min-w-[150px]">
      <p className="text-xs font-semibold text-slate-200">{emp.title}</p>
      <p className="text-[11px] text-slate-400">{emp.roleLevel || "Staff"}</p>
    </div>,

    // Department Badge
    <div key={`dept-${emp.id}`}>
      <GlassBadge variant={getDepartmentVariant(emp.department)} size="sm">
        {emp.department}
      </GlassBadge>
    </div>,

    // Presence Badge
    <div key={`status-${emp.id}`}>
      {getStatusBadge(emp.status)}
    </div>,

    // Projects / Tasks Count
    <div key={`metrics-${emp.id}`} className="text-xs text-slate-300">
      <span className="font-semibold text-white">{emp.projectsAssigned}</span> projects • <span className="font-semibold text-white">{emp.tasksCompleted}</span> tasks
    </div>,

    // Rating
    <div key={`rating-${emp.id}`} className="flex items-center gap-1 font-semibold text-sm text-yellow-400">
      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
      <span>{emp.performanceScore}</span>
    </div>,

    // Actions
    <div key={`actions-${emp.id}`} className="flex items-center gap-1.5 justify-end">
      <GlassButton
        variant="ghost"
        size="sm"
        icon={MessageSquare}
        onClick={() => onMessageClick && onMessageClick(emp)}
      />

      <GlassButton
        variant="secondary"
        size="sm"
        icon={Edit}
        onClick={() => onEditClick && onEditClick(emp)}
      />

      <GlassButton
        variant="danger"
        size="sm"
        icon={Trash2}
        onClick={() => onDeleteClick && onDeleteClick(emp.id)}
      />
    </div>,
  ]);

  return (
    <GlassTable
      headers={headers}
      rows={rows}
      striped
      hoverable
      className="my-4"
    />
  );
};

export default EmployeeTable;
