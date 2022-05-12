import { CNV, Currency, CurrencyAmount, toHex } from '@concave/gemswap-sdk'
import { Box, Button, Card, Flex, HStack, Image, Input, Text } from '@concave/ui'
import { CurrencyInputField } from 'components/CurrencyAmountField'
// import { SelectBondCurrency } from 'components/CurrencySelector/SelectBondCurrency'
import { STAKING_CONTRACT } from 'constants/address'
import { StakingV1Abi } from 'contracts/LiquidStaking/LiquidStakingAbi'
import { useFetchApi } from 'hooks/cnvData'
import { useApprove } from 'hooks/useApprove'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount, useBalance, useContractWrite, useNetwork } from 'wagmi'

const periodToPoolParameter = {
  '360 days': 0,
  '180 days': 1,
  '90 days': 2,
  '45 days': 3,
}

function StakeInput(props: any) {
  const cnvPrice = useFetchApi('/api/cnv')
  const [{ data: account }] = useAccount()
  const [{ data }] = useNetwork()
  // const [stakeInput, setStakeInput] = useState(toAmount(0, CNV[data?.chain.id]))
  const [stakeInput, setStakeInput] = useState<CurrencyAmount<Currency>>(toAmount(0, CNV[3]))
  useCurrentSupportedNetworkId((chainId) => setStakeInput(toAmount(0, CNV[chainId])))
  const { allowance, ...approve } = useApprove(
    stakeInput.currency.wrapped,
    STAKING_CONTRACT[stakeInput.currency.chainId],
  )
  const [approveButtonText, setApproveButtonText] = useState('Approve CNV')
  const [allowanceEnough, setAllowanceEnough] = useState(false)
  // console.log(allowance.formatted)
  // approve.sendApproveTx()

  // useEffect(() => {
  //   if (allowance && +allowance.formatted > +stakeInput) {
  //     setAllowanceEnough(true)
  //   } else {
  //     setAllowanceEnough(false)
  //   }
  //   if (stakeInput === '') setStakeInput('')
  // }, [allowance, stakeInput])

  const [cnvBalance, getBalance] = useBalance({
    addressOrName: account?.address,
    token: '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F',
    // token: '0x000000007a58f5f58E697e51Ab0357BC9e260A04',
  })

  // const setSafeStakeInputValue = (value: string) => {
  //   let currentValue = value
  //   if (Number(currentValue) >= +cnvBalance.data?.formatted) {
  //     currentValue = String(+cnvBalance.data?.formatted)
  //   }
  //   setStakeInput(String(currentValue))
  // }

  // const setMax = () => {
  //   setStakeInput(cnvBalance.data?.formatted)
  // }

  const approveCNV = () => {
    approve.sendApproveTx()
    setApproveButtonText('Pending...')
  }

  const [lockData, lockCNV] = useContractWrite(
    {
      addressOrName: '0x265271970c6e13a942f0f75c9d619ffe5ca2872e',
      contractInterface: StakingV1Abi,
    },
    'lock',
    {
      args: [
        account?.address,
        toHex(stakeInput),
        // ethers.utils.parseEther(String(+stakeInput)),
        periodToPoolParameter[`${props.period}`],
      ],
    },
  )

  const router = useRouter()

  return (
    <Box>
      <Card shadow="down" w="350px" px={0} py={0}>
        <Flex justify="space-between" alignItems="center">
          {/* <Input
            placeholder="0.00"
            value={''}
            onChange={null}
            ml={-1}
            shadow="none"
            w="60%"
            bg="none"
            fontSize="xl"
            type="number"
          /> */}
          <CurrencyInputField
            currencyAmountIn={stakeInput}
            onChangeAmount={setStakeInput}
            // CurrencySelector={SelectBondCurrency}
          />
        </Flex>
      </Card>

      <Box mt={10} width="350px">
        {allowance.value < stakeInput.numerator.toString() && (
          <Button
            onClick={approveCNV}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="100%"
            h="50px"
            size="large"
            mx="auto"
            disabled={+stakeInput > +cnvBalance.data?.formatted}
          >
            {approveButtonText}
          </Button>
        )}

        {allowance.value >= stakeInput.numerator.toString() && (
          <Button
            mt={5}
            onClick={() => {
              lockCNV().then((r) => {
                setStakeInput(toAmount(0, stakeInput.currency))
                setTimeout(() => {
                  props.onClose()
                }, 300)
              })
            }}
            fontWeight="bold"
            fontSize="md"
            variant="primary"
            bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
            w="100%"
            h="50px"
            size="large"
            mx="auto"
            disabled={
              +stakeInput == 0 || +stakeInput > +cnvBalance.data?.formatted || lockData.loading
            }
          >
            Stake CNV
          </Button>
        )}

        {/* <Button
          mt={5}
          onClick={() => router.push('/dashboard')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Check position
        </Button> */}
      </Box>
    </Box>
  )
}

export default StakeInput
