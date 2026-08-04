import DashboardCards from "../../components/dashboard/DashboardCards";
import RecentAnnouncements from "../../components/dashboard/RecentAnnouncements";
import RecentNews from "../../components/dashboard/RecentNews";
import QuickActions from "../../components/dashboard/QuickActions";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

const DashboardPage = () => {
  return (
    <div className="space-y-8">

      <PageHeader
        title="Dashboard"
        description="Onikişubat Belediyesi Yönetim Paneline hoş geldiniz."
        action={
          <Button>
            Yeni Haber
          </Button>
        }
      />

      <DashboardCards />

      <div className="grid gap-6 xl:grid-cols-2">

        <RecentNews />
          <QuickActions />
        <RecentAnnouncements />

      </div>

    </div>
  );
};

export default DashboardPage;