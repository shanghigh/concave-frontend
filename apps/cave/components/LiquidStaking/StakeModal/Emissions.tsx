import React from 'react'
import { Box, HStack, Image, Text } from '@concave/ui'

function Emissions(props) {
  return (
    <Box p={2}>
      <Box
        mx="auto"
        pt={5}
        pb={3}
        w="33%"
        h="full"
        shadow="down"
        borderRadius="full"
        textAlign="center"
        ml={-1}
      >
        <Text color="text.low" fontSize="sm">
          Stake period
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {props.period}
        </Text>
        <Image
          mx="auto"
          src={`/assets/liquidstaking/${props.icon}-logo.svg`}
          alt="stake period logo"
        />
        <Text color="text.low" fontSize="sm">
          {props.vaprText}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {props.vapr} %
        </Text>
        <Image mx="auto" src={`/assets/liquidstaking/modal-arrow-logo.svg`} alt="arrow down logo" />
        <Box
          shadow="down"
          borderTopRadius="xl"
          borderBottomRadius="full"
          w="90%"
          pt={4}
          pb={10}
          px={3}
          mx="auto"
          filter="drop-shadow(0px 0px 27px #81b3ff4f)"
        >
          <HStack>
            <Image
              mx="auto"
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              alt="more info logo"
            />
            <Text color="text.low" fontSize="sm">
              Bonding Emissions:
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            534%
          </Text>
          <Text color="text.low" fontSize="sm">
            +
          </Text>
          <HStack>
            <Image
              mx="auto"
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              alt="more info logo"
            />
            <Text color="text.low" fontSize="sm">
              Base Emissions:
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            25% * 4 = 100%
          </Text>
          <Text color="text.low" fontSize="sm">
            +
          </Text>
          <HStack>
            <Image
              mx="auto"
              src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
              h={5}
              alt="more info logo"
            />
            <Text color="text.low" fontSize="sm">
              Quarterly Dividends:
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            X% * 4 = 4X%
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Emissions
