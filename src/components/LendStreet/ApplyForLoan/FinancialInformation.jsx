import React from 'react';
import { VStack, FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage, Box } from '@chakra-ui/react';

const FinancialInformation = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Additional validation if needed
    nextStep();
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="annualTurnover" isRequired>
        <FormLabel>Annual Turnover</FormLabel>
        <Input
          type="number"
          name="annualTurnover"
          value={formData.annualTurnover}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="netProfit" isRequired>
        <FormLabel>Net Profit</FormLabel>
        <Input
          type="number"
          name="netProfit"
          value={formData.netProfit}
          onChange={handleChange}
        />
      </FormControl>
      
      <FormControl id="existingDebtAmount" isRequired>
        <FormLabel>Existing Debt Amounts</FormLabel>
        <Input
          type="number"
          name="existingDebtAmount"
          value={formData.existingDebtAmount}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="creditScore">
        <FormLabel>Credit Score (if available)</FormLabel>
        <Input
          type="number"
          name="creditScore"
          value={formData.creditScore}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="bankStatements">
        <FormLabel>Bank Statements (Upload last 6-12 months)</FormLabel>
        <Input type="file" name="bankStatements" />
      </FormControl>
      <FormControl id="profitAndLossStatements">
        <FormLabel>Profit and Loss Statements (Upload)</FormLabel>
        <Input type="file" name="profitAndLossStatements" />
      </FormControl>
      <FormControl id="businessTaxReturns">
        <FormLabel>Business Tax Returns (Upload last 2-3 years)</FormLabel>
        <Input type="file" name="businessTaxReturns" />
      </FormControl>
      
    </VStack>
  );
};

export default FinancialInformation;
