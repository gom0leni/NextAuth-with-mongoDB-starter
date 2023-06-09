import { DashboardProtectedLayout } from "@/components/admin/layout";

const Dashboard = () => {
  return (
    <DashboardProtectedLayout>
      <div>This page is protected for special people.</div>
    </DashboardProtectedLayout>
  );
};

export default Dashboard;
