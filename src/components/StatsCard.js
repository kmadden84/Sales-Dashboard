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
          ? `0 0 0 2px ${color}, 0 4px 8px -2px ${color}80` 
          : 'inherit',
        transition: 'all 0.3s',
        '&:hover': {
          cursor: 'pointer'
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: '0.8rem',
            mb: 1
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
              fontWeight: 500,
              fontSize: '1.5rem'
            }}
          >
            {value}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: `${color}20`,
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