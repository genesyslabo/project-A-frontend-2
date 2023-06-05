import React, { useEffect, useState } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ContractService } from '../../service/contractService';
import { flareUsdRate } from '../../common/constants';
import { useAccount, useSigner } from 'wagmi';
import { toNFix } from '../../common/utils/tools';

export const LockPendingFlare = () => {
    const [amount, setAmount] = useState(0);
    const { isConnected } = useAccount();
    const {data: signer} = useSigner();
    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')

    const fetchAmount = async () => {
        const result = await ContractService.getTotalVeToken(signer);
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
                {toNFix(amount, 4)}
            </Box>
            <Box className="text-xs font-medium whitespace-nowrap" color={colorDesc}>
                ~ {toNFix(amount * flareUsdRate, 4)} USD
            </Box>
        </Flex>
    );
};
