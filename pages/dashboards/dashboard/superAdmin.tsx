'use client';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

function DashboardSuperAdmin() {
  const title = 'SuperAdmin Dashboard';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
}

DashboardSuperAdmin.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default DashboardSuperAdmin;
