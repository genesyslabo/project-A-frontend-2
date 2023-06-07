import { Accordion, Avatar, Select, Box, Image, Flex, Grid, HStack, Spacer, Text, Button, useBreakpointValue, Link } from "@chakra-ui/react"
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
        src="/assets/images/land-person.png"
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
        Snoop Dogg
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
        Access to Snoop Dogg's lifestyle: attend Snoop's private metaverse parties, get access to exclusive NFTs, and enjoy priceless experiences.
      </Text>
    </Box>
  );
};

const Land = () => {

  return (<>
    <FramePage menu="land">
      <Upper />
    </FramePage>
  </>)
}

export default Land