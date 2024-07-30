import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useToast,
  Icon,
  Text,
  Center,
  extendTheme,
  ChakraProvider,
} from '@chakra-ui/react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import { BUSINESS_ID } from '../../constants' 

const natwestTheme = extendTheme({
  colors: {
    primary: {
      500: '#6D28D9', 
    },
    secondary: {
      500: '#E3D6E3', 
    },
    cardBg: '#F7F7F7', 
  },
  components: {
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
          _active: {
            bg: 'primary.700',
          },
        },
      },
    },
    FormControl: {
      baseStyle: {
        mb: 4,
      },
    },
  },
});

const Register = () => {
  const [formValues, setFormValues] = useState({
    businessId: 0.0,
    businessName: '',
    businessEmail: '',
    contact: '',
    founderName: '',
    legalStructure: '',
    revenue: '',
    platformId: 1,
    houseNo: '',
    country: '',
    postalCode: '',
    yearsOfLiving: '',
    DOB: ''
  });
  const [loading, setLoading] = useState(false);
  const [submissionDisabled, setSubmissionDisabled] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${BUSINESS_ID}`);

        const apiData = response.data;

        const formatDate = (date) => {
            if (!date) return '';
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };

        const formattedDate = formatDate(new Date(apiData.birthDate))

        setFormValues({
          businessId: apiData.id || 0,
          businessName: apiData.company.name || '',
          businessEmail: apiData.email || '',
          contact: '+918277113655',
          founderName: apiData.firstName + ' ' + apiData.lastName || '',
          legalStructure: '',
          revenue: '',
          platformId: 1,
          houseNo: apiData.company.address.address || '',
          country: apiData.company.address.country || '',
          postalCode: apiData.company.address.postalCode || '',
          yearsOfLiving: '',
          DOB: String(formattedDate) || ''
        });

      } catch (error) {
        console.error('Error fetching user data:', error);
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
    setLoading(true);
    try {
      await axios.post('http://localhost:8081/api/user/register', formValues);
      toast({
        title: 'Success',
        description: 'Registration successful.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      const response = await axios.get(`http://localhost:8081/api/user/${BUSINESS_ID}`); 
      const userID = response.data.id;

      localStorage.setItem('userID', userID);
      window.location.href = 'http://localhost:3000/login';
    } catch (error) {
        if (error.response) {
            
            const status = error.response.status;

            if (status === 409) {
              // Conflict error
              toast({
                title: 'Error',
                description: 'A user with this businessId already exists.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } else if (status === 400) {
              // Bad Request 
              toast({
                title: 'Error',
                description: 'There was a problem with your submission. Please check your input and try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } else {
              toast({
                title: 'Error',
                description: 'Registration failed. Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            }
    }}
    setSubmissionDisabled(false);
    setLoading(false);
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
        <Flex
          as="form"
          direction="column"
          align={'center'}
          justify={'center'}
          p="4"
          maxWidth="md"
          mx="auto"
          bg="cardBg" 
          borderRadius="lg"
          boxShadow="lg"
          position="relative"
          zIndex="1"
          onSubmit={handleSubmit}
        >
          <Stack spacing={6} p={8} width="full">
            <Stack align={'center'}>
              <Heading color="primary.500" fontSize={'3xl'} textAlign={'center'}>
                BUSINESS REGISTRATION
              </Heading>
            </Stack>

            <Stack spacing={4} width="full">
              <FormControl isInvalid={formValues.businessName === ''}>
                <FormLabel htmlFor="businessName">Business Name</FormLabel>
                <Flex align="center">
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Enter business name"
                    value={formValues.businessName}
                    onChange={handleChange}
                    borderColor="primary.500"
                    _focus={{ borderColor: 'primary.500' }}
                  />
                  <Icon as={FaBuilding} boxSize={6} ml={4} color="primary.500" />
                </Flex>
              </FormControl>

              <FormControl isInvalid={formValues.businessEmail === ''}>
                <FormLabel htmlFor="businessEmail">Business Email</FormLabel>
                <Flex align="center">
                  <Input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    placeholder="Enter business email address"
                    value={formValues.businessEmail}
                    onChange={handleChange}
                    borderColor="primary.500"
                    _focus={{ borderColor: 'primary.500' }}
                  />
                  <Icon as={FaEnvelope} boxSize={6} ml={4} color="primary.500" />
                </Flex>
              </FormControl>

              <FormControl isInvalid={formValues.contact === ''}>
                <FormLabel htmlFor="contact">Contact Number</FormLabel>
                <Flex align="center">
                  <Input
                    id="contact"
                    name="contact"
                    placeholder="Enter contact number"
                    value={formValues.contact}
                    onChange={handleChange}
                    borderColor="primary.500"
                    _focus={{ borderColor: 'primary.500' }}
                  />
                  <Icon as={FaPhone} boxSize={6} ml={4} color="primary.500" />
                </Flex>
              </FormControl>

              <FormControl isInvalid={formValues.founderName === ''}>
                <FormLabel htmlFor="founderName">Founder Name</FormLabel>
                <Flex align="center">
                  <Input
                    id="founderName"
                    name="founderName"
                    placeholder="Enter founder's name"
                    value={formValues.founderName}
                    onChange={handleChange}
                    borderColor="primary.500"
                    _focus={{ borderColor: 'primary.500' }}
                  />
                  <Icon as={FaUser} boxSize={6} ml={4} color="primary.500" />
                </Flex>
              </FormControl>

              <FormControl isInvalid={formValues.legalStructure === ''}>
                <FormLabel htmlFor="legalStructure">Legal Structure</FormLabel>
                <Input
                  id="legalStructure"
                  name="legalStructure"
                  placeholder="Enter legal structure"
                  value={formValues.legalStructure}
                  onChange={handleChange}
                  borderColor="primary.500"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isInvalid={formValues.revenue === ''}>
                <FormLabel htmlFor="revenue">Revenue</FormLabel>
                <Input
                  id="revenue"
                  name="revenue"
                  placeholder="Enter revenue"
                  value={formValues.revenue}
                  onChange={handleChange}
                  borderColor="primary.500"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isInvalid={formValues.DOB === ''}>
                <FormLabel htmlFor="DOB">Date of Establishment</FormLabel>
                <Input
                    id="DOB"
                    name="DOB"
                    type="date"
                    placeholder="Select date of establishment"
                    value={formValues.DOB}
                    onChange={handleChange}
                    borderColor="primary.500"
                    _focus={{ borderColor: 'primary.500' }}
                />
                </FormControl>


              {/* Address Fields */}
              <FormControl isInvalid={formValues.houseNo === ''}>
                <FormLabel htmlFor="houseNo">House Number</FormLabel>
                <Input
                  id="houseNo"
                  name="houseNo"
                  placeholder="Enter house number"
                  value={formValues.houseNo}
                  onChange={handleChange}
                  borderColor="primary.500"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isInvalid={formValues.country === ''}>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Input
                  id="country"
                  name="country"
                  placeholder="Enter country"
                  value={formValues.country}
                  onChange={handleChange}
                  borderColor="primary.500"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isInvalid={formValues.postalCode === ''}>
                <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="Enter postal code"
                  value={formValues.postalCode}
                  onChange={handleChange}
                  borderColor="primary.500"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <FormControl isInvalid={formValues.yearsOfLiving === ''}>
                <FormLabel htmlFor="yearsOfLiving">Years</FormLabel>
                <Input
                  id="yearsOfLiving"
                  name="yearsOfLiving"
                  placeholder="Enter years of living"
                  value={formValues.yearsOfLiving}
                  onChange={handleChange}
                  borderColor="primary.500"
                  _focus={{ borderColor: 'primary.500' }}
                />
              </FormControl>

              <Stack spacing={6} pt={4} width="full">
                <Button
                  type="submit"
                  isDisabled={submissionDisabled}
                  size="lg"
                  isLoading={loading}
                  loadingText="Submitting"
                  bg="primary.500"
                  _hover={{ bg: '#5a1d9f' }}
                  _active={{ bg: '#4a137c' }}
                >
                  REGISTER
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Register;
