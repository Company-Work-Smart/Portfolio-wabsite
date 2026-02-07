import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

function DashboardSuperAdmin() {


  return (
    <>
      <Head>
        <title>SuperAdmin Dashboard</title>
      </Head>
    </>
  );
}

DashboardSuperAdmin.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardSuperAdmin;
