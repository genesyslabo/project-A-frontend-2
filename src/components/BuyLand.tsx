import React, { useEffect, useState } from 'react';
import { Box, Button, Image, Text, Flex, IconButton, useBreakpointValue, useToast, Input } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { LandService } from '../service/landService';
import { useAccount, useSigner } from "wagmi";
import CustomToast from './CustomToast';
import styled from 'styled-components';


const CustomBox = styled.div`
  background-color: #242A33;
  border-radius: 8px;
  height: 390px;
  width: 260px;
  position: relative;
  &:hover {
    button {
      display: block !important;
    }
  }
`;

interface LandData {
  price: number;
  maxNumber: number;
  maxBuyNumber: number;
}

const BuyLand: React.FC = () => {
  const [landData, setLandData] = useState<LandData>({ price: 5000, maxNumber: 0, maxBuyNumber: 0 });
  const [quantity, setQuantity] = useState(0);
  const [remain, setRemain] = useState(0);
  const {data: signer} = useSigner();
  const { isConnected, address } = useAccount();
  const [inTransaction, setInTransaction] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const data = await LandService.getLandPriceAndNumber(signer, address);
      setLandData(data);
      setRemain(data.maxNumber);
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
    if (quantity < landData.maxBuyNumber) {
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

  const quantityChange = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value <= 0 || value > landData.maxBuyNumber) {
        setQuantity(0);
        return;
    }
    setQuantity(parseInt(value));
  }
  
  useEffect(() => {
    setRemain(landData.maxNumber - quantity);
  }, [quantity])

  const fontSize = useBreakpointValue({ base: "sm", md: "lg" });

  return (
    <CustomBox>
      <Image src="/assets/images/land-land.jpg" w="full" className='!w-[260px] h-[240px] rounded-t-lg' />

      <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between" p={2} className="items-center">
        <Text color="white" fontWeight="medium" fontSize={fontSize} style={{wordWrap: "break-word"}}>{landData.price} USDT</Text>
        <Text color="#5B6676" style={{wordWrap: "break-word"}} className='text-xs line-through'>Original Price: 5000 USDT</Text>
      </Flex>

      <Flex className='flex-row gap-2 items-center'>
        <Flex alignItems="center" my={2} ml={4} border={"1px solid rgba(91,102,118,1)"} h={"24px"} borderRadius={"4px"}>
          <IconButton aria-label="Decrease" icon={<MinusIcon fontSize={"10px"} />}
             bg={"transparent"} 
             _hover={{bg: "transparent"}} 
             _active={{bg: "transparent"}}
             onClick={handleDecrease} />
          <Text borderRight={"1px solid rgba(91,102,118,1)"} borderLeft={"1px solid rgba(91,102,118,1)"}>
            <Input variant='unstyled' placeholder='0' w={"50px"} textAlign={"center"} value={quantity} onChange={quantityChange} />
          </Text>
          <IconButton aria-label="Increase" icon={<AddIcon fontSize={"10px"} />} 
            bg={"transparent"} 
            _hover={{bg: "transparent"}} 
            _active={{bg: "transparent"}}
            onClick={handleIncrease} />
        </Flex>
        <Text className='text-[#5B6676] text-xs'>{remain} left</Text>
      </Flex>

      <Flex className='text-[#FF2424] text-xs' mb={2} mx={4} display={quantity == landData.maxBuyNumber ? "flex !important":"none !important"}>
        maximum reached
      </Flex>

      <Button size="sm" fontWeight="medium" bg="#0084FF" color="white" w="full" 
        onClick={handleBuyAndMint} 
        className='!block md:!hidden !absolute bottom-0'
        disabled={inTransaction || quantity === 0}>
        Buy and mint
      </Button>
    </CustomBox>
  );
};

export default BuyLand;
