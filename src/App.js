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
  useMediaQuery
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

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      background: 'linear-gradient(45deg, #2196f3, #1976d2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
    }
  },
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
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
  const [selectedMetric, setSelectedMetric] = useState('sales');
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

  const metricOptions = [
    { value: 'sales', label: 'Total Sales', icon: <AttachMoneyIcon sx={{ fontSize: 20, color: '#2196f3' }} />, color: '#2196f3', displayValue: `$${summaryStats.totalSales.toLocaleString()}` },
    { value: 'orders', label: 'Total Orders', icon: <ShoppingCartIcon sx={{ fontSize: 20, color: '#4caf50' }} />, color: '#4caf50', displayValue: summaryStats.totalOrders.toLocaleString() },
    { value: 'customers', label: 'Total Customers', icon: <PeopleIcon sx={{ fontSize: 20, color: '#ff9800' }} />, color: '#ff9800', displayValue: summaryStats.totalCustomers.toLocaleString() },
    { value: 'average', label: 'Average Order Value', icon: <TrendingUpIcon sx={{ fontSize: 20, color: '#9c27b0' }} />, color: '#9c27b0', displayValue: `$${summaryStats.averageOrderValue.toLocaleString()}` },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          backgroundColor: 'background.default',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 }
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '1600px', 
            mx: 'auto', 
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
                          backgroundColor: `${option.color}20`
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
                  color="#2196f3"
                  onClick={() => handleMetricSelect('sales')}
                  selected={selectedMetric === 'sales'}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3}>
                <StatsCard
                  title="Total Orders"
                  value={summaryStats.totalOrders.toLocaleString()}
                  icon={<ShoppingCartIcon sx={{ fontSize: 28 }} />}
                  color="#4caf50"
                  onClick={() => handleMetricSelect('orders')}
                  selected={selectedMetric === 'orders'}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3}>
                <StatsCard
                  title="Total Customers"
                  value={summaryStats.totalCustomers.toLocaleString()}
                  icon={<PeopleIcon sx={{ fontSize: 28 }} />}
                  color="#ff9800"
                  onClick={() => handleMetricSelect('customers')}
                  selected={selectedMetric === 'customers'}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={3}>
                <StatsCard
                  title="Average Order Value"
                  value={`$${summaryStats.averageOrderValue.toLocaleString()}`}
                  icon={<TrendingUpIcon sx={{ fontSize: 28 }} />}
                  color="#9c27b0"
                  onClick={() => handleMetricSelect('average')}
                  selected={selectedMetric === 'average'}
                />
              </Grid>
            </Grid>
          )}

          {/* Charts */}
          <Grid container spacing={2} sx={{ mb: { xs: 2, sm: 3 } }}>
            <Grid item xs={12} md={6}>
              <SalesChart 
                data={getFilteredData()} 
                metric={selectedMetric}
                onTimeRangeChange={setTimeRange}
                timeRange={timeRange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CategoryChart data={categoryData} />
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
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
