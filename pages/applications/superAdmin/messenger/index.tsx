import SuperAdminSidebarLayoutChat from '@/content/Widgets/Messenger/SuperAdmin/SidebarLayoutChat';
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
  <SuperAdminSidebarLayoutChat>{page}</SuperAdminSidebarLayoutChat>
);
export default ApplicationsMessenger;
