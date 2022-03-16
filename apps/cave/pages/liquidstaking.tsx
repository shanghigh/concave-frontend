import { Avatar, Box, BaseModal, Card, Container, Flex, Image, Stack, Text } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import { text } from 'stream/consumers'
import { ButtonLink } from 'components/ButtonLink'
import { Progress } from '@chakra-ui/react'
import StakeCard from 'components/LiquidStaking/StakeCard'

const InfoItem = ({ value, label, fontWeight, ...props }) => (
  <Stack
    spacing={0}
    fontWeight={fontWeight ? fontWeight : 'bold'}
    textAlign="center"
    px={8}
    {...props}
  >
    <Text fontSize="lg" fontFamily="heading">
      {value}
    </Text>
    <Text fontSize="sm" color="text.low">
      {label}
    </Text>
  </Stack>
)

const LiquidStakingInfo = ({ asset, vapr, stakedcnv, icon }) => {
  return (
    <BaseModal
      bgGradient={''}
      px={0}
      borderRadius={40}
      width={160}
      height={296}
      py={4}
      position="relative"
      direction="column"
      shadow="Medium Glow Up"
    >
      <Flex direction="column" gap={1}>
        <InfoItem value={''} label="Stake Period" pl={7} />
        <InfoItem value={asset.toUpperCase()} label="" pl={7} />
        <Image
          src={'/assets/12m.png'}
          alt="concave logo"
          maxWidth="180px"
          position="relative"
          background={''}
        />
        <InfoItem value={''} label="vAPR" pl={7} fontWeight={'bold'} />
        <InfoItem value={vapr.toUpperCase()} fontWeight={'bold'} label="" pl={7} />
      </Flex>
    </BaseModal>
  )
}

const LiquidStakingCNV = ({ stakedcnv }) => {
  return (
    <Card bgGradient="" px="0" position="relative" direction="column" shadow="Medium Glow Up">
      <InfoItem value={''} label="" pl={7} fontWeight={'bold'} />
      <InfoItem value={stakedcnv.toUpperCase()} fontWeight={'light'} label="" pl={7} />
    </Card>
  )
}
function LiquidStaking() {
  return (
    <Container maxW="container.lg" borderRadius={0} border="">
      <GcnvTitle
        title="Liquid Staking"
        description="Lock CNV in a staking term and recieve a tradeable NFT representing the position. Stakers receive a share of profits from all Concave products and services: bonding revenue, investment returns and protocol fees."
      />
      <Flex direction="row" gap="1" position="relative" mt={16}>
        <StakeCard />
      </Flex>
    </Container>
  )
}

export default LiquidStaking
