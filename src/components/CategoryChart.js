import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const CategoryChart = ({ data }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Colors based on theme
  const COLORS = isDarkMode 
    ? ['#00F5FF', '#7B42F6', '#FF7C48', '#25D07D', '#FF5E7D']
    : [theme.palette.primary.main, theme.palette.secondary.main, 
       theme.palette.warning.main, theme.palette.success.main, '#e91e63'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const color = payload[0].color;
      return (
        <Box
          sx={{
            backgroundColor: isDarkMode 
              ? 'rgba(23, 28, 44, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            p: 2,
            border: `1px solid ${color}30`,
            borderRadius: 1,
            boxShadow: `0 4px 20px rgba(0, 0, 0, ${isDarkMode ? 0.3 : 0.1}), 0 0 10px ${color}40`,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary }}>{name}</Typography>
          <Typography variant="body1" sx={{ color: color, fontWeight: 600 }}>
            {`${value}% of total sales`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '8px',
        marginTop: '10px'
      }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: entry.color, 
              borderRadius: '50%', 
              marginRight: '5px',
              boxShadow: isDarkMode ? `0 0 5px ${entry.color}80` : 'none' 
            }} />
            <span style={{ 
              fontSize: '12px', 
              color: theme.palette.text.secondary 
            }}>
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%', 
      overflow: 'hidden' 
    }}>
      <CardContent sx={{ p: 3, pb: 2, flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 600,
          mb: 2
        }}>
          Sales by Category
        </Typography>
        <Box sx={{ width: '100%', height: '360px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 5, right: 10, bottom: 15, left: 10 }}>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={110}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      filter: isDarkMode 
                        ? `drop-shadow(0 0 5px ${COLORS[index % COLORS.length]}40)` 
                        : 'none',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryChart; 