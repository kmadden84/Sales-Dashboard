import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';

const StatsCard = ({ title, value, icon, color, onClick, selected }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected 
          ? `0 0 20px ${color}80, 0 0 30px ${color}40` 
          : isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
        backgroundColor: selected 
          ? isDarkMode ? `rgba(23, 28, 44, 0.95)` : `rgba(255, 255, 255, 0.95)` 
          : isDarkMode ? 'rgba(23, 28, 44, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
        transform: selected ? 'translateY(-3px)' : 'none',
        transition: 'all 0.2s ease-in-out',
        border: `1px solid ${selected ? color : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
        '&:hover': {
          cursor: 'pointer',
          boxShadow: `0 8px 25px rgba(0, 0, 0, ${isDarkMode ? '0.3' : '0.1'}), 0 0 15px ${color}40`,
          transform: 'translateY(-2px)',
        },
        '&::before': selected ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          zIndex: 1,
        } : {},
        '&::after': selected && isDarkMode ? {
          content: '""',
          position: 'absolute',
          bottom: '-5px',
          left: '10%',
          width: '80%',
          height: '10px',
          background: color,
          filter: 'blur(10px)',
          opacity: 0.6,
          borderRadius: '50%',
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: '0.85rem',
            mb: 1,
            fontWeight: selected ? 600 : 400,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            color: selected ? color : 'inherit',
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: selected ? 700 : 500,
              fontSize: '1.5rem',
              color: selected ? (isDarkMode ? 'white' : theme.palette.text.primary) : 'inherit',
              textShadow: selected && isDarkMode ? `0 0 10px ${color}80` : 'none',
            }}
          >
            {value}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: `${color}${isDarkMode ? '20' : '15'}`,
              borderRadius: '50%',
              p: 1.2,
              color: color,
              boxShadow: selected 
                ? `0 0 15px ${color}${isDarkMode ? '80' : '40'}` 
                : `0 0 10px ${color}${isDarkMode ? '40' : '20'}`,
              transition: 'all 0.3s ease',
              transform: selected ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard; 