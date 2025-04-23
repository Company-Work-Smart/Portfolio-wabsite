import UserSidebarLayoutChat from '@/content/Widgets/Messenger/User/SidebarLayoutChat';
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
  <UserSidebarLayoutChat>{page}</UserSidebarLayoutChat>
);
export default ApplicationsMessenger;
