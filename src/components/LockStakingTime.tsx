import React, { useEffect, useState } from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useAccount, useSigner } from 'wagmi';

export const LockStakingTime = () => {
    const [time, setTime] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const colorHeader = useColorModeValue('black', 'white')

    useEffect(() => {
        const fetchTime = async () => {
            const result = await ContractService.userLockStakingTime(address, signer);
            const rest = result[2] - result[1];
            if (rest > 0) {
                setTime(rest);
            }
        };

        if (isConnected) {
            fetchTime();
        }
        
    }, [isConnected]);

    return (
        <Text className="font-bold text-xl" color={colorHeader}>
            {(time / 86400).toFixed(1)} Days
        </Text>
    );
};

export const LockStakingDuration = () => {
    const [time, setTime] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    useEffect(() => {
        const fetchTime = async () => {
            const result = await ContractService.userLockStakingTime(address, signer);
            const rest = result[2] - result[0];
            
            if (rest > 0) {
                setTime(rest);
            }
        };

        if (isConnected) {
            fetchTime();
        }
        
    }, [isConnected]);

    return (
        <Text as="span">
            {Math.round(time / 604800)} Weeks
        </Text>
    );
};

