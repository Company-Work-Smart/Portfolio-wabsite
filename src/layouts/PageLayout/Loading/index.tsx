import React from 'react';
import { Box, Typography } from '@mui/material';
import appColor from '@/theme/appColor';

export const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt:8,
      }}
    >
      <Box
      >
        {Array.from({ length: 8 }, (_, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: '5px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: appColor.black,
              opacity: 0.2 + index * 0.1,
              animation: `loadingDots 1.5s linear infinite ${index * 0.1875}s`,
              transformOrigin: '-10px -20px',
              transform: `rotate(${index * 45}deg) translateY(-42px)`
            }}
          />
        ))}
        <style>
          {`
            @keyframes loadingDots {
              0% {
                opacity: 0.2;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0.2;
              }
            }
          `}
        </style>
      </Box>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Loading, please wait ...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
