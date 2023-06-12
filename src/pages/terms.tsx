import { Text, Box, UnorderedList, ListItem } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import React from 'react';

const Terms = () => {
  return (<>
    <FramePage>
      <Box as="h1" fontSize="xl" fontWeight="bold" mt={10} textAlign="center">MetaFlare Protocol Terms of Use</Box>
      <Text fontSize="sm" fontWeight="bold" mx={10} my={8}>PLEASE READ THESE TERMS OF USE CAREFULLY. BY ACCESSING OR USING THE METAREFLARE PROTOCOL, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS DESCRIBED HEREIN AND ALL TERMS INCORPORATED BY REFERENCE. </Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >1. Acceptance of Terms</Box>
      <Text fontSize="sm" mx={10} my={2}>These Terms of Use apply to your access to, and use of, the MetaFlare Protocol, a decentralized metaverse platform operated by MetaFlare. These Terms do not alter in any way the terms or conditions of any other agreement you may have with MetaFlare. </Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >2. Eligibility</Box>
      <Text fontSize="sm" mx={10} my={2}>By agreeing to these Terms, you represent and warrant that you are at least 18 years of age, have not been previously suspended or removed from the MetaFlare Protocol, and that your registration and your use of the MetaFlare Protocol is in compliance with any and all applicable laws and regulations.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >3. Privacy Policy</Box>
      <Text fontSize="sm" mx={10} my={2}>Please refer to our Privacy Policy for information about how we collect, use and disclose your information.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >4. Content</Box>
      <Text fontSize="sm" mx={10} my={2}>The MetaFlare Protocol allows you to create and post content, including, but not limited to, digital assets, virtual lands, and other materials. Anything that you post or otherwise make available on the Protocol is referred to as "User Content."</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >5. Intellectual Property Rights</Box>
      <Text fontSize="sm" mx={10} my={2}>Unless otherwise indicated by us, all elements of the MetaFlare Protocol, including the MetaFlare logo, and all designs, text, graphics, images, and other content are the proprietary property of MetaFlare or our licensors. </Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >6. Prohibited Conduct</Box>
      <Text fontSize="sm" mx={10} my={2}>By using the MetaFlare Protocol you agree not to:</Text>
      <UnorderedList fontSize="sm" mx={20} my={2}>
        <ListItem>Use the Protocol for any illegal purpose, or in violation of any local, state, national, or international law.</ListItem>
        <ListItem>Violate or infringe other people's intellectual property, privacy, or other rights.</ListItem>
        <ListItem>Harass, threaten, demean, embarrass, or otherwise harm any other user of the Protocol.</ListItem>
        <ListItem>Use the Protocol in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying the Protocol, or that could damage, disable, overburden or impair the functioning of the Protocol in any manner.</ListItem>
        <ListItem>Attempt to access or search the Protocol or download content from the Protocol through the use of any technology or means other than those provided by us or other generally available third party web browsers.</ListItem>
      </UnorderedList>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >7. Termination</Box>
      <Text fontSize="sm" mx={10} my={2}>If you violate any of these Terms, your permission to use the MetaFlare Protocol will automatically terminate. MetaFlare reserves the right to revoke your access to and use of the Protocol at any time, with or without cause.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >8. Changes to Terms</Box>
      <Text fontSize="sm" mx={10} my={2}>MetaFlare may alter the Terms at any time, so please review them frequently. If a change is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</Text>

      <Box as="h2" fontSize="md" fontWeight="bold" mx={10} my={5} >9. Contact Information</Box>
      <Text fontSize="sm" mx={10} my={2}>If you have any questions about these Terms or the MetaFlare Protocol, please contact MetaFlare at email.</Text>

      <Text fontSize="sm" fontWeight="bold" mx={10} mt={10}>BY USING THE METAREFLARE PROTOCOL, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE AND AGREE TO BE BOUND BY THEM.</Text>
      <Text fontSize="sm" mx={10} my={2}> Last Updated: [10/06/2023] </Text>

      <Text fontSize="sm" mx={10} mt={8}>NOTE: This is a basic template and might not cover all legal aspects necessary. It is highly recommended to consult with a lawyer when creating the final version of the Terms of Use. This will help ensure that you are adequately protecting your interests and limiting your liability.</Text>
    </FramePage>
  </>)
}

export default Terms
