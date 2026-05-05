'use client';
import SidebarLayout from '@/layouts/SidebarLayout';
import Head from 'next/head';

function DashboardAdmin() {
  const title = 'Admin Dashboard';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
}

DashboardAdmin.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default DashboardAdmin;
