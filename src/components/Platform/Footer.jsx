import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import './styles.css';

const Footer = () => {
  return (
    <Box as="footer" className="footer">
      <p>© {new Date().getFullYear()} Swiggy India. All rights reserved.</p>
      <div>
        <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link>
        <span> | </span>
        <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</Link>
      </div>
    </Box>
  );
};

export default Footer;
