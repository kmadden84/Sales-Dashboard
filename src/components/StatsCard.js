import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

const StatsCard = ({ title, value, icon, color, onClick, selected }) => {
  return (
    <Card
      sx={{
        boxShadow: selected 
          ? `0 0 0 2px ${color}, 0 8px 16px -4px ${color}80` 
          : 'inherit',
        backgroundColor: selected ? `${color}05` : 'background.paper',
        transform: selected ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        '&:hover': {
          cursor: 'pointer',
          boxShadow: `0 6px 12px -2px rgba(0, 0, 0, 0.1)`,
          transform: 'translateY(-2px)',
        },
        '&::after': selected ? {
          content: '""',
          position: 'absolute',
          bottom: '-3px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          height: '3px',
          backgroundColor: color,
          borderRadius: '3px',
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: '0.8rem',
            mb: 1,
            fontWeight: selected ? 600 : 400
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
              fontWeight: selected ? 600 : 500,
              fontSize: '1.5rem',
              color: selected ? color : 'inherit'
            }}
          >
            {value}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: `${color}${selected ? '30' : '20'}`,
              borderRadius: '50%',
              p: 1,
              color: color
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