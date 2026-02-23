import { BaseLayout } from "@/components/layouts/base-layout";
import { useBookings } from "./hooks";
import { StatCards } from "./components/stat-cards";
import { DataTable } from "./components/data-table";

export default function BookingsPage() {
  const { data: bookings = [], isLoading } = useBookings();

  return (
    <BaseLayout
      title="Bookings"
      description="Manage and review bookings for your venues."
    >
      <div className="flex flex-col gap-6 px-4 lg:px-6">
        <StatCards bookings={bookings} loading={isLoading} />
        <DataTable bookings={bookings} loading={isLoading} />
      </div>
    </BaseLayout>
  );
}
