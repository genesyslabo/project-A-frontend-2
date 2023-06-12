import { Text, Box } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import React from 'react';

const FAQ = () => {
  return (<>
    <FramePage>
        <Box as="h1" fontSize="xl" fontWeight="bold" mt={10} textAlign="center">MetaFlare Protocol FAQs</Box>

        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >1. What is MetaFlare?</Box>
        <Text fontSize="sm" mx={10} my={2}>MetaFlare is a cutting-edge metaverse platform where you can build, explore, and interact within your own virtual spaces. It is powered by advanced blockchain technology and offers a limitless playground for creativity, exploration, and connection.</Text>

        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >2. How do I join MetaFlare?</Box>
        <Text fontSize="sm" mx={10} my={2}>Simply visit our website or download our application, sign up for an account, and start your journey in the metaverse! </Text>

        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >3. Is MetaFlare free to use?</Box>
        <Text fontSize="sm" mx={10} my={2}>Yes, it is free to join MetaFlare. However, certain premium features and functionalities may require payment. </Text>
        
        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >4. What is METAFLARE token?</Box>
        <Text fontSize="sm" mx={10} my={2}>METAFLARE token is our native digital asset that can be used for transactions within the MetaFlare universe. You can earn, buy, and spend METAFLARE tokens on various activities in the metaverse.</Text>
        
        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >5. How do I earn METAFLARE tokens?</Box>
        <Text fontSize="sm" mx={10} my={2}>There are several ways to earn METAFLARE tokens, such as participating in in-world activities, trading assets with other users, and contributing to the community.</Text>
        
        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >6. How can I buy METAFLARE tokens?</Box>
        <Text fontSize="sm" mx={10} my={2}>METAFLARE tokens will be available for purchase on various cryptocurrency exchanges. For the latest information, please refer to our official announcements.</Text>
        
        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >7. How secure is MetaFlare?</Box>
        <Text fontSize="sm" mx={10} my={2}>Security is our top priority. We use advanced security measures, including blockchain technology, to ensure the safety and privacy of your data and assets.</Text>
        
        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >8. What can I do in MetaFlare?</Box>
        <Text fontSize="sm" mx={10} my={2}>The possibilities are limitless! You can create your own virtual spaces, explore worlds created by others, interact with friends, launch virtual businesses, play games, and much more.</Text>
        
        <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >9. What if I need help or have more questions?</Box>
        <Text fontSize="sm" mx={10} my={2}>If you have any further questions or need assistance, feel free to reach out to our support team via our website or email us at email.</Text>

        <Text fontSize="sm" fontWeight="bold" mx={10} my={5}>Please note that these FAQs are subject to change and may be updated from time to time. Always refer to our official website for the latest information.</Text>
    </FramePage>
  </>)
}

export default FAQ
