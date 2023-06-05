import React, { useState } from 'react';
import { Flex, Grid, Button, Input } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useAccount, useSigner } from 'wagmi';

const LockStakingEnter = () => {
    const [amountInput, setAmountInput] = useState("Amount");
    const [weekInput, setWeekInput] = useState("Week");
    const { address } = useAccount();
    const {data: signer} = useSigner();

    return (
        <Flex
            border={"1px solid #96E6FF"}
            borderRadius={"8px"}
            p={"20px"}
            my={"20px"}
            className="flex-col gap-4"
        >
            <Grid className="grid-cols-3 gap-3">
                <Input
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                />
                <Input
                    value={weekInput}
                    onChange={(e) => setWeekInput(e.target.value)}
                />
                <Button
                    onClick={() => ContractService.enterLockStaking(parseFloat(amountInput), parseInt(weekInput), address, signer)}
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
            </Grid>
        </Flex>
    );
}

export default LockStakingEnter;
