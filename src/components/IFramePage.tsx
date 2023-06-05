import {Header} from "./Header";
import React, { PropsWithChildren, useEffect } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";

export const IFramePage: React.FC<PropsWithChildren<{
    menu?: string
}>> = (
    props
) => {
    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {
        if (colorMode !== 'dark') {
            toggleColorMode();
        }
    }, [colorMode])

    return (
        <Flex direction="column" minH="100vh">
            <Header menu={props.menu} />
            <Flex flex={1} overflow="hidden">
                <SideBar menu={props.menu} />
                <Box flex={1} ml="72px" mt="36px">
                    <iframe 
                        src="https://d1bekmjdbsu87s.cloudfront.net/"
                        title={props.menu}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                </Box>
            </Flex>
        </Flex>
    )
}
