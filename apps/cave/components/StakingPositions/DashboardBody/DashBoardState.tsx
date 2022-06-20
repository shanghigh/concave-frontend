import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { listUserPositions, StakingPosition } from '@concave/marketplace'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { NEXT_PUBLIC_ALCHEMY_ID } from 'lib/env.conf'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
//build
export type UseStakePositionsState = ReturnType<typeof useStakePositions>
export const useStakePositions = () => {
  const { data: account } = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const { data: stakingPositions, isLoading } = useQuery(
    ['listUserPositions', account?.address, chainId],
    () => listUserPositions(account.address, concaveProvider(chainId), NEXT_PUBLIC_ALCHEMY_ID),
    { enabled: !!account?.address && !!chainId },
  )
  const totalLocked = getTotalLocked(stakingPositions, CNV[chainId])
  return {
    isLoading,
    totalLocked,
    userNonFungibleTokensInfo: stakingPositions || [],
    account,
    netWorkId: chainId,
  }
}
function getTotalLocked(nonFungibleTokens: StakingPosition[], currency: Currency) {
  const totalLocked = (nonFungibleTokens || []).reduce((amount, current) => {
    return amount.add(current.currentValue)
  }, BigNumber.from(0))
  return CurrencyAmount.fromRawAmount(currency, totalLocked.toString())
}
