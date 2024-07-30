import React, { useEffect, useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import { BUSINESS_ID } from '../../../constants';

const AddressHistory = ({ formData, setFormData }) => {
  const [addressData, setAddressData] = useState({
    postalCode: '',
    houseNo: '',
    country: '',
    yearsLived: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/api/user/${BUSINESS_ID}`)
      .then(response => {
        const { postalCode, houseNo, country, yearsLived } = response.data.address;
        console.log(response.data.address)
        setAddressData({
          postalCode,
          houseNo,
          country,
          yearsLived
        });
        setFormData({
          ...formData,
          postalCode,
          houseNo,
          country,
          yearsLived
        });
      })
      .catch(error => {
        console.error("There was an error fetching the address information!", error);
      });
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="postalCode">
        <FormLabel>Postal Code</FormLabel>
        <Input
          type="text"
          name="postalCode"
          value={addressData.postalCode}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="houseNo">
        <FormLabel>House Number</FormLabel>
        <Input
          type="text"
          name="houseNo"
          value={addressData.houseNo}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>Country</FormLabel>
        <Input
          type="text"
          name="country"
          value={addressData.country}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="yearsLived">
        <FormLabel>Number of Years Lived</FormLabel>
        <Select
          name="yearsLived"
          value={addressData.yearsLived}
          onChange={handleSelectChange}
        >
          <option value="">Select</option>
          {Array.from({ length: 101 }, (_, i) => (
            <option key={i} value={i}>{i} year{(i > 1) ? 's' : ''}</option>
          ))}
        </Select>
      </FormControl>
    </VStack>
  );
};

export default AddressHistory;
