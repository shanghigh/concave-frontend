import { AirdropClaimContract } from '@concave/core'
import { Button, CloseButton, Flex, Heading, Image, Link, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { useErrorModal } from 'contexts/ErrorModal'
import { parseUnits } from 'ethers/lib/utils'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'
import { airdropToken } from '../airdrop'

export function AirdropClaimModal() {
  const { isOpen, onClose, proof, redeemable, whiteListed } = useAirdrop()
  const { address, isConnected } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const errorModal = useErrorModal()

  const { data: claimed } = useQuery(['AirdropClaimContract', networkId], async () => {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId))
    return await airdrop.claimed(address)
  })

  async function claimAidrop() {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId))
    const convertedAmount = parseUnits(redeemable?.toString() || '0', airdropToken.decimals)
    return airdrop.claim(signer, proof, convertedAmount)
  }
  const meta = { type: 'airdrop', amount: redeemable } as const
  const onError = (e: unknown) => errorModal.onOpen(e, { 
    redeemable: redeemable?.toString(),
    proof: JSON.stringify(proof)
  })
  const airdrop = useTransaction(claimAidrop, { meta, onError })

  return (
    <Modal
      bodyProps={{
        overflow: 'visible',
        borderGradient: '',
        variant: 'primary',
        justify: 'center',
        align: 'center',
        shadow: 'up',
        h: '350px',
        w: '540px',
        p: 0,
      }}
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      bluryOverlay
      isCentered
      hideClose
      title=""
    >
      <Image
        src="./assets/airdrop/airdrops.png"
        position={'absolute'}
        alt="airdrop rain"
        zIndex={10}
        mt="-92%"
      />
      <Heading mt={10} fontWeight={'bold'} fontSize="3xl">
        Claim your airdrop now!
      </Heading>
      <Text pb="6" textAlign={'center'} px={24} mt={2} color="text.low">
        Happy One Year Concaversary! <br />{' '}
        <Link color={'text.bright'} href="https://spoon.fyi/proofOfGemInfo" isExternal>
          Click here
        </Link>{' '}
        to find out more about this airdrop!
      </Text>
      <ItemInfo info={`${redeemable || 0} USDC`} title="Redeemable amount" />
      <Button
        disabled={claimed || !whiteListed || status === 'loading' || !redeemable}
        isLoading={status === 'loading'}
        onClick={() => airdrop.sendTx()}
        shadow="0px 0px 20px #0006"
        loadingText="Claiming..."
        bg="stroke.brightGreen"
        position="relative"
        w="fit-content"
        h="50px"
        mt={7}
        px="8"
      >
        <Text id="btn-text" color="white">
          {getButtonLabel({ status: airdrop.status, isConnected, claimed, whiteListed })}
        </Text>
      </Button>
      <CloseButton
        onClick={onClose}
        color="text.low"
        pos="absolute"
        left="93.5%"
        zIndex={10}
        size={'md'}
        top="1%"
      ></CloseButton>
    </Modal>
  )
}
type StatusProps = {
  status: 'error' | 'success' | 'idle' | 'loading'
  isConnected: boolean
  claimed: boolean
  whiteListed: boolean
}
function getButtonLabel({ claimed, isConnected, whiteListed, status }: StatusProps) {
  if (!isConnected) return 'You are not connected'
  if (status === 'idle') {
    if (claimed) return 'Already claimed'
    if (!whiteListed) return 'Nothing to claim'
    return 'Claim'
  }
  if (status === 'error') return 'Ocurred an error'
  if (status === 'success') return 'Airdrop claimed'
}

interface ItemInfoProps {
  title: string
  info: string
}
function ItemInfo(props: ItemInfoProps) {
  const { info, title } = props
  return (
    <Flex direction={'column'} align="center">
      <Text textColor={'text.low'} fontWeight="500">
        {title}
      </Text>
      <Flex align={'center'} fontWeight="semibold" gap={1}>
        <Text>{info}</Text>
        <Image src="/assets/tokens/usdc-logo.webp" boxSize={'22px'} alt="usdc token icon" />
      </Flex>
    </Flex>
  )
}