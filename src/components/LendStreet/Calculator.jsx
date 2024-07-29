import React, {useState} from "react";
import {
    Box,
    Button,
    Center,
    ChakraProvider,
    Grid,
    GridItem,
    Heading,
    Input,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";

function Calculator() {
    const [principal, setPrincipal] = useState();
    const [interestRate, setInterestRate] = useState();
    const [tenureInMonths, setTenureInMonths] = useState();
    const [emi, setEMI] = useState(0);
    const [totalRepayment, setTotalRepayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    const calculateEMI = () => {
        const monthlyInterestRate = (interestRate / 100) / 12;
        const emi =
            (principal *
                monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
            (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);
        const totalRepayment = emi * tenureInMonths;
        const totalInterest = totalRepayment - principal;

        setEMI(emi.toFixed(2));
        setTotalRepayment(totalRepayment.toFixed(2));
        setTotalInterest(totalInterest.toFixed(2));
    };
    const tableSize = useBreakpointValue({base: "sm", sm: "md", md: "lg"});
    return (
        <ChakraProvider>
            <Center
                minH="100vh"
                bgGradient="radial(at center, #993399, #3f1d67)"
                px={[4, 6, 8]}
            >
                <Box
                    p={6}
                    borderRadius="md"
                    shadow="md"
                    bg="gray.100"
                    w={["100%", "70%"]}
                >
                    <Heading mb={4} textAlign="center" color="#5a287d">
                        EMI Calculator
                    </Heading>
                    <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={4}>
                        <GridItem colSpan={1}>
                            <VStack spacing={4}>
                                <Input
                                    type="number"
                                    placeholder="Loan Amount (INR)"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                />
                                <Input
                                    type="number"
                                    placeholder="Interest Rate (%)"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />
                                <Input
                                    type="number"
                                    placeholder="Loan Tenure (in months)"
                                    value={tenureInMonths}
                                    onChange={(e) => setTenureInMonths(e.target.value)}
                                />
                                <Button
                                    colorScheme="purple"
                                    size="lg"
                                    onClick={calculateEMI}
                                    width="100%"
                                >
                                    Calculate EMI
                                </Button>
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                            {tableSize && (
                                <Table variant="styled" borderWidth="2px">
                                    <Thead>
                                        <Tr>
                                            <Th
                                                bg="purple.700"
                                                color="white"
                                                fontSize={tableSize === "sm" ? "md" : "lg"}
                                                fontWeight="bold"
                                                borderBottom="2px solid purple.700"
                                            >
                                                Loan Details
                                            </Th>
                                            <Th
                                                bg="purple.700"
                                                color="white"
                                                fontSize={tableSize === "sm" ? "md" : "lg"}
                                                fontWeight="bold"
                                                borderBottom="2px solid purple.700"
                                            >
                                                Value
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr bg="purple.100">
                                            <Td fontWeight="bold">Borrowing Amount</Td>
                                            <Td>{principal} INR</Td>
                                        </Tr>
                                        <Tr>
                                            <Td fontWeight="bold">Monthly Repayments</Td>
                                            <Td>{emi} INR</Td>
                                        </Tr>
                                        <Tr bg="purple.100">
                                            <Td fontWeight="bold">Total Repayment</Td>
                                            <Td>{totalRepayment} INR</Td>
                                        </Tr>
                                        <Tr>
                                            <Td fontWeight="bold">Interest Rate</Td>
                                            <Td>{interestRate}%</Td>
                                        </Tr>
                                        <Tr bg="purple.100">
                                            <Td fontWeight="bold">Total Interest Payable</Td>
                                            <Td>{totalInterest} INR</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            )}
                        </GridItem>
                    </Grid>
                </Box>
            </Center>
        </ChakraProvider>
    );
}

export default Calculator;

