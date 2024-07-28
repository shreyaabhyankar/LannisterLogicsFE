import React from 'react';
import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import './styles.css';
import logo from './Swiggy-Logo.png'; 

const Navbar = () => {
  return (
    <Box as="header" className="header">
      <Flex align="center">
        <Image src={logo} alt="Brand Logo" className="logo" />
        <Flex className="nav-links" ml="auto">
          <Link href="#">Home</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
