export const Menu: any[] = [
  {
    group: "Dashboard",
    roles: ['Admin', 'SuperAdmin', 'Manager'],
    children: [
      {
        title: 'Dashboard',
        url: '/dashboards/dashboard/admin',
        roles: ['Admin']
      },
      {
        title: 'Dashboard',
        url: '/dashboards/dashboard/superAdmin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Dashboard',
        url: '/dashboards/dashboard/manager',
        roles: ['Manager']
      },
    ]
  },
  {
    group: "Management",
    roles: ['Admin', 'SuperAdmin', 'Manager'],
    children: [
      {
        title: 'Place',
        url: '/management/admin/place',
        roles: ['Admin']
      },
      {
        title: 'Admin',
        url: '/management/admin/superAdmin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Room',
        url: '/management/room/admin',
        roles: ['Admin']
      },
      {
        title: 'User',
        url: '/management/user/superAdmin',
        roles: ['SuperAdmin']
      },
      {
        title: 'User Booking',
        url: '/management/booking/admin',
        roles: ['Admin']
      },
      {
        title: 'User Rate',
        url: '/management/rate/admin',
        roles: ['Admin']
      },
      {
        title: 'Place',
        url: '/management/place/superAdmin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Contact Me',
        url: '/management/contact/superAdmin',
        roles: ['SuperAdmin']
      },
    ]
  }
];