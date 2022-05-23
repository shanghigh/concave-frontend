import { CheckIcon, CloseIcon, SpinnerIcon } from '@concave/icons'
import { Flex, keyframes, Link, Text, useDisclosure } from '@concave/ui'
import SecondConfirmModal from 'components/SecondConfirmModal'
import { commify, formatUnits } from 'ethers/lib/utils'
import { RecentTransaction, useRecentTransactions } from 'hooks/useRecentTransactions'
import { useWaitForTransaction } from 'wagmi'

export default function RecentTransactionsContainer() {
  const { data: recentTransactions, clearRecentTransactions } = useRecentTransactions()

  const { isOpen: isDialogOpen, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure()

  const hasRecentTransactions = recentTransactions.length > 0

  return (
    <Flex flex={1} direction={'column'} mt={8} mb={4}>
      <Flex
        justify={hasRecentTransactions ? 'space-between' : 'center'}
        align={hasRecentTransactions ? 'start' : 'center'}
        height={hasRecentTransactions ? '20px' : '40px'}
      >
        <Text fontWeight={'700'} fontSize="md" textColor={'text.low'}>
          {hasRecentTransactions ? 'Recent Transactions:' : 'You do not have recent transactions.'}
        </Text>
        {hasRecentTransactions && (
          <Text
            cursor={'pointer'}
            onClick={onOpenDialog}
            fontWeight={'700'}
            fontSize="md"
            textColor={'text.low'}
          >
            Clear all
          </Text>
        )}
      </Flex>

      {/* Confimation Modal --------------- */}
      <SecondConfirmModal
        onConfirm={() => {
          clearRecentTransactions()
          onCloseDialog()
        }}
        onClose={onCloseDialog}
        title="You are sure?"
        isOpen={isDialogOpen}
      >
        <Flex
          m={4}
          width={'300px'}
          justify="center"
          height="90%"
          shadow={'Down Medium'}
          rounded="2xl"
        >
          <Flex mt={6} maxW={'240px'} direction="column" justify={'space-between'}>
            <Text fontSize={'16px'} textAlign="center" textColor={'text.low'} fontWeight="bold">
              If you confirm all your recents transactions will be cleared from your localstorage
            </Text>
            <Text textColor={'text.low'} opacity={0.6} textAlign="center" mb={2} fontWeight="bold">
              This action can not be reverted
            </Text>
          </Flex>
        </Flex>
      </SecondConfirmModal>
      {/* -------------------------- */}

      {recentTransactions.length > 0 && (
        <Flex direction={'column'} mt={3} gap={1} maxH="90px">
          {recentTransactions.map((value, index) => (
            <TransactionInfo key={index} recentTransaction={value} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

const TransactionInfo = ({ recentTransaction }: { recentTransaction: RecentTransaction }) => {
  const { type, amount, amountTokenName, purchaseTokenName, transaction, purchase, stakePool } =
    recentTransaction
  const [{ data: txData, loading, error }] = useWaitForTransaction({ hash: transaction.hash })

  const info =
    type === 'Stake'
      ? `${commify(amount)} ${amountTokenName} staked in ${stakePool} Position`
      : type === 'Bond'
      ? `${commify(amount)} ${amountTokenName} bonded for ${commify(purchase)} ${purchaseTokenName}`
      : `${commify(amount)} ${amountTokenName} swaped for ${commify(purchase)} ${purchaseTokenName}`

  return (
    <Flex justify={'space-between'}>
      <Flex fontWeight={'bold'} gap={1} align="center">
        <Text>{recentTransaction.type}</Text>
        <Link
          isExternal
          href={`https://ropsten.etherscan.io/tx/${transaction.hash}`}
          fontSize={'14px'}
          textColor={'text.low'}
        >
          {info + ' ->'}
        </Link>
      </Flex>
      {/* Status 0 = Fail  */}
      {/* Status 1 = Success  */}
      {txData?.status == 0 && (
        <CloseIcon width={'12px'} height="12px" color={'red.300'} justifySelf="end" />
      )}
      {loading && (
        <SpinnerIcon
          animation={`${spin} 3s linear infinite`}
          color={'text.low'}
          justifySelf="end"
        />
      )}
      {txData?.status == 1 && <CheckIcon color={'green.300'} justifySelf="end" />}
    </Flex>
  )
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})