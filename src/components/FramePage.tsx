import {Header} from "../components/Header";
import React, { PropsWithChildren } from "react";
import 'react-reflex/styles.css'
import { Container, Flex, Grid, Image, Spacer, useColorModeValue } from "@chakra-ui/react";
import { Footer } from "./Footer";
import Link from "next/link";


export const FramePage: React.FC<PropsWithChildren<{
    menu?: string
}>> = (
    props
) => {
    const bg = useColorModeValue('#BEF6FF', '#1A1D29')
    const colorBorder = useColorModeValue('white', 'rgba(40,45,55,1)')
    return (<>
            <Flex className="w-full min-h-screen flex flex-col gap-0">
                <Header menu={props.menu} />
                <Flex className="w-full flex-row">
                    <Flex className="flex-col gap-4 w-[72px] !hidden md:!flex mt-[48px] items-center pt-4" bg={bg} border={"1px solid"} borderColor={colorBorder}>
                        <Grid className="gap-8 grid-cols-1 cursor-pointer">
                            <Link href={"/"}><Image src="/assets/images/airdrop-active.png" /></Link>
                            <Link href={"/airdrop"}><Image src="/assets/images/airdrop-active.png" /></Link>
                            <Link href={""}><Image src="/assets/images/airdrop-active.png" /></Link>
                            <Link href={""}><Image src="/assets/images/airdrop-active.png" /></Link>
                            <Link href={""}><Image src="/assets/images/airdrop-active.png" /></Link>
                            <Link href={""}><Image src="/assets/images/airdrop-active.png" /></Link>
                        </Grid>
                        <Spacer />
                    </Flex>

                    <Container 
                        mb={20} 
                        className="grow w-full md:!w-10/12 lg:!w8/12 !max-w-full px-8 mt-12" 
                        h={"100%"} 
                        minH={{ sm: "80%", md: "100vh" }}
                        >
                        { props.children }
                    </Container>
                </Flex>
                <Footer />
            </Flex>
        </>)
}