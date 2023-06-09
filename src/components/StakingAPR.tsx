import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { ContractService } from '../service/contractService';
import { useSigner } from 'wagmi';

export const StakingAPR = () => {
    const [apr, setApr] = useState(0);
    const {data: signer} = useSigner();

    useEffect(() => {
        const fetchAPR = async () => {
            const result = await ContractService.stakingAPR(signer);
            setApr(result);
        };

        fetchAPR();
    }, []);

    return (
        <Text as="span">
            {(apr * 100).toFixed(2)}%
        </Text>
    );
};
