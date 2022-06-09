import { Button, Image, gradientBorder, Modal, Flex, useDisclosure } from '@concave/ui'
import { useAccount, useConnect } from 'wagmi'
import { useIsMounted } from 'hooks/useIsMounted'
import { useModals } from 'contexts/ModalsContext'
import YourWalletModal from './YourWalletModal'
import { useRecentTransactions } from 'hooks/useRecentTransactions'
import { SpinnerIcon } from '@concave/icons'
import { spinAnimation } from './Treasury/Mobile/TreasuryManagementMobile'
import { useRouter } from 'next/router'

/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function ellipseAddress(hash: string, length = 38): string {
  if (!hash) return ''
  return hash.replace(hash.substring(6, length), '...')
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { connectors, connect, activeConnector } = useConnect({
    chainId: +router.query.chainId,
    onConnect: () => onClose(),
  })
  const isMounted = useIsMounted()
  /*
   injected & metamask connectors sometimes can be the same, showing two metamask buttons
    _connectors is an array with no repeated connectors
  */
  const _connectors = [...new Map(connectors.map((c) => [c.name, c])).values()]
  return (
    <Modal
      bluryOverlay={true}
      title="Connect Wallet"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      preserveScrollBarGap
      motionPreset="slideInBottom"
      bodyProps={{ alignItems: 'center', gap: 3, w: '100%', maxW: '350px' }}
    >
      {isMounted &&
        _connectors.map((connector) => {
          if (!connector.ready) return null
          const itsConnect = connector.id === activeConnector?.id
          return (
            <Button
              cursor={itsConnect ? 'default' : 'pointer'}
              w="100%"
              shadow={itsConnect ? 'down' : 'Up Small'}
              _hover={!itsConnect && { shadow: 'Up Big' }}
              _active={!itsConnect && { shadow: 'down' }}
              _focus={!itsConnect && { shadow: 'Up Big' }}
              size="large"
              leftIcon={
                <Image
                  w="20px"
                  src={`/assets/connectors/${connector.name.toLowerCase().replace(' ', '-')}.png`}
                  alt={connector.name}
                />
              }
              key={connector.id}
              onClick={() => {
                if (!itsConnect) connect(connector)
              }}
            >
              {connector.name}
            </Button>
          )
        })}
    </Modal>
  )
}
// commit
const ConnectButton = () => {
  const { connectModal } = useModals()

  return (
    <>
      <Button
        sx={{ ...gradientBorder({ borderWidth: 2, borderRadius: '2xl' }) }}
        fontFamily="heading"
        variant="primary"
        size="medium"
        w="100%"
        onClick={connectModal.onOpen}
      >
        Connect wallet
      </Button>
    </>
  )
}

export function ConnectWallet(): JSX.Element {
  const { isConnected } = useConnect()

  const { data: account } = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: recentTx, status, isLoading } = useRecentTransactions()

  if (isConnected)
    return (
      <>
        <Button
          onClick={onOpen}
          height="40px"
          shadow="up"
          fontFamily="heading"
          w="100%"
          rounded={'2xl'}
          _focus={{}}
        >
          <Flex textColor={'text.low'} fontWeight="bold" mx={'auto'}>
            {ellipseAddress(account?.address)}
          </Flex>
          {isLoading && (
            <Flex position={'absolute'} width="80%" justify={'end'}>
              <SpinnerIcon color={'text.low'} animation={spinAnimation(4)} boxSize={'20px'} />
            </Flex>
          )}
        </Button>
        <YourWalletModal onClose={onClose} isOpen={isOpen} />
      </>
    )

  // if (isConnected && !isSignedIn) return
  return <ConnectButton />
}
