import React, { useEffect, useState } from 'react';
import { Select, Box, Grid, Button, useBreakpointValue, Text, Link, VStack, Image } from "@chakra-ui/react"
import { MarketService } from '../service/marketService';

const Listings = () => {
  const [sortBy, setSortBy] = useState("Price low to high");
  const [NFTs, setNFTs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const width = useBreakpointValue({ base: "260px", md: "350px" });
  const gridTemplateColumns = useBreakpointValue({ base: "repeat(2, 1fr)", md: "repeat(6, 1fr)" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const sortOrder = sortBy === "Price low to high" ? 'asc' : 'desc';
        const data = await MarketService.getNFTs(sortOrder);
        setNFTs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
      </Select>

      <Grid mt="10px" templateColumns={gridTemplateColumns} gap="10px" paddingX="20px">
        {NFTs && NFTs.map((nft, index) => (
          <Box key={index} border="1px" borderColor="whiteAlpha.200" borderRadius="md" overflow="hidden" backgroundColor="blackAlpha.200" _hover={{ bg: "blackAlpha.300" }}>
            <Image src={nft.image} alt="NFT" w="100%" objectFit="cover"/>
            <VStack align="start" mt={2}>
              <Text color="white" fontSize="sm" fontWeight="bold">{nft.id}</Text>
              <Text color="white" fontSize="sm" fontWeight="bold">{nft.priceWithSymbol}</Text>
              <Link href={nft.purchaseLink} isExternal color="blue.500" _hover={{ textDecoration: 'none' }}>
                <Button colorScheme="blue" size="sm" mt={2} width="100%" bg="#0084FF" color="white">Buy now</Button>
              </Link>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Listings;

