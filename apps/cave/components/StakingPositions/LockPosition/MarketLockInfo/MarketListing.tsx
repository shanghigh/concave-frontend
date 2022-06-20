import { StakingPosition } from '@concave/marketplace'
import { Box, Button, Flex, Modal, Text } from '@concave/ui'
import { Loading } from 'components/Loading'
import { formatFixed } from 'utils/formatFixed'
import { ListPositionForSale, useListeForSaleState } from '../../UserListPositionCard'
import { Info } from '../Redeem/RedeemViewer'
import { getMarketPlaceButtonProps, useMarketInfo, UserMarketInfoState } from './useMarketPlaceInfo'
interface MarketplaceInfoProps {
  stakingPosition: StakingPosition
}

export const MarketListing = (props: MarketplaceInfoProps) => {
  const marketInfoState = useMarketInfo(props)
  const { marketInfo } = marketInfoState
  if (marketInfo.isLoading) {
    return (
      <Loading
        m={4}
        size="sm"
        rLabel="Loading market info"
        width={{ base: '340px', md: '490px', lg: '650px' }}
      />
    )
  }

  const buttonState = getMarketPlaceButtonProps(marketInfoState)
  const marketData = marketInfo.data
  return (
    <Box
      shadow={marketData?.isListed ? '' : 'down'}
      borderRadius="2xl"
      mt={{ lg: 1, md: 0 }}
      mb={3}
      mx={2}
      py={3}
      px={4}
      width={{ base: '340px', md: '495px', lg: '675px' }}
    >
      <Flex justify={{ lg: 'left', base: 'center' }} my="3">
        <Text color="text.low" fontSize="lg" as="b">
          Your Marketplace Listing
        </Text>
      </Flex>
      <Flex justify={{ lg: 'left', md: 'center' }} direction={{ base: 'column', lg: 'row' }}>
        <Flex flexBasis={'200%'}>
          <Info
            label={'List Price:'}
            width={'full'}
            valueFontSize={'lg'}
            value={
              marketData?.isListed
                ? `${formatFixed(marketData?.listPrice, { places: 4 })} CNV`
                : '---'
            }
          />
          <Info
            label={'Discount:'}
            width={'full'}
            value={
              marketData?.isListed
                ? `${formatFixed(marketData?.discount, { decimals: 2 })} %`
                : '---'
            }
          />
          <Info label={'Expiration Date:'} width={'full'} value={'---'} />
        </Flex>
        <Button variant={'primary'} minW={'160px'} size={'md'} width={'full'} {...buttonState} />
      </Flex>
      {marketData && <ListForSaleModal marketInfoState={marketInfoState} />}
    </Box>
  )
}

export const ListForSaleModal = ({ marketInfoState }: { marketInfoState: UserMarketInfoState }) => {
  const listForSaleState = useListeForSaleState({ marketInfoState })
  return (
    <Modal
      bluryOverlay
      title=""
      size={'xs'}
      isOpen={marketInfoState.offerDisclosure.isOpen}
      onClose={marketInfoState.offerDisclosure.onClose}
      isCentered
      hideClose
      bodyProps={{
        minW: 350,
        p: 0,
        rounded: '2xl',
        shadow: 'up',
        variant: 'primary',
      }}
    >
      <ListPositionForSale listForSaleState={listForSaleState} />
    </Modal>
  )
}
