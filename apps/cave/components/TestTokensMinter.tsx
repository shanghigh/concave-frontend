import { ChainId, DAI, NATIVE } from '@concave/gemswap-sdk'
import { CloseIcon } from '@concave/icons'
import {
  Box,
  Button,
  Card,
  Image,
  Link,
  Modal,
  SlideFade,
  Stack,
  Text,
  useDisclosure,
} from '@concave/ui'
import { Wallet } from 'ethers'
import { hexlify, parseEther, parseUnits } from 'ethers/lib/utils'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { concaveProvider } from 'lib/providers'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { chain, useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useWorthyUser } from './DevelopGateway'

import { getTxExplorer } from './TransactionSubmittedDialog'

const faucetKey = process.env.NEXT_PUBLIC_FAUCET_PK
const faucet = faucetKey && new Wallet(faucetKey, concaveProvider(ChainId.ROPSTEN))

const sendSomeEth = async (recipient) => {
  const tx = {
    from: faucet.address,
    to: recipient,
    value: parseEther('0.1'),
    nonce: await faucet.getTransactionCount(),
    gasLimit: hexlify(2100000),
    gasPrice: await faucet.getGasPrice(),
  }
  return await faucet.sendTransaction(tx)
}

const ETHFaucet = () => {
  const [{ data: account }] = useAccount()

  const { data: ethBalance, isLoading } = useCurrencyBalance(NATIVE[ChainId.ROPSTEN])

  const { data: faucetBalance } = useQuery('faucet balance', () => faucet.getBalance())

  const {
    data: sentEthTx,
    isSuccess: ethSentSuccess,
    isLoading: isSendingEth,
    refetch: sendEth,
  } = useQuery('send eth', () => sendSomeEth(account?.address), { enabled: false })

  if (faucetBalance?.lt(parseEther('0.1')))
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={3} fontSize="sm" spacing={0}>
        <Text>Noo the ETH faucet is dry 😭</Text>
      </Stack>
    )

  if (ethBalance?.greaterThan(0))
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={3} fontSize="sm" spacing={0}>
        <Text>Nice you already got {ethBalance?.toFixed(2, { groupSeparator: ',' })} ETH</Text>
      </Stack>
    )

  return (
    <>
      <Button
        leftIcon={<Image w="20px" src={`/assets/tokens/eth.svg`} alt="" />}
        onClick={() => sendEth()}
        isLoading={isSendingEth || isLoading}
        loadingText={isSendingEth && 'sending 0.1 ETH'}
        variant="secondary"
        p={3}
      >
        Get some gas ETH
      </Button>
      {ethSentSuccess && (
        <Stack fontWeight="bold" rounded="2xl" shadow="down" py={2} fontSize="sm" spacing={0}>
          <Text>🎉 0.1 ETH Sent!</Text>
          <Link
            href={getTxExplorer(sentEthTx, chain.ropsten)}
            fontSize="sm"
            color="text.accent"
            isExternal
          >
            View on explorer
          </Link>
        </Stack>
      )}
    </>
  )
}

const DAIMinter = () => {
  const [{ data: account }] = useAccount()

  const [{ data: mintDaiTx, loading }, mintDAI] = useContractWrite(
    {
      addressOrName: DAI[ChainId.ROPSTEN].address,
      contractInterface: ['function mint(address guy, uint256 wad) external'],
    },
    'mint',
    { args: [account.address, parseUnits('69420', 18)] },
  )

  if (!!mintDaiTx)
    return (
      <Stack fontWeight="bold" rounded="2xl" shadow="down" py={2} fontSize="sm" spacing={0}>
        <Text>🎉 69420 tDAI tx sent!</Text>
        <Link
          href={getTxExplorer(mintDaiTx, chain.ropsten)}
          fontSize="sm"
          color="text.accent"
          isExternal
        >
          View on explorer
        </Link>
      </Stack>
    )

  return (
    <Button
      leftIcon={<Image w="20px" src={`/assets/tokens/dai.svg`} alt="" />}
      onClick={() => mintDAI()}
      isLoading={loading}
      loadingText="Confirm in your wallet"
      variant="secondary"
      p={3}
    >
      Mint tDai
    </Button>
  )
}

const TestTokensMinter = ({ isOpen, onClose }) => {
  return (
    <Modal
      bluryOverlay={true}
      title="The cave faucet"
      titleAlign="center"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ w: '350px', gap: 3, textAlign: 'center' }}
    >
      <Text fontWeight="bold">{`You'll`} need tDai to test around here</Text>
      <ETHFaucet />
      <DAIMinter />
      <Text fontWeight="bold" fontSize="sm" color="text.low">
        On the swap page you can exchange tDai for CNV to start messing around!
      </Text>
    </Modal>
  )
}

export const TestnetIndicator = () => {
  const [{ data: network }] = useNetwork()
  const { isUserWorthy } = useWorthyUser()

  const [isOpen, setIsOpen] = useState(network.chain?.testnet && isUserWorthy)
  const onClose = () => setIsOpen(false)

  useEffect(() => {
    setIsOpen(network.chain?.testnet && isUserWorthy)
  }, [isUserWorthy, network.chain?.testnet])

  const minterModal = useDisclosure()

  // if (!isOpen) return null
  return (
    <SlideFade in={isOpen} unmountOnExit offsetY={-10}>
      <Box pos="absolute" top={{ base: 20, md: 8 }}>
        <Card
          variant="secondary"
          p={5}
          direction="row"
          align="center"
          rounded="3xl"
          shadow="Up for Blocks"
          pos="relative"
          overflow="visible"
        >
          <Stack spacing={0}>
            <Text fontWeight="bold" whiteSpace="nowrap">
              {`You're`} currently on{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, #7a58d6, #7DE0FF, #7a58d6, #84E2FF)"
                filter="drop-shadow(0px 0px 10px rgba(240, 255, 245, 0.3))"
                bgClip="text"
              >
                {network.chain?.name}
              </Text>{' '}
              testnet
            </Text>

            <Text color="text.low" fontWeight="medium">
              Get some test tokens on the faucet!
            </Text>
          </Stack>
          <Stack spacing={1} align="center" ml={6}>
            <Button variant="primary" px={4} py={2} h="min" onClick={minterModal.onOpen}>
              Open Faucet
            </Button>
            {/* <Button fontSize="xs" color="text.accent">
            Switch to mainnet
          </Button> */}
          </Stack>

          <Button
            bg="blackAlpha.700"
            border="2px solid white"
            p={1.5}
            rounded="full"
            pos="absolute"
            top="-4px"
            right="-4px"
            onClick={onClose}
          >
            <CloseIcon w="8px" h="8px" />
          </Button>
        </Card>
        <TestTokensMinter isOpen={minterModal.isOpen} onClose={minterModal.onClose} />
      </Box>
    </SlideFade>
  )
}