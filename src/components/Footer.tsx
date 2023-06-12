import React from 'react';
import { Box, Flex, Image, Spacer, useColorModeValue, Link} from '@chakra-ui/react';

export function Footer() {
    const bg = useColorModeValue('#000000', '#1A1D29')

    return (
        <>
            <Box className={`w-full flex text-white justify-center items-center text-xs font-['PingFangSC-Regular']`} bg={bg}>
                <Box className='flex flex-col w-full md:!w-10/12 lg:!w-9/12 p-4'>
                    <Flex className='w-full flex-col md:flex-row gap-4 md:gap-8 justify-between items-start md:items-center'>
                        <Link href="/whitepaper"><Box>White Paper</Box></Link>
                        <Link href="/faq"><Box>FAQ</Box></Link>
                        <Link href="/terms"><Box>Terms of use</Box></Link>
                        <Link href="/privacy"><Box>Privacy Policy</Box></Link>
                        <Spacer />
                        <Box className='flex flex-row gap-6'>
                            <Link href="https://twitter.com/MetaFlareweb3">
                                <Box className='py-4 w-8 cursor-pointer image-link'>
                                    <Image src='/assets/images/icon-twitter.png' />
                                </Box>
                            </Link>
                            <Box className='py-4 w-8 image-link'>
                                <Image src='/assets/images/icon-youtube.png' />
                            </Box>
                            <Box className='py-4 w-8 image-link'>
                                <Image src='/assets/images/icon-medium.png' />
                            </Box>
                        </Box>
                    </Flex>
                    <Flex className='text-xs'>
                        &copy;Metaflare 2023
                    </Flex>
                </Box>
            </Box>
        </>
    );
}