import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

const LoanSummary = () => {
  const [loanData, setLoanData] = useState([]);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const [averageInterest, setAverageInterest] = useState(0);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const userId = localStorage.getItem('userID');
        const response = await axios.get(`http://localhost:8082/api/loan/${userId}`);
        const data = response.data;

        setLoanData(data);

        // Calculate total principal and average interest rate
        const total = data.reduce((sum, loan) => sum + loan.outstandingPrincipal, 0);
        const average = data.reduce((sum, loan) => sum + loan.interest, 0) / data.length;

        setTotalPrincipal(total);
        setAverageInterest(average);
        console.log(averageInterest)
      } catch (error) {
        console.error('Error fetching loan data', error);
      }
    };

    fetchLoanData();
  }, []);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>Loan Summary</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box p={4} borderWidth={1} borderRadius="md" bg="white">
          <Heading size="sm" mb={2}>Total Outstanding Principal</Heading>
          <Text>£ {totalPrincipal.toFixed(2)}</Text>
        </Box>
        <Box p={4} borderWidth={1} borderRadius="md" bg="white">
          <Heading size="sm" mb={2}>Average Interest Rate</Heading>
          <Text>
            {isNaN(averageInterest) || averageInterest === 0 ? '0.00%' : averageInterest.toFixed(2) + '%'}
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default LoanSummary;
