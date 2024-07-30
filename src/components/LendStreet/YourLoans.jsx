import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const YourLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const userId = localStorage.getItem('userID');
        if (!userId) throw new Error('User ID not found in local storage');

        const response = await axios.get(`http://localhost:8082/api/loan/${userId}`);
        setLoans(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handlePay = (loanId) => {
    localStorage.setItem('loanId', loanId);
    window.location.href = 'http://localhost:3000/payment'; // Redirect to payment page
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <>
      <Navbar />
      <main>
        <VStack spacing={4} align="start" p={4}>
          <Text fontSize="2xl" fontWeight="bold">Your Loans</Text>
          <Box w="full" overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Date of Application</Th>
                  <Th>Interest</Th>
                  <Th>Loan Type</Th>
                  <Th>Outstanding Principal</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loans.map((loan, index) => (
                  <Tr key={loan.id}>
                    <Td>{index + 1}</Td>
                    <Td>{new Date(loan.dateOfApplication).toLocaleDateString()}</Td>
                    <Td>{loan.interest}%</Td>
                    <Td>{loan.loanType}</Td>
                    <Td>£ {loan.outstandingPrincipal.toFixed(2)}</Td>
                    <Td>{loan.status}</Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() => handlePay(loan.id)}
                        isDisabled={loan.outstandingPrincipal <= 0} // Disable if outstandingPrincipal is 0 or less
                      >
                        Pay
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </main>
      <Footer />
    </>
  );
};

export default YourLoans;
