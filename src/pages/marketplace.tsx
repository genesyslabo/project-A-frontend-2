import { Accordion, Avatar, Select, Box, Image, Flex, Grid, HStack, Spacer, Text, Button, useBreakpointValue } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import React, { useState } from 'react';
import { ContractService } from '../service/contractService';

const Upper = () => {
  const height = useBreakpointValue({ base: "160px", md: "200px" })
  const p1Height = useBreakpointValue({ base: "80px", md: "140px" })
  const p1Bottom = useBreakpointValue({ base: "130px", md: "80px" })
  const p2Hight = useBreakpointValue({ base: "100px", md: "160px" })
  const p2Bottom = useBreakpointValue({ base: "160px", md: "120px" })
  const t1Bottom = useBreakpointValue({ base: "80px", md: "35px" })

  return (
    <Box position="relative" h="320px" bg="black">
      <Image
        src="/assets/images/marketplace-background.png"
        objectFit="cover"
        w="full"
        h={height}
        position="absolute"
      />
      <Image
        src="/assets/images/marketplace-person1.png"
        position="absolute"
        left="0"
        bottom={p1Bottom}
        h={p1Height}
      />
      <Flex position="absolute" right="0" bottom={p2Bottom}>
        <Image
          src="/assets/images/marketplace-person2.png"
          h={p2Hight}
        />
        <Image
          src="/assets/images/marketplace-person3.png"
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
      >
        Accesss to Snoop Dogg lifestyle: attend Snoop's parties, get access to exclusive NFTs, and enjoy priceless experiences.
      </Text>
    </Box>
  );
};


const Offers = () => {
  const [sortBy, setSortBy] = useState("Price low to high");
  const width = useBreakpointValue({ base: "260px", md: "350px" });
  const gridTemplateColumns = useBreakpointValue({ base: "repeat(2, 1fr)", md: "repeat(6, 1fr)" });
  // const imgWidth = useBreakpointValue({ base: "160px", md: "180px" });

  const images = new Array(12).fill(0).map((_, index) => `/assets/images/temp${index + 1}.png`);

  return (
    <Box p="10px">
      <Select
        backgroundColor="black"
        color="white"
        w={width}
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="Price low to high">Price low to high</option>
        <option value="Price high to low">Price high to low</option>
        <option value="Recently listed">Recently listed</option>
        <option value="Best offer">Best offer</option>
        <option value="Highest last sale">Highest last sale</option>
        <option value="Recent sold">Recent sold</option>
        <option value="Recently created">Recently created</option>
        <option value="Most viewed">Most viewed</option>
        <option value="Oldest">Oldest</option>
        <option value="Most favorited">Most favorited</option>
        <option value="Ending soon">Ending soon</option>
        <option value="Recently reveived">Recently reveived</option>
      </Select>

      {/* 列表数据 */}
      <Grid mt="10px" templateColumns={gridTemplateColumns} gap="10px">
        {images.map((imgSrc, index) => (
          <Image key={index} src={imgSrc} />
        ))}
      </Grid>
      <Button
        w="100%"
        h="40px"
        mt="10px"
        borderRadius="24px"
        backgroundColor="#0084FF"
        color="white"
        fontSize="14px"
      >
        Make Collection Offer
      </Button>
    </Box>
  );
};



const MarketPlace = () => {

  return (<>
    <FramePage menu="marketplace">
      <Upper />
      <Offers />
    </FramePage>
  </>)
}

export default MarketPlace
