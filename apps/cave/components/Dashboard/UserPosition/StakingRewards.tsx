import { Flex, Text } from '@concave/ui'

const DividendsShare = () => {
  return (
    <Flex flex={1} ml={{ lg: 6, md: 3 }} direction="column">
      <Flex
        direction={'column'}
        maxH={'90px'}
        flex={1}
        textAlign="start"
        justify={'center'}
        textColor="gray.00"
      >
        <Text fontWeight={'700'}>Your Staking </Text>
        <Text fontWeight={'700'}>Rewards</Text>
      </Flex>
      <Flex direction={'column'} flex={1} gap={{ lg: 4, md: 8 }} mt={{ md: 4 }}>
        <Flex direction={'column'} textAlign="start" justify={'center'}>
          <Text fontSize={'13px'} textColor="text.low">
            Just now
          </Text>
          <Text fontSize={'16px'} textColor="text.accent" fontWeight={700}>
            +0.0013 CNV
          </Text>
        </Flex>
        <Flex direction={'column'} textAlign="start" justify={'center'}>
          <Text fontSize={'13px'} textColor="text.low">
            8 hours ago
          </Text>
          <Text opacity={0.8} fontSize={'16px'} textColor="text.accent" fontWeight={700}>
            +0.0091 CNV
          </Text>
        </Flex>
        <Flex direction={'column'} textAlign="start" justify={'center'}>
          <Text fontSize={'13px'} textColor="text.low">
            24 hours ago
          </Text>
          <Text opacity={0.6} fontSize={'16px'} textColor="text.accent" fontWeight={700}>
            +0.00356 CNV
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DividendsShare