import { Box, Flex, HStack, Image, Text } from '@concave/ui'
import { useState } from 'react'

interface NftPositionContainerProps {
  onChange: () => void
  stakeType: number
  redeemIn: number
}

const NftPositionContainer = (props: NftPositionContainerProps) => {
  const [active, setActive] = useState(false)
  const { stakeType, redeemIn } = props
  const redeemInDays = (redeemIn / (1000 * 3600 * 24)).toFixed()
  const period = {
    0: '360 Days',
    1: '180 Days',
    2: '90 Days',
    3: '45 Days',
  }[stakeType]

  const imgNameByPeriod = {
    0: '12mposition.png',
    1: '6mposition.png',
    2: '3mposition.png',
    3: '1mposition.png',
  }[stakeType]
  return (
    <Box
      pos="relative"
      overflow={'hidden'}
      maxHeight={'100px'}
      borderRadius="16px"
      boxShadow={'up'}
      width={{ lg: '540px', md: '380px' }}
    >
      <Flex direction="row" gap={4} alignItems="center" justify="center" m={2} position="relative">
        <Flex
          pos="relative"
          w="177px"
          h="68px"
          overflowY={'hidden'}
          borderRadius="16px"
          boxShadow={'Down Medium'}
          px={2}
        >
          <HStack>
            <Flex w={'55%'} pl={2} direction="column">
              <Text fontSize="xs" color="text.low" fontWeight="medium">
                Stake Period
              </Text>
              <Text fontSize="s" color="white" fontWeight="bold">
                {period}
              </Text>
            </Flex>
            <Box w={'45%'}>
              <Image
                sizes="100%"
                src={`/assets/marketplace/${imgNameByPeriod}.png`}
                alt="position"
              />
            </Box>
          </HStack>
        </Flex>

        <Flex flex={1} direction={'column'} textAlign={'start'} ml="2">
          <Text color="text.low" fontSize="sm">
            Redeem In:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {redeemInDays} Days
          </Text>
        </Flex>
        <Flex width={'full'} height="50px" position={'absolute'} justify="end" align={'center'}>
          <Flex width={'80px'}>
            <Image
              userSelect={'none'}
              transition={'all'}
              transitionDuration="0.3s"
              transform={!active ? 'rotate(180deg)' : ''}
              height={'80px'}
              src={`/assets/liquidstaking/modal-arrow-logo.svg`}
              alt="arrow down logo"
              cursor={'pointer'}
              onClick={() => {
                props.onChange()
                setActive(!active)
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default NftPositionContainer
