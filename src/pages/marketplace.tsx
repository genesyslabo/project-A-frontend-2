import { Accordion, Avatar, Select, Box, Image, Flex, Grid, HStack, Spacer, Text, Button, useBreakpointValue } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import React from 'react';
import Listings from "../components/Listings"

const Upper = () => {
  const height = useBreakpointValue({ base: "160px", md: "200px" })
  const p1Height = useBreakpointValue({ base: "80px", md: "140px" })
  const p1Bottom = useBreakpointValue({ base: "130px", md: "80px" })
  const p2Hight = useBreakpointValue({ base: "100px", md: "160px" })
  const p2Bottom = useBreakpointValue({ base: "160px", md: "120px" })
  const t1Bottom = useBreakpointValue({ base: "80px", md: "35px" })
  const boxW = useBreakpointValue({ base: "100vw", md: "full" })
  const boxLeft = useBreakpointValue({ base: "-16px", md: "0px" })

  return (
    <Box w={boxW} marginLeft={boxLeft} position="relative" h="320px" bg="black">
      <Image
        src="/assets/images/marketplace-head.png"
        objectFit="cover"
        w="full"
        h={height}
        position="absolute"
      />
      <Image
        src="/assets/images/marketplace-person.png"
        position="absolute"
        left="20px"
        bottom={p1Bottom}
        h={p1Height}
      />
      <Flex position="absolute" right="20px" bottom={p2Bottom}>
        <Image
          src="/assets/images/marketplace-people.png"
          h={p2Hight}
        />
      </Flex>
      <Text
        position="absolute"
        bottom={t1Bottom}
        color="white"
        fontSize="18px"
        p={3}
        fontWeight="bold"
        left="20px"
      >
        MetaFlareOG
      </Text>
      <Text
        position="absolute"
        bottom="0px"
        color="#898B8E"
        fontSize="12px"
        fontWeight="normal"
        p={3}
        left="20px"
      >
        To honor the pioneers of our journey, we introduce MetaFlareOG - a special edition NFT airdropped exclusively to early adopters of MetaFlare.
      </Text>
    </Box>
  );
};

const Offer = () => {
  return (
    <Button
      w="calc(100% - 40px)"
      h="40px"
      mt="10px"
      borderRadius="24px"
      backgroundColor="#0084FF"
      color="white"
      fontSize="14px"
      marginLeft="20px"
      marginRight="20px"
    >
      Make Collection Offer
    </Button>
  )
}

const MarketPlace = () => {

  return (<>
    <FramePage menu="marketplace">
      <Upper />
      <Listings />
      <Offer />
    </FramePage>
  </>)
}

export default MarketPlace
