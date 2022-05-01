import { ButtonProps } from '@concave/ui'
import { useAccount } from 'wagmi'
import { useModals } from 'contexts/ModalsContext'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { NoValidPairsError, UsePairResult } from '../hooks/usePair'
import { currencyAmountToBigNumber } from 'lib/util'

export const useAddLiquidityButtonProps = (
  pair: UsePairResult,
  amount0: CurrencyAmount<Currency>,
  amount1: CurrencyAmount<Currency>,
  onAddLiquidityClick: () => void,
): ButtonProps => {
  const [{ data: account }] = useAccount()

  const currency0Balance = useCurrencyBalance(amount0?.currency)
  const currency1Balance = useCurrencyBalance(amount1?.currency)

  const { connectModal } = useModals()

  /*
    Not Connected
  */
  if (!account?.address) return { children: 'Connect Wallet', onClick: connectModal.onOpen }

  if (!amount0 || !amount1) return { isDisabled: true, children: `Select a second token` }

  if (pair.isLoading) return { isLoading: true, loadingText: `Fetching pair` }

  /*
  Enter an amount
  */
  if (amount0.equalTo(0))
    return { isDisabled: true, children: `Enter an ${amount0.currency.symbol} amount` }
  if (amount1.equalTo(0))
    return { isDisabled: true, children: `Enter an ${amount1.currency.symbol} amount` }

  /*
    Insufficient Funds
  */
  if (currency0Balance.data.value?.lt(currencyAmountToBigNumber(amount0)))
    return {
      children: `Insufficient ${amount0.currency.symbol} balance`,
      isDisabled: true,
    }

  if (currency1Balance.data.value?.lt(currencyAmountToBigNumber(amount1)))
    return {
      children: `Insufficient ${amount1.currency.symbol} balance`,
      isDisabled: true,
    }

  /*
      Create Pair
    */
  if (!pair.data)
    return { children: 'Create a Pair', isDisabled: false, onClick: onAddLiquidityClick }

  /*
    Add Liquidity
    */
  return {
    children: pair.error === NoValidPairsError ? 'Create Liquidity' : 'Add Liquidity',
    onClick: onAddLiquidityClick,
  }
}
