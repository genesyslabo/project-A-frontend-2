import React, { useEffect, useState } from 'react';
import { Box, Button, Image, Text, Flex, IconButton, useBreakpointValue, useToast } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { LandService } from '../service/landService';
import { useAccount, useSigner } from "wagmi";
import CustomToast from './CustomToast';

interface LandData {
  price: number;
  maxNumber: number;
}

const BuyLand: React.FC = () => {
  const [landData, setLandData] = useState<LandData>({ price: 5000, maxNumber: 0 });
  const [quantity, setQuantity] = useState(0);
  const {data: signer} = useSigner();
  const { isConnected, address } = useAccount();
  const [inTransaction, setInTransaction] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const data = await LandService.getLandPriceAndNumber(signer, address);
      setLandData(data);
    };
    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);

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
    if (quantity === 0) {
      return;
    }

    try {
      setInTransaction(true);
      toast({
        position: 'top-right',
        duration: 1000000,
        render: () => (<CustomToast status={"info"} 
            title={"Transacting!"} 
            description={"The transaction is in progress, please waiting..."} />)
      })
      await LandService.buyLand(signer, address, landData.price, quantity);
      setTimeout(function() {
          location.reload();
      }, 20000);
    } catch(err) {
        toast.closeAll();
        setInTransaction(false);
        console.log('staking', err);
        toast({ 
            position: 'top-right',
            render: () => (<CustomToast status={"error"} 
                title={"Error"} 
                description={"There has some issue happened."} />)
          })
    }
  };

  const width = useBreakpointValue({ base: "70%", md: "50%" });

  const fontSize = useBreakpointValue({ base: "sm", md: "lg" });

  return (
    <Box width={width} margin="0 auto">
      <Image src="/assets/images/land-land.png" w="full" className='my-4' />
      <Box>
        <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between" p={2} >
          <Text color="white" fontWeight="medium" fontSize={fontSize} style={{wordWrap: "break-word"}}>{landData.price} USDT</Text>
          <Text color="#5B6676" fontSize={fontSize} style={{wordWrap: "break-word"}}>Original price: 5000 USDT</Text>
        </Flex>
      </Box>
      <Flex justifyContent="center" alignItems="center" my={4}>
        <IconButton aria-label="Decrease" icon={<MinusIcon />} onClick={handleDecrease} />
        <Text mx={4}>{quantity}</Text>
        <IconButton aria-label="Increase" icon={<AddIcon />} onClick={handleIncrease} />
      </Flex>
      <Button size="sm" fontWeight="medium" bg="#0084FF" color="white" w="full" 
        onClick={handleBuyAndMint} 
        disabled={inTransaction || quantity === 0}>
        Buy and mint
      </Button>
    </Box>
  );
};

export default BuyLand;
