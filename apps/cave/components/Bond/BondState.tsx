import { useState, useMemo } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { Contract, ethers } from 'ethers'
import { DAI, CNV } from 'gemswap-sdk'
import { BOND_ADDRESS } from '../../contracts/Bond/BondingAddress'
import { BOND_ABI } from '../../contracts/Bond/BondABI'
import { ROPSTEN_DAI_ABI } from '../../contracts/Bond/ROPSTEN_DAI_ABI'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { BondSettings } from './Settings'
import { utils } from 'ethers'
import { position } from '@concave/ui'
// testing only, flip to prod
let providers = new ethers.providers.InfuraProvider('ropsten', '5ad069733a1a48a897180e66a5fb8846')

export const getBondAmountOut = async (
  quoteAddress: string,
  decimals: number,
  networkId: number,
  input: string,
) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  const ROPSTEN_DAI = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  // pass decimals argument where 18 is hardcoded
  const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
  const amountOut = await bondingContract.getAmountOut(ROPSTEN_DAI, formattedInput)
  const ethValue = ethers.utils.formatEther(amountOut)
  const cleanedOutput = parseFloat(ethValue).toFixed(6)
  return cleanedOutput
}

export const useBondGetTermLength = async (networkId: number) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  const termLength = await bondingContract.term()
  const formattedTermLength = termLength.toString()
  return formattedTermLength / 60 / 60 / 24
}

export const getBondSpotPrice = async (networkId: number, tokenAddress: string) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  const ROPSTEN_DAI = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  const spotPrice = await bondingContract.getSpotPrice(ROPSTEN_DAI)
  const formatted = ethers.utils.formatEther(spotPrice)
  return formatted
}

export const purchaseBond = async (
  networkId: number,
  input: string,
  address: string,
  signer: ethers.Signer,
  settings: BondSettings,
  amountOut: string,
) => {
  const ROPSTEN_DAI_ADDRESS = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  const ROPSTEN_DAI_CONTRACT = new ethers.Contract(ROPSTEN_DAI_ADDRESS, ROPSTEN_DAI_ABI, signer)
  const currentAllowance = await ROPSTEN_DAI_CONTRACT.allowance(address, BOND_ADDRESS[networkId])
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, signer)
  const minOutput = +(+amountOut - (+settings.slippageTolerance.value / 100) * +amountOut).toFixed(
    2,
  )
  const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
  const formattedMinOutput = ethers.utils.parseUnits(minOutput.toString(), 18)
  const formattedAllowance = ethers.utils.formatEther(currentAllowance)
  const estimatedGas = await bondingContract.estimateGas.purchaseBond(
    address,
    ROPSTEN_DAI_ADDRESS,
    formattedInput,
    formattedMinOutput,
  )
  const intParseInput = +input
  const intParseAllowance = +formattedAllowance
  if (intParseInput > intParseAllowance) {
    await ROPSTEN_DAI_CONTRACT.approve('0xE9Ffe05f55697A4D8A95BB046E5A8b150A49687e', formattedInput)
  } else {
    await bondingContract.purchaseBond(
      address,
      ROPSTEN_DAI_ADDRESS,
      formattedInput,
      formattedMinOutput,
      {
        gasLimit: estimatedGas,
      },
    )
  }
  return
}

export async function getCurrentBlockTimestamp() {
  const getBlock = providers.getBlockNumber()
  const timestamp = (await providers.getBlock(getBlock)).timestamp
  return timestamp
}
// export const redeemBond = async (
//   networkId: number,
//   positionID: string,
//   address: string,
//   signer: ethers.Signer,
// ) => {
//   const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, signer)
//   const formattedPositionID = ethers.utils.parseUnits(positionID.toString(), 18)
//   const estimatedGas = bondingContract.estimateGas.redeemBond(
//     address,
//     positionID,
//   )
//   await bondingContract.redeemBond(
//     address,
//     formattedPositionID,
//     {
//       gasLimit: estimatedGas,
//     },
//   )

//   return
// }

export const getUserBondPositions = async (
  networkId: number,
  address: string,
  currentBlockTimestamp: number,
) => {
  let batchRedeemArray = []
  let totalPending = 0
  let totalOwed = 0
  let oldest = 0
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  // TODO: Get bond position length
  for (let i = 0; i < 21; i++) {
    const positionData = await bondingContract.positions(address, i)
    // revisit this, dont push if owed is not greater than 0
    if (positionData.owed > 100000000000000000) batchRedeemArray.push(i)
    if (+positionData.creation > oldest) {
      oldest = +positionData.creation
    }
    let fullyVestedTimestamp = +positionData.creation * 1000 + 432000000
    let elapsed =
      currentBlockTimestamp >= fullyVestedTimestamp
        ? 1
        : +currentBlockTimestamp / positionData.creation
    totalPending +=
      +(+utils.formatEther(positionData.owed)).toFixed(2) * elapsed -
      +(+utils.formatEther(positionData.redeemed)).toFixed(2)
    totalOwed += +(+utils.formatEther(positionData.owed)).toFixed(2)
  }
  const parseOldest = new Date(oldest * 1000 + 432000000).toString().slice(4, 21)

  return { parseOldest, totalOwed, totalPending, batchRedeemArray }
}

export const useBondState = () => {
  const [{ data: account }] = useAccount()
  const [{ data: signer }] = useSigner()
  const [recipient, setRecipient] = useState<string>('')
  const networkId = useCurrentSupportedNetworkId()
  const currencyIn = DAI[networkId]
  const currencyOut = CNV[networkId]
  const balance = useCurrencyBalance(currencyIn)
  const userAddress = account?.address

  return useMemo(
    () => ({
      signer,
      currencyIn,
      currencyOut,
      recipient,
      setRecipient,
      userAddress,
      balance,
      networkId,
    }),
    [signer, currencyIn, currencyOut, recipient, userAddress, balance, networkId],
  )
}
