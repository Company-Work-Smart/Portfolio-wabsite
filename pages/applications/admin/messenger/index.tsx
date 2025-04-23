import AdminSidebarLayoutChat from '@/content/Widgets/Messenger/Admin/SidebarLayoutChat';
import Head from 'next/head';


function ApplicationsMessenger() {
  return (
    <>
      <Head>
        <title>Messenger - Applications</title>
      </Head>
    </>
  );
}



ApplicationsMessenger.getLayout = (page) => (
  <AdminSidebarLayoutChat>{page}</AdminSidebarLayoutChat>
);
export default ApplicationsMessenger;
