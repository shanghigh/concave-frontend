import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()

  //   const networkId = useCurrentSupportedNetworkId()
  const bbtCNVContract = new Contract(
    '0x1697118735044519aF9454700Bc005eEAB9D102b',
    RedeemBBT_CNV_Abi,
    provider(4),
  )
  const { data, isLoading } = useQuery(
    ['bbtRedeemable'],
    async () => bbtCNVContract.redeemable(account?.address),
    {
      enabled: !!account?.address,
    },
  )
  return {
    data,
    isLoading,
  }
}
