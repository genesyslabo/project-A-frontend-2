import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useAccount, useSigner } from 'wagmi';

export const Balance = () => {
    const [amount, setAmount] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    useEffect(() => {
        const fetchAmount = async () => {
            const result = await ContractService.balanceOf(address, signer);
            setAmount(result);
        };

        if (isConnected) {
            fetchAmount();
        }
        
    }, [isConnected]);

    return (
        <Text as={"span"}>
            {amount} MF
        </Text>
    );
};
