import React from 'react'
import {
  Portal,
  Button,
  Card,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  gradientBorder,
  Modal,
  Flex,
  useDisclosure,
} from '@concave/ui'
import { useAccount, useConnect } from 'wagmi'
import { useIsMounted } from 'hooks/useIsMounted'
import { useModals } from 'contexts/ModalsContext'
import YourWalletModal from './YourWalletModal'

// const miniAddress = (address) =>
//   `${address.substr(0, 6)}...${address.substr(address.length - 6, address.length)}`

/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function ellipseAddress(hash: string, length = 38): string {
  if (!hash) {
    return ''
  }
  return hash.replace(hash.substring(6, length), '...')
}

const DisconnectButton = () => {
  const [{ data: account }, disconnect] = useAccount()

  return (
    <Menu placement="right-start">
      <MenuButton as={Button} shadow="up" fontFamily="heading" size="medium" w="100%">
        {ellipseAddress(account.address)}
      </MenuButton>
      <Portal>
        <MenuList minW="min" bg="none" border="none" shadow="none" p="0" backdropFilter="blur(8px)">
          <Card variant="secondary" borderGradient="secondary" borderRadius="xl" px={1} py={2}>
            <MenuItem borderRadius="lg" onClick={() => disconnect()}>
              Disconnect
            </MenuItem>
          </Card>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const [{ data, loading }, connect] = useConnect()
  const isMounted = useIsMounted()
  return (
    <Modal
      bluryOverlay={true}
      title="Connect Wallet"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      bodyProps={{ alignItems: 'center', gap: 3, w: '100%', maxW: '350px' }}
    >
      {isMounted &&
        data.connectors.map((connector) => {
          if (!connector.ready) return null
          return (
            <Button
              w="100%"
              shadow="Up Small"
              _hover={{ shadow: 'Up Big' }}
              _active={{ shadow: 'down' }}
              _focus={{ shadow: 'Up Big' }}
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
                if (connector.id !== data?.connector?.id) connect(connector).then(onClose)
              }}
            >
              {connector.name}
            </Button>
          )
        })}
    </Modal>
  )
}

const ConnectButton = () => {
  // const [{ data }, connect] = useConnect()
  // const isMounted = useIsMounted()
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
  const [{ data }] = useConnect()

  const [{ data: account }] = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // if (data.connected) return <DisconnectButton />
  if (data.connected)
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
        </Button>
        <YourWalletModal onClose={onClose} isOpen={isOpen} />
      </>
    )

  // if (isConnected && !isSignedIn) return
  return <ConnectButton />
}
