import { subDays, format } from 'date-fns';

// Generate dates for the last 30 days
const generateDates = () => {
  const dates = [];
  for (let i = 29; i >= 0; i--) {
    dates.push(subDays(new Date(), i));
  }
  return dates;
};

const dates = generateDates();

// Generate random sales data
const generateSalesData = () => {
  return dates.map(date => {
    const sales = Math.floor(Math.random() * 10000) + 5000;
    const orders = Math.floor(Math.random() * 100) + 50;
    const customers = Math.floor(Math.random() * 50) + 20;
    const average = Math.round(sales / orders);
    
    return {
      date: format(date, 'MMM dd'),
      sales: sales,
      orders: orders,
      customers: customers,
      average: average
    };
  });
};

// Generate product category data
const productCategories = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Books', value: 20 },
  { name: 'Home & Garden', value: 15 },
  { name: 'Sports', value: 5 },
];

// Generate top products
const topProducts = [
  { name: 'Wireless Headphones', sales: 12500, growth: 12.5 },
  { name: 'Smart Watch', sales: 9800, growth: 8.2 },
  { name: 'Laptop', sales: 8500, growth: 5.7 },
  { name: 'Tablet', sales: 7200, growth: 3.1 },
  { name: 'Camera', sales: 6500, growth: 2.8 },
];

export const salesData = generateSalesData();
export const categoryData = productCategories;
export const productData = topProducts;

// Summary statistics
export const summaryStats = {
  totalSales: salesData.reduce((acc, curr) => acc + curr.sales, 0),
  totalOrders: salesData.reduce((acc, curr) => acc + curr.orders, 0),
  totalCustomers: salesData.reduce((acc, curr) => acc + curr.customers, 0),
  averageOrderValue: Math.round(salesData.reduce((acc, curr) => acc + curr.sales, 0) / salesData.reduce((acc, curr) => acc + curr.orders, 0)),
}; 