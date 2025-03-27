import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  ThemeProvider, 
  createTheme, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  useMediaQuery,
  CssBaseline
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import StatsCard from './components/StatsCard';
import SalesChart from './components/SalesChart';
import CategoryChart from './components/CategoryChart';
import TopProducts from './components/TopProducts';
import StatsList from './components/StatsList';

import { salesData, categoryData, productData, summaryStats } from './data/mockData';

// Futuristic theme
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      background: 'linear-gradient(90deg, #00F5FF, #00C8FF, #0080FF)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 15px rgba(0, 247, 255, 0.5)',
      letterSpacing: '0.05em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      letterSpacing: '0.03em',
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F5FF',
      light: '#64F9FF',
      dark: '#00C8FF',
    },
    secondary: {
      main: '#7B42F6',
    },
    background: {
      default: '#10141E',
      paper: '#171C2C',
    },
    text: {
      primary: '#E4F0FB',
      secondary: '#A1B4C7',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #10141E 0%, #171C2C 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: 'rgba(23, 28, 44, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(0, 245, 255, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 15px rgba(0, 245, 255, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #00F5FF, #0080FF)',
          boxShadow: '0 0 15px rgba(0, 245, 255, 0.5)',
          '&:hover': {
            background: 'linear-gradient(90deg, #00F5FF, #0080FF)',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.7)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
        head: {
          fontWeight: 600,
          color: '#E4F0FB',
        },
      },
    },
  },
});

// Mock data for additional stats lists
const recentActivities = [
  { id: 1, title: 'New Order #1234', value: '$435.50', date: '2 hours ago' },
  { id: 2, title: 'Payment Received', value: '$1,200.00', date: '5 hours ago' },
  { id: 3, title: 'New Customer', value: 'John Smith', date: 'Yesterday' },
  { id: 4, title: 'Product Shipped', value: 'Order #1123', date: 'Yesterday' },
];

const topLocations = [
  { id: 1, title: 'New York', value: '32%', growth: '+5%' },
  { id: 2, title: 'Los Angeles', value: '21%', growth: '+2%' },
  { id: 3, title: 'Chicago', value: '15%', growth: '+1.5%' },
  { id: 4, title: 'Houston', value: '11%', growth: '+3%' },
];

function App() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('average');
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleMetricSelect = (metric) => {
    setSelectedMetric(metric);
  };

  const handleDropdownChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  const getFilteredData = () => {
    const daysToShow = timeRange === 'week' ? 7 : timeRange === 'day' ? 1 : 30;
    return salesData.slice(-daysToShow);
  };

  // Updated colors for the metric options
  const metricOptions = [
    { value: 'sales', label: 'Total Sales', icon: <AttachMoneyIcon sx={{ fontSize: 20, color: '#00F5FF' }} />, color: '#00F5FF', displayValue: `$${summaryStats.totalSales.toLocaleString()}` },
    { value: 'orders', label: 'Total Orders', icon: <ShoppingCartIcon sx={{ fontSize: 20, color: '#7B42F6' }} />, color: '#7B42F6', displayValue: summaryStats.totalOrders.toLocaleString() },
    { value: 'customers', label: 'Total Customers', icon: <PeopleIcon sx={{ fontSize: 20, color: '#FF7C48' }} />, color: '#FF7C48', displayValue: summaryStats.totalCustomers.toLocaleString() },
    { value: 'average', label: 'Average Order Value', icon: <TrendingUpIcon sx={{ fontSize: 20, color: '#25D07D' }} />, color: '#25D07D', displayValue: `$${summaryStats.averageOrderValue.toLocaleString()}` },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          px: { xs: 2.5, sm: 3.5, md: 4.5 },
          py: { xs: 2.5, sm: 3.5 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #00F5FF, #7B42F6, #FF7C48)',
            zIndex: 1,
          },
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '1600px', 
            mx: 'auto', 
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: { xs: 2, sm: 3 } }}>
            Sales Dashboard
          </Typography>
          
          {/* Mobile Dropdown Selector */}
          {isMobile && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="metric-select-label">Select Metric</InputLabel>
              <Select
                labelId="metric-select-label"
                id="metric-select"
                value={selectedMetric}
                label="Select Metric"
                onChange={handleDropdownChange}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 245, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00F5FF',
                  },
                }}
              >
                {metricOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          mr: 1,
                          display: 'flex', 
                          p: 0.5,
                          borderRadius: '50%',
                          backgroundColor: `${option.color}20`,
                          boxShadow: `0 0 10px ${option.color}40`,
                        }}>
                          {option.icon}
                        </Box>
                        {option.label}
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {option.displayValue}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          
          {/* Stats Cards - Only visible on non-mobile */}
          {!isMobile && (
            <Grid container spacing={2} sx={{ mb: { xs: 3, sm: 3 } }}>
              <Grid item xs={6} sm={6} lg={3}>
                <StatsCard
                  title="Total Sales"
                  value={`$${summaryStats.totalSales.toLocaleString()}`}
                  icon={<AttachMoneyIcon sx={{ fontSize: 28 }} />}
                  color="#00F5FF"
                  onClick={() => handleMetricSelect('sales')}
                  selected={selectedMetric === 'sales'}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3}>
                <StatsCard
                  title="Total Orders"
                  value={summaryStats.totalOrders.toLocaleString()}
                  icon={<ShoppingCartIcon sx={{ fontSize: 28 }} />}
                  color="#7B42F6"
                  onClick={() => handleMetricSelect('orders')}
                  selected={selectedMetric === 'orders'}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3}>
                <StatsCard
                  title="Total Customers"
                  value={summaryStats.totalCustomers.toLocaleString()}
                  icon={<PeopleIcon sx={{ fontSize: 28 }} />}
                  color="#FF7C48"
                  onClick={() => handleMetricSelect('customers')}
                  selected={selectedMetric === 'customers'}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3}>
                <StatsCard
                  title="Average Order Value"
                  value={`$${summaryStats.averageOrderValue.toLocaleString()}`}
                  icon={<TrendingUpIcon sx={{ fontSize: 28 }} />}
                  color="#25D07D"
                  onClick={() => handleMetricSelect('average')}
                  selected={selectedMetric === 'average'}
                />
              </Grid>
            </Grid>
          )}

          {/* Charts */}
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              width: '100%',
              mb: 3,
              gap: 3
            }}
          >
            <Box sx={{ width: { xs: '100%', md: '50%' }, minHeight: '480px' }}>
              <SalesChart 
                data={getFilteredData()} 
                metric={selectedMetric}
                onTimeRangeChange={setTimeRange}
                timeRange={timeRange}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' }, minHeight: '480px' }}>
              <CategoryChart data={categoryData} />
            </Box>
          </Box>

          {/* Bottom Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}>
            <Box sx={{ flex: 1, height: '100%' }}>
              <TopProducts products={productData} />
            </Box>
            <Box sx={{ flex: 1, height: '100%' }}>
              <StatsList 
                title="Recent Activities" 
                items={recentActivities} 
                primaryKey="title"
                secondaryKey="value"
                metaKey="date"
              />
            </Box>
            <Box sx={{ flex: 1, height: '100%' }}>
              <StatsList 
                title="Top Locations" 
                items={topLocations}
                primaryKey="title"
                secondaryKey="value"
                growthKey="growth"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;