import React from 'react';
import { VStack, HStack, Button, Box, Text, Divider, useBreakpointValue } from '@chakra-ui/react';

const Review = ({ formData, prevStep, handleSubmit }) => {
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <VStack spacing={6} align="stretch">
      <Box borderWidth="1px" borderRadius="md" p={6} boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Review Your Information
        </Text>
        <Divider mb={4} />
        <VStack spacing={3} align="start">
          {Object.entries(formData).map(([key, value]) => (
            <HStack key={key} spacing={3} width="full">
              <Text fontWeight="bold" width="150px" fontSize={fontSize}>
                {formatLabel(key)}:
              </Text>
              <Text fontSize={fontSize}>{value || 'N/A'}</Text>
            </HStack>
          ))}
        </VStack>
      </Box> 
    </VStack>
  );
};

const formatLabel = (key) => {
  switch (key) {
    case 'loanType':
      return 'Loan Type';
    case 'principal':
      return 'Principal';
    case 'term':
      return 'Term (in years)';
    case 'businessName':
      return 'Business Name';
    case 'businessEmail':
      return 'Business Email';
    case 'businessId':
      return 'Business ID';
    case 'DOE':
      return 'Date of Establishment';
    case 'businessPhoneNumber':
      return 'Business Phone Number';
    case 'businessStructure':
      return 'Business Structure';
    case 'postalCode':
      return 'Postal Code';
    case 'houseNumber':
      return 'House Number';
    case 'street':
      return 'Street';
    case 'country':
      return 'Country';
    case 'yearsLived':
      return 'Number of Years Lived';
    case 'annualTurnover':
      return 'Annual Turnover';
    case 'netProfit':
      return 'Net Profit';
    case 'existingDebtAmount':
      return 'Existing Debt Amount';
    case 'creditScore':
      return 'Credit Score';
    default:
      return key.replace(/([A-Z])/g, ' $1').trim();
  }
};

export default Review;
