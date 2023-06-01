import { Box, useColorModeValue } from "@chakra-ui/react"

const SmallButton:React.FC<{text: string, onClick: Function}> = (props) => {
    const bgBtn = useColorModeValue('#CFF8FF', '#242A33')
    const colorBtn = useColorModeValue('darkgreen', '#0084FF')

    return (
        <Box as='label' className="items-center justify-center font-bold">
            <Box
            className="flex items-center justify-center rounded-xl"
            cursor='pointer'
            bg={bgBtn}
            color={colorBtn}
            onClick={() => props.onClick()}
            >
            {props.text}
            </Box>
      </Box>
    )
}

export default SmallButton