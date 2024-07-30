import React from 'react';
import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import Navbar from './PlatformNavbar';
import Footer from './Footer';
import './styles.css';
import axios from 'axios';
import { BUSINESS_ID } from '../../constants' 

const StartUp = () => {

    const onClickHandler = () => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/user/${BUSINESS_ID}`); 
          
          if(response.data) {
            const userID = response.data.id;

            localStorage.setItem('userID', userID);
            window.location.href = 'http://localhost:3000/login';
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.setItem('userID', null);
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
