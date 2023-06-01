import { Button, useColorModeValue } from "@chakra-ui/react"
import LockStakingModal from "./LockStakingModal"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi";

const StakingButton: React.FC<{}> = () => {
    const [openModal, setOpenModal] = useState(false);
    const { isConnected } = useAccount();
    const [disabled, setDisabled] = useState(false);

    const bgBtn = useColorModeValue('darkgreen', '#0084FF')

    useEffect(() => {
        setDisabled(!isConnected)
    }, [isConnected])

    return (<>
        <LockStakingModal openModal={openModal} onClose={() => setOpenModal(false)} />
        <Button
            size="lg"
            fontSize={16}
            bg={bgBtn}
            color={"white"}
            borderColor={bgBtn}
            // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
            disabled={disabled}
            onClick={() => setOpenModal(true)}
            // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
            _active={{
                // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                transform: "scale(0.98)",
            }}
        >
            Staking
        </Button>
    </>)
}

export default StakingButton