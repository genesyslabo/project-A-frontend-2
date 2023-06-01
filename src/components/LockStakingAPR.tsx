import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useAccount, useSigner } from 'wagmi';

export const LockStakingFutureAPR = ({ amount, week }) => {
    const [apr, setApr] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    useEffect(() => {
        const fetchAPR = async () => {
            const result = await ContractService.lockStakingAPR(amount, week, address, signer);
            setApr(result);
        };

        fetchAPR();
    }, [amount, week]);

    return (
        <Text className="text-base font-medium">
            {(apr * 100).toFixed(2)}%
        </Text>
    );
};

export const LockStakingCurrentAPR = () => {
    const [apr, setApr] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    useEffect(() => {
        const fetchAPR = async () => {
            const times = await ContractService.userLockStakingTime(address, signer);
            const amount = await ContractService.userLockStakingAmount(address, signer);
            const week = Math.round((times[2] - times[0]) / 604800);
            if (amount != 0 && week != 0) {
                const result = await ContractService.lockStakingAPR(amount, week, address, signer);
                setApr(result);
            }
        };

        if (isConnected) {
            fetchAPR();
        }
        
    }, [isConnected]);

    return (
        <Text as="span">
            {(apr * 100).toFixed(2)}%
        </Text>
    );
};

