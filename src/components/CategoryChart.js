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

const COLORS = ['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#f44336'];

const CategoryChart = ({ data }) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
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
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="body1" sx={{ color: payload[0].color, fontWeight: 600 }}>
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
        marginTop: '16px'
      }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: entry.color, 
              borderRadius: '50%', 
              marginRight: '5px' 
            }} />
            <span style={{ fontSize: '12px', color: '#666' }}>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" gutterBottom>
          Sales by Category
        </Typography>
        <div style={{ width: '100%', height: 280, paddingLeft: '10px', paddingRight: '10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart; 