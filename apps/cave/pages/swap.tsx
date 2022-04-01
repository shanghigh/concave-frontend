import { Flex } from '@concave/ui'
import { CandleStickCard } from 'components/CandleStickCard'
import GcnvTitle from 'components/GcnvTitle'
import { SwapCard } from 'components/Swap/SwapCard'
import { useSwap } from 'components/Swap/useSwap'
import { WETH } from 'constants/tokens'
import { useAuth } from 'contexts/AuthContext'
import { usePriceInStable } from 'hooks/useBestTrade'
import React from 'react'

const cardProps = {
  h: [350, 400],
  gap: 2,
  p: 6,
}

function Swap() {
  const { user, isConnected } = useAuth()
  const swap = useSwap(isConnected ? user?.address : '', {})

  const aaa = usePriceInStable(WETH)

  return (
    <Flex direction="column" gap={12}>
      <GcnvTitle title="" description="" />
      <Flex gap={4} flexWrap="wrap" justify="center">
      
        <CandleStickCard
          from={swap.from.token}
          to={swap.to.token}
          variant="secondary"
          {...cardProps}
          h={['100%', 470, 400]}
          w={['100%', '100%', 500, 567, 567]}
          align="stretch"
        />
        <SwapCard
          swap={swap}
          buttonLabel="Swap"
          shadow={
            '0px 4px 86px rgba(123, 129, 255, 0.3), 0px 20px 30px rgba(0, 0, 0, 0.47), inset -10px 10px 30px rgba(128, 156, 255, 0.1)'
          }
          variant="primary"
          active="swap"
          justifyContent={'space-between'}
          {...cardProps}
          h={['100%', 400]}
          w={['100%', '100%', 500, 567, 400]}
        />

      </Flex>
    </Flex>
  )
}

export default Swap
