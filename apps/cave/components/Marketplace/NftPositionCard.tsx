import { Box, Button, Collapse, Flex, HStack, Image, Text } from '@concave/ui'
import { useState } from 'react'

interface NftPositionBoxProps {
  stakePool: number
  redeemIn: number
  price: number
  discount: number
  active?: boolean
  onClick?: () => void
}

const NftPositionBox = (props: NftPositionBoxProps) => {
  const { stakePool, discount, price, redeemIn } = props
  const active = props.active

  return (
    <Flex
      grow={1}
      height={'full'}
      maxHeight={{ base: '180px', lg: '80px', xl: '80px' }}
      position="relative"
      bg={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
      rounded="2xl"
      shadow={'up'}
      direction={{ base: 'column', lg: 'row', xl: 'row' }}
    >
      <Flex height={'full'}>
        <HStack
          spacing={{ base: 14, lg: 0, xl: 0 }}
          width={{ base: 'full', xl: '177px', lg: '177px' }}
          height={68}
          shadow={'Down Medium'}
          rounded={'2xl'}
        >
          <Flex w={'55%'} pl={2} direction="column" textAlign={'start'}>
            <Text fontSize="xs" color="text.low" fontWeight="medium" ml={4}>
              Stake Pool
            </Text>
            <Text fontSize="s" color="white" fontWeight="bold" ml={4}>
              {stakePool} Days
            </Text>
          </Flex>
          <Box w={{ base: '25%', xl: '45%', lg: '45%' }}>
            <Image sizes="100%" src={'/assets/marketplace/6mposition.png'} alt="position" />
          </Box>
        </HStack>
      </Flex>

      <Flex width={'full'}>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }} noOfLines={1}>
            Redeem In:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {redeemIn} Days
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }} noOfLines={1}>
            Price:
          </Text>
          <Text fontSize="md" fontWeight="bold" noOfLines={1}>
            {price} CNV
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="center" direction={'column'} textAlign={'start'} ml="6">
          <Text color="text.low" fontSize={{ base: '12px', xl: 'sm', lg: 'sm' }}>
            Discount:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {discount}%
          </Text>
        </Flex>
        <Flex
          flex={1.3}
          justifyContent="center"
          width={'60px'}
          height="60px"
          alignItems={'center'}
          zIndex={3}
        >
          <Image
            transition={'all'}
            transitionDuration="0.3s"
            transform={!!active ? 'rotate(180deg)' : ''}
            height={'60px'}
            src={`/assets/liquidstaking/modal-arrow-logo.svg`}
            alt="arrow down logo"
            cursor={'pointer'}
            onClick={props.onClick}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
const NftPositionCard = (props: NftPositionBoxProps) => {
  const [active, setActive] = useState(false)
  const { discount, price, redeemIn, stakePool } = props

  return (
    <Flex
      shadow={active ? 'up' : ''}
      bg={active ? 'stroke.primary' : 'rgb(0,0,0,0)'}
      rounded={'2xl'}
      justifyContent="center"
      my={active ? 6 : 0}
      transition="all"
      transitionDuration={'0.3s'}
      maxH={'280px'}
      width={{ xl: '520px', lg: 'full', base: 'full' }}
    >
      <Flex
        direction={'column'}
        height="full"
        m={'2px'}
        bg={'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)'}
        rounded={'2xl'}
        onClick={() => {}}
        flex={1}
      >
        <NftPositionBox
          active={active}
          discount={discount}
          price={price}
          redeemIn={redeemIn}
          stakePool={stakePool}
          onClick={() => setActive(!active)}
        />
        <Collapse in={active}>
          <Flex
            direction={{ xl: 'row', lg: 'row', base: 'column' }}
            justifyContent="start"
            alignItems={'center'}
          >
            <Flex flex={1} justify={'space-around'} width={'full'}>
              <Flex
                pl={{ xl: 3, lg: 3, base: 0 }}
                direction={'column'}
                justifyContent="center"
                alignItems={'start'}
              >
                <Text color={'text.low'} fontSize="sm">
                  Last sold by 0x43fs... for
                </Text>
                <Flex justifyContent={'center'} alignItems="center">
                  <Text fontWeight={500}>600 CNV</Text>
                  <Text color={'text.low'} fontSize="sm">
                    (3 days ago)
                  </Text>
                </Flex>
              </Flex>
              <Flex
                py={4}
                direction={'column'}
                justifyContent="start"
                alignItems={'start'}
                textAlign="start"
                // ml={4}
              >
                <Text width={'full'} color={'text.low'} fontSize="sm">
                  Redeem date:
                </Text>
                <Text width={'full'} fontWeight={500}>
                  12.07.22
                </Text>
              </Flex>
              <Flex textAlign={'start'} direction={'column'} justifyContent="center">
                <Text color={'text.low'} fontSize="sm">
                  Current value
                </Text>
                <Flex justifyContent={'center'} alignItems="center">
                  <Text width={'full'} fontWeight={500}>
                    612.42 CNV
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <BuyButton />
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  )
}

const BuyButton = () => {
  return (
    <Button pr={{ xl: 6, lg: 6, base: 0 }}>
      <Flex
        boxShadow={'Up Big'}
        background="linear-gradient(90deg, #72639B 0%, #44B9DE 100%)"
        height={38}
        width={143}
        rounded={{ xl: '2xl', lg: '2xl', base: '16px 16px 0px 0px' }}
        justifyContent={'center'}
        alignItems="center"
        ml={2}
      >
        <Text>Buy</Text>
      </Flex>
    </Button>
  )
}

export default NftPositionCard
