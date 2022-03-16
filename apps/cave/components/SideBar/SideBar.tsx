import React, { ReactNode } from 'react'

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  VStack,
  HStack,
} from '@chakra-ui/react'
import {
  FaDiscord,
  FaTwitter,
  FaTwitch,
  FaShoppingCart,
  FaRandom,
  FaBatteryThreeQuarters,
  FaBriefcase,
} from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { SiGitbook } from 'react-icons/si'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { Image } from '@concave/ui'
import { ConnectWallet } from 'components/ConnectWallet'
import { ButtonLink } from 'components/ButtonLink'
import { DownIcon } from '@concave/icons'
import SideBarTop from './SideBarTop'
import SideBarBottom from './SideBarBottom'

interface LinkItemProps {
  name: string
  icon: IconType
  link: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Bonds', icon: FaBriefcase, link: 'bond' },
  { name: 'Liquid Staking', icon: FaBatteryThreeQuarters, link: 'liquidstaking' },
  { name: 'Marketplace', icon: FaShoppingCart, link: '/marketplace' },
  { name: 'Swap', icon: FaRandom, link: 'swap' },
]

export function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh">
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="lg"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      {/* <Box ml={{ base: 0, md: 60 }} p="4"> */}
      {/* {children} */}
      {/* </Box> */}
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      bgGradient="linear(to-tr, secondary.150, secondary.100)"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      px={2}
      py={4}
      w={{ base: 'full', md: 60 }}
      // pos="fixed"
      h="full"
      {...rest}
    >
      <Flex position="absolute" right="10px">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} mb={5} />
      </Flex>
      <SideBarTop />

      <Box>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}
      </Box>

      <Box mt={10}>
        <SideBarBottom />
      </Box>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  link: string
  children: ReactText
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <Link
      href={link}
      {...(link.startsWith('http')
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : { replace: 'true' })}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
    </Flex>
  )
}
