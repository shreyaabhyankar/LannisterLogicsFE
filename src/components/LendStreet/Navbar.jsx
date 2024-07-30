import React from 'react';
import { Box, Button, Flex, Text, useToast, useNavigate } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const themeColors = {
  primary: '#7A2E7A', 
  secondary: '#E3D6E3', 
  accent: '#5C1A5C',  
};

const Navbar = () => {
  const toast = useToast();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    window.location.href = 'http://localhost:3000/login';
  };
return(
  <Flex
  as="nav"
  bg='#7A2E7A' 
  color="#FFFFFF"
  p={4}
  align="center"
  justify="space-between"
  boxShadow="lg"
>
  <Flex align="center">
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        ml={2}
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
      >
        LendStreet
      </Text>
    </motion.div>
  </Flex>
  
  <Flex align="center" ml={4} spacing={4} fontSize="lg">
    <NavLink
      to="/yourloans"
      style={({ isActive }) => ({
        color: isActive ? themeColors.accent : 'white', 
        textDecoration: 'none',
        marginRight: '30px', 
        fontSize: 'lg', 
      })}
    >
      Your Loans
    </NavLink>
    <NavLink
      to="/apply"
      style={({ isActive }) => ({
        color: isActive ? themeColors.accent : 'white', 
        textDecoration: 'none',
        fontSize: 'lg', 
      })}
    >
      Apply for Loan
    </NavLink>
  </Flex>

  <Button
    bg='#E3D6E3'
    color="#7A2E7A"
    _hover={{ bg: themeColors.accent }}
    _active={{ bg: '#4A1B4A' }} 
    borderRadius="md"
    boxShadow="md" 
    transition="all 0.3s ease"
    onClick={handleLogout}
  >
    Logout
  </Button>
</Flex>
  );
};

export default Navbar;
