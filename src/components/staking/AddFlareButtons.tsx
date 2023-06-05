import { Button, Grid, useColorModeValue } from "@chakra-ui/react"
import LockExtendModal from "./LockExtendModal"
import { useState } from "react";
import LockAddStakingModal from "./LockAddStakingModal";

const AddFlareButtons: React.FC<{}> = () => {
    const [isExtendOpen, setExtendOpen] = useState(false);
    const [isAddFlareOpen, setAddFlareOpen] = useState(false);

    const bgBtn = useColorModeValue('darkgreen', '#0084FF')

    return (<>
        <LockExtendModal openModal={isExtendOpen} onClose={() => setExtendOpen(false)} />
        <LockAddStakingModal openModal={isAddFlareOpen} onClose={() => setAddFlareOpen(false)} />

        <Grid className="grid-cols-2 gap-2">
            <Button
                size="lg"
                bg={bgBtn}
                color={"white"}
                borderColor={bgBtn}
                borderRadius={"22px"}
                height={"38px"}
                fontSize={16}
                onClick={() => setAddFlareOpen(true)}
                // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                _active={{
                    // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                    transform: "scale(0.98)",
                }}
            >
                ADD MF
            </Button>
            <Button
                size="lg"
                bg={bgBtn}
                color={"white"}
                borderRadius={"22px"}
                height={"38px"}
                fontSize={16}
                borderColor={bgBtn}
                onClick={() => setExtendOpen(true)}
                // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
                // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
                _active={{
                    // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                    transform: "scale(0.98)",
                }}
            >
                Extend
            </Button>
        </Grid>
    </>)
}

export default AddFlareButtons