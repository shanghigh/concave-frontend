import { Flex } from '@concave/ui'
import { SwapCard } from 'components/Swap/SwapCard'
import React from 'react'

function Swap() {
  return (
    <Flex direction="column-reverse" justify="center" align="center" h="100%" gap={12}>
      <Flex gap={4} flexWrap="wrap" justify="center">
        <SwapCard />
      </Flex>
    </Flex>
  )
}

export default Swap
