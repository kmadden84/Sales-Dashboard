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
  ReferenceLine,
} from 'recharts';

const timeRanges = [
  { value: 'day', label: '24H' },
  { value: 'week', label: '7D' },
  { value: 'month', label: '30D' },
];

// Updated colors for the futuristic theme
const metricConfig = {
  sales: { label: 'Sales', color: '#00F5FF', prefix: '$', dataKey: 'sales' },
  orders: { label: 'Orders', color: '#7B42F6', prefix: '', dataKey: 'orders' },
  customers: { label: 'Customers', color: '#FF7C48', prefix: '', dataKey: 'customers' },
  average: { label: 'Avg. Order Value', color: '#25D07D', prefix: '$', dataKey: 'average' },
};

const SalesChart = ({ data, metric, onTimeRangeChange, timeRange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentMetric = metricConfig[metric];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'rgba(23, 28, 44, 0.95)',
            p: 2,
            border: `1px solid ${currentMetric.color}30`,
            borderRadius: 1,
            boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px ${currentMetric.color}40`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "#E4F0FB" }}>{label}</Typography>
          <Typography variant="body1" sx={{ color: currentMetric.color, fontWeight: 600 }}>
            {`${currentMetric.label}: ${currentMetric.prefix}${payload[0].value.toLocaleString()}`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 2, pb: 3 }}>
        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          mb={2}
          gap={1}
        >
          <Typography variant="h6" sx={{ 
            color: currentMetric.color,
            textShadow: `0 0 8px ${currentMetric.color}40`,
            letterSpacing: '0.02em',
          }}>
            {metric === 'average' ? 'Avg. Order Overview' : `${currentMetric.label} Overview`}
          </Typography>
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <ButtonGroup 
              size="small" 
              aria-label="time range"
              fullWidth={isMobile}
              variant="outlined"
              sx={{ 
                '& .MuiButtonGroup-grouped': {
                  border: `1px solid ${currentMetric.color}40`,
                  minWidth: { xs: '33%', sm: 'auto' },
                },
                boxShadow: `0 0 10px ${currentMetric.color}20`,
              }}
            >
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  onClick={() => onTimeRangeChange(range.value)}
                  variant={timeRange === range.value ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: timeRange === range.value ? 
                      `${currentMetric.color}` : 
                      'rgba(0,0,0,0.2)',
                    borderColor: currentMetric.color,
                    color: timeRange === range.value ? '#000' : currentMetric.color,
                    fontWeight: timeRange === range.value ? 600 : 400,
                    '&:hover': {
                      backgroundColor: timeRange === range.value ? 
                        currentMetric.color : 
                        `${currentMetric.color}30`,
                    },
                    fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                    textShadow: timeRange === range.value ? `0 0 5px ${currentMetric.color}` : 'none',
                  }}
                >
                  {range.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Box>
        <div style={{ width: '100%', height: 600, paddingRight: isMobile ? '5px' : '10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 15,
                left: isMobile ? 0 : 20,
                bottom: 30,
              }}>
              <defs>
                <linearGradient id={`colorGradient${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="rgba(255, 255, 255, 0.07)" 
              />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255, 255, 255, 0.3)"
                tick={{ fill: '#A1B4C7', fontSize: isMobile ? 11 : 13 }}
                tickMargin={15}
                height={40}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.3)"
                tick={{ fill: '#A1B4C7', fontSize: isMobile ? 11 : 13 }}
                width={isMobile ? 45 : 55}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickFormatter={(value) => {
                  if (metric === 'sales' && value > 999) {
                    return `$${Math.floor(value/1000)}k`;
                  } else if (metric === 'average') {
                    return `$${value}`;
                  } else if (value > 999) {
                    return `${Math.floor(value/1000)}k`;
                  }
                  return value;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Highlight area under the line */}
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <ReferenceLine y={0} stroke="rgba(255, 255, 255, 0.2)" />
              <Line
                type="monotone"
                dataKey={currentMetric.dataKey}
                stroke={currentMetric.color}
                strokeWidth={4}
                dot={false}
                activeDot={{ 
                  r: 10, 
                  fill: currentMetric.color,
                  stroke: 'rgba(0,0,0,0.3)',
                  strokeWidth: 2
                }}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart; 