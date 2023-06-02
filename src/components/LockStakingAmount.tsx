import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useAccount, useSigner } from 'wagmi';

export const LockStakingAmount = () => {
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const [amount, setAmount] = useState(0);

    const fetchAmount = async () => {
        const result = await ContractService.userLockStakingAmount(address, signer);
        setAmount(result);
    };

    useEffect(() => {
        if (isConnected) {
            fetchAmount();
        }
    }, [isConnected]);

    return (
        <Text as="span">
            {amount} MF
        </Text>
    );
};
