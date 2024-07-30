import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; 
import axios from 'axios';

const LoanPieChart = () => {
  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const userId = localStorage.getItem('userID');
        const response = await axios.get(`http://localhost:8082/api/loan/${userId}`);
        setLoanData(response.data); 
      } catch (error) {
        console.error('Error fetching loan data', error);
      }
    };

    fetchLoanData();
  }, []);

  const data = loanData.map(loan => ({
    name: loan.loanType,
    value: loan.outstandingPrincipal,
  }));

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>Outstanding Principal by Loan Type</Heading>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6d28d9' : '#8884d8'} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default LoanPieChart;
