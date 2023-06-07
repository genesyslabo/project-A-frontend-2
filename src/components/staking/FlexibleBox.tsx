import { useEffect, useState } from "react";
import { Box, Button, Grid, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import StakingModal from "./FlexibleModal";
import { useAccount, useSigner } from "wagmi";
import { ContractService } from "../../service/contractService";
import { toNFix } from "../../common/utils/tools";
import { flareUsdRate } from "../../common/constants";

const FlexibleBox = () => {
    const [isFlexibleOpen, setFlexibleOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [amount, setAmount] = useState(0);
    const { isConnected, address } = useAccount();
    const {data: signer} = useSigner();

    const bgBtn = useColorModeValue('darkgreen', '#0084FF')
    const colorHeader = useColorModeValue('black', 'white')
    const colorDesc = useColorModeValue('#6E8A99', '#898B8E')

    const fetchAmount = async () => {
        const result = await ContractService.userStakingAmount(address, signer);
        setAmount(result);
    };

    useEffect(() => {
        setDisabled(!isConnected)

        if (isConnected) {
            fetchAmount();
        }
    }, [isConnected])

    return (<>
        <StakingModal openModal={isFlexibleOpen} onClose={() => setFlexibleOpen(false)} />

        <Grid className="grid-cols-2" color={colorDesc}>
            <Text className="mb-2 font-medium text-sm" color={colorHeader}>
                <Box as="span" color={"#FE9D1C"}>
                MF
                </Box>{" "}
                STAKED
            </Text>
            <Text className="font-medium text-sm">
                
            </Text>
            <Text className="font-bold text-xl" color={colorHeader}>
                {toNFix(amount, 4)}
            </Text>
            <Box className="underline text-sm font-medium" color={colorHeader}>
                flexible lock for 1 day
            </Box>
            <Text className="font-medium text-xs">
                ~{toNFix(amount * flareUsdRate, 4)}USD
            </Text>
        </Grid>
        
        <Spacer />
        
        <Button
            size="lg"
            bg={bgBtn}
            color={"white"}
            borderColor={bgBtn}
            borderRadius={"22px"}
            height={"38px"}
            // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
            disabled={disabled}
            // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
            _active={{
                // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                transform: "scale(0.98)",
            }}
            onClick={() => setFlexibleOpen(true)}
        >
            Staking
        </Button>
        {/* <Link href={""}>
            <Text className="underline text-sm font-medium">
                What's the difference?
            </Text>
        </Link> */}
    </>)
}

export default FlexibleBox