// src/RegisterPage.js
import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Stack, FormErrorMessage, useToast, Flex, Text, Link, Icon } from '@chakra-ui/react';
import axios from 'axios';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import './styles.css';

const Register = () => {
  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissionDisabled, setSubmissionDisabled] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/1'); 
        setFormValues(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        toast({
          title: 'Error',
          description: 'Unable to fetch user data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleChange = (e) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionDisabled(true);
    try {
      await axios.post('http://localhost:8081/api/user/register', formValues); 
      toast({
        title: 'Success',
        description: 'Registration successful.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting registration form:', error);
      toast({
        title: 'Error',
        description: 'Registration failed.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setSubmissionDisabled(false);
  };

  return (
    <Box className="full-page-background" >
      <form onSubmit={handleSubmit}>
        <Flex align={'center'} justify={'center'} p="50px" className="form-container">
          <Stack spacing={6} borderRadius="md" boxShadow="md" p={8}>
            <Stack align={'center'}>
              <Heading color="purple.300" fontSize={'4xl'} textAlign={'center'}>
                SIGN UP
              </Heading>
            </Stack>
            <Box bg="white" borderRadius="md" boxShadow="md" p={8}>
              <Stack spacing={4}>
                <FormControl isInvalid={formValues.firstName === ''}>
                  <FormLabel htmlFor="fullname">Full Name</FormLabel>
                  <Flex align="center">
                    <Input
                      id="fullname"
                      name="fullname"
                      placeholder="Enter your full name"
                      value={formValues.firstName + formValues.lastName}
                      onChange={handleChange}
                      borderColor="#FFB300"
                      _focus={{ borderColor: "#FFB300" }}
                    />
                    <Icon as={FaUser} boxSize={6} ml={4} />
                  </Flex>
                </FormControl>

                <FormControl isInvalid={formValues.email === ''}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Flex align="center">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formValues.email}
                      onChange={handleChange}
                      borderColor="#FFB300"
                      _focus={{ borderColor: "#FFB300" }}
                    />
                    <Icon as={FaEnvelope} boxSize={6} ml={4} />
                  </Flex>
                </FormControl>

                <FormControl isInvalid={formValues.phone === ''}>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formValues.phone}
                    onChange={handleChange}
                    borderColor="#FFB300"
                    _focus={{ borderColor: "#FFB300" }}
                  />
                </FormControl>

                <FormControl isInvalid={formValues.address === ''}>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formValues.address.address + ", " +formValues.address.city + ", " + formValues.address.postalCode}
                    onChange={handleChange}
                    borderColor="#FFB300"
                    _focus={{ borderColor: "#FFB300" }}
                  />
                </FormControl>

                <Stack spacing={6} pt={4}>
                  <Button
                    type="submit"
                    isDisabled={submissionDisabled}
                    colorScheme="purple"
                    size="lg"
                    isLoading={loading}
                    loadingText="Submitting"
                  >
                    SIGN UP
                  </Button>
                </Stack>

                <Stack pt={6} align={'center'}>
                  <Text>
                    Already a user? <Link href="/login" color="rgb(255,189,89)" fontWeight="600">Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};

export default Register;
