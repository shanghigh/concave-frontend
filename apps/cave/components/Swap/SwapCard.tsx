import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { MAX_SAFE_INTEGER } from '@uniswap/sdk-core/dist/utils/sqrt'
import { useAuth } from 'contexts/AuthContext'
import { ethers } from 'ethers'
import { MaxUint256 } from 'gemswap-sdk'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { TokenType } from 'lib/tokens'
import React, { useEffect, useState } from 'react'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { ConfirmSwapModal } from './ConfirmSwap'
import { Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionStatusModal } from './TransactionStatus'
import { TransactionSubmittedModal } from './TransactionSubmitted'
import { useSwapState } from './useSwap2'

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

const LoadingBestTradeIndicator = () => {
  return (
    <Flex mr="auto" gap={2} align="center" color="text.low">
      <Spinner size="xs" />
      <Text fontSize="sm">Fetching pair data</Text>
    </Flex>
  )
}

const SwitchCurrencies = ({ onClick }) => {
  return (
    <Flex align="center" justify="center">
      <Button
        shadow="Up Small"
        _focus={{ shadow: 'Up Small' }}
        _hover={{ shadow: 'Up Big' }}
        px={3.5}
        py={2}
        bgColor="blackAlpha.100"
        rounded="3xl"
        onClick={onClick}
      >
        <ExpandArrowIcon />
      </Button>
    </Flex>
  )
}

const PairsError = () => (
  <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
    Error Fetching Pairs
  </Text>
)

export function SwapCard() {
  const {
    tradeStatus,
    currencyIn,
    currencyOut,
    inputValue,
    outputValue,
    updateInputValue,
    updateOutputValue,
    updateCurrencyIn,
    updateCurrencyOut,
    switchCurrencies,
  } = useSwapState()

  return (
    <>
      <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
        <TokenInput
          value={inputValue}
          currency={currencyIn}
          stable={''}
          balance={''}
          onChangeValue={updateInputValue}
          onChangeCurrency={updateCurrencyIn}
          // bug: fails to execute tx when clicked before hitting swap
          // onClickMaxBalance={() => {
          //   if (swapingIn.currency.equals(nativeCurrency)) setAmountIn(+swapingIn.balance * 0.8)
          //   else setAmountIn(swapingIn.balance)
          // }}
        />
        <SwitchCurrencies onClick={switchCurrencies} />
        <TokenInput
          disabled={true}
          value={outputValue}
          currency={currencyOut}
          stable={''}
          balance={''}
          onChangeValue={updateOutputValue}
          onChangeCurrency={updateCurrencyOut}
        />

        <HStack align="center" justify="end" py={5}>
          {tradeStatus === 'loading' && <LoadingBestTradeIndicator />}
          {tradeStatus === 'error' && <PairsError />}
          {
            // : (
            //   swapingOut.relativePrice && (
            //     <Flex flexWrap="wrap" fontSize="xs" fontWeight="medium" mr="auto">
            //       <Text>
            //         1 {swapingOut.currency.symbol} = {swapingOut.relativePrice}
            //         {swapingIn.currency.symbol}
            //       </Text>
            //       {swapingOut.stable && (
            //         <Text ml={1} textColor="text.low">
            //           (${swapingOut.stable})
            //         </Text>
            //       )}
            //     </Flex>
            //   )
          }
          <GasPrice />
          {/* <Settings onClose={() => null} /> */}
        </HStack>
        {/*
        {needsApproval && (
          <Button
            isLoading={isApproving}
            variant="primary"
            size="large"
            isFullWidth
            onClick={() => approve()}
          >
            Approve {swapingIn.currency.symbol}
          </Button>
        )}

        {!isConnected && false ? (
          // <Button variant="primary" size="large" disabled onClick={connectWithModal}>
          //   Connect Wallet
          // </Button>
          <></>
        ) : (
          <Button
            isDisabled={
              !isTradeReady ||
              needsApproval ||
              !isConnected ||
              +swapingIn.balance < +swapingIn.amount
            }
            variant="primary"
            size="large"
            isFullWidth
            onClick={confirmModal.onOpen}
          >
            {+swapingIn.balance < +swapingIn.amount ? 'Insufficient Funds' : 'Swap'}
          </Button>
        )} */}
      </Card>
      {/* 
      <ConfirmSwapModal
        tradeInfo={tradeInfo}
        tokenInUsdPrice={swapingIn.stable}
        tokenOutUsdPrice={swapingOut.stable}
        tokenInRelativePriceToTokenOut={swapingOut.relativePrice}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => confirmSwap()}
        exactInOrExactOut={inOrOut}
      />

      {/* <TransactionStatusModal
        inAmount={swapingIn?.amount}
        outAmount={tradeInfo?.meta.expectedOutput}
        inSymbol={swapingIn?.currency?.symbol}
        outSymbol={swapingOut?.currency?.symbol}
        status={swapTransaction}
        isOpen={transactionStatusModal.isOpen}
        onClose={() => {
          transactionStatusModal.onClose()
        }}
      /> */}

      {/* <TransactionSubmittedModal
        receipt={swapReceipt}
        isOpen={receiptModal.isOpen}
        onClose={() => {
          receiptModal.onClose()
        }}
      />  */}
    </>
  )
}
