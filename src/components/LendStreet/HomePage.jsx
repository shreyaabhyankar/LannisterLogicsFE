import React from 'react';
import { Box, Button, Flex, Heading, Icon, Text, useBreakpointValue, Link, SimpleGrid } from '@chakra-ui/react';
import { FaBook, FaWallet, FaPlus, FaCalculator } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import LoanPieChart from './Graphs/LoanPieChart'; 
import LoanSummary from './Graphs/LoanSummary';
import './styles.css';

const HomePage = () => {
  const cardSize = useBreakpointValue({ base: 'full', md: '30%' });

  const cardData = [
    {
      title: 'Learn More',
      icon: FaBook,
      link: '/learn-more',
      description: 'Learn more about the types of loans offered by your platform'
    },
    {
      title: 'Your Loans',
      icon: FaWallet,
      link: '/yourloans',
      description: 'Keep track of your loans and pay installments'
    },
    {
      title: 'Apply for Loan',
      icon: FaPlus,
      link: '/apply',
      description: 'Apply for a loan at your convenience'
    },
    {
      title: 'Loan Calculator',
      icon: FaCalculator,
      link: '/calculator',
      description: 'Calculate your EMI'
    },
  ];

  return (
    <div id="root">
      <Navbar />
      <main>
        <Flex
          direction="column"
          wrap="wrap"
          justify="center"
          p={4}
          spacing={9}
          bg="gray.100"
          minH="100vh"
        >
          {/* Cards Section */}
          <Flex
            direction="row"
            wrap="wrap"
            justify="center"
            mb={8}
          >
            {cardData.map((card, index) => (
              <Box
                key={index}
                p={4}
                w={cardSize}
                maxW="sm"
                borderWidth={1}
                borderRadius="md"
                boxShadow="md"
                bg="white"
                textAlign="center"
                m={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  mb={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  h="60px" 
                  w="60px"
                >
                  <Icon as={card.icon} color="#6d28d9" boxSize="full" />
                </Box>
                <Link href={card.link} _hover={{ textDecoration: 'none' }}>
                  <Heading size="md" mb={2} color="#6d28d9">
                    {card.title}
                  </Heading>
                </Link>
                <Text mb={4}>{card.description}</Text>
              </Box>
            ))}
          </Flex>

          {/* Visualization Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box p={4} bg="white" borderWidth={1} borderRadius="md" boxShadow="md">
              <LoanSummary />
            </Box>
            <Box p={4} bg="white" borderWidth={1} borderRadius="md" boxShadow="md">
              <LoanPieChart />
            </Box>
          </SimpleGrid>
        </Flex>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
