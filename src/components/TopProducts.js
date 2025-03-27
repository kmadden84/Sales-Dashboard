import React from 'react';
import { Card, CardContent, Typography, Box, Divider, alpha } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const TopProducts = ({ products }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 2, pb: 0, flexGrow: 0 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            color: '#00F5FF',
            textShadow: '0 0 8px rgba(0, 245, 255, 0.4)',
            letterSpacing: '0.02em',
          }}
        >
          Top Products
        </Typography>
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 100px 80px',
            gap: 1,
            mb: 1,
            px: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
            Product
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600} align="right" sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
            Sales
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600} align="right" sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
            Growth
          </Typography>
        </Box>
      </CardContent>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
      <Box sx={{ overflow: 'auto', flexGrow: 1, "&::-webkit-scrollbar": { width: 6 }, "&::-webkit-scrollbar-thumb": { background: 'rgba(255, 255, 255, 0.1)', borderRadius: 3 } }}>
        {products.map((product, index) => (
          <React.Fragment key={index}>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 100px 80px',
                gap: 1,
                p: 2,
                alignItems: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(0, 245, 255, 0.03)',
                  boxShadow: 'inset 0 0 15px rgba(0, 245, 255, 0.03)'
                }
              }}
            >
              <Typography variant="body2" noWrap fontWeight={500} sx={{ color: '#E4F0FB' }}>
                {product.name}
              </Typography>
              <Typography variant="body2" align="right" fontWeight={600} sx={{ color: '#00F5FF' }}>
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
                    color: '#25D07D', 
                    fontSize: 16,
                    mr: 0.5,
                    filter: 'drop-shadow(0 0 3px rgba(37, 208, 125, 0.5))'
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#25D07D',
                    fontWeight: 600,
                    textShadow: '0 0 5px rgba(37, 208, 125, 0.4)'
                  }}
                >
                  {product.growth}%
                </Typography>
              </Box>
            </Box>
            {index < products.length - 1 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Card>
  );
};

export default TopProducts; 