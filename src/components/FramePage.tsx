import {Header} from "../components/Header";
import React, { PropsWithChildren } from "react";
import 'react-reflex/styles.css'
import { Container, Flex } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";

export const FramePage: React.FC<PropsWithChildren<{
    menu?: string
}>> = (
    props
) => {
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