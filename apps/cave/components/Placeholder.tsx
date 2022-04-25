import { Box, Flex, Text } from '@concave/ui'
import Lottie from 'react-lottie'
import * as loaderAnimationData from 'public/assets/concave/loader.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

function Placeholder({ text }) {
  return (
    <Box
      mt={16}
      borderStyle="dashed"
      borderWidth={2}
      borderColor="#84E2FF"
      borderRadius="3xl"
      py={16}
      w="100%"
      maxW="500px"
    >
      <Box textAlign="center">
        <Text color="text.low" fontSize="4xl" fontWeight="bold">
          {text} <br />
          Coming Soon
        </Text>
        <Flex justifyContent="center">
          <Box borderRadius="30px" overflow="hidden">
            <Lottie options={defaultOptions} height={64} width={64} style={{ cursor: 'default' }} />
          </Box>
          {/* <Image src="/assets/concave/concaveLogo.gif" alt="concave-logo" h={28} w={28} /> */}
        </Flex>
      </Box>
    </Box>
  )
}

export default Placeholder
