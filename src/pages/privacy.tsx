import { Text, Box, UnorderedList, ListItem } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import React from 'react';

const Privacy = () => {
  return (<>
    <FramePage>
      <Box as="h1" fontSize="xl" fontWeight="bold" mt={10} textAlign="center">MetaFlare Protocol Privacy Policy</Box>
      <Text fontSize="sm" mx={10} my={2} textAlign="center"> Last Updated: [10/06/2023] </Text>

      <Text fontSize="sm" mx={10} mb={8}>This Privacy Policy explains how MetaFlare (collectively, "MetaFlare," "we," "us," or "our") collect, use, share, and protect your information when you use our services (collectively, the “Services”), which include the MetaFlare Protocol, our website, and any other features, apps, or services we offer. Please read this Privacy Policy carefully. By using our Services, you acknowledge that you have read and agreed to this Privacy Policy.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >1. Information We Collect</Box>
      <Text fontSize="sm" mx={10} my={2}>We collect information you provide when you use our Services, including when you sign up for an account, create or share content, and message or communicate with others. This can include information in or about the content you provide. </Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >2. How We Use Your Information</Box>
      <Text fontSize="sm" mx={10} my={2}>We are committed to delivering a meaningful and personalized experience for you. This means we use the information we have to:</Text>
      <UnorderedList fontSize="sm" mx={20} my={2}>
        <ListItem>Provide, improve, and develop Services.</ListItem>
        <ListItem>Communicate with you.</ListItem>
        <ListItem>Promote safety and security.</ListItem>
      </UnorderedList>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >3. How Your Information is Shared</Box>
      <Text fontSize="sm" mx={10} my={2}>We will not share the personal information we collect about you with any third party for their own marketing purposes without your consent. We do not sell, license or share information that individually identifies our customers with companies, organizations or individuals outside of MetaFlare.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >4. Security</Box>
      <Text fontSize="sm" mx={10} my={2}>We use appropriate technical and organizational measures designed to protect the personal information that we collect and process about you. The measures we use are designed to provide a level of security appropriate to the risk of processing your personal information.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >5. Your Rights</Box>
      <Text fontSize="sm" mx={10} my={2}>You have the right to request access to your personal information, to have your personal information corrected, restricted or removed, and to object to our processing of your personal information.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >6. Changes to our Privacy Policy</Box>
      <Text fontSize="sm" mx={10} my={2}>We may update this Privacy Policy from time to time, so please review it frequently. We will notify you before we make changes to this policy and give you the opportunity to review the revised policy before deciding whether to continue using our Services.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >7. Contact Us</Box>
      <Text fontSize="sm" mx={10} my={2}>If you have any questions about this Privacy Policy, please contact us at email.</Text>

      <Text fontSize="sm" mx={10} mt={8}>NOTE: This is a basic template and might not cover all legal aspects necessary. It is highly recommended to consult with a lawyer when creating the final version of the Privacy Policy. This will help ensure that you are adequately protecting your interests and limiting your liability.</Text>
    </FramePage>
  </>)
}

export default Privacy