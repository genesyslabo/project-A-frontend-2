import { Flex, Image, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useReducer, useState } from "react";

interface MenuItem {
    name: string;
    label: string;
    icon: string;
    link: string;
}

const menus: MenuItem[] = [
    {
        name: "entrance",
        label: "Entrance",
        icon: "entrance",
        link: "/"
    },
    {
        name: "home",
        label: "Home",
        icon: "theteam",
        link: "/home"
    },
    {
        name: "staking",
        label: "Staking",
        icon: "staking",
        link: "/"
    },
    {
        name: "airdrop",
        label: "Airdrop",
        icon: "airdrop",
        link: "/airdrop"
    },
    {
        name: "marketplace",
        label: "Market Place",
        icon: "marketplace",
        link: "/marketplace"
    },
    {
        name: "getland",
        label: "Get land",
        icon: "getland",
        link: "/"
    }
]

const initialValue = {
    isExpanded: false,
};
const reducer = (state, { name, value }) => {
    if (name == 'reset') {
        return initialValue;
    }
    return ({ ...state, [name]: value });
}
const SettingsContext = React.createContext(null);

const MenuItemBox: React.FC<{
    menuItem: MenuItem,
    currentMenu: string
}> = (props) => {
    const { setting } = useContext(SettingsContext);

    const [icon, setIcon] = useState(props.menuItem.icon);

    const bgHover = useColorModeValue('darkgreen', '#242B35')
    const colorHoverText = useColorModeValue('white', '#0084FF')

    if (props.currentMenu === props.menuItem.name) {
        return (
            <Flex className="flex-row justify-center gap-4 px-4 py-2" bg={bgHover}>
                <Image src={`/assets/images/${props.menuItem.icon}-hover.png`} className="w-[24px]" />
                {setting.isExpanded && <Text className="grow gap-4" transition="opacity 0.3s">
                    {props.menuItem.label}
                </Text>}
            </Flex>
        )
    }

    return (
        <Link href={props.menuItem.link}>
            <Flex className="w-full flex-row justify-center gap-4 px-4 py-2"
                _hover={{
                    bg: bgHover,
                    color: colorHoverText
                }}
                onMouseEnter={() => setIcon(props.menuItem.icon + "-hover")}
                onMouseLeave={() => setIcon(props.menuItem.icon)}>
                <Image src={`/assets/images/${icon}.png`} className="w-[24px]" />
                {setting.isExpanded && <Text className="grow gap-4" transition="opacity 0.3s">
                    {props.menuItem.label}
                </Text>}
            </Flex>
        </Link>
    )
}

export const SideBar: React.FC<{
    menu: string
}> = (props) => {
    const bg = useColorModeValue('#BEF6FF', '#1A1D29')
    const colorBorder = useColorModeValue('white', 'rgba(40,45,55,1)')

    const [setting, setSetting] = useReducer(reducer, initialValue);

    const toggleMenu = (val) => {
        setSetting({
            name: "isExpanded",
            value: val
        })
    }

    return (
        <SettingsContext.Provider value={{setting, setSetting}}>
            <Flex className="fixed h-full flex-col gap-4 !hidden md:!flex mt-[48px] items-center pt-4" 
                bg={bg} 
                border={"1px solid"} 
                borderColor={colorBorder}
                transition={"width 0.3s"}
                zIndex={1}
                w={"72px"}
                _hover={{ width: "200px" }}
                onMouseEnter={() => toggleMenu(true)}
                onMouseLeave={() => toggleMenu(false)}>
                <Flex className="w-full gap-8 flex-col cursor-pointer justify-center">
                    {
                        menus.map((item) => 
                            <MenuItemBox menuItem={item} currentMenu={props.menu} key={item.name} />
                        )
                    }
                </Flex>
                <Spacer />
            </Flex>
        </SettingsContext.Provider>
    )
}
