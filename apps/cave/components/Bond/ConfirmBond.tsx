import { ExpandArrowIcon } from '@concave/icons'
import { Box, Button, Flex, HStack, Modal, NumericInput, StackDivider, Text } from '@concave/ui'
import React from 'react'
import { Currency } from 'gemswap-sdk'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { Token } from 'gemswap-sdk'
import { CurrencyAmount } from 'gemswap-sdk'

const TokenInfo = ({
  currency,
  amount,
}: {
  address: string
  symbol: string
  price: string | number
  currency: Currency
  amount: string | number
  loss?: number
}) => {
  return (
    <Flex
      borderRadius={'3xl'}
      justifyContent={'space-between'}
      boxShadow={'Down Medium'}
      px={5}
      p={4}
    >
      <Box w={200} h="69px">
        <NumericInput disabled fontSize={'32px'} decimalScale={5} value={amount} />
        <Text fontWeight={700} fontSize={14} textColor="text.low"></Text>
      </Box>
      <HStack>
        <CurrencyIcon height={'40px'} currency={currency} />
        <Text fontSize={24} fontWeight={700}>
          {currency.symbol.toUpperCase()}
        </Text>
      </HStack>
    </Flex>
  )
}

const InOutArrow = () => {
  return (
    <Flex align="center" justify="center" mt={-3}>
      <Box
        shadow="Up Small"
        px={3}
        py={1}
        bgGradient="linear(to-tr, blackAlpha.500 1%, transparent 90%)"
        rounded="3xl"
      >
        <ExpandArrowIcon w="18px" h="18px" />
      </Box>
    </Flex>
  )
}

// const MinExpectedOutput = ({ value, symbol }) => {
//   return (
//     <Box>
//       <Flex fontSize={'14px'} w={'100%'} mb={2} justifyContent={'space-between'}>
//         <Text whiteSpace={'pre-wrap'} mr={8} fontWeight={700} textColor="text.low">
//           Minimum received after slippage
//         </Text>
//         <Text whiteSpace={'nowrap'} fontWeight={700} textColor="text.low">
//           {value} {symbol}
//         </Text>
//       </Flex>
//       {/* <Flex fontSize={'14px'} w={'100%'} justifyContent={'space-between'}>
//         <Text fontWeight={700} textColor="text.low">
//           Network Fee
//         </Text>
//         <Text fontWeight={700} textColor="text.low">
//           ~ {estimatedFee}
//         </Text>
//       </Flex> */}
//     </Box>
//   )
// }
// const ExpectedOutput = ({ value, symbol, priceImpact }) => {
//   return (
//     <Box>
//       <Flex fontSize={'18px'} w={'100%'} justifyContent={'space-between'}>
//         <Text whiteSpace={'pre-wrap'} mr={4} fontWeight={600}>
//           Expected Output
//         </Text>
//         <Text fontWeight={600}>
//           {value} {symbol}
//         </Text>
//       </Flex>
//       <Flex w={'100%'} justifyContent={'space-between'}>
//         <Text fontWeight={600}>Price Impact</Text>
//         <Text fontWeight={600}>{priceImpact}%</Text>
//       </Flex>
//     </Box>
//   )
// }

export const ConfirmBondModal = ({
  currencyIn,
  currencyOut,
  amountIn,
  amountOut,
  isOpen,
  onClose,
  onConfirm,
  bondPrice,
  minimumAmountOut,
  slippage,
}: {
  currencyIn: Currency
  currencyOut: Currency
  amountIn: string
  amountOut: string
  tokenInUsdPrice: string
  tokenInRelativePriceToTokenOut: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => {}
  bondPrice: string
  minimumAmountOut: string
  slippage: string
}) => {
  return (
    <Modal bluryOverlay={true} title="" isOpen={isOpen} onClose={onClose}>
      <div>
        {' '}
        <TokenInfo
          currency={currencyIn}
          address={currencyIn.isToken ? currencyIn.address : currencyIn.symbol}
          symbol={currencyIn.symbol}
          amount={amountIn}
          price={amountIn}
        />
        <InOutArrow />
        <TokenInfo
          currency={currencyOut}
          address={currencyOut.isToken ? currencyOut.address : currencyOut.symbol}
          symbol={currencyOut.symbol}
          amount={amountOut}
          price={amountOut}
        />
      </div>

      <Flex fontSize="sm" fontWeight="bold" my={6} justify="center" flexWrap="wrap">
        <Text>
          {/* 1 {currencyOut.symbol} = {tokenInRelativePriceToTokenOut}
          {currencyIn.symbol} */}{' '}
          Bond Price CNV: ${parseFloat(bondPrice).toFixed(2)}
        </Text>
      </Flex>

      <Flex direction="column" borderRadius="3xl" mb={8} p={6} shadow="Down Medium">
        {/* <ExpectedOutput
          value={meta.expectedOutput}
          symbol={currencyOut.symbol}
          priceImpact={trade.priceImpact.toSignificant(2)}
        /> */}
        <Text align="center" fontSize="sm" fontWeight="bold">
          Min CNV Out: {minimumAmountOut}
        </Text>
        <StackDivider borderRadius="full" mx={-4} my={4} h={0.5} bg="stroke.secondary" />
        {/* <MinExpectedOutput
          value={meta.worstExecutionPrice}
          symbol={currencyOut.symbol}
          // estimatedFee={'11'}
        /> */}
        <Text align="center" fontSize="sm" fontWeight="bold">
          Slippage: {slippage}%
        </Text>
      </Flex>

      <Button variant="primary" size="large" onClick={onConfirm} isFullWidth>
        Confirm Bond
      </Button>
    </Modal>
  )
}
