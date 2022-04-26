import { Box, Flex, HStack, Image, Text, VStack } from '@concave/ui'
import { Dispatch, SetStateAction, useState } from 'react'
import { format, fromUnixTime } from 'date-fns';

const MarketplaceTransactionCard = (props: any) => {
  const {filter} = props;
  console.log("filter: ", filter)

  const unixTime = fromUnixTime(filter.date)
  const cleanDate =  format(new Date(unixTime), 'PPpp');

  return (
<Box mx="auto" py={5} w="auto" h="auto" shadow="down" borderRadius="16px">   
  <HStack>
    <VStack>
      <Box>
        <Text color="blue.400" as="b">
        {filter.event}
        </Text>
      </Box>
      <Image src={'/assets/marketplace/6mposition.png'} alt={filter.date} />
    </VStack>

    <VStack>
      <Box>
        <Text fontSize="xs" color="text.low" fontWeight="medium">
        {cleanDate}
        </Text>
      </Box>
      <Box>
        <Text as="b">
        {`${filter.length} `}
        </Text>
          <Text fontSize="s" color="text.low" fontWeight="light">
          {`position of `}
          </Text>
        <Text as="b">
        {`${filter.cnv} CNV`}
        </Text>
      </Box>
      <Box>
        <a href={`https://etherscan.io/tx/${filter.link}`} target="_blank">
          <Text color="blue.400" as='u'>Transaction</Text>
        </a>
      </Box>
    </VStack>
  </HStack>
</Box>
  )
}
export default MarketplaceTransactionCard
