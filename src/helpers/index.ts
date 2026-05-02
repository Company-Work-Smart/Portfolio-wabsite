import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MyApp } from '@/constant/my-app';

export const authRedirect = (router) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(MyApp.UserInfo().accessToken);
    if (token) {
      router.push('/view/explore');
    } else {
      router.push('/auth/login');
    }
  }
};

export const useRedirectOnInvalid = (data: any, path: string) => {
  const router = useRouter();

  useEffect(() => {
    if (data === undefined || data === null) {
      router.push(path);
    }
  }, [data, router, path]);
};

export const provinces = [
  'Banteay Meanchey',
  'Battambang',
  'Kompong Cham',
  'Kompong Chhnang',
  'Kompong Speu',
  'Kompong Thom',
  'Kompot',
  'Kandal',
  'Koh Kong',
  'Kratie',
  'Mondulkiri',
  'Oddar Meanchey',
  'Pailin',
  'Phnom Penh',
  'Preah Sihanouk',
  'Preah Vihear',
  'Pursat',
  'Prey Veng',
  'Ratanakiri',
  'Siem Reap',
  'Stung Treng',
  'Svay Rieng',
  'Takeo',
  'Tboung Khmum'
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Approved':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Reject':
      return 'error';
    case 'Cancelled':
      return 'error';
    default:
      return 'default';
  }
};
