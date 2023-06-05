import React, { useState } from 'react';
import { Flex, Grid, Button, Input } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useAccount, useSigner } from 'wagmi';
import { StakingFlexibleContractAddr } from '../common/constants';

const Staking = () => {
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const [allowanceInput, setAllowanceInput] = useState("");
    const [depositInput, setDepositInput] = useState("");
    const [withdrawInput, setWithdrawInput] = useState("");

    return (
        <Flex
            border={"1px solid #96E6FF"}
            borderRadius={"8px"}
            p={"20px"}
            my={"20px"}
            className="flex-col gap-4"
        >
            <Grid className="grid-cols-2 gap-3">
                <Input
                    value={allowanceInput}
                    onChange={(e) => setAllowanceInput(e.target.value)}
                />
                <Button
                    onClick={() => ContractService.approve(parseFloat(allowanceInput), address, StakingFlexibleContractAddr, signer)}
                    size="lg"
                    bg="darkgreen"
                    color={"white"}
                    borderColor="darkgreen"
                    borderRadius={"22px"}
                    height={"38px"}
                    fontSize={16}
                    bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                    _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                    _active={{
                        bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                        transform: "scale(0.98)",
                    }}
                >
                    Add Allowance
                </Button>
                <Input
                    value={depositInput}
                    onChange={(e) => setDepositInput(e.target.value)}
                />
                <Button
                    onClick={() => ContractService.enterStaking(parseFloat(depositInput), address, signer)}
                    size="lg"
                    bg="darkgreen"
                    color={"white"}
                    borderColor="darkgreen"
                    borderRadius={"22px"}
                    height={"38px"}
                    fontSize={16}
                    bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                    _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                    _active={{
                        bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                        transform: "scale(0.98)",
                    }}
                >
                    Deposit MF
                </Button>
                <Input
                    value={withdrawInput}
                    onChange={(e) => setWithdrawInput(e.target.value)}
                />
                <Button
                    onClick={() => ContractService.leaveStaking(parseFloat(withdrawInput), signer)}
                    size="lg"
                    bg="darkgreen"
                    color={"white"}
                    borderColor="darkgreen"
                    borderRadius={"22px"}
                    height={"38px"}
                    fontSize={16}
                    bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                    _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                    _active={{
                        bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                        transform: "scale(0.98)",
                    }}
                >
                    Withdraw MF
                </Button>
            </Grid>
        </Flex>
    );
}

export default Staking;
