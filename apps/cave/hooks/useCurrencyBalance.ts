import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useAccount, useBalance } from 'wagmi'

export const useCurrencyBalance = (currency: Currency) => {
  const [{ data: account }] = useAccount()
  const [balance] = useBalance({
    addressOrName: account?.address,
    token: currency?.isToken && currency?.address, // if it's not a token, it's native, n we don't need to pass the address
    formatUnits: currency?.decimals,
    skip: !currency?.wrapped?.address || !account?.address,
  })

  return {
    data: balance.data,
    amount:
      balance.data?.value && CurrencyAmount.fromRawAmount(currency, balance.data.value.toString()),
    isError: !!balance.error,
    error: balance.error,
    isLoading: balance.loading,
    isSuccess: balance.data && !balance.loading,
  }
}

export type UseCurrencyBalanceData = ReturnType<typeof useCurrencyBalance>
