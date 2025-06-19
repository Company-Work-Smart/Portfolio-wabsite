import React from 'react';
import { Box } from '@mui/material';
import appColor from '@/theme/appColor';

export const LoadingPage = () => {
  const colors = [
    appColor.loading1,
    appColor.loading2,
    appColor.loading3,
    appColor.loading4,
    appColor.loading5
  ];

  return (
    <Box
      sx={{
        backgroundColor: appColor.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 3
        }}
      >
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: color,
              animation: `bounce 1s infinite ease-in-out`,
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}
        <style>
          {`
            @keyframes bounce {
              0%, 100% {
                transform: scale(1);
                opacity: 0.5;
              }
              50% {
                transform: scale(1.5);
                opacity: 1;
              }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default LoadingPage;
