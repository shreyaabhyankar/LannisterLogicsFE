import React from 'react';
import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import Navbar from './PlatformNavbar';
import Footer from './Footer';
import './styles.css';
import axios from 'axios';

const StartUp = () => {

    const onClickHandler = () => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8081/api/user/1'); 
          console.log(response.data)
          if(response.data) {
            window.location.href = 'http://localhost:3000/login';
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          window.location.href = 'http://localhost:3000/register';
        }
      };
      fetchData();
    };

  return (
    <Box id="root">
      <Navbar />
      <Box className="content">
        <Container>
          <Box className="card">
            <Heading size="lg" className="card-title">Fuel Your Business Growth with Swiggy and LendStreet!</Heading>
            <Text className="card-description">
              Need funds to expand or upgrade your kitchen? <br/>
              Apply for a hassle-free loan through Swiggy, powered by LendStreet, and watch your business thrive!
            </Text>
            <Button className="card-button" onClick={onClickHandler}>Get a loan</Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default StartUp;
