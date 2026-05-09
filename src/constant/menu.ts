export const Menu: any[] = [
  {
    group: 'Dashboard',
    roles: ['SuperAdmin', 'Admin'],
    children: [
      // ===== SuperAdmin ===== //
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
      // ===== SuperAdmin ===== //
      {
        title: 'Menu1',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Menu2',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Menu3',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Menu4',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      // ===== Admin ===== //
      {
        title: 'Menu1',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Menu2',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Menu3',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Menu4',
        url: '/management/place/admin',
        roles: ['Admin']
      }
    ]
  },
  {
    group: 'Reports',
    roles: ['SuperAdmin', 'Admin'],
    children: [
      // ===== SuperAdmin ===== //
      {
        title: 'Menu1',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Menu2',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Menu3',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Menu4',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      // ===== Admin ===== //
      {
        title: 'Menu1',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Menu2',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Menu3',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Menu4',
        url: '/management/place/admin',
        roles: ['Admin']
      }
    ]
  },
  {
    group: 'Settings',
    roles: ['SuperAdmin', 'Admin'],
    children: [
      // ===== SuperAdmin ===== //
      {
        title: 'Menu1',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      {
        title: 'Menu2',
        url: '/management/place/admin',
        roles: ['SuperAdmin']
      },
      // ===== Admin ===== //
      {
        title: 'Menu1',
        url: '/management/place/admin',
        roles: ['Admin']
      },
      {
        title: 'Menu2',
        url: '/management/place/admin',
        roles: ['Admin']
      }
    ]
  }
];
