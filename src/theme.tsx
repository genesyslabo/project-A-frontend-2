import {extendTheme} from '@chakra-ui/react'


const fonts = {mono: `'Menlo', monospace`, heading: 'PalanquinDark', body: 'Fahkwang'}

// const breakpoints = {
//     xs: '20em',
//     sm: '40em',
//     md: '52em',
//     lg: '64em',
//     xl: '80em',
// }
const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
}
const colors = {
    darkgreen: '#1BA4B9',
    lightgreen: '#CFF8FF',
    lightfont: '#6E8A99',
    bg: '#D5FAFF',
    dark: {
        darkgreen: '#0084FF',
    }
    
}

export const theme = extendTheme({
    initialColorMode: 'dark', //system
    useSystemColorMode: true,
    // semanticTokens: {
    //     colors: {
    //         text: {
    //             default: '#16161D',
    //             _dark: '#ffffff',
    //         },
    //         primary: {
    //             default: '#FF0080',
    //             _dark: '#ffffff',
    //         },
    //         background: "red"
    //     },
    // },
    styles: {
        global: props => ({
            // Optionally set global CSS styles
            body: {
                bg: props.colorMode === 'dark' ? '#15171b' : '#D5FAFF',
                color: props.colorMode === 'dark' ? '#fff' : '#6E8A99',
            },

        }),
    },
    colors,
    fonts,
    breakpoints,
})


