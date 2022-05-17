import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { nftContract } from 'components/Dashboard/UserPositionCard'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { StakingV1ProxyAddress } from 'lib/StakingV1Proxy/Address'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'

export async function getAllUserNfts(address: string, chainId: number) {
  const network = chainId === 1 ? 'mainnet' : 'ropsten'
  const web3 = createAlchemyWeb3(`https://eth-${network}.alchemyapi.io/v2/demo`)
  const nft = await web3.alchemy.getNfts({
    owner: address,
  })
  return nft.ownedNfts
}

export async function getUserPosition(address: string, index: number, chainId: number) {
  const usersNft = await getAllUserNfts(address, chainId)
  const userPositions = usersNft.filter(
    (nft) => nft.contract.address.toUpperCase() === StakingV1ProxyAddress[chainId].toUpperCase(),
  )
  const nonFungibletoken = userPositions[index]
  const tokenIndexId = +nonFungibletoken.id.tokenId
  const stakingV1Contract = new StakingV1Contract(chainId)
  const positionInfo = await stakingV1Contract.positions(tokenIndexId)
  return { ...positionInfo, ...nonFungibletoken }
}

export async function getUserPositions(address: string, netWorkId: number) {
  const stakingV1Contract = new StakingV1Contract(netWorkId)
  const userPositions: {
    deposit: BigNumber
    maturity: number
    poolID: number
    rewardDebt: BigNumber
    shares: BigNumber
  }[] = []
  const userPositionsLength = await stakingV1Contract.balanceOf(address)
  for (let index = 0; userPositionsLength.gt(index); index++) {
    try {
      const pos = await getUserPosition(address, index, netWorkId)
      userPositions.push(pos)
    } catch (e) {
      console.error(e)
    }
  }
  return Promise.all(userPositions)
}

export const useDashBoardState = () => {
  const [{ data: wallet, loading }, connect] = useConnect()
  const [{ data: account, error: accountError }] = useAccount()
  const netWorkId = useCurrentSupportedNetworkId()
  const [userPositions, setUserPositions] = useState([])
  const [totalLocked, setTotalLocked] = useState(0)
  const [status, setStatus] = useState<'loading' | 'notConnected' | 'loaded'>('loading')

  useEffect(() => {
    setStatus('loading')
    if (wallet.connected) {
      getUserPositions(account?.address, netWorkId)
        .then((userPositions) => {
          setStatus('loaded')
          setUserPositions(userPositions)
          setTotalLocked(getTotalLocked(userPositions))
        })
        .catch(console.error)
    }
    if (!loading) {
      if (!wallet.connected) setStatus('notConnected')
    }
  }, [loading, netWorkId])

  const isLoading = status === 'loading'
  const notConnected = status === 'notConnected'

  const statusData = {
    isLoading,
    notConnected,
  }

  return {
    status: statusData,
    positions: {
      totalLocked,
      userPositions,
    },
    account,
    netWorkId,
    setUserPositions,
  }
}

function getTotalLocked(contract: nftContract[]) {
  if (!contract) return 0
  const totalLocked = contract?.map((current) => {
    if (current?.shares === undefined) return 0
    const { shares } = current
    return parseInt(shares?._hex, 16) / 1000000000000000000
  })
  return totalLocked?.reduce((last, current) => last + current)
}
