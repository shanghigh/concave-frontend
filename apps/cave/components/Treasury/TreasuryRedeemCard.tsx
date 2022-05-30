import { CNV } from 'constants/tokens'
import { Button, Flex, Text, useDisclosure } from '@concave/ui'
import useAddTokenToWallet, { injectedTokenResponse } from 'hooks/useAddTokenToWallet'
import { GlassPanel } from './TreasuryManagementCard'
import { useEffect, useState } from 'react'
import { useConnect } from 'wagmi'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import ACVNRedemptionDialog from './VestedTokensDialogs/ACVNRedemptionDialog'
import { ComingSoonDialog } from 'components/ComingSoonDialog'
// aCNV address
// 0x2a6bb78490c2221e0d36d931192296be4b3a01f1 RINKEBY
// 0x6ff0106d34feee8a8acf2e7b9168480f86b82e2f eth

function TreasuryRedeemCard() {
  const { addingToWallet }: injectedTokenResponse = useAddTokenToWallet({
    tokenAddress: CNV.address,
    tokenChainId: CNV.chainId,
  })
  const netWorkId = useCurrentSupportedNetworkId()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState("This feature it's not done yet.")
  const [title, setTitle] = useState('Coming soon')

  const [walletName, setWalletName] = useState('')
  const [{ data }] = useConnect()

  const {
    isOpen: onRedeemBBTCNV,
    onOpen: onOpenRedeemBBTCNV,
    onClose: onCloseRedeemBBTCNV,
  } = useDisclosure()
  const {
    isOpen: onRedeemACNV,
    onOpen: onOpenRedeemACNV,
    onClose: onCloseRedeemACNV,
  } = useDisclosure()

  useEffect(() => {
    setWalletName(data?.connector?.name || 'Wallet')
  }, [walletName])

  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const [tx, setTx] = useState()
  const [error, setError] = useState('')

  return (
    <>
      <GlassPanel
        width={{ base: '510px', xl: '260px' }}
        height={{ base: '240px', xl: '331px' }}
        direction="column"
      >
        <Flex direction={{ base: 'row', xl: 'column' }}>
          <Flex direction={'column'} maxW="300px" justify={'center'} px="10" mt={6}>
            <Text textAlign={{ base: 'start', xl: 'center' }} fontSize={'25px'} fontWeight="700">
              Redeem CNV
            </Text>
            <Text
              textAlign={{ base: 'start', xl: 'center' }}
              fontSize={{ base: '20px', xl: '16px' }}
              textColor="text.low"
              fontWeight={'700'}
            >
              Redeem your tokens for CNV below
            </Text>
          </Flex>
          <Flex mt={5} direction={{ base: 'column' }} gap={{ base: 3 }}>
            <RedeemButton onClick={onOpenRedeemACNV} title="aCNV" />
            <ACVNRedemptionDialog
              onClose={onCloseRedeemACNV}
              isOpen={onRedeemACNV}
              onRedeem={() => {}}
            />
            <RedeemButton
              onClick={() => {
                onOpen()
                setTitle('pCNV Loading')
                setDescription("We're busy mining the pCNV token, come back later.")
              }}
              title="pCNV"
            />
            <RedeemButton
              onClick={() => {
                onOpen()
                setTitle('bbtCNV Loading')
                setDescription('bbtCNV is on its way up and out of the mines, are you ready anon?')
              }}
              title="bbtCNV"
            />
          </Flex>
        </Flex>
        <Text
          onClick={() => {
            addingToWallet()
          }}
          textColor={'text.low'}
          fontWeight={700}
          cursor="pointer"
          mx={'auto'}
          my="auto"
          fontSize={{ base: '22px', xl: '18px' }}
        >
          Add CNV to your {walletName}
        </Text>
      </GlassPanel>

      <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      <TransactionSubmittedDialog isOpen={isSubOpen} closeParentComponent={onCloseSub} tx={tx} />
      <TransactionErrorDialog
        error={error}
        isOpen={isErrorOpen}
        closeParentComponent={onCloseError}
      />
      <ComingSoonDialog title={title} desc={description} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TreasuryRedeemCard

const RedeemButton = ({ onClick, title }: { onClick: () => void; title: string }) => {
  return (
    <GlassPanel
      width={{ base: '160px', xl: '182px' }}
      height={'40px'}
      rounded="2xl"
      mx={'auto'}
      justify={'center'}
    >
      <Button onClick={onClick}>
        <Text fontSize={'20px'} fontWeight="700" my={'auto'}>
          {title}
        </Text>
      </Button>
    </GlassPanel>
  )
}
