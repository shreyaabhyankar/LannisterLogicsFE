import React, { useState, useEffect } from 'react';
import { VStack, HStack, FormControl, FormLabel, Input, Button, Box, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';
import { BUSINESS_ID } from '../../../constants';
const BusinessInformation = ({ formData, setFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    axios.get(`http://localhost:8081/api/user/${BUSINESS_ID}`)
      .then(response => {
        setFormData({
          ...formData,
          businessName: response.data.businessName,
          businessEmail: response.data.businessEmail,
          businessId: response.data.businessId,
          businessPhoneNumber: response.data.contact,
          businessStructure: response.data.legalStructure
        });
      })
      .catch(error => {
        console.error("There was an error fetching the business info!", error);
      });
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = 'This field is required';
    } else if (name === 'businessEmail' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address';
    }
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="businessName" isInvalid={errors.businessName}>
        <FormLabel>Business Name</FormLabel>
        <Input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.businessName}</FormErrorMessage>
      </FormControl>
      <FormControl id="businessEmail" isInvalid={errors.businessEmail}>
        <FormLabel>Business Email</FormLabel>
        <Input
          type="email"
          name="businessEmail"
          value={formData.businessEmail}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.businessEmail}</FormErrorMessage>
      </FormControl>
      <FormControl id="businessId" isInvalid={errors.businessId}>
        <FormLabel>Business ID</FormLabel>
        <Input
          type="text"
          name="businessId"
          value={formData.businessId}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.businessId}</FormErrorMessage>
      </FormControl>
      <FormControl id="businessPhoneNumber" isInvalid={errors.businessPhoneNumber}>
        <FormLabel>Business Phone Number</FormLabel>
        <Input
          type="tel"
          name="businessPhoneNumber"
          value={formData.businessPhoneNumber}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.businessPhoneNumber}</FormErrorMessage>
      </FormControl>
      <FormControl id="businessStructure" isInvalid={errors.businessStructure}>
        <FormLabel>Business Structure</FormLabel>
        <Input
          type="text"
          name="businessStructure"
          value={formData.businessStructure}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.businessStructure}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default BusinessInformation;
