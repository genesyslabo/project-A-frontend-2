import { Accordion, Avatar, Box, Flex, Grid, HStack, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import React, { useState } from "react"
import FlexiblePanel from "../components/staking/FlexiblePanel"
import LockFlexiblePanel from "../components/staking/LockFlexiblePanel"
import FlareToLock from "../components/staking/LockStakingModal"
import { TotalStakingAmount } from "../components/staking/TotalStakingAmount"


const DepositsPanel = () => {
    const [isFlareToLockOpen, setFlareToLockOpen] = useState(false);

    return (
        <>
            <FlareToLock openModal={isFlareToLockOpen} onClose={() => setFlareToLockOpen(false)} />

            <Accordion defaultIndex={[0]} allowMultiple className="w-full">
                <FlexiblePanel />
                <LockFlexiblePanel />
            </Accordion>
        </>
    );
}

const Staking = () => {
    const bgHeader = useColorModeValue('white', '#242A33')
    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')
    const colorTitle = useColorModeValue('darkgreen', '#0084FF')

    return (<>
        <FramePage menu="staking">
            <Flex className="flex flex-col justify-center items-center pt-4 mx-auto px-8 md:px-28 lg:px-50">
                <Box className="w-full flex flex-col md:flex-row gap-2 justify-between rounded-2xl p-4" bg={bgHeader}>
                    <Box className="flex flex-row gap-2 items-center">
                        <Box>
                            <Avatar src="/assets/images/avatar.png" size={"lg"} />
                        </Box>
                        <Box className="flex flex-col gap-0">
                            <Text className="font-bold text-base" color={colorHeader}>STAKE MF</Text>
                            <Text className="text-xs" color={colorDesc}>Stake your MF to get more reward</Text>
                            <Text className="text-xs underline" color={colorHeader}>Learn More</Text>
                        </Box>
                    </Box>
                    <Grid className="grid-cols-1 gap-2 md:gap-x-20">
                        <Box className="text-xl font-medium" color={colorHeader}>
                            <TotalStakingAmount />
                        </Box>
                        {/* <Box className="text-xl font-medium" color={colorHeader}>911</Box> */}
                        <Box className="text-xs" color={colorHeader}>Total staked</Box>
                        {/* <Box className="text-xs" color={colorHeader}>Total reward</Box> */}
                    </Grid>
                </Box>

                <HStack className="w-full mt-4 mb-2">
                    <Box className="text-[24px] font-bold" color={colorTitle}>Vesting</Box>
                    <Spacer />
                    {/* <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList borderRadius={"var(--chakra-radii-full)"} bg={"white"}>
                            <CustomSwitchTab text="Live" />
                            <CustomSwitchTab text="Finished" />
                        </TabList>
                    </Tabs> */}
                </HStack>

                <DepositsPanel />
            </Flex>
        </FramePage>
    </>)
}

export default Staking