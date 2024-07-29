// Footer.js
import React from "react";
import { Box, Center, Grid, HStack, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { Link } from "react-router-dom";

const Footer = () => {
    const openFacebook = () => {
        const url = 'https://www.facebook.com/NatWest/';
        window.open(url, '_blank');
    };

    const openTwitter = () => {
        const url = 'https://twitter.com/NatWestGroup';
        window.open(url, '_blank');
    };

    const openLinkedIn = () => {
        const url = 'https://www.linkedin.com/company/natwest';
        window.open(url, '_blank');
    };

    return (
        <Box bg="#5a287d" color="white" p="30px">
            <Grid
                templateColumns="repeat(1, 1fr)"
                gap="20px"
                w="100%"
                maxW="1200px"
                m="auto"
            >
                <VStack align="left" fontSize="18px" spacing="10px">
                    <List display="flex" justifyContent="space-between" mb="20px">
                        <Link to='/support'><ListItem>Customer Care</ListItem></Link>
                        <Link to='/dashboard'><ListItem>Loans</ListItem></Link>
                        <Link to='/calculator'><ListItem>Loan Calculator</ListItem></Link>
                    </List>
                </VStack>
            </Grid>
            <hr />
            <Center mt="20px">
                <HStack fontSize="30px" spacing="30px">
                    <button onClick={openFacebook} style={{ background: 'none', border: 'none' }}>
                        <BsFacebook />
                    </button>
                    <button onClick={openTwitter} style={{ background: 'none', border: 'none' }}>
                        <BsTwitter />
                    </button>
                    <button onClick={openLinkedIn} style={{ background: 'none', border: 'none' }}>
                        <GrLinkedinOption />
                    </button>
                </HStack>
            </Center>
            <Center pt="20px">
                <Text>Copyright © Natwest 2023</Text>
            </Center>
        </Box>
    );
};

export default Footer;
