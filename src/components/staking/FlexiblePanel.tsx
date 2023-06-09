import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, AvatarBadge, Box, Button, Flex, Grid, HStack, Image, Text, VStack, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react"
import { StakingAmount } from "../StakingAmount";
import { StakingAPR } from "../StakingAPR";
import StakingButtons from "./StakingButtons";
import { TotalStakingAmount } from "./TotalStakingAmount";
import { PendingFlare } from "./PendingFlare";
import { useEffect, useState } from "react";
import { ContractService } from "../../service/contractService";
import { flareUsdRate } from "../../common/constants";
import { useAccount, useSigner } from "wagmi";
import { toNFix } from "../../common/utils/tools";
import CustomToast from "../CustomToast";

const FlexiblePanel = () => {
    const [amount, setAmount] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const toast = useToast()
    const [inTransaction, setInTransaction] = useState(false);
    
    const bgHeader = useColorModeValue('white', '#242A33')
    const bgPanel = useColorModeValue('#ECFDFF', '#1B2026')
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')
    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')
    const colorBorder = useColorModeValue('#96E6FF', '#2D4E6E')
    const colorIcon = useColorModeValue('darkgreen', '#0084FF')

    const cyclicIcon = useColorModeValue('/assets/images/icon-cyclic.png', '/assets/images/icon-cyclic-dark.png')

    const withdrawReward = async () => {
        toast({
            position: 'top-right',
            duration: 1000000,
            render: () => (<CustomToast status={"info"} 
                title={"Transacting!"} 
                description={"The transaction is in progress, please waiting..."} />)
          })
        
        try {
            setInTransaction(true);
            const result = await ContractService.withdrawReward(signer);

            setTimeout(function() {
                toast.closeAll();
                toast({
                    position: 'top-right',
                    render: () => (<CustomToast status={"success"} 
                        title={"Claimed!"} 
                        description={"Claim success."} />)
                  });
                setInTransaction(false);
            }, 20000);
            
        } catch(err) {
            toast.closeAll();
            setInTransaction(false);
            console.log('staking', err);
            toast({ 
                position: 'top-right',
                render: () => (<CustomToast status={"error"} 
                    title={"Error"} 
                    description={"There has some issue happened."} />)
              })
        }
    }

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
        <AccordionItem className="!border-0">
            <AccordionButton className="rounded-2xl" bg={bgHeader}>
                <Flex className="w-full flex-row items-center justify-between gap-2">
                    <HStack>
                        <Avatar src="/assets/images/avatar.png">
                            <AvatarBadge
                                boxSize="1.25em"
                                bg="transparent"
                                borderColor="transparent"
                            >
                                <Image src={cyclicIcon} />
                            </AvatarBadge>
                        </Avatar>

                        <VStack className="text-left" alignItems={"start"}>
                            <Text className="text-xs" color={colorHeader}>
                                STAKE MF
                            </Text>
                            <Text className="text-[10px] !mt-0" color={colorDesc}>
                                Staking on the side.
                            </Text>
                        </VStack>
                    </HStack>
                    <VStack className="!hidden md:!flex !items-start">
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            MF STAKED
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorDesc}>
                            {toNFix(amount, 4)}
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorDesc}>
                            {toNFix(amount * flareUsdRate, 4)} USD
                        </Text>
                    </VStack>
                    {/* <VStack>
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            APY
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorHeader}>
                            <StakingAPR />
                        </Text>
                    </VStack> */}
                    <VStack className="!hidden md:!flex">
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            Total staked
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorHeader}>
                            <StakingAmount />
                        </Text>
                    </VStack>
                </Flex>
                <AccordionIcon color={colorIcon} fontSize={32} />
            </AccordionButton>

            <AccordionPanel
                pb={4}
                bg={bgPanel}
                color={colorDesc}
                className={`rounded-b-2xl mt-2 flex flex-col md:flex-row md:gap-4`}
            >
                <Grid className="grid-cols-2 gap-2 mt-4 md:!hidden">
                    <Box className="text-base font-medium">
                        Flexible APY
                    </Box>
                    <Box className="text-right text-base font-medium" color={colorHeader}>
                        <StakingAPR />
                    </Box>
                </Grid>
                <VStack
                    border={"1px solid"}
                    borderColor={colorBorder}
                    borderRadius={"8px"}
                    p={"20px"}
                    my={"20px"}
                    gap={2}
                    align={"left"}
                    className="md:basis-5/12"
                >
                    <Text
                        className="mb-2 font-medium text-sm"
                        color={"#FE9D1C"}
                    >
                        REWARDS
                    </Text>
                    <Flex className="flex-row items-center gap-8">
                        <PendingFlare />
                        <Box className="text-right underline text-sm font-medium" color={colorHeader}>
                            min reward withdraw is 0.001MF
                        </Box>
                    </Flex>

                    <Button
                        size="lg"
                        fontSize={16}
                        bg={bgBtn}
                        color={"white"}
                        borderColor={bgBtn}
                        borderRadius={"22px"}
                        height={"38px"}
                        className="w-full col-span-2"
                        onClick={withdrawReward}
                        // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                        disabled={!isConnected || inTransaction}
                        // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                        _active={{
                            // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                            transform: "scale(0.98)",
                        }}
                    >
                        Claim
                    </Button>
                </VStack>

                <VStack
                    border={"1px solid"}
                    borderColor={colorBorder}
                    borderRadius={"8px"}
                    p={"20px"}
                    my={"20px"}
                    gap={2}
                    align={"left"}
                    className="md:basis-5/12"
                >
                    <StakingButtons />
                </VStack>
                
                <Grid className="grid-cols-2 gap-4 md:gap-2 md:py-8 text-[14px] md:order-first items-center md:basis-2/12" color={colorHeader}>
                    <Box>Total staked</Box>
                    <Box className="text-right font-medium">
                        <StakingAmount />
                    </Box>
                    {/* <Box>Total locked</Box>
                    <Box className="text-right font-medium">
                        189,65,524 FLARE
                    </Box> */}
                    {/* <Box className="">Average lock duration</Box> */}
                    {/* <Box className="text-right font-medium">
                        40 weeks
                    </Box> */}
                    {/* <Box>Performance Fee</Box>
                    <Box className="text-right font-medium">0-2%</Box> */}
                </Grid>
            </AccordionPanel>
        </AccordionItem>
    </>)
}

export default FlexiblePanel