import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, AvatarBadge, Box, Button, Flex, Grid, HStack, Image, Tag, TagLabel, TagLeftIcon, Text, VStack, useColorModeValue, useToast } from "@chakra-ui/react"
import { LockStakingDuration, LockStakingTime } from "../LockStakingTime"
import { LockIcon } from "@chakra-ui/icons"
import { LockStakingAmount } from "../LockStakingAmount"
import LockStakingButtons from "./LockStakingButtons"
import { TotalStakingAmount } from "./TotalStakingAmount"
import { useEffect, useState } from "react"
import { ContractService } from "../../service/contractService"
import { flareUsdRate } from "../../common/constants"
import { LockPendingFlare } from "./LockPendingFlare"
import { useAccount, useSigner } from "wagmi"
import { toNFix } from "../../common/utils/tools"
import { LockAmountVe } from "./LockAmountVe"
import { PendingFlare } from "./PendingFlare"
import CustomToast from "../CustomToast"

const LockFlexiblePanel = () => {
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();
    const [amount, setAmount] = useState(0);

    const [unlockOn, setUnlockOn] = useState("")
    const [weekValue, setWeekValue] = useState(1)
    const [boost, setBoost] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0);
    const [veToken, setVeToken] = useState(0);
    const toast = useToast()
    const [inTransaction, setInTransaction] = useState(false);

    const bgHeader = useColorModeValue('white', '#242A33')
    const bgPanel = useColorModeValue('#ECFDFF', '#1B2026')
    const bgAvator = useColorModeValue('#20B4CA', '#0084FF')
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')
    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')
    const colorBorder = useColorModeValue('#96E6FF', '#2D4E6E')
    const colorIcon = useColorModeValue('darkgreen', '#0084FF')

    const cyclicIcon = useColorModeValue('/assets/images/icon-cyclic.png', '/assets/images/icon-cyclic-dark.png')

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
        const result = await ContractService.userLockStakingAmount(address, signer);
        setStakeAmount(result);
    };

    const calcBoost = async () => {
        if (!weekValue) return;
        const result = await ContractService.calculateBoost(weekValue, signer);
        setBoost(result);
    }

    const getVeToken = async () => {
        const result = await ContractService.getTotalVeToken(signer);
        setVeToken(result);
    }

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
            const result = await ContractService.withdrawRewardLock(signer);

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

            getVeToken();
        }
        
    }, [isConnected]);

    return (<>
        <AccordionItem mt={4} className="!border-0">
            <AccordionButton className="rounded-2xl" bg={bgHeader}>
                <Flex className="w-full flex-row items-center justify-between gap-4">
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
                    {/* <VStack>
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            LOCKED APY
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorDesc}>
                            Up to
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorHeader}>
                            <LockStakingCurrentAPR />
                        </Text>
                    </VStack> */}
                    <VStack>
                        <Text className="text-[#FE9D1C] font-medium text-sm">
                            veToken earned
                        </Text>

                        <LockAmountVe />
                    </VStack>
                    <VStack className="!hidden md:!flex">
                        <Text className="text-[11px] font-medium whitespace-nowrap" color={colorDesc}>
                            TOTAL STAKED
                        </Text>
                        <Text className="text-[14px] font-medium !mt-0" color={colorHeader}>
                            <TotalStakingAmount />
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
                        {/* <Box>Total locked</Box>
                        <Box className="text-right font-medium whitespace-nowrap">
                            <TotalStakingAmount />
                        </Box> */}
                        <Box>Lock for</Box>
                        <Text className="text-right font-medium text-xs">
                            <LockStakingDuration />
                        </Text>
                        <Box className="whitespace-nowrap">Average lock duration</Box>
                        <Box className="text-right font-medium">
                            40 weeks
                        </Box>
                        <Box>Total VeToken distributed</Box>
                        <Box className="text-right font-medium">{veToken}</Box>
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
                            <LockPendingFlare />
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
                    {/* <Grid
                        border={"1px solid"}
                        borderColor={colorBorder}
                        borderRadius={"8px"}
                        p={"20px"}
                        my={"20px"}
                        className="grid-cols-2 md:gap-x-2 gap-y-2 md:basis-5/12"
                    >
                        <Text className="text-[#FE9D1C] font-medium text-sm">
                            veToken earned
                        </Text> */}
                        {/* <Text className="text-[#FE9D1C] font-medium text-sm">
                            YIELD BOOST
                        </Text> */}

                        {/* <Text className="font-medium text-xs" color={colorDesc}>
                            Lock for <LockStakingDuration />
                        </Text> */}

                        {/* <LockAmountVe /> */}

                        {/* <Flex className="flex-col"> */}
                            {/* <Text className="font-bold text-xl" color={colorHeader}>
                                {boost}x
                            </Text> */}
                            
                        {/* </Flex> */}

                        {/* <Button
                            size="lg"
                            fontSize={16}
                            bg={bgBtn}
                            color={"white"}
                            borderColor={bgBtn}
                            borderRadius={"22px"}
                            height={"38px"}
                            className="w-full col-span-2"
                            // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                            disabled={!isConnected}
                            // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                            _active={{
                                // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                                transform: "scale(0.98)",
                            }}
                        >
                            Claim
                        </Button> */}
                    {/* </Grid> */}

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
                                    MF
                                </span>
                                LOCKED
                            </Text>
                            <Text className="font-medium text-sm">
                                UNLOCK IN
                            </Text>
                            <Text className="font-bold text-xl" color={colorHeader}>
                                {toNFix(amount, 4)}
                            </Text>
                            <LockStakingTime />
                            <Text className="font-medium text-xs">
                                ~{toNFix(amount * flareUsdRate, 4)}USD
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