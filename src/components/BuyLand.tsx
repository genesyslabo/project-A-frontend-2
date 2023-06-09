import React, { useEffect, useState } from 'react';
import { Box, Button, Image, Text, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { LandService } from '../service/landService';

interface LandData {
  price: number;
  maxNumber: number;
}

const BuyLand: React.FC = () => {
  const [landData, setLandData] = useState<LandData>({ price: 0, maxNumber: 0 });
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await LandService.getLandPriceAndNumber();
      setLandData(data);
    };
    fetchData();
  }, []);

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < landData.maxNumber) {
      setQuantity(quantity + 1);
    }
  };

  const handleBuyAndMint = async () => {
    await LandService.buyLand(landData.price, quantity);
  };

  return (
    <Box width="50%" margin="0 auto">
      <Image src="/assets/images/land-land.png" w="full" />
      <Flex justifyContent="space-between">
        <Text>Price: {landData.price} USDT</Text>
        <Text>Original price: 5000 USDT</Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center" my={4}>
        <IconButton aria-label="Decrease" icon={<MinusIcon />} onClick={handleDecrease} />
        <Text mx={4}>{quantity}</Text>
        <IconButton aria-label="Increase" icon={<AddIcon />} onClick={handleIncrease} />
      </Flex>
      <Button size="sm" fontWeight="medium" bg="#0084FF" color="white" w="full" onClick={handleBuyAndMint}>
        Buy and mint
      </Button>
    </Box>
  );
};

export default BuyLand;
