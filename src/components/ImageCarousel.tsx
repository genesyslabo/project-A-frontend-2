import React, { useState, useEffect } from 'react';
import { Box, Image, Button } from '@chakra-ui/react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box maxW="100%" maxH={"100px"} mx="auto" position="relative">
      <Image
        src={images[currentIndex]}
        alt={`Image ${currentIndex}`}
        borderRadius="md"
        boxShadow="md"
        h="100%"
        w="100%"
        objectFit="cover"
      />
      <Box position="absolute" bottom={2} left="50%" transform="translateX(-50%)" display="flex">
        {images.map((_, index) => (
          <Button
            key={index}
            w={index === currentIndex ? '26px' : '8px'}
            h="8px"
            borderRadius="full"
            minW={"8px !important"}
            bg={index === currentIndex ? '#FDC215' : '#616161'}
            mx={1}
            p={0}
            _hover={{ bg: '#FDC215' }}
            _focus={{ boxShadow: 'none' }}
            onClick={() => selectImage(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
