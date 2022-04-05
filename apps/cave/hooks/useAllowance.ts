import { BigNumber, BigNumberish, ethers } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { ContractAddress } from 'lib/contractAddress'
import { TokenType } from 'lib/tokens'
import { useEffect, useMemo } from 'react'
import { erc20ABI, useContractWrite, useContractRead, chain, useWaitForTransaction } from 'wagmi'
import { MaxUint256 } from 'gemswap-sdk'

export const useApprovalWhenNeeded = (
  token: TokenType,
  spender: string,
  userAddress: string,
  amount = MaxUint256.toString(),
) => {
  const [allowanceTokenA, syncAllowance] = useAllowance(token, spender, userAddress)
  const [approvalTokenA, requestApprove] = useApproval(token, spender, amount)

  const [approveAConfirmation] = useWaitForTransaction({ wait: approvalTokenA.data?.wait })
  useEffect(() => {
    if (approveAConfirmation.data) syncAllowance()
  }, [approveAConfirmation.data, syncAllowance])
  const formattedAllowance =
    allowanceTokenA.data && parseFloat(formatUnits(allowanceTokenA.data, token.decimals))
  const needsApprove: boolean = formattedAllowance < +amount
  const isBusy = allowanceTokenA.loading || approvalTokenA.loading
  return [needsApprove, requestApprove, isBusy] as const
}

/**
 *
 * @param tokenAddress address of token
 * @param spender address of router
 * @param userAddress address of wallet
 * @returns
 */
export const useAllowance = (token: TokenType, spender: string, userAddress: string) => {
  return useContractRead(
    { addressOrName: token.address, contractInterface: erc20ABI },
    'allowance',
    useMemo(
      () => ({
        skip: !userAddress,
        // watch: true,
        args: [userAddress, spender],
        overrides: { from: userAddress },
      }),
      [spender, userAddress],
    ),
  )
}

export const useApproval = (token: TokenType, spender: string, amountToApprove: BigNumberish) =>
  useContractWrite(
    { addressOrName: token.address, contractInterface: erc20ABI },
    'approve',
    useMemo(
      () => ({
        skip: !token.address || !amountToApprove || !spender,
        args: amountToApprove && [spender, parseUnits(amountToApprove.toString(), token.decimals)],
      }),
      [spender, token],
    ),
  )
