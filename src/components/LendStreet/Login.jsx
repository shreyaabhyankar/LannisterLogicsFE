import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Input, Text, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
    
  const [phoneNumber, setPhoneNumber] = useState('+918277113655');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const toast = useToast();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { phoneNumber });
      setOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: `OTP has been sent to ${phoneNumber}`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
        console.log(error)
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/verify-otp', { phoneNumber, otp });
      toast({
        title: 'OTP Verified',
        description: 'OTP is correct!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      window.location.href = 'http://localhost:3000/home';
    } catch (error) {
      toast({
        title: 'Verification Failed',
        description: error.response?.data?.error || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" py={5}>
      <Stack spacing={4}>
        <Box>
          <Text fontSize="xl" mb={4}>Enter Phone Number</Text>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
          />
          <Button mt={4} colorScheme="blue" onClick={handleSendOtp} disabled={otpSent}>
            Send OTP
          </Button>
        </Box>
        {otpSent && (
          <Box>
            <Text fontSize="xl" mb={4}>Enter OTP</Text>
            <Input
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
            />
            <Button mt={4} colorScheme="green" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </Box>
        )}
      </Stack>
    </Container>
  );
}

export default Login;