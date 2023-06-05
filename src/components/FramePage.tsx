import {Header} from "../components/Header";
import React, { PropsWithChildren, useEffect } from "react";
import 'react-reflex/styles.css'
import { Container, Flex, useColorMode } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";
import { disconnect } from '@wagmi/core'

export const FramePage: React.FC<PropsWithChildren<{
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

    useEffect(() => {
        // @ts-ignore
        window.ethereum?.on('accountsChanged', async (accounts: string[]) => {
            console.log("account changed.");

            await disconnect();
            location.reload();
        });

        // @ts-ignore
        window.ethereum?.on('chainChanged', async (accounts: string[]) => {
            console.log("chain changed.");

            await disconnect();
            location.reload();
        });
    }, [])

    return (<>
        <Flex className="w-full min-h-screen flex flex-col gap-0">
            <Header menu={props.menu} />
            <Flex className="w-full flex-row">
                <SideBar menu={props.menu} />

                <Container
                    className="grow w-full h-full md:!px-28 lg:!px-50 !max-w-full px-8 mt-12 md:!ml-[72px] mb-[20px]" 
                    minH={{ sm: "80%", md: "100vh" }}
                    >
                    { props.children }
                </Container>
            </Flex>
            <Footer />
        </Flex>
    </>)
}