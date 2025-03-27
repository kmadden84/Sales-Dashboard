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

// Updated colors for the futuristic theme
const COLORS = ['#00F5FF', '#7B42F6', '#FF7C48', '#25D07D', '#FF5E7D'];

const CategoryChart = ({ data }) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const color = payload[0].color;
      return (
        <Box
          sx={{
            backgroundColor: 'rgba(23, 28, 44, 0.95)',
            p: 2,
            border: `1px solid ${color}30`,
            borderRadius: 1,
            boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px ${color}40`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "#E4F0FB" }}>{name}</Typography>
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
        gap: '12px',
        marginTop: '20px'
      }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginRight: '10px',
            backgroundColor: `${entry.color}15`,
            padding: '4px 10px',
            borderRadius: '12px',
            border: `1px solid ${entry.color}30`,
          }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: entry.color, 
              borderRadius: '50%', 
              marginRight: '6px',
              boxShadow: `0 0 5px ${entry.color}80` 
            }} />
            <span style={{ 
              fontSize: '13px', 
              color: entry.color,
              textShadow: `0 0 5px ${entry.color}40`,
              fontWeight: 500
            }}>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 2, pb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ 
          color: '#00F5FF',
          textShadow: '0 0 8px rgba(0, 245, 255, 0.4)',
          letterSpacing: '0.02em',
        }}>
          Sales by Category
        </Typography>
        <div style={{ width: '100%', height: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={80}
                outerRadius={150}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth={1}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      filter: `drop-shadow(0 0 3px ${COLORS[index % COLORS.length]}80)`,
                    }}
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