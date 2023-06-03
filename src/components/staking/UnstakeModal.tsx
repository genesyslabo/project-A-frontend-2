import { Box, Button, Flex, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react"
import { flareUsdRate } from "../../common/constants";
import { ContractService } from "../../service/contractService";
import SmallButton from "../SmallButton";
import CustomToast from "../CustomToast";
import { useAccount, useSigner } from "wagmi";
import { timeDown } from "../../common/utils/tools";

const UnstakeModal: React.FC<{
    openModal: Boolean,
    onClose: Function
}> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inTransaction, setInTransaction] = useState(false);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    const [sliderValue, setSliderValue] = useState(0)
    const [stakeValue, setStakeValue] = useState(0)
    const [usdValue, setUsdValue] = useState(0)
    const [amount, setAmount] = useState(0);
    const [remainDate, setRemainDate] = useState("")

    const bgModal = useColorModeValue('', '#1B2026')
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')
    const colorHeader = useColorModeValue('black', 'white')
    const bgBox = useColorModeValue('#CFF8FF', '#242A33')
    const bgAvator = useColorModeValue('#20B4CA', '#0084FF')
    const colorDesc = useColorModeValue('#5B7A8A', '#898B8E')

    const toast = useToast()

    const handleSliderChange = (value) => {
        setSliderValue(value)
        
        const v = BigNumber.from(amount + "").mul(value).div(100);
        setStakeValue(v.toNumber())
    }

    const handleInputChange = (event) => {
        const value = event.target.value
        if (isNaN(value) || value == 0) {
            return;
        }
        if (value > amount) {
            setStakeValue(amount)
            setSliderValue(100)
        } else {
            setStakeValue(value)
            const v = BigNumber.from(value + "").mul(100).div(BigNumber.from(amount + ""))
            setSliderValue(+(parseFloat(v.toString()).toFixed(0)))
        }
    }

    const unstake = async () => {
        toast({
            position: 'top-right',
            duration: 10000000,
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
            const result = await ContractService.leaveStaking(stakeValue, signer);
            console.log(result)
            closeModal();
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"success"} 
                    title={"Unstaked!"} 
                    description={"Your funds have been staked in the pool."} />)
              })
            location.reload();
        } catch(err) {
            console.log('unstaking', err);
            toast.closeAll();
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"error"} 
                    title={"Error"} 
                    description={"There has some issue happened."} />)
              })
        } finally {
            setInTransaction(false)
        }
    }

    const fetchAmount = async () => {
        const result = await ContractService.userStakingAmount(address, signer);
        setAmount(result);
    };

    const closeModal = () => {
        onClose()
        props.onClose()
    }

    useEffect(() => {
        setUsdValue(flareUsdRate * stakeValue)
    }, [stakeValue])

    useEffect(() => {
        if (isConnected) {
            fetchAmount();

            const fetchWeek = async () => {
                const result = await ContractService.userLockStakingTime(address, signer);
                console.log('week', result[2].toNumber(), result[1])
                const rest = result[2] - result[1];
                setRemainDate(timeDown(rest))
            };

            fetchWeek();
        }
        
    }, [isConnected]);

    useEffect(() => {
        if (props.openModal) {
            setSliderValue(0)
            setStakeValue(0)
            onOpen()
        } else {
            onClose()
        }
    }, [props.openModal])

    return (<>
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent bg={bgModal}>
                <ModalHeader color={colorHeader}>Unstake</ModalHeader>
                <ModalCloseButton color={colorHeader} />
                <ModalBody>
                    <Flex className="flex-col gap-2">
                        <Flex>
                            <Text className="grow text-[#5B7A8A] text-xs font-medium" color={colorDesc}>
                                Unstake
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
                            Balance: {amount} Flare
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
                        <Flex className="flex-row">
                            <Flex className="flex-col gap-2 grow text-xs text-[#676768]">
                                <Text>Unstaking Fee</Text>
                                <Text>0.1% unstaking fee before</Text>
                            </Flex>
                            <Flex className="flex-col gap-2 items-end grow text-xs" color={colorHeader}>
                                <Text>0.0000 FLARE</Text>
                                <Text>{remainDate}</Text>
                            </Flex>
                        </Flex>

                        <Button
                            size="lg"
                            bg={bgBtn}
                            color={"white"}
                            borderColor={bgBtn}
                            borderRadius={"22px"}
                            height={"38px"}
                            // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                            onClick={unstake}
                            disabled={!stakeValue || stakeValue <= 0 || inTransaction }
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

export default UnstakeModal