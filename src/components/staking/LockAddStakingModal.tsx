import { Box, Button, Flex, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, RadioGroup, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SmallButton from "../SmallButton";
import { ContractService } from "../../service/contractService";
import { WEEK_MILLICONDS, flareUsdRate } from "../../common/constants";
import CustomToast from "../CustomToast";
import { BigNumber } from "ethers";
import { LockStakingFutureAPR } from "../LockStakingAPR";
import { useAccount, useSigner } from "wagmi";


const LockAddStakingModal: React.FC<{
    openModal: Boolean,
    onClose: Function
}> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { address } = useAccount();
    const {data: signer} = useSigner();

    const [balance, setBalance] = useState(0);
    const [sliderValue, setSliderValue] = useState(0)
    const [stakeValue, setStakeValue] = useState(0)

    const [weekValue, setWeekValue] = useState(0)
    const [usdValue, setUsdValue] = useState(0)
    const [inTransaction, setInTransaction] = useState(false);

    const [unlockOn, setUnlockOn] = useState("")
    const [boost, setBoost] = useState(0);
    const [roi, setRoi] = useState(0)
    const [userInfo, setUserInfo] = useState(null)

    const bgModal = useColorModeValue('', '#1B2026')
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')
    const colorHeader = useColorModeValue('black', 'white')
    const bgBox = useColorModeValue('#CFF8FF', '#242A33')
    const bgAvator = useColorModeValue('#20B4CA', '#0084FF')
    const colorDesc = useColorModeValue('#5B7A8A', '#898B8E')
    const colorHighlight = useColorModeValue('darkgreen', '#0084FF')

    const toast = useToast()

    const handleSliderChange = (value) => {
        setSliderValue(value)
        
        const v = BigNumber.from(balance + "").mul(value).div(100);
        setStakeValue(v.toNumber())
    }

    const handleInputChange = (event) => {
        const value = event.target.value
        if (isNaN(value) || value == 0) {
            return;
        }
        if (value > balance) {
            setStakeValue(balance)
            setSliderValue(100)
        } else {
            setStakeValue(value)
            const v = BigNumber.from(value + "").mul(100).div(BigNumber.from(balance + ""))
            setSliderValue(+(parseFloat(v.toString()).toFixed(0)))
        }
    }

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
            const result = await ContractService.reEnterLockStaking(stakeValue, 0, address, signer);
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

    const calcBoost = async () => {
        if (!stakeValue || !weekValue) return;
        const result = await ContractService.calculateBoost( weekValue, signer);
        setBoost(result);
    }

    const calcRoi = async () => {
        if (!stakeValue) return;
        const result = await ContractService.lockStakingROI(stakeValue, weekValue, address, signer);
        setRoi(result);
    }

    const calcWeeks = async () => {
        const result = await ContractService.calcWeeksAfterExtend(weekValue, address, signer);
        setWeekValue(result)
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
        setUsdValue(flareUsdRate * stakeValue)
        calcBoost()
        calcRoi()
    }, [stakeValue])

    useEffect(() => {
        const currentDate = new Date();

        const weeksLater = new Date(currentDate.getTime() + weekValue * 7 * 24 * 60 * 60 * 1000);

        setUnlockOn(weeksLater.toLocaleString())
        
        calcBoost()
    }, [weekValue])

    useEffect(() => {
        if (userInfo) {
            if (stakeValue === 0) {
                setBoost(userInfo.multiplier/1000)
            } else {
                calcBoost()
            }
        }
    }, [userInfo, stakeValue])

    useEffect(() => {
        const fetchBalance = async () => {
            const result = await ContractService.balanceOf(address, signer);
            setBalance(parseInt(result + ""));
        };

        fetchBalance();

        calcWeeks();

        getUserInfo();
    }, []);


    useEffect(() => {
        if (props.openModal) {
            onOpen()
        } else {
            onClose()
        }
    }, [props.openModal])

    return (<>
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent bg={bgModal}>
                <ModalHeader color={colorHeader}>FLARE TO LOCK</ModalHeader>
                <ModalCloseButton color={colorHeader} />
                <ModalBody>
                    <Flex className="flex-col gap-2">
                        <Flex>
                            <Text className="grow text-[#5B7A8A] text-xs font-medium">
                                FLARE TO STAKE
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
                        <Flex className="flex-col items-end rounded-lg gap-2 p-2" bg={bgBox} color={colorHeader}>
                            <Input variant='unstyled' 
                                    placeholder='' 
                                    className="font-bold text-right"
                                    value={stakeValue} 
                                    onChange={handleInputChange} />
                            <Text className="text-xs text-[#666666]">
                                {usdValue} USD
                            </Text>
                        </Flex>
                        <Text className="text-right text-[#6E8A99] text-xs">
                            Balance: {balance} Flare
                        </Text>
                        <Box pt={6} pb={2}>
                            <Slider aria-label='slider-ex-6' value={sliderValue} onChange={handleSliderChange}
                                focusThumbOnChange={false}>
                                <SliderMark
                                    value={sliderValue}
                                    textAlign='center'
                                    bg={bgBtn}
                                    color='white'
                                    mt='-10'
                                    ml='-5'
                                    w='12'
                                    >
                                {sliderValue}%
                                </SliderMark>

                                <SliderTrack bg={"lightgreen"}>
                                    <SliderFilledTrack bg={bgBtn} />
                                </SliderTrack>

                                <SliderThumb boxSize={6}>
                                    <Box color='tomato' />
                                </SliderThumb>
                            </Slider>
                        </Box>
                        <Grid className="grid-cols-4 gap-2 mt-2">
                            <SmallButton text="25%" onClick={() => handleSliderChange(25)} />
                            <SmallButton text="50%" onClick={() => handleSliderChange(50)} />
                            <SmallButton text="75%" onClick={() => handleSliderChange(75)} />
                            <SmallButton text="Max" onClick={() => handleSliderChange(100)} />
                        </Grid>

                        <Text className="text-xs font-medium mt-4" color={colorHeader}>
                            <Box as="span" color={colorHighlight}>LOCK</Box> OVERVIEW
                        </Text>

                        <Grid className="grid-cols-2 gap-2 text-[12px] font-medium p-4" bg={bgBox}
                            borderRadius={"7px"} color={"lightfont"}>
                            <Box>FLARELOCKED TO BE LOCKED</Box>
                            <Box className="text-right text-base" color={colorHeader}>0.00-&gt;{+parseFloat(stakeValue + "").toFixed(2)}</Box>
                            <Box>APR</Box>
                            <Box className="text-right text-base" color={colorHeader}><LockStakingFutureAPR amount={stakeValue} week={weekValue} /></Box>
                            <Box>DURATION</Box>
                            <Box className="text-right text-base" color={colorHeader}>{weekValue} week{weekValue > 1 ? 's':''}</Box>
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
                            // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                            onClick={lockStaking}
                            // disabled={!stakeValue || stakeValue <= 0 || !weekValue || weekValue <= 0 || weekValue >= max || inTransaction }
                            disabled={inTransaction }
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

export default LockAddStakingModal