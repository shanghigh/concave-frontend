import { Box, Button, SimpleGrid, Text } from '@concave/ui'
import React from 'react'

// function addDays(date, days) {
//   var result = new Date(date)
//   result.setDate(result.getDate() + days)
//   return result
// }

// const periodToDaysMapping = {
//   '360 days': 360,
//   '180 days': 180,
//   '90 days': 90,
//   '45 days': 45,
// }

function StakeButtons(props: any) {
  return (
    <Box
      // shadow="down"
      // py={5}
      // borderRadius="3xl"
      // filter="drop-shadow(0px 0px 27px #81b3ff4f)"
      w="350px"
    >
      {/* <SimpleGrid px={6} columns={2} spacingX={6} spacingY={5}>
        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            CNV Price:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            $ 1,000
          </Text>
        </Box>
        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            {props.vaprText}
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            Calculating
          </Text>
        </Box>

        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            Redeem Date:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            {addDays(Date(), periodToDaysMapping[`${props.period}`]).toISOString().slice(0, 10)}
          </Text>
        </Box>

        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            Deposited CNV:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            0.9 CVN
          </Text>
        </Box>
      </SimpleGrid> */}

      <Box px={3}>
        <Button
          onClick={() => console.log('Approve')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Approve
        </Button>

        <Button
          mt={5}
          onClick={() => console.log('Stake CNV')}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Stake CNV
        </Button>
      </Box>
    </Box>
  )
}

export default StakeButtons