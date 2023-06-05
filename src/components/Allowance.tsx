import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useAccount, useSigner } from 'wagmi';

export const Allowance = () => {
    const [amount, setAmount] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    useEffect(() => {
        const fetchAmount = async () => {
            const result = await ContractService.allowance(address, signer);
            setAmount(result);
        };

        if (isConnected) {
            fetchAmount();
        }
        
    }, [isConnected]);

    return (
        <Text className="text-black font-bold text-xl">
            {amount} MF
        </Text>
    );
};
