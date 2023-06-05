import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons"
import { Box, HStack, IconButton, Spacer, Text, VStack, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { ContractService } from "../../service/contractService";
import { flareUsdRate } from "../../common/constants";
import StakingModal from "./FlexibleModal";
import UnstakeModal from "./UnstakeModal";
import { useAccount, useSigner } from "wagmi";


const FlexibleLockBox = () => {
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const [amount, setAmount] = useState(0);
    const [isFlexibleOpen, setFlexibleOpen] = useState(false);
    const [isUnstakeOpen, setUnstakeOpen] = useState(false);

    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')
    const colorBtn = useColorModeValue('#20B4CA', '#0084FF')

    const fetchAmount = async () => {
        const result = await ContractService.userStakingAmount(address, signer);
        setAmount(result);
    };

    useEffect(() => {

        if (isConnected) {
            fetchAmount();
        }
        
    }, [isConnected]);


    return (<>
        <StakingModal openModal={isFlexibleOpen} onClose={() => setFlexibleOpen(false)} />
        <UnstakeModal openModal={isUnstakeOpen} onClose={() => setUnstakeOpen(false)} />

        <Text className="mb-2 font-medium text-sm" color={colorHeader}>
            <Box as="span" color={"#FE9D1C"}>
                STAKE
            </Box>
            MF
        </Text>
        <HStack className="items-stretch justify-between">
            <VStack className="justify-start items-start">
                <Text className="font-bold text-xl" color={colorHeader}>
                    {amount} MF
                </Text>
                <Text className="w-full font-medium text-xs text-left" color={colorDesc}>
                    ~{amount * flareUsdRate} USD
                </Text>
            </VStack>

            <Spacer />

            <HStack className="grow justify-end">
                <IconButton
                    variant='outline'
                    borderColor={colorBtn}
                    color={colorBtn}
                    aria-label='Call Sage'
                    fontSize='12px'
                    icon={<MinusIcon />}
                    onClick={() => setUnstakeOpen(true)}
                    />

                <IconButton
                    variant='outline'
                    borderColor={colorBtn}
                    color={colorBtn}
                    aria-label='Call Sage'
                    fontSize='20px'
                    icon={<SmallAddIcon />}
                    onClick={() => setFlexibleOpen(true)}
                    />
            </HStack>
        </HStack>
    </>)
}

export default FlexibleLockBox