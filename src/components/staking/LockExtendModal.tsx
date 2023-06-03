import { Box, Button, Flex, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SmallButton from "../SmallButton";
import { ContractService } from "../../service/contractService";
import CustomToast from "../CustomToast";
import { LockStakingFutureAPR } from "../LockStakingAPR";
import { useAccount, useSigner } from "wagmi";
import { WEEK_MILLICONDS } from "../../common/constants";


const LockExtendModal: React.FC<{
    openModal: Boolean,
    onClose: Function
}> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    const [weekValue, setWeekValue] = useState(0)
    const [inTransaction, setInTransaction] = useState(false);
    const [amount, setAmount] = useState(0);
    const [duration, setDuration] = useState(0)

    const [unlockOn, setUnlockOn] = useState("")
    const [boost, setBoost] = useState(0);
    const [roi, setRoi] = useState(0)
    const [maxWeeks, setMaxWeeks] = useState(52);
    const [userInfo, setUserInfo] = useState(null)

    const bgModal = useColorModeValue('', '#1B2026')
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')
    const colorHeader = useColorModeValue('black', 'white')
    const bgBox = useColorModeValue('#CFF8FF', '#242A33')
    const bgAvator = useColorModeValue('#20B4CA', '#0084FF')
    const colorDesc = useColorModeValue('#5B7A8A', '#898B8E')
    const colorHighlight = useColorModeValue('darkgreen', '#0084FF')

    const toast = useToast()

    const lockStaking = async () => {
        toast({
            position: 'top-right',
            duration: 1000000,
            render: () => (<CustomToast status={"info"} 
                title={"Transacting!"} 
                description={"The transaction is in progress, please waiting..."} />)
          })
        
        setInTransaction(true)

        // 60秒后刷新页面，目的是在手机上跳转后，有时候无法跳转回来，导致会一直显示交易中
        setTimeout(function() {
            location.reload();
        }, 60000);
        
        try {
            const result = await ContractService.reEnterLockStaking(amount, weekValue, address, signer);
            console.log(result)
            closeModal();
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"success"} 
                    title={"Staked!"} 
                    description={"Your funds have been staked in the pool."} />)
              })
            location.reload();
        } catch(err) {
            console.log('staking', err);
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"error"} 
                    title={"Error"} 
                    description={"There has some issue happened."} />)
              })
        } finally {
            toast.closeAll();
            setInTransaction(false);
        }
    }

    const handleWeekInputChange = (event) => {
        const value = event.target.value
        if (isNaN(value) || value == 0) {
            return;
        }
        setWeekValue(parseInt(value))
    }

    const calcBoost = async (week) => {
        if (!week) return;
        const result = await ContractService.calculateBoost(week, signer);
        setBoost(result);
    }

    const calcRoi = async () => {
        if (!weekValue) return;
        const result = await ContractService.lockStakingROI(amount, weekValue, address, signer);
        setRoi(result);
    }

    const calcWeeks = async () => {
        const result = await ContractService.calcWeeksAfterExtend(weekValue, address, signer);
        setDuration(result)
    }

    const getUserInfo = async () => {
        const result = await ContractService.lockUserInfo(address, signer);
        setUserInfo(result)
    }

    const closeModal = () => {
        onClose()
        props.onClose()
    }

    useEffect(() => {
        if (weekValue > maxWeeks) {
            setWeekValue(maxWeeks);
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"info"} 
                    title={"Tips!"} 
                    description={`The max weeks is ${maxWeeks}`} />)
              })
            return;
        }

        const currentDate = new Date();

        const weeksLater = new Date(currentDate.getTime() + weekValue * WEEK_MILLICONDS * 1000);

        setUnlockOn(weeksLater.toLocaleString())

        const fetchMaxWeeks = async () => {
            const result = await ContractService.getMaxWeeks(signer);
            setMaxWeeks(result);
        };

        fetchMaxWeeks();

        calcRoi()

        calcWeeks()
    }, [weekValue])

    useEffect(() => {
        if (userInfo && duration) {
            if (weekValue === 0) {
                setBoost(userInfo.multiplier/1000)
            } else {
                calcBoost(duration)
            }
        }
    }, [userInfo, weekValue, duration])

    useEffect(() => {
        const fetchData = async () => {
            const result = await ContractService.userLockStakingAmount(address, signer);
            setAmount(result)
        }

        fetchData()

        getUserInfo();
    }, [])

    useEffect(() => {
        if (props.openModal) {
            setWeekValue(0)
            onOpen()
        } else {
            onClose()
        }
    }, [props.openModal])

    return (<>
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent bg={bgModal}>
                <ModalHeader color={colorHeader}>Extend Lock</ModalHeader>
                <ModalCloseButton color={colorHeader} />
                <ModalBody>
                    <Flex className="flex-col gap-2">
                        <Flex>
                            <Text className="grow text-[#5B7A8A] text-xs font-medium">
                                ADD FLARE TO LOCK
                            </Text>
                            <Flex className="gap-1 items-center">
                                <Box
                                    bg={bgAvator}
                                    className="rounded-full w-4 h-4"
                                ></Box>
                                <Box className="font-bold text-sm" color={colorHeader}>
                                    FLARE
                                </Box>
                            </Flex>
                        </Flex>
                        <Text className="text-xs font-medium mt-4" color={colorHeader}>
                            <Box as="span" color={colorHighlight}>ADD</Box> DURATION
                        </Text>
                        <Grid className="grid-cols-5 gap-2 mt-2">
                            <SmallButton text="1W" onClick={() => setWeekValue(1)} />
                            <SmallButton text="5W" onClick={() => setWeekValue(5)} />
                            <SmallButton text="10W" onClick={() => setWeekValue(10)} />
                            <SmallButton text="15W" onClick={() => setWeekValue(15)} />
                            <SmallButton text="Max" onClick={() => setWeekValue(maxWeeks)} />
                        </Grid>

                        <Flex className="flex-row items-center mt-4 gap-2">
                            <Box className="inline grow">
                                <Input variant='filled' placeholder='' bg={bgBox} color={colorHeader} 
                                    className="font-bold text-right"
                                    value={weekValue} onChange={handleWeekInputChange} />
                            </Box>
                            <Text className="inline text-sm font-medium" color={colorHeader}>Week</Text>
                        </Flex>

                        <Text className="text-xs font-medium mt-4" color={colorHeader} >
                            <Box as="span" color={colorHighlight}>LOCK</Box> OVERVIEW
                        </Text>

                        <Grid className="grid-cols-2 gap-2 text-[12px] font-medium p-4" bg={bgBox}
                            borderRadius={"7px"} color={"lightfont"}>
                            <Box>FLARELOCKED TO BE LOCKED</Box>
                            <Box className="text-right text-base" color={colorHeader}>0.00-&gt;0.00</Box>
                            <Box>APR</Box>
                            <Box className="text-right text-base" color={colorHeader}><LockStakingFutureAPR amount={amount} week={weekValue} /></Box>
                            <Box>DURATION</Box>
                            <Box className="text-right text-base" color={colorHeader}>{duration} week{duration > 1 ? 's':''}</Box>
                            <Box>YIELD BOOST</Box>
                            <Box className="text-right text-base" color={colorHeader}>{boost}x</Box>
                            <Box>UNLOCK ON</Box>
                            <Box className="text-right text-base" color={colorHeader}>{unlockOn} </Box>
                            <Box>EXPECTED ROI</Box>
                            <Box className="text-right text-base" color={colorHeader}>${roi}</Box>
                        </Grid>

                        <Button
                            size="lg"
                            bg={bgBtn}
                            color={"white"}
                            borderColor={bgBtn}
                            borderRadius={"22px"}
                            height={"38px"}
                            // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                            onClick={lockStaking}
                            disabled={!weekValue || weekValue <= 0 || weekValue > maxWeeks || inTransaction }
                            // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                            _active={{
                                // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                                transform: "scale(0.98)",
                            }}
                        >
                            Confirm
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>)
}

export default LockExtendModal