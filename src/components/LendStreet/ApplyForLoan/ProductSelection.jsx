import React, { useState, useEffect } from 'react';
import { VStack, FormControl, FormLabel, Select, Input, Button, FormErrorMessage, Icon, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const ProductSelection = ({ formData, setFormData, nextStep }) => {
  const [loanType, setLoanType] = useState(formData.loanType || '');
  const [errors, setErrors] = useState({});
  const [principalValid, setPrincipalValid] = useState(false);
  const [touched, setTouched] = useState({ principal: false, term: false });

  useEffect(() => {
    if (loanType) {
      validatePrincipal(formData.principal);
      validateTerm(formData.term);
    }
  }, [loanType]);

  const validateForm = () => {
    const newErrors = {};
    if (!loanType) {
      newErrors.loanType = 'Loan Type is required';
    }
    validatePrincipal(formData.principal, newErrors);
    validateTerm(formData.term, newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePrincipal = (value, errorsObj = errors) => {
    const { min, max } = getPrincipalRange();
    if (touched.principal) {
      if (!value) {
        errorsObj.principal = 'Principal is required';
        setPrincipalValid(false);
      } else if (value < min || value > max) {
        errorsObj.principal = `Principal must be between £${min} and £${max}`;
        setPrincipalValid(false);
      } else {
        delete errorsObj.principal;
        setPrincipalValid(true);
      }
    } else {
      setPrincipalValid(false); 
    }
  };

  const validateTerm = (value, errorsObj = errors) => {
    const termOptions = getTermOptions();
    if (touched.term) {
      if (!value) {
        errorsObj.term = 'Term is required';
      } else if (value && !termOptions.includes(Number(value))) {
        errorsObj.term = `Term must be one of the following: ${termOptions.join(', ')} years`;
      } else {
        delete errorsObj.term;
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoanTypeChange = (e) => {
    const selectedType = e.target.value;
    setLoanType(selectedType);
    setFormData({ ...formData, loanType: selectedType, principal: '', term: '' }); 
    setErrors({});
    setTouched({ principal: false, term: false }); 
  };

  const getPrincipalRange = () => {
    if (loanType === 'Expansion Loan') return { min: 10000, max: 50000 };
    if (loanType === 'Equipment Purchases Loan') return { min: 10000, max: 20000 };
    return { min: 0, max: 0 };
  };

  const getTermOptions = () => {
    if (loanType === 'Expansion Loan') return Array.from({ length: 10 }, (_, i) => i + 1);
    if (loanType === 'Equipment Purchases Loan') return Array.from({ length: 5 }, (_, i) => i + 1);
    return [];
  };

  const handleSubmit = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="loanType" isInvalid={!!errors.loanType}>
        <FormLabel>Which product are you interested in?</FormLabel>
        <Select name="loanType" value={loanType} onChange={handleLoanTypeChange}>
          <option value="">Select Loan Type</option>
          <option value="Expansion Loan">Expansion Loan</option>
          <option value="Equipment Purchases Loan">Equipment Purchases Loan</option>
        </Select>
        {errors.loanType && <FormErrorMessage>{errors.loanType}</FormErrorMessage>}
      </FormControl>
      <FormControl id="principal" isInvalid={!!errors.principal} isDisabled={!loanType}>
        <FormLabel>How much do you want to borrow?</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children="£"
            color="gray.500"
            fontSize="1.2em"
            ml="0.5rem" 
          />
          <Input
            type="number"
            name="principal"
            value={formData.principal}
            onChange={(e) => {
              handleChange(e);
              validatePrincipal(e.target.value);
            }}
            onFocus={() => setTouched((prev) => ({ ...prev, principal: true }))}
            onBlur={() => validatePrincipal(formData.principal)} 
            min={getPrincipalRange().min}
            max={getPrincipalRange().max}
            step="100"
            pr="4.5rem" 
          />
          {principalValid && loanType && (
            <Icon
              as={CheckCircleIcon}
              color="green.500"
              position="absolute"
              right="1rem"
              top="50%"
              transform="translateY(-50%)"
            />
          )}
        </InputGroup>
        {touched.principal && errors.principal && <FormErrorMessage>{errors.principal}</FormErrorMessage>}
      </FormControl>
      <FormControl id="term" isInvalid={!!errors.term} isDisabled={!loanType}>
        <FormLabel>Over how long do you want to repay the loan?</FormLabel>
        <Select
          name="term"
          value={formData.term}
          onChange={(e) => {
            handleChange(e);
            validateTerm(e.target.value);
          }}
          onFocus={() => setTouched((prev) => ({ ...prev, term: true }))}
          onBlur={() => validateTerm(formData.term)} 
        >
          <option value="">Select Term</option>
          {getTermOptions().map((year) => (
            <option key={year} value={year}>{year} year{year > 1 ? 's' : ''}</option>
          ))}
        </Select>
        {touched.term && errors.term && <FormErrorMessage>{errors.term}</FormErrorMessage>}
      </FormControl>
    </VStack>
  );
};

export default ProductSelection;
