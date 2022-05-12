import { Currency, CurrencyAmount, DAI } from '@concave/gemswap-sdk'
import { GasIcon, SpinIcon, SpinnerIcon } from '@concave/icons'
import {
  Button,
  Card,
  Flex,
  HStack,
  keyframes,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@concave/ui'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { BOND_ADDRESS } from 'contracts/Bond/BondingAddress'
import { ApproveButton, useApprovalWhenNeeded } from 'hooks/useAllowance'
import React, { useEffect, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { BondOutput } from './BondOutput'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { BondSettings, defaultSettings, Settings } from './Settings'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { useGet_Amm_Cnv_PriceQuery } from 'graphql/generated/graphql'

export const twoDecimals = (s: string | number) => {
  const a = s.toString()
  return a.indexOf('.') > -1 ? a.slice(0, a.indexOf('.') + 3) : a
}

const GasPrice = () => {
  const [{ data }] = useFeeData({ formatUnits: 'gwei', watch: true })
  return (
    <>
      <GasIcon viewBox="0 0 16 16" />
      {data ? (
        <Text fontSize="xs" color="text.low" fontWeight="medium">
          {twoDecimals(data?.formatted.gasPrice)} gwei
        </Text>
      ) : (
        <Spinner size="xs" color="text.low" />
      )}
    </>
  )
}

export function BondBuyCard({ bondTransaction, setBondTransaction, setAmountInAndOut }: any) {
  const { currencyIn, currencyOut, userAddress, balance, signer, networkId } = useBondState()
  // const [bondTransaction, setBondTransaction] = useState()
  const [settings, setSettings] = useState<BondSettings>(defaultSettings)
  const userBalance = balance.data?.toFixed()
  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(toAmount('0', DAI[networkId]))
  // const [amountIn, setAmountIn] = useState<number>(0)

  const [amountOut, setAmountOut] = useState<string>()
  const [bondSpotPrice, setBondSpotPrice] = useState<string>()

  const confirmModal = useDisclosure()
  // const receiptModal = useDisclosure()

  const approveInfo = useApprovalWhenNeeded(
    currencyIn,
    BOND_ADDRESS[networkId],
    amountIn.denominator,
  )
  const [needsApprove] = approveInfo
  const AMMData = useGet_Amm_Cnv_PriceQuery()

  const currentPrice = AMMData?.data?.cnvData?.data?.last.toFixed(3)

  useEffect(() => {
    getBondSpotPrice(networkId, BOND_ADDRESS[networkId])
      .then((bondSpotPrice) => {
        setBondSpotPrice(bondSpotPrice)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [networkId, userAddress])

  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="430px"
      height="386px"
    >
      <BondInput
        currencyAmountIn={amountIn}
        onChangeAmount={(v) => {
          setAmountIn(v)
          getBondAmountOut(currencyOut.address, currencyOut.decimals, networkId, v.toExact()).then(
            (amountOut) => {
              setAmountOut(amountOut)
            },
          )
        }}
      />
      <DownwardIcon />
      <BondOutput disabled={true} currency={currencyOut} value={amountOut} />
      <HStack ml={4} align="center" justify="space-around" py={1}>
        <VStack spacing={0} fontSize="13px" justify={'end'} fontWeight="500">
          <HStack alignSelf={'start'}>
            <Text textColor={'text.low'}>Current Price:</Text>
            <Text textColor={'text.low'} opacity="0.7">
              {currentPrice ? currentPrice + ' CNV' : 'Loading . . .'}
            </Text>
          </HStack>
          <HStack alignSelf={'start'}>
            <Text ml={4} textColor={'text.low'}>
              Bond Price:
            </Text>
            <Text textColor={'text.low'} opacity="0.7">
              {bondSpotPrice ? parseFloat(bondSpotPrice).toFixed(3) + ' CNV' : 'Loading . . .'}
            </Text>
          </HStack>
        </VStack>
        <Flex align={'center'} justify="end" flex={1} minWidth={100} gap={2}>
          <GasPrice />
          <HStack align="center" justify="end" py={5}>
            <Settings onClose={setSettings} />
          </HStack>
        </Flex>
      </HStack>

      <ApproveButton variant="primary" size="large" isFullWidth useApproveInfo={approveInfo} />
      {!needsApprove && (
        <Button
          isDisabled={needsApprove || +userBalance < +amountIn}
          variant="primary"
          size="large"
          isFullWidth
          onClick={confirmModal.onOpen}
        >
          {+userBalance < +amountIn ? 'Insufficient Funds' : 'Bond'}
        </Button>
      )}

      <ConfirmBondModal
        currencyIn={currencyIn}
        currencyOut={currencyOut}
        //amountIn.numerator.toString
        amountIn={amountIn.toFixed()}
        amountOut={amountOut}
        tokenInUsdPrice={'currencyIn'}
        tokenInRelativePriceToTokenOut={''}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => {
          purchaseBond(networkId, amountIn.toFixed(), userAddress, signer, settings, amountOut)
            .then((tx) => {
              setBondTransaction(tx)
              confirmModal.onClose()
              setAmountInAndOut({
                in: parseFloat(String(amountIn.toFixed())).toFixed(2),
                out: parseFloat(amountOut).toFixed(2),
              })
            })
            .catch((e) => {
              console.log('get position info failed', e)
            })
        }}
        bondPrice={bondSpotPrice}
        minimumAmountOut={(
          +amountOut -
          (+settings.slippageTolerance.value / 100) * +amountOut
        ).toFixed(3)}
        slippage={settings.slippageTolerance.value}
      />
      <TransactionSubmittedDialog tx={bondTransaction} isOpen={bondTransaction} />
    </Card>
  )
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
