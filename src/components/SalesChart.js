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

const metricConfig = {
  sales: { label: 'Sales', color: '#2196f3', prefix: '$', dataKey: 'sales' },
  orders: { label: 'Orders', color: '#4caf50', prefix: '', dataKey: 'orders' },
  customers: { label: 'Customers', color: '#ff9800', prefix: '', dataKey: 'customers' },
  average: { label: 'Avg. Order Value', color: '#9c27b0', prefix: '$', dataKey: 'average' },
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
            backgroundColor: 'background.paper',
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            boxShadow: theme.shadows[2],
          }}
        >
          <Typography variant="subtitle2">{label}</Typography>
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
      <CardContent sx={{ px: { xs: 1, sm: 2 } }}>
        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          mb={2}
          gap={1}
        >
          <Typography variant="h6">
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
                  border: `1px solid ${currentMetric.color}`,
                  minWidth: { xs: '33%', sm: 'auto' },
                }
              }}
            >
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  onClick={() => onTimeRangeChange(range.value)}
                  variant={timeRange === range.value ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: timeRange === range.value ? currentMetric.color : 'transparent',
                    borderColor: currentMetric.color,
                    color: timeRange === range.value ? 'white' : currentMetric.color,
                    '&:hover': {
                      backgroundColor: timeRange === range.value ? currentMetric.color : `${currentMetric.color}15`,
                    },
                    fontSize: { xs: '0.75rem', sm: '0.8125rem' }
                  }}
                >
                  {range.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Box>
        <div style={{ width: '100%', height: 300, paddingRight: isMobile ? '5px' : '10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: isMobile ? 0 : 10,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{ fill: '#666', fontSize: isMobile ? 10 : 12 }}
                tickMargin={10}
                height={30}
              />
              <YAxis 
                stroke="#666"
                tick={{ fill: '#666', fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 35 : 45}
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
              <Line
                type="monotone"
                dataKey={currentMetric.dataKey}
                stroke={currentMetric.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: currentMetric.color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart; 