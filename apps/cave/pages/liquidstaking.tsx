import { Container, Flex, Heading, HStack, ResponsiveValue, Text, useMediaQuery } from '@concave/ui'
import StakeCard from 'components/LiquidStaking/StakeCard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import { useEffect, useState } from 'react'

interface StakingGroupProps {
  icon: string
  period: string
  vapr: string
  stakingLink: string
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '360d',
    period: '360 days',
    vapr: '6,342',
    stakingLink: '',
  },
  {
    icon: '180d',
    period: '180 days',
    vapr: '1,002',
    stakingLink: '',
  },
  {
    icon: '90d',
    period: '90 days',
    vapr: '266',
    stakingLink: '',
  },
  {
    icon: '45d',
    period: '45 days',
    vapr: '17',
    stakingLink: '',
  },
]

function LiquidStaking() {
  const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)')
  const [gap, setGap] = useState(6)
  const [wrap, setWrap] = useState<'wrap' | 'nowrap'>('nowrap')
  const [width, setWidth] = useState('')

  useEffect(() => {
    setGap(isLargerThan1100 ? 6 : 3)
    setWrap(isLargerThan1100 ? 'nowrap' : 'wrap')
    setWidth(isLargerThan1100 ? '' : '530px')
  }, [isLargerThan1100])
  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        Liquid Staking
      </Heading>
      <HStack mt={8} spacing={14}>
        <Text maxW={520} textAlign="right">
          Liquid Staking allows you to access your funds even when you&apos;re staking them. The
          funds remain in escrow, but aren&apos;t totally inaccessible. In this scenario, you are
          able to trade the locked-staking positions in the form of NFTs in the secondary
          marketplace.
        </Text>
        <GraphicGuide />
      </HStack>

      <Flex mt={16} alignItems="start" justifyContent="center" height="700">
        <Flex gap={gap} justifyContent="center" alignItems="center" m={2} wrap={wrap} width={width}>
          {StakingGroup.map((s) => (
            <StakeCard
              icon={s.icon}
              period={s.period}
              vapr={s.vapr}
              stakingLink={s.stakingLink}
              key={s.period}
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default LiquidStaking

{
  /* <Flex
          direction={'row'}
          gap={8}
          position="relative"
          mt={isLargerThan950 ? 16 : 0}
          border=" 2px solid  white"
          maxWidth={!isLargerThan950 ? 700 : {}}
          wrap={isLargerThan1200 ? 'nowrap' : 'wrap'}
          transform={!isLargerThan1200 ? 'scale(0.7)' : ''}
          transition="all"
          transitionDuration={'0.4s'}
          justifyContent="center"
          alignItems={'start'}
        >
          {StakingGroup.map((s) => (
            <StakeCard
              icon={s.icon}
              period={s.period}
              vapr={s.vapr}
              stakingLink={s.stakingLink}
              key={s.period}
            />
          ))}
        </Flex> */
}
