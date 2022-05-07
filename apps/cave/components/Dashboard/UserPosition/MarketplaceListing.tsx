import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@concave/ui'
import UserListPositionCard from '../UserListPositionCard'

interface MarketplaceListingProps {}

const MarketplaceListing = (props: MarketplaceListingProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      mx={2}
      shadow="Down Medium"
      height={{ lg: '100px', md: '145px' }}
      borderRadius="16px"
      mt={{ lg: 1, md: 0 }}
      mb={3}
    >
      {/* @ts-ignore */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg={'none'} backdropBlur="4px" />
        <ModalContent>
          <Flex>
            <UserListPositionCard />
          </Flex>
        </ModalContent>
      </Modal>

      <Flex justify={{ lg: 'left', md: 'center' }}>
        <Text pl="6" my={1} pt="3" color="text.low" fontSize="lg" as="b">
          Your Marketplace Listing
        </Text>
      </Flex>
      <Flex direction={{ lg: 'row', md: 'column' }} alignItems="center" justify="start">
        <Flex>
          <Flex
            width={'110px'}
            direction={'column'}
            textAlign={{ lg: 'start', md: 'center' }}
            ml="2"
          >
            <Text color="text.low" fontSize="sm">
              List Price:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              -------
            </Text>
          </Flex>
          <Flex
            width={'110px'}
            direction={'column'}
            textAlign={{ lg: 'start', md: 'center' }}
            ml="2"
          >
            <Text color="text.low" fontSize="sm">
              Discount:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              ----
            </Text>
          </Flex>
          <Flex
            width={'110px'}
            direction={'column'}
            textAlign={{ lg: 'start', md: 'center' }}
            ml="2"
          >
            <Text color="text.low" fontSize="sm">
              Expiration Date:
            </Text>
            <Text fontSize="md" fontWeight="bold">
              --.--.--
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} flex={1} textAlign={{ lg: 'start', md: 'center' }} ml="2">
          <Button fontWeight="bold" fontSize="md" variant={'primary'} w="150px" h="40px">
            Coming Soon!
          </Button>
          {/* onClick={onOpen} */}
        </Flex>
      </Flex>
    </Box>
  )
}

export default MarketplaceListing