import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const TopProducts = ({ products }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2, pb: 0, flexGrow: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Top Products
        </Typography>
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 100px 80px',
            gap: 1,
            mb: 1
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Product
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500} align="right">
            Sales
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500} align="right">
            Growth
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        {products.map((product, index) => (
          <React.Fragment key={index}>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 100px 80px',
                gap: 1,
                p: 2,
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" noWrap fontWeight={500}>
                {product.name}
              </Typography>
              <Typography variant="body2" align="right" fontWeight={500}>
                ${product.sales.toLocaleString()}
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <TrendingUpIcon 
                  sx={{ 
                    color: 'success.main', 
                    fontSize: 16,
                    mr: 0.5
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'success.main',
                    fontWeight: 500
                  }}
                >
                  {product.growth}%
                </Typography>
              </Box>
            </Box>
            {index < products.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Card>
  );
};

export default TopProducts; 