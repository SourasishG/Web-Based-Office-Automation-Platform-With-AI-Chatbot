import {
  CalendarDays,
  Filter,
  Plus,
} from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import SearchBar from "../../../components/common/SearchBar";
import Button from "../../../components/ui/Button";

const MeetingsHeader = () => {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <PageHeader
        title="Meetings"
        description="Schedule, organize and manage all your meetings from one place."
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar
          placeholder="Search meetings..."
          className="w-72"
        />

        <Button
          variant="secondary"
          icon={CalendarDays}
        >
          Today
        </Button>

        <Button
          variant="secondary"
          icon={Filter}
        >
          Filter
        </Button>

        <Button
          icon={Plus}
        >
          Schedule Meeting
        </Button>
      </div>
    </section>
  );
};

export default MeetingsHeader;