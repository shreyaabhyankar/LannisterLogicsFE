import React, { useState } from 'react';
import { ChakraProvider, Text, Container, Box, Button, Heading, VStack, HStack, Progress, theme } from '@chakra-ui/react';
import ProductSelection from './ProductSelection';
import BusinessInformation from './BusinessInformation';
import AddressHistory from './AddressHistory';
import FinancialInformation from './FinancialInformation'; 
import Review from './Review';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
const steps = ['Product Selection', 'Business Information', 'Financial Information', 'Address History', 'Review'];

const LoanApplicationForm = () => {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [formData, setFormData] = useState({
    loanType: '',
    principal: '',
    term: '',
    businessName: '',
    businessEmail: '',
    businessId: '',
    businessPhoneNumber: '',
    businessStructure: '',
    postalCode: '',
    houseNo: '',
    country: '',
    yearsLived: '',
    annualTurnover: '',
    netProfit: '',
    existingDebtAmount: '',
    creditScore: ''
  });

  const nextStep = () => {
    setCompletedSteps(new Set([...completedSteps, step]));
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleExit = () => {
    window.location.href = 'http://localhost:3000/home';
  }

  const handleSubmit = () => {

    const {
        loanType,
        principal, 
        term, 
        businessName,
        businessEmail,
        businessId,
        businessPhoneNumber,
        businessStructure,
        postalCode,
        houseNumber,
        street,
        country,
        yearsLived,
        annualTurnover,
        netProfit,
        existingDebtAmount,
        creditScore
    } = formData;

    const currentDate = new Date().toISOString().split('T')[0];

    const loanData = {
        loanType: loanType,
        termYear: Number(term),
        initialPrincipal: Number(principal),
        outstandingPrincipal: Number(principal), 
        interest: loanType === "Expansion Loan" ? 10 : 12, 
        interestAmount: 0,
        outStandingTerm: Number(term), 
        dateOfApplication: currentDate, 
        user: { id: localStorage.getItem("userID") }, 
        platform: 1, 
        existingBorrowing: existingDebtAmount > 0, 
        existingBorrowingAmount: existingDebtAmount,
        status: 'Pending', 
        netProfit: netProfit,
        businessCreditScore: creditScore
    };

    axios.post('http://localhost:8082/api/loan', loanData)
        .then(response => {
            console.log('Form successfully submitted:', response.data);
            const loanId = response.data.id; 
            
            setTimeout(() => {
                axios.put(`http://localhost:8082/api/loan/${loanId}/status?status=Accepted`)
                    .then(updateResponse => {
                        console.log('Loan status updated to Accepted:', updateResponse.data);
                    })
                    .catch(updateError => {
                        console.error('Error updating loan status:', updateError);
                    });
            }, 10000);
            
        })
        .catch(error => {
            console.error('There was an error submitting the form:', error);
        });
        window.location.href = 'http://localhost:3000/yourloans';
};

  

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProductSelection formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 1:
        return <BusinessInformation formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <FinancialInformation formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <AddressHistory formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Review formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Container maxW="container.xl" py={8}>
        <HStack spacing={8}>
          <Box
            width={{ base: 'full', md: '25%' }}
            borderRightWidth={{ base: 0, md: '1px' }}
            pr={{ base: 0, md: 6 }}
            display={{ base: 'none', md: 'block' }}
          >
            <VStack align="start" spacing={4}>
              {steps.map((label, index) => (
                <Box
                  key={index}
                  p={3}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={index === step ? 'purple.500' : 'gray.300'}
                  width="full"
                  display="flex"
                  alignItems="center"
                  position="relative"
                >
                  <Box
                    width="30px"
                    height="30px"
                    borderRadius="full"
                    borderWidth="2px"
                    borderColor={completedSteps.has(index) ? 'green.500' : 'gray.300'}
                    backgroundColor={completedSteps.has(index) ? 'green.100' : 'transparent'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color={completedSteps.has(index) ? 'green.500' : 'gray.700'}
                    fontWeight="bold"
                    fontSize="sm"
                    mr={4}
                  >
                    {index + 1}
                  </Box>
                  <Text fontWeight="bold" color={index === step ? 'purple.700' : 'gray.700'}>
                    {label}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
          <Box width={{ base: 'full', md: '75%' }}>
            <Box borderWidth="1px" borderRadius="lg" p={8} boxShadow="lg">
              <Heading as="h1" size="lg" textAlign="center" mb={6}>
                Apply for a Business Loan
              </Heading>
              <Progress value={(step / (steps.length - 1)) * 100} mb={6} />
              {getStepContent(step)}
              <HStack justify="space-between" mt={6}>
                {step > 0 && (
                  <Button onClick={prevStep} colorScheme="purple" variant="outline">
                    Back
                  </Button>
                )}
                {step === 0 && (
                  <Button onClick={handleExit} colorScheme="purple" variant="outline">
                    Exit
                  </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button onClick={nextStep} colorScheme="purple">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} colorScheme="purple">
                    Submit
                  </Button>
                )}
              </HStack>
            </Box>
          </Box>
        </HStack>
      </Container>
      <Footer/>
    </ChakraProvider>
  );
};

export default LoanApplicationForm;
