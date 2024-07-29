import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button, Stack, useToast, Icon, Text, Link } from '@chakra-ui/react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import './styles.css';

const natwestPurple = '#6D28D9'; 

const Register = () => {
  const [formValues, setFormValues] = useState({
    businessId: 0.0,
    businessName: '',
    businessEmail: '',
    contact: '',
    founderName: '',
    legalStructure: '',
    noOfDirectors: '',
    revenue: '',
    platformId: 1,
    houseNo: '',
    country:'',
    postalCode:'',
    yearsOfLiving:''
  });
  const [loading, setLoading] = useState(false);
  const [submissionDisabled, setSubmissionDisabled] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/2'); 

        const apiData = response.data;

        setFormValues({
          businessId: apiData.id || 0, 
          businessName: apiData.company.name || '',
          businessEmail: apiData.email || '',
          contact: '+918277113655',
          founderName: apiData.firstName + ' ' + apiData.lastName || '', 
          legalStructure: '', 
          noOfDirectors: '', 
          revenue: '', 
          platformId: 1,
          houseNo: apiData.company.address.address || '',
          country:apiData.company.address.country || '',
          postalCode: apiData.company.address.postalCode || '',
          yearsOfLiving:''
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
    setLoading(false);
  };

  return (
    <Box className="full-page-background" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" align={'center'} justify={'center'} p="4" maxWidth="md" mx="auto" bg="white" borderRadius="md" boxShadow="md">
          <Stack spacing={6} p={8} width="full">
            <Stack align={'center'}>
              <Heading color={natwestPurple} fontSize={'4xl'} textAlign={'center'}>
                BUSINESS REGISTRATION
              </Heading>
            </Stack>

            <Stack spacing={4}>
              <FormControl isInvalid={formValues.businessName === ''}>
                <FormLabel htmlFor="businessName">Business Name</FormLabel>
                <Flex align="center">
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Enter business name"
                    value={formValues.businessName}
                    onChange={handleChange}
                    borderColor={natwestPurple}
                    _focus={{ borderColor: natwestPurple }}
                  />
                  <Icon as={FaBuilding} boxSize={6} ml={4} color={natwestPurple} />
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
                    borderColor={natwestPurple}
                    _focus={{ borderColor: natwestPurple }}
                  />
                  <Icon as={FaEnvelope} boxSize={6} ml={4} color={natwestPurple} />
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
                    borderColor={natwestPurple}
                    _focus={{ borderColor: natwestPurple }}
                  />
                  <Icon as={FaPhone} boxSize={6} ml={4} color={natwestPurple} />
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
                    borderColor={natwestPurple}
                    _focus={{ borderColor: natwestPurple }}
                  />
                  <Icon as={FaUser} boxSize={6} ml={4} color={natwestPurple} />
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
                  borderColor={natwestPurple}
                  _focus={{ borderColor: natwestPurple }}
                />
              </FormControl>

              <FormControl isInvalid={formValues.noOfDirectors === ''}>
                <FormLabel htmlFor="noOfDirectors">Number of Directors</FormLabel>
                <Input
                  id="noOfDirectors"
                  name="noOfDirectors"
                  placeholder="Enter number of directors"
                  value={formValues.noOfDirectors}
                  onChange={handleChange}
                  borderColor={natwestPurple}
                  _focus={{ borderColor: natwestPurple }}
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
                  borderColor={natwestPurple}
                  _focus={{ borderColor: natwestPurple }}
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
                  borderColor={natwestPurple}
                  _focus={{ borderColor: natwestPurple }}
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
                  borderColor={natwestPurple}
                  _focus={{ borderColor: natwestPurple }}
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
                  borderColor={natwestPurple}
                  _focus={{ borderColor: natwestPurple }}
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
                  borderColor={natwestPurple}
                  _focus={{ borderColor: natwestPurple }}
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
                  bg={natwestPurple}
                  _hover={{ bg: '#5a1d9f' }} // Slightly darker purple on hover
                  _active={{ bg: '#4a137c' }} // Even darker purple on click
                >
                  REGISTER
                </Button>
              </Stack>

              <Stack pt={6} align={'center'}>
                <Text>
                  Already registered? <Link href="/login" color={natwestPurple} fontWeight="600">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};

export default Register;
