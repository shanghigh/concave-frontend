import { useLinkedFields } from 'components/AMM'
import { usePair } from 'components/AMM/hooks/usePair'
import { parseAmount } from 'components/AMM/utils/parseAmount'
import { Currency, CurrencyAmount, NATIVE, Pair } from 'gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useMemo, useState } from 'react'

const makeCurrencyFields = (initialTokens = [], networkId) => ({
  first: initialTokens[0] || NATIVE[networkId],
  second: initialTokens[1],
})

const deriveAmount = (
  pair: Pair,
  exactAmount: CurrencyAmount<Currency>,
  otherCurrency: Currency,
) => {
  try {
    const quoteAmount = pair.priceOf(exactAmount.currency.wrapped).quote(exactAmount.wrapped)
    if (otherCurrency.isNative)
      return CurrencyAmount.fromRawAmount(otherCurrency, quoteAmount.numerator)
    return quoteAmount
  } catch {
    return parseAmount('0', otherCurrency)
  }
}

export const useAddLiquidityState = (initialTokens) => {
  const networkId = useCurrentSupportedNetworkId()

  const initialCurrencyFields = useMemo(
    () => makeCurrencyFields(initialTokens, networkId),
    [networkId, initialTokens],
  )

  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState<CurrencyAmount<Currency>>(
    parseAmount('0', initialCurrencyFields.first),
  )

  const { onChangeField, fieldCurrency } = useLinkedFields(
    (field) => (newAmount) => setExactAmount(newAmount),
    initialCurrencyFields,
  )

  const isExactFirst = fieldCurrency.first && exactAmount?.currency.equals(fieldCurrency.first)
  const otherCurrency = fieldCurrency[isExactFirst ? 'second' : 'first']

  const pair = usePair(exactAmount?.currency.wrapped, otherCurrency?.wrapped)

  const derivedAmount = deriveAmount(pair.data, exactAmount, otherCurrency)

  const [firstFieldAmount, secondFieldAmount] = isExactFirst
    ? [exactAmount, derivedAmount]
    : [derivedAmount, exactAmount]

  return {
    firstFieldAmount,
    secondFieldAmount,
    pair,
    onChangeFirstField: onChangeField('first'),
    onChangeSecondField: onChangeField('second'),
  }
}
