import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast, VStack, Heading, Center, Divider } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const Payment = () => {
  const [dueAmount, setDueAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const toast = useToast();

  useEffect(() => {
    const loanId = localStorage.getItem('loanId');
    axios.get(`http://localhost:8082/api/payments/${loanId}`)
      .then(response => {
        setDueAmount(response.data);
        setPaymentAmount(response.data);
      })
      .catch(error => {
        console.error('Error fetching due amount:', error);
        toast({
          title: 'Error fetching due amount.',
          description: 'There was an issue fetching the due amount. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);


  const handlePayment = () => {
    const loanId = localStorage.getItem('loanId');
    const userId = localStorage.getItem('userId');
    const date = new Date().toISOString().split('T')[0];

    axios.post(`http://localhost:8082/api/payments?payerId=${userId}
                                                 &payeeId=1
                                                 &loanId=${loanId}
                                                 &dateOfTransaction=${date}
                                                 &amount=${paymentAmount}
                                                 &status=paid
                                                 &transactionType=1`)
      .then(() => {
        toast({
          title: 'Payment Successful',
          description: `You have successfully paid £ ${paymentAmount}.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        window.location.href = 'http://localhost:3000/yourloans'
      })
      .catch(error => {
        console.error('Error processing payment:', error);
        toast({
          title: 'Payment Failed',
          description: 'There was an issue processing your payment. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Navbar />
      <main>
        <Center h="100vh" bg="gray.100">
          <Box p={6} maxW="md" borderWidth={1} borderRadius="md" boxShadow="md" bg="white">
            <VStack spacing={4} align="stretch">
              <Heading size="lg" color="#5a287d" textAlign="center">Loan Installment Payment</Heading>
              <Stack spacing={4}>
                <FormControl id="amount" isRequired>
                  <FormLabel>Due Amount</FormLabel>
                  <Input type="text" value={`£ ${dueAmount.toFixed(2)}`} readOnly />
                </FormControl>
                <FormControl id="payment" isRequired>
                  <FormLabel>Payment Amount</FormLabel>
                  <Input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                    placeholder="Enter payment amount"
                  />
                </FormControl>
                <Divider />
                <FormControl id="cardNumber" isRequired>
                  <FormLabel>Card Number</FormLabel>
                  <Input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </FormControl>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                  <FormControl id="cardExpiry" isRequired>
                    <FormLabel>Expiry Date</FormLabel>
                    <Input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                    />
                  </FormControl>
                  <FormControl id="cardCVV" isRequired>
                    <FormLabel>CVV</FormLabel>
                    <Input
                      type="text"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      placeholder="123"
                    />
                  </FormControl>
                </Stack>
                <Button
                  colorScheme="purple"
                  onClick={handlePayment}
                  isDisabled={paymentAmount <= 0 || paymentAmount > dueAmount || !cardNumber || !cardExpiry || !cardCVV}
                >
                  Pay Now
                </Button>
              </Stack>
            </VStack>
          </Box>
        </Center>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
