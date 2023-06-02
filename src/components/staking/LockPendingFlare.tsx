import React, { useEffect, useState } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ContractService } from '../../service/contractService';
import { flareUsdRate } from '../../common/constants';
import { useAccount, useSigner } from 'wagmi';

export const LockPendingFlare = () => {
    const [amount, setAmount] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')

    const fetchAmount = async () => {
        const result = await ContractService.pendingFlareLock(address, signer);
        setAmount(result);
    };

    useEffect(() => {
        if (isConnected) {
            setInterval(() => {
                fetchAmount()
            }, 5000)
            fetchAmount();
        }
    }, [isConnected]);

    return (
        <Flex className="flex-col">
            <Box className="text-xl font-bold" color={colorHeader}>
                {amount}
            </Box>
            <Box className="text-xs font-medium whitespace-nowrap" color={colorDesc}>
                ~ {amount * flareUsdRate} USD
            </Box>
        </Flex>
    );
};
