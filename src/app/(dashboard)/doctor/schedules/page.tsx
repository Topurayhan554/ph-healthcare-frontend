import ScheduleList from "@/components/modules/doctor-schedule/schedule-list";

export default function Page() {
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl font-semibold">My Schedules</h1>
        <p className="text-muted-foreground">
          Create schedules, publish them for booking, or delete drafts.
        </p>
      </div>
      <ScheduleList />
    </section>
  );
}
