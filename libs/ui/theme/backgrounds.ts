import { CSSObject } from '@chakra-ui/react'
import { colors } from './colors'

const textures = {
  metal: 'url("/assets/textures/metal.png")',
  glass: 'url("/assets/textures/glass.jpg")',
}

export const backgrounds: CSSObject = {
  metal: {
    bg: `${textures.metal}, linear-gradient(to bottom left, ${colors.secondary[75]} 30%, ${colors.secondary[150]} 96%)`,
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  metalBrighter: {
    bg: `${textures.metal}, linear-gradient(to bottom left, ${colors.secondary[125]} 30%, ${colors.secondary[50]} 96%)`,
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  sidebar: {
    bg: `${textures.metal}, radial-gradient(circle farthest-corner at 100% 50%, ${colors.secondary[75]} 20%, ${colors.secondary[150]})`,
    bgPos: '50% 50%, 0px 0px',
    bgSize: '120px, auto',
  },
  glass: {
    pos: 'relative',
    '::after': {
      content: '""',
      bg: `${textures.glass}`,
      opacity: 0.45,
      inset: 0,
      pos: 'absolute',
      zIndex: -1,
      bgSize: '100%, auto',
      pointerEvents: 'none',
      //   bgPos: '50% 50%, 0px 0px',
    },
    backdropFilter: 'blur(8px)', // it's technically blur(15px) on figma but visually 8px looks closer
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
}

export default backgrounds