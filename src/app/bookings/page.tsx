import { BaseLayout } from "@/components/layouts/base-layout";
import { useBookings } from "./hooks";
import { StatCards } from "./components/stat-cards";
import { DataTable } from "./components/data-table";
import { useMe } from "@/app/auth/api/hooks";
import { isAdmin } from "@/lib/scopes";

export default function BookingsPage() {
  const { data: bookings = [], isLoading } = useBookings();
  const { data: me } = useMe();
  const adminUser = me ? isAdmin(me.scopes) : false;

  return (
    <BaseLayout
      title="Резервации"
      description="Управлявайте и преглеждайте резервациите за вашите обекти."
    >
      <div className="flex flex-col gap-6 px-4 lg:px-6">
        <StatCards bookings={bookings} loading={isLoading} />
        <DataTable
          bookings={bookings}
          loading={isLoading}
          isAdmin={adminUser}
        />
      </div>
    </BaseLayout>
  );
}
