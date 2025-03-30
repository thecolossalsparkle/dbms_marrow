import React from 'react';
import { Box } from '@mui/material';

const ParticleBackground = () => {
  const colors = [
    'rgba(37, 99, 235, 0.5)', // blue
    'rgba(244, 63, 94, 0.5)', // rose
    'rgba(16, 185, 129, 0.5)', // green
    'rgba(245, 158, 11, 0.5)', // amber
    'rgba(59, 130, 246, 0.5)', // light blue
    'rgba(255, 255, 255, 0.5)', // white
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.8,
        pointerEvents: 'none',
        '& .particle': {
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'float-particle 20s infinite linear',
        },
        '@keyframes float-particle': {
          '0%': {
            transform: 'translateY(100vh) translateX(0) rotate(0deg)',
            opacity: 0,
          },
          '10%': {
            opacity: 1,
          },
          '90%': {
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-100px) translateX(100px) rotate(360deg)',
            opacity: 0,
          },
        },
        '@keyframes float-particle-alt': {
          '0%': {
            transform: 'translateY(100vh) translateX(0) rotate(0deg)',
            opacity: 0,
          },
          '10%': {
            opacity: 1,
          },
          '90%': {
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-100px) translateX(-100px) rotate(-360deg)',
            opacity: 0,
          },
        },
      }}
    >
      {[...Array(100)].map((_, i) => (
        <Box
          key={i}
          className="particle"
          sx={{
            width: Math.random() * 6 + 1 + 'px',
            height: Math.random() * 6 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 20 + 's',
            animationDuration: Math.random() * 20 + 15 + 's',
            animationName: Math.random() > 0.5 ? 'float-particle' : 'float-particle-alt',
            background: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.5 + 0.2,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}
    </Box>
  );
};

export default ParticleBackground; 