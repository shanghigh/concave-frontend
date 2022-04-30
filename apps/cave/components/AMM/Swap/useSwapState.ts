import { useState, useMemo, useEffect } from 'react'
import { Currency, TradeType, CNV, DAI, CurrencyAmount, Trade } from 'gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useTrade, UseTradeResult } from '../hooks/useTrade'
import { SwapSettings } from '../Settings'
import { parseAmount } from '../utils/parseAmount'
import { useLinkedFields } from '../CurrencyAmountField'

const makeCurrencyFields = (networkId) => ({
  first: DAI[networkId],
  second: CNV[networkId],
})

export const useSwapState = ({ multihops }: SwapSettings) => {
  const networkId = useCurrentSupportedNetworkId()
  const initialCurrencyFields = useMemo(() => makeCurrencyFields(networkId), [networkId])

  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState<CurrencyAmount<Currency>>(
    parseAmount('0', initialCurrencyFields.first),
  )

  const { onChangeField, setFieldCurrency, switchCurrencies, fieldCurrency } = useLinkedFields(
    (field) => (newAmount) => setExactAmount(newAmount),
    initialCurrencyFields,
  )

  useEffect(() => {
    setFieldCurrency(initialCurrencyFields)
    setExactAmount(parseAmount('0', initialCurrencyFields.first))
  }, [initialCurrencyFields, setFieldCurrency])

  const isExactIn = exactAmount?.currency.equals(fieldCurrency.first)
  const otherCurrency = fieldCurrency[isExactIn ? 'second' : 'first']

  const trade = useTrade(exactAmount, otherCurrency.wrapped, {
    tradeType: isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
    maxHops: multihops ? 3 : 1,
  })

  // return this partial just to show some data while loading (like currencies icons) if needed
  const partialTradeData: Partial<Trade<Currency, Currency, TradeType>> = useMemo(
    () =>
      isExactIn
        ? { inputAmount: exactAmount, outputAmount: parseAmount('0', otherCurrency) }
        : { inputAmount: parseAmount('0', otherCurrency), outputAmount: exactAmount },
    [exactAmount, isExactIn, otherCurrency],
  )

  return useMemo(
    () => ({
      trade: trade.data ? trade : ({ ...trade, data: partialTradeData } as UseTradeResult),
      onChangeInput: onChangeField('first'),
      onChangeOutput: onChangeField('second'),
      switchCurrencies,
    }),
    [trade, partialTradeData, switchCurrencies, onChangeField],
  )
}