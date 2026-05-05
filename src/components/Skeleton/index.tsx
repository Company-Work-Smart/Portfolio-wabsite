import { Box, CardContent, Skeleton, Stack } from '@mui/material';
import { CardWidget } from '@/components/Card';

export const SkeletonAppCard = () => (
  <CardWidget radius="20px">
    <CardContent sx={{ p: 4, textAlign: 'center' }}>
      <Skeleton variant="circular" width={24} height={24} sx={{ mx: 'auto', mb: 3 }} />
      <Skeleton variant="text" width="60%" height={20} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
    </CardContent>
  </CardWidget>
);

export const SkeletonProjectCard = () => (
  <CardWidget radius="20px">
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="text" width="50%" height={24} />
        <Skeleton variant="rounded" width={60} height={22} />
      </Box>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" sx={{ mb: 3 }} />
      <Stack direction="row" spacing={1}>
        {[60, 70, 50].map((w, i) => (
          <Skeleton key={i} variant="rounded" width={w} height={22} />
        ))}
      </Stack>
    </CardContent>
  </CardWidget>
);

export const SkeletonCard = () => (
  <CardWidget radius="20px" sx={{ display: 'flex', flexDirection: 'column' }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[60, 60, 60].map((w, i) => (
            <Skeleton key={i} variant="rounded" width={w} height={22} />
          ))}
        </Box>
      </Stack>
    </CardContent>
  </CardWidget>
);

export const SkeletonChip = () => (
  <Skeleton variant="rounded" width={80} height={32} sx={{ borderRadius: '16px' }} />
);
