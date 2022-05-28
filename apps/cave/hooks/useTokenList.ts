import { useQuery, UseQueryResult } from 'react-query'
import { chain, useNetwork } from 'wagmi'
import { Currency, Fetcher, NATIVE, Token } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import { add } from 'date-fns'
import { fetchJson } from 'ethers/lib/utils'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = () => {
  const [
    {
      data: { chain: selectedChain = chain.mainnet },
      loading,
    },
  ] = useNetwork()
  // const provider = concaveProvider(selectedChain.id)
  return useQuery(['token-list', selectedChain.name], async () => {
    if (loading) return []
    const tokenList = await fetchJson(concaveTokenList(selectedChain.name))
    const chainTokens = tokenList.tokens.filter((t) => t.chainId === selectedChain.id)
    return chainTokens.map((t) => new Token(t.chainId, t.address, t.decimals, t.symbol, t.name))

    // .then((list) => list.map((token) => Fetcher.fetchTokenData(token.address, provider)))
    // .then((tokens) => Promise.all(tokens))
  })
}

export const useFetchTokenData = (chainID: number | string, address: string) => {
  return useQuery(
    ['fetchToken', address, +chainID],
    () => fetchTokenData(chainID, address, concaveProvider(+chainID)),
    {
      enabled: !!chainID && !!address,
    },
  )
}

export const fetchTokenData = (
  chainID: number | string,
  address: string,
  provider: any,
): Promise<Currency> => {
  if (!address) return undefined
  if (address === NATIVE[chainID].symbol) return Promise.resolve(NATIVE[chainID])
  return Fetcher.fetchTokenData(address, provider)
}

const headers = { 'x-api-key': process.env.NEXT_PUBLIC_MORALIS_TOKEN }
export const useAddressTokenList: (address?: string) => UseQueryResult<Token[], unknown> = (
  address: string,
) => {
  const [{ data: network }] = useNetwork()
  const chainName =
    network?.chain?.id === chain.rinkeby.id ? chain.rinkeby.name : chain.mainnet.name
  const url = `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=${chainName}`
  return useQuery(['LISTTOKENS', address], () => {
    if (!address) {
      return []
    }
    return fetch(url, { headers })
      .then((r) => r.json())
      .then((tokens) =>
        (tokens || []).map(
          (token: MoralisERC20Token) =>
            new Token(
              chain.rinkeby.id,
              token.token_address,
              +token.decimals,
              token.symbol,
              token.name,
            ),
        ),
      )
  })
}

type Version = {
  major: number
  minor: number
  patch: number
}

type Tags = {}

type ConcaveTokenList = {
  name: string
  timestamp: Date
  version: Version
  tags: Tags
  logoURI: string
  keywords: string[]
  tokens: {
    chainId: number
    address: string
    name: string
    symbol: string
    decimals: number
    logoURI: string
  }[]
}

type MoralisERC20Token = {
  token_address: string
  name: string
  symbol: string
  logo?: any
  thumbnail?: any
  decimals: string
  balance: string
}
