import React from 'react';
import { Box, Button, Flex, Image, Spacer, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import Link from 'next/link';
import { CustomConnectButton } from './CustomConnectButton';
import { DarkModeSwitch } from './DarkModeSwitch';

export function Header(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const bg = useColorModeValue('#BEF6FF', '#1A1D29')
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')
    const bgMobileMenu = useColorModeValue('#D5FAFF', '#1A1D29')
    const colorText = useColorModeValue('#6E8A99', 'white')
    const colorHighlight = useColorModeValue('darkgreen', '#0084FF')

    return (
        <>
            <Box as='nav' bg={bg} className="w-full flex fixed z-20 top-0 left-0 justify-between items-center">
                <Flex className='w-full gap-4 px-8 md:px-4 h-12 justify-between items-center mx-auto'>
                    {/* <Avatar bg={"#02715F"} name='Logo' size={"sm"} src='/' /> */}
                    <Link href={"/"}><Image src='/assets/logo.png' className='cursor-pointer' /></Link>
                    {/* <Tabs position="relative" 
                        variant="unstyled" 
                        className="w-full !hidden md:!block" 
                        size={"lg"} 
                        index={tabIndex}
                        onChange={handleTabsChange}>
                        <TabList gap={6}>
                            <CustomTab textSize='!text-base' text="ENTRANCE" />
                            <CustomTab textSize='!text-base' text="ABOUT" />
                            <CustomTab textSize='!text-base' text="AIRDROP" />
                        </TabList>
                        <TabIndicator
                            mt="-12.5px"
                            height="2px"
                            bg="darkgreen"
                            width={10}
                            borderRadius="1px"
                            />
                    </Tabs> */}
                    <Spacer />
                    
                    {/* <CustomConnectButton /> */}

                    <DarkModeSwitch />

                    <Image src={ isOpen ? "/assets/images/icon-close.png" : "/assets/images/icon-hamburger.png" }
                        onClick={isOpen ? onClose : onOpen} className='md:hidden w-4 ml-4' />

                    <Box>
                        <Button
                            size="sm"
                            bg={bgBtn}
                            ml={4}
                            minW={40}
                            color={"white"}
                            borderColor={bgBtn}
                            fontSize={14}
                            _hover={{ bg: bgBtn }}
                            className='!hidden md:!inline-flex grow'
                            _active={{
                                bg: bgBtn,
                                transform: "scale(0.98)",
                            }}
                        >
                            START EXPLORING
                        </Button>
                    </Box>
                </Flex>
            </Box>

            <Box className={
                isOpen ? 
                    "fixed top-12 left-0 bottom-0 z-50 !ml-0 flex flex-col justify-between py-8 px-8 pb-12 text-white transition-all duration-300 ease-in-out md:hidden right-0 -translate-x-0"
                    :
                    "fixed top-12 left-0 bottom-0 z-50 !ml-0 flex flex-col justify-between py-8 px-8 pb-12 text-white transition-all duration-300 ease-in-out md:hidden -translate-x-full"
            } bg={bgMobileMenu}>
                <Box as="ul" className="mb-8 flex flex-col justify-center space-y-8 font-bold text-[20px]" color={colorText}>
                    <Box as='li' color={props.menu == 'about' ? colorHighlight : ''}>
                       <Image src={`/assets/images/entrance${props.menu == 'about' ? '-hover' : ''}.png`} className='inline mr-2' /> Entrance
                    </Box>
                    <Box as='li' color={props.menu == 'about' ? colorHighlight : ''}>
                        <Image src={`/assets/images/entrance${props.menu == 'about' ? '-hover' : ''}.png`} className='inline mr-2' /> 
                        About
                    </Box>
                    <Box as='li' color={props.menu == 'team' ? colorHighlight : ''}>
                        <Image src={`/assets/images/theteam${props.menu == 'about' ? '-hover' : ''}.png`} className='inline mr-2' /> 
                        The Team
                    </Box>
                    <Box as='li' color={props.menu == 'staking' ? colorHighlight : ''}>
                        <Image src={`/assets/images/staking${props.menu == 'about' ? '-hover' : ''}.png`} className='inline mr-2' /> 
                        <Link href="/">
                            Staking
                        </Link>
                    </Box>
                    <Box as='li' color={props.menu == 'airdrop' ? colorHighlight : ''}>
                        <Image src={`/assets/images/airdrop${props.menu == 'about' ? '-hover' : ''}.png`} className='inline mr-2' /> 
                        <Link href="/airdrop">Airdrop</Link>
                    </Box>
                    <Box as='li' color={props.menu == 'marketplace' ? colorHighlight : ''}>
                        <Image src={`/assets/images/marketplace${props.menu == 'about' ? '-hover' : ''}.png`} className='inline mr-2' /> 
                        <Link href="/marketplace">Market place</Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
}