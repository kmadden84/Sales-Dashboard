import React from 'react';
import { Card, CardContent, Typography, Box, Divider, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StatsList = ({ title, items, primaryKey, secondaryKey, metaKey, growthKey }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2, pb: 0, flexGrow: 0 }}>
        <Typography variant="h6" sx={{ 
          mb: 2,
          color: theme.palette.primary.main
        }}>
          {title}
        </Typography>
      </CardContent>
      <Box sx={{ overflow: 'auto', flexGrow: 1, pb: 1 }}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <Box 
              sx={{ 
                p: 2, 
                pt: index === 0 ? 0 : 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  {item[primaryKey]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item[metaKey]}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1" fontWeight={600}>
                  {item[secondaryKey]}
                </Typography>
                {growthKey && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: item[growthKey].startsWith('+') 
                        ? theme.palette.success.main 
                        : theme.palette.error.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 0.5
                    }}
                  >
                    {item[growthKey].startsWith('+') 
                      ? <TrendingUpIcon sx={{ fontSize: 16 }} /> 
                      : <TrendingDownIcon sx={{ fontSize: 16 }} />}
                    {item[growthKey]}
                  </Typography>
                )}
              </Box>
            </Box>
            {index < items.length - 1 && <Divider sx={{ 
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)' 
            }} />}
          </React.Fragment>
        ))}
      </Box>
    </Card>
  );
};

export default StatsList; 