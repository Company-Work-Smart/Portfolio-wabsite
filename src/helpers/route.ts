import { NextRouter } from 'next/router';

export function getBackRoute(router: NextRouter): string {
  const index = router.asPath.lastIndexOf('/');
  return router.asPath.substring(0, index);
}