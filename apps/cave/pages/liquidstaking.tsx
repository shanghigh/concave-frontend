import { Avatar, Box, Card, Container, Flex, Image, Stack, Text } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import { text } from 'stream/consumers'
import { ButtonLink } from 'components/ButtonLink'

const InfoItem = ({ value, label, ...props }) => (
  <Stack spacing={0} fontWeight="bold" textAlign="center" px={8} {...props}>
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
    <Card
      bgGradient={''}
      px={0}
      borderRadius={40}
      width={160}
      height={326}
      py={4}
      position="relative"
      direction="column"
      shadow="Medium Glow Up"
    >
      <Flex direction="column" gap={1}>
        <InfoItem value={''} label="Stake Period" pl={7} />
        <InfoItem value={asset.toUpperCase()} label="" pl={7} />
        <Image
          src={'/assets/concave-logo.png'}
          alt="concave logo"
          maxWidth="180px"
          position="relative"
        />
        <InfoItem value={''} label="vAPR" pl={7} />
        <InfoItem value={vapr.toUpperCase()} label="" pl={7} />
      </Flex>
    </Card>
  )
}

const LiquidStakingCNV = ({ stakedcnv }) => {
  return (
    <Card bgGradient="" px="0" position="relative" direction="column" shadow="Medium Glow Up">
      <InfoItem value={''} label="" pl={7} />
      <InfoItem value={stakedcnv.toUpperCase()} label="" pl={7} />
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
      <Flex direction="row" gap="1" position="relative">
        <Card
          w="220px"
          h="490px"
          borderWidth={0}
          borderRadius={16}
          px={6}
          py={10}
          shadow="up"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          gap={1}
        >
          <LiquidStakingInfo asset="12 Month" icon="" vapr="6,342%" stakedcnv="83,431 CNV" />
          <Text ml={2} color="text.low">
            Currently Staked Stake Cap
          </Text>
          <LiquidStakingCNV stakedcnv="83,431 CNV" />

          <ButtonLink
            href="/StakeCNV12"
            position={'relative'}
            variant="primary.outline"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="190px"
            h="40px"
            size="large"
            borderRadius="2xl"
          >
            Stake CNV
          </ButtonLink>
        </Card>
      </Flex>
    </Container>
  )
}

export default LiquidStaking
