import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  Input,
  Text,
  Stack,
  useToast,
  extendTheme,
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const natwestTheme = extendTheme({
  colors: {
    primary: {
      500: '#7A2E7A',  
    },
    secondary: {
      500: '#E3D6E3',  
    },
    cardBg: '#F7F7F7', 
  },
  components: {
    Card: {
      baseStyle: {
        borderRadius: 'lg',
        boxShadow: 'lg',
        bg: 'cardBg', 
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
      },
    },
  },
});

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('+918277113655');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/home');
    }
  }, [navigate]);

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
      console.log(error);
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
      localStorage.setItem('isLoggedIn', 'true');
      toast({
        title: 'OTP Verified',
        description: 'OTP is correct!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/home');
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
    <ChakraProvider theme={natwestTheme}>
      <Box
        bgGradient="linear(to-r, #a4508b, #5f0a87)"  
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        py={10}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.3)"  
        />
        <Container maxW="md" position="relative" zIndex="1">
          <Card>
            <CardHeader>
              <Center>
                <Text fontSize="4xl" fontWeight="bold" color="primary.500">Login</Text>
              </Center>
            </CardHeader>
            <CardBody>
              <Stack spacing={4}>
                <Box>
                  <Text fontSize="lg" mb={4}>Enter Phone Number</Text>
                  <Input
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                  />
                </Box>
                <Center>
                  <Button
                    mt={4}
                    variant="solid"
                    onClick={handleSendOtp}
                    disabled={otpSent}
                  >
                    Send OTP
                  </Button>
                </Center>
                {otpSent && (
                  <Box>
                    <Text fontSize="lg" mb={4}>Enter OTP</Text>
                    <Input
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      type="text"
                    />
                    <Center>
                      <Button
                        mt={4}
                        variant="solid"
                        onClick={handleVerifyOtp}
                      >
                        Verify OTP
                      </Button>
                    </Center>
                  </Box>
                )}
              </Stack>
            </CardBody>
          </Card>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
