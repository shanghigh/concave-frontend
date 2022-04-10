import { useState, useMemo } from 'react'
import { chain, useNetwork, useBalance } from 'wagmi'
import { useQuery } from 'react-query'
import { BigNumberish, Contract } from 'ethers'
import { DAI } from 'gemswap-sdk'
import { BOND_ADDRESS } from '../../contracts/BondingAddress'
import { BOND_ABI } from '../../contracts/BondABI'
import { Token, Currency } from 'gemswap-sdk'
import { useAuth } from 'contexts/AuthContext'

const useCurrencyBalance = (currency: Currency, userAddress: string) =>
  useBalance({
    addressOrName: userAddress,
    token: currency?.isToken && currency?.address,
    formatUnits: currency?.decimals,
    skip: !currency || !userAddress,
  })

export const useCurrentSupportedNetworkId = () => {
  const [{ data }] = useNetwork()
  const chainId = data?.chain?.id === chain.ropsten.id
  return chainId ? chain.ropsten.id : chain.mainnet.id
}

export const useBondTransaction = (recipient: string) => {
  const networkId = useCurrentSupportedNetworkId()
  const { user } = useAuth()
  const [bond, estimateBondGas] = useMemo(() => {
    const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI)
    return [
      () => bondingContract['bond']({ args, overrides: { value } }),
      () => bondingContract.estimateGas['']({ args, overrides: { value } }),
    ]
  }, [networkId])

  const { refetch, ...swapTransaction } = useQuery(['bond', recipient], bond, {
    enabled: false,
  })

  return [estimateSwapGas, swapTransaction, refetch]
}

export const useBondState = () => {
  const { user, isConnected } = useAuth()
  const networkId = useCurrentSupportedNetworkId()
  const [currencyIn, setCurrencyIn] = useState<Token>(DAI[networkId])
  const [recipient, setRecipient] = useState<string>('')
  const [exactValue, setExactValue] = useState<BigNumberish>(0)
  const balance = useCurrencyBalance(currencyIn, user.address)
  const userAddress = user.address
  const updateField = () => (amount) => {
    setExactValue(amount)
  }

  return useMemo(
    () => ({
      currencyIn,
      recipient,
      exactValue,
      setRecipient,
      userAddress,
      isConnected,
      balance,
    }),
    [balance, currencyIn, exactValue, isConnected, recipient, userAddress],
  )
}
