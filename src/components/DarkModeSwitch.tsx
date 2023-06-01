import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const colorHighlight = useColorModeValue('darkgreen', '#0084FF')

  return (
    <IconButton
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      aria-label="Toggle Theme"
      bg={"transparent"}
      color={colorHighlight}
      onClick={toggleColorMode}
      _hover={{
        bg: "transparent",
      }}
      _active={{
          bg: "transparent",
          transform: "scale(0.98)",
      }}
    />
  )
}