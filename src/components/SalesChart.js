import React from 'react';
import { Card, CardContent, Typography, Box, ButtonGroup, Button, useTheme, useMediaQuery } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const timeRanges = [
  { value: 'day', label: '24H' },
  { value: 'week', label: '7D' },
  { value: 'month', label: '30D' },
];

const SalesChart = ({ data, metric, onTimeRangeChange, timeRange }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Get the metric color from the theme's primary color if not specified
  const metricConfig = {
    sales: { 
      label: 'Sales', 
      color: theme.palette.primary.main, 
      prefix: '$', 
      dataKey: 'sales' 
    },
    orders: { 
      label: 'Orders', 
      color: theme.palette.secondary.main, 
      prefix: '', 
      dataKey: 'orders' 
    },
    customers: { 
      label: 'Customers', 
      color: isDarkMode ? '#FF7C48' : theme.palette.warning.main, 
      prefix: '', 
      dataKey: 'customers' 
    },
    average: { 
      label: 'Avg. Order', 
      color: isDarkMode ? '#25D07D' : theme.palette.success.main, 
      prefix: '$', 
      dataKey: 'average' 
    },
  };

  const currentMetric = metricConfig[metric];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: isDarkMode 
              ? 'rgba(23, 28, 44, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            p: 2,
            border: `1px solid ${currentMetric.color}30`,
            borderRadius: 1,
            boxShadow: `0 4px 20px rgba(0, 0, 0, ${isDarkMode ? 0.3 : 0.1}), 0 0 10px ${currentMetric.color}40`,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary }}>{label}</Typography>
          <Typography variant="body1" sx={{ color: currentMetric.color, fontWeight: 600 }}>
            {`${currentMetric.label}: ${currentMetric.prefix}${payload[0].value.toLocaleString()}`}
          </Typography>
        </Box>
      );
    }
    return null;
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
        <Box 
          display="flex" 
          flexDirection={'row'} 
          justifyContent="space-between" 
          alignItems={'center'}
          mb={2}
        >
          <Typography variant="h6" sx={{ 
            color: currentMetric.color,
            fontWeight: 600
          }}>
            {metric === 'average' ? 'Avg. Order Overview' : `${currentMetric.label} Overview`}
          </Typography>
          <ButtonGroup 
            size="small" 
            aria-label="time range"
            variant="outlined"
          >
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                onClick={() => onTimeRangeChange(range.value)}
                variant={timeRange === range.value ? 'contained' : 'outlined'}
                sx={{
                  backgroundColor: timeRange === range.value ? currentMetric.color : 'transparent',
                  borderColor: currentMetric.color,
                  color: timeRange === range.value 
                    ? (isDarkMode ? 'black' : 'white')
                    : currentMetric.color,
                  '&:hover': {
                    backgroundColor: timeRange === range.value 
                      ? currentMetric.color 
                      : `${currentMetric.color}20`,
                  },
                }}
              >
                {range.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box sx={{ width: '100%', height: '360px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDarkMode 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "rgba(0, 0, 0, 0.1)"
                } 
              />
              <XAxis 
                dataKey="date" 
                stroke={isDarkMode 
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(0, 0, 0, 0.5)"
                }
                tick={{ 
                  fill: theme.palette.text.secondary, 
                  fontSize: 12 
                }}
              />
              <YAxis 
                stroke={isDarkMode 
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(0, 0, 0, 0.5)"
                }
                tick={{ 
                  fill: theme.palette.text.secondary, 
                  fontSize: 12 
                }}
                width={50}
                tickFormatter={(value) => {
                  if (metric === 'average') {
                    return `$${value}`;
                  } else if (value > 999) {
                    return `${Math.floor(value/1000)}k`;
                  }
                  return value;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={currentMetric.dataKey}
                stroke={currentMetric.color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 8, fill: currentMetric.color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesChart; 