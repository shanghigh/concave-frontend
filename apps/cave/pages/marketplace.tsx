import React from 'react'
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@concave/ui'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import MarketplaceSearchCard from 'components/Marketplace/MarketplaceSearchCard'
import MarketplaceStakeCard from 'components/Marketplace/MarketplaceStakeCard'
import MarketplaceActivityCard from 'components/Marketplace/MarketplaceActivityCard'
import StakePeriodCard from 'components/Marketplace/StakePeriodCard'

const marketplace = () => {
  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        Marketplace
      </Heading>
      <HStack mt={8} spacing={14}>
        <Text maxW={520} textAlign="right">
          The Concave Marketplace is where you are able to buy and/or sell your locked-staked NFT
          positions. Most of the positions will has a discount but 12 month stakes, because it has a
          limited supply.
        </Text>
        <GraphicGuide />
      </HStack>

      <Flex direction="column" float={'left'} mr="6" gap={8} position="relative" mt={16}>
        <MarketplaceSearchCard />
      </Flex>
      <Flex direction="column" gap={5} position="relative" mt={16}>
        <MarketplaceStakeCard />
        <MarketplaceActivityCard />
      </Flex>
    </Container>
  )
}

export default marketplace
