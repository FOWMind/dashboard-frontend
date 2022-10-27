import Head from "next/head";

// Utils
import { WORK_SECTION } from "../../utils/constants";

// Components
import DashboardLayout from "../../components/DashboardLayout";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardMainContent from "../../components/DashboardMainContent";

export default function WorkView() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <DashboardSidebar activeSection={WORK_SECTION.VIEW_SINGLE} />
        <DashboardMainContent activeSection={WORK_SECTION.VIEW_SINGLE} />
      </DashboardLayout>
    </>
  );
}
