import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        py: 2,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; STOCK EASY
      </Typography>
    </Box>
  );
}

export default Footer;
