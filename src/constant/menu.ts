export const Menu: any[] = [
  {
    group: 'Dashboard',
    roles: ['SuperAdmin', 'Admin'],
    children: [
      // ===== Super Admin ===== //
      {
        title: 'Dashboard',
        url: '/dashboards/dashboard/superAdmin',
        roles: ['SuperAdmin']
      },
      // ===== Admin ===== //
      {
        title: 'Dashboard',
        url: '/dashboards/dashboard/admin',
        roles: ['Admin']
      }
    ]
  },
  {
    group: 'Management',
    roles: ['SuperAdmin', 'Admin'],
    children: [
      // ===== Super Admin ===== //
      {
        title: 'Admin',
        url: '/management/superAdmin/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'User',
        url: '/management/superAdmin/user',
        roles: ['SuperAdmin']
      },

      // ===== Admin ===== //
      {
        title: 'Place',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Room',
        url: '/management/room/admin',
        roles: ['Admin']
      },
      {
        title: 'User Booking',
        url: '/management/booking/admin',
        roles: ['Admin']
      }
      // {
      //   title: 'User Rate',
      //   url: '/management/rate/admin',
      //   roles: ['Admin']
      // },
    ]
  },
  {
    group: 'Feature',
    roles: ['SuperAdmin', 'Admin'],
    children: [
      // ===== Super Admin ===== //
      {
        title: 'Review',
        url: '/feature/video/superAdmin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Billing',
        url: '/feature/payment/superAdmin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Contact Me',
        url: '/feature/contact/superAdmin',
        roles: ['SuperAdmin']
      },
      // ===== Admin ===== //
      {
        title: 'Review',
        url: '/feature/video/admin',
        roles: ['Admin']
      },
      {
        title: 'Billing',
        url: '/feature/payment/admin',
        roles: ['Admin']
      },
      {
        title: 'Support',
        url: '/feature/contact/admin',
        roles: ['Admin']
      }
    ]
  }
];
