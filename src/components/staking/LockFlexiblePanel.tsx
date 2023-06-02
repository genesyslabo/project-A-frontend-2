import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, AvatarBadge, Box, Flex, Grid, HStack, Image, Tag, TagLabel, TagLeftIcon, Text, VStack, useColorModeValue } from "@chakra-ui/react"
import { LockStakingDuration, LockStakingTime } from "../LockStakingTime"
import { LockIcon } from "@chakra-ui/icons"
import { LockStakingAmount } from "../LockStakingAmount"
import { LockStakingCurrentAPR } from "../LockStakingAPR"
import LockStakingButtons from "./LockStakingButtons"
import { TotalStakingAmount } from "./TotalStakingAmount"
import { useEffect, useState } from "react"
import { ContractService } from "../../service/contractService"
import { flareUsdRate } from "../../common/constants"
import { LockPendingFlare } from "./LockPendingFlare"
import { useAccount, useSigner } from "wagmi"

const LockFlexiblePanel = () => {
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const [amount, setAmount] = useState(0);

    const [unlockOn, setUnlockOn] = useState("")
    const [weekValue, setWeekValue] = useState(1)
    const [boost, setBoost] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0);

    const bgHeader = useColorModeValue('white', '#242A33')
    const bgPanel = useColorModeValue('#ECFDFF', '#1B2026')
    const bgAvator = useColorModeValue('#20B4CA', '#0084FF')
    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')
    const colorBorder = useColorModeValue('#96E6FF', '#2D4E6E')
    const colorIcon = useColorModeValue('darkgreen', '#0084FF')

    const fetchAmount = async () => {
        const result = await ContractService.userLockStakingAmount(address, signer);
        setAmount(result);
    };

    const fetchWeek = async () => {
        const result = await ContractService.userLockStakingTime(address, signer);
        const rest = result[2] - result[1];
        if (rest > 0) {
            setWeekValue(rest);
        }
    };

    const fetchStakeAmount = async () => {
        const result = await ContractService.userStakingAmount(address, signer);
        setStakeAmount(result);
    };

    const calcBoost = async () => {
        if (!weekValue) return;
        const result = await ContractService.calculateBoost(weekValue, signer);
        setBoost(result);
    }

    useEffect(() => {
        const currentDate = new Date();

        const weeksLater = new Date(currentDate.getTime() + weekValue * 7 * 24 * 60 * 60 * 1000);

        setUnlockOn(weeksLater.toLocaleString())
    }, [weekValue])

    useEffect(() => {

        if (isConnected) {
            fetchAmount();

            fetchStakeAmount();

            fetchWeek();
    
            fetchAmount();
    
            calcBoost()
        }
        
    }, [isConnected]);

    return (<>
        <AccordionItem mt={4} className="!border-0">
            <AccordionButton className="rounded-2xl" bg={bgHeader}>
                <Flex className="w-full flex-row items-center justify-between gap-4">
                    <HStack>
                        <Avatar bg={bgAvator} name=" ">
                            <AvatarBadge
                                boxSize="1.25em"
                                bg="transparent"
                                borderColor="transparent"
                            >
                                <Image src="/assets/images/icon-cyclic.png" />
                            </AvatarBadge>
                        </Avatar>

                        <VStack className="text-left" alignItems={"start"}>
                            <Text className="text-[#FE9D1C] text-[10px] font-medium">
                                LOCKED
                            </Text>
                            <Text className="font-bold text-sm !mt-0" color={colorHeader}>
                                Lock MF
                            </Text>
                            <Text className="text-[10px] !mt-0" color={colorDesc}>
                                Stake, Earn-And more!
                            </Text>
                        </VStack>
                    </HStack>

                    <VStack className="!hidden md:!flex !items-start">
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            MF STAKED
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorDesc}>
                            {stakeAmount}
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorDesc}>
                            {stakeAmount * flareUsdRate} USD
                        </Text>
                    </VStack>
                    <VStack>
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            LOCKED APY
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorDesc}>
                            Up to
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorHeader}>
                            <LockStakingCurrentAPR />
                        </Text>
                    </VStack>
                    <VStack className="!hidden md:!flex">
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            TOTAL STAKED
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorHeader}>
                            <LockStakingAmount />
                        </Text>
                    </VStack>
                </Flex>
                <AccordionIcon color={colorIcon} fontSize={32} />
            </AccordionButton>

            <AccordionPanel
                pb={4}
                bg={bgPanel}
                className="rounded-b-2xl mt-2"
            >
                <Box className="flex flex-row gap-2 items-center mt-2">
                    <Text
                        color={"#FE9D1C"}
                        fontSize={"12px"}
                        fontWeight={"500"}
                    >
                        MY POSITION
                    </Text>
                    <Tag
                        size="sm"
                        bg={bgAvator}
                        color={"white"}
                        borderRadius="full"
                    >
                        <TagLeftIcon boxSize="12px" as={LockIcon} />
                        <TagLabel>Locked</TagLabel>
                    </Tag>
                </Box>
                <Flex className="flex-col md:flex-row md:gap-4">
                    <Grid className="grid-cols-2 gap-4 md:gap-0 md:py-10 items-center text-[14px] !hidden md:!grid" color={colorHeader}>
                        <Box>Total locked</Box>
                        <Box className="text-right font-medium whitespace-nowrap">
                            <TotalStakingAmount />
                        </Box>
                        <Box className="whitespace-nowrap">Average lock duration</Box>
                        <Box className="text-right font-medium">
                            40 weeks
                        </Box>
                        {/* <Box>Performance Fee</Box>
                        <Box className="text-right font-medium">0-2%</Box> */}
                    </Grid>
                    <Grid
                        border={"1px solid"}
                        borderColor={colorBorder}
                        borderRadius={"8px"}
                        p={"20px"}
                        my={"20px"}
                        className="grid-cols-2 md:gap-x-2 md:basis-5/12"
                    >
                        <Text className="text-[#FE9D1C] font-medium text-sm">
                            REWARDS
                        </Text>
                        <Text className="text-[#FE9D1C] font-medium text-sm">
                            YIELD BOOST
                        </Text>

                        <LockPendingFlare />

                        <Flex className="flex-col">
                            <Text className="font-bold text-xl" color={colorHeader}>
                                {boost}x
                            </Text>
                            <Text className="font-medium text-xs" color={colorDesc}>
                                Lock for <LockStakingDuration />
                            </Text>
                        </Flex>
                    </Grid>

                    <Flex
                        border={"1px solid"}
                        borderColor={colorBorder}
                        borderRadius={"8px"}
                        p={"20px"}
                        my={"20px"}
                        className="flex-col gap-4 md:basis-5/12"
                    >
                        <Grid className="grid-cols-2" color={colorDesc}>
                            <Text className="font-medium text-sm">
                                <span className="text-[#FE9D1C]">
                                    FLARE
                                </span>
                                LOCKED
                            </Text>
                            <Text className="font-medium text-sm">
                                UNLOCK IN
                            </Text>
                            <Text className="font-bold text-xl" color={colorHeader}>
                                {amount}
                            </Text>
                            <LockStakingTime />
                            <Text className="font-medium text-xs">
                                ~{amount * flareUsdRate}USD
                            </Text>
                            <Text className="font-medium text-xs">
                                {unlockOn}
                            </Text>
                        </Grid>

                        <LockStakingButtons />
                        
                    </Flex>
                </Flex>
            </AccordionPanel>
        </AccordionItem>
    </>)
}

export default LockFlexiblePanel