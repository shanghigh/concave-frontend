import { Box, HStack, Text, VStack, Card } from '@concave/ui'
import { ChevronRightIcon, QuestionOutlineIcon } from '@concave/icons'
import { InfoCard } from './Info'

function BondInfoCard() {
  return (
    <InfoCard>
      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <HStack color="text.low" fontSize="xs" fontWeight="bold" spacing="5px">
          <QuestionOutlineIcon />
          <Text>Vesting term</Text>
        </HStack>
        <Text color="text.medium" fontSize="2xl" fontWeight="bold">
          5 days
        </Text>
      </Card>

      <HStack h="120px" divider={<Box w="1px" h="100%" bg="strokeReflection" />}>
        <VStack w="100%" spacing="2px">
          <Text color="text.low" fontSize="s" fontWeight="bold">
            Current Price
          </Text>
          <Text color="text.medium" fontSize="xl" fontWeight="bold">
            $3,312.31
          </Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.low" fontSize="s" fontWeight="bold">
            Discount
          </Text>
          <Text color="text.medium" fontSize="3xl" fontWeight="bold">
            9.31%
          </Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.low" fontSize="s" fontWeight="bold">
            Discounted Price
          </Text>
          <Text color="text.medium" fontSize="xl" fontWeight="bold">
            $3,091.11
          </Text>
        </VStack>
      </HStack>

      <Card shadow="down" borderRadius="2xl" h="100px" align="center" justify="center" spacing={0}>
        <Text color="text.low" fontSize="s" fontWeight="bold">
          Max you can buy
        </Text>
        <Text color="text.medium" fontSize="3xl" fontWeight="bold">
          362.21 gCNV
        </Text>
      </Card>

      <HStack h="120px" divider={<Box w="1px" h="100%" bg="strokeReflection" />}>
        <VStack w="100%" spacing="2px">
          <Text color="text.low" fontSize="s" fontWeight="bold">
            Pending
          </Text>
          <Text color="text.medium" fontSize="xl" fontWeight="bold">
            6.736 gCNV
          </Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.low" fontSize="s" fontWeight="bold">
            Time to Fully Vest
          </Text>
          <Text color="text.medium" fontSize="xl" fontWeight="bold">
            4 days 6 hours
          </Text>
        </VStack>
        <VStack w="100%" spacing="2px">
          <Text color="text.low" fontSize="s" fontWeight="bold">
            Claimable
          </Text>
          <Text color="text.medium" fontSize="xl" fontWeight="bold">
            51.221 gCNV
          </Text>
        </VStack>
      </HStack>

      <Card shadow="down" borderRadius="2xl" h="60px" align="center" justify="center" spacing={0}>
        <Text color="text.medium" fontSize="3xl" fontWeight="bold">
          Nothing to redeem
        </Text>
      </Card>
    </InfoCard>
  )
}

export default BondInfoCard
