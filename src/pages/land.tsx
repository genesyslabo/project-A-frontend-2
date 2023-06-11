import { Box, Image, Flex, Text, useBreakpointValue } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import React from 'react';
import BuyLand from "../components/BuyLand"
import ImageCarousel from "../components/ImageCarousel";

const Upper = () => {
  const height = useBreakpointValue({ base: "160px", md: "200px" })
  const p1Height = useBreakpointValue({ base: "80px", md: "140px" })
  const p2Hight = useBreakpointValue({ base: "100px", md: "160px" })
  const boxW = useBreakpointValue({ base: "100vw", md: "full" })
  const boxLeft = useBreakpointValue({ base: "-16px", md: "0px" })

  return (<>
    <Flex className="relative">
      <Image
        src="/assets/images/marketplace-head.png"
        objectFit="cover"
        w="full"
        h={height}
      />
      <Image
        src="/assets/images/land-person.png"
        position="absolute"
        className="left-8 md:left-28 lg:left-50"
        bottom={"-50px"}
        h={p1Height}
        mx={"auto"}
      />
      <Flex position="absolute" className="right-8 md:right-28 lg:right-50" bottom={0}>
        <Image
          src="/assets/images/land-people.png"
          h={p2Hight}
        />
      </Flex>
    </Flex>

    <Box w={boxW} marginLeft={boxLeft} className='mx-auto px-8 md:px-28 lg:px-50 mt-[60px]'>
      <Text
        color="white"
        fontSize="18px"
        p={3}
        fontWeight="bold"
      >
        MetaFlare Land
      </Text>
      <Text
        color="#898B8E"
        fontSize="12px"
        fontWeight="normal"
        p={3}
      >
        Purchase land to build your own digital home and embark on a new era of digital social interaction.
      </Text>

      <LandImage />
    </Box>
  </>
  );
};

const LandImage = () => {
  const images = useBreakpointValue({ base: [
    '/assets/images/land-image-mobile-01.jpg',
    '/assets/images/land-image-mobile-02.jpg',
  ], md: [
    '/assets/images/land-image-01.png',
    '/assets/images/land-image-02.png',
  ] });
  return (
    <ImageCarousel images={images} />
  )
}

const Land = () => {

  return (<>
    <FramePage menu="land">
      <Upper />
      <Flex className="justify-center mt-10">
        <BuyLand />
      </Flex>
    </FramePage>
  </>)
}

export default Land
