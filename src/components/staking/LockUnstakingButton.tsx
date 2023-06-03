import { Button, useColorModeValue, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { ContractService } from "../../service/contractService"
import CustomToast from "../CustomToast"
import { useSigner } from "wagmi"

const LockUnstakingButton: React.FC<{}> = () => {
    const toast = useToast()
    const [inTransaction, setInTransaction] = useState(false);
    const {data: signer} = useSigner();
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')

    const unstaking = async () => {
        toast({
            position: 'top-right',
            duration: 1000000,
            render: () => (<CustomToast status={"info"} 
                title={"Transacting!"} 
                description={"The transaction is in progress, please waiting..."} />)
          })
        
        setInTransaction(true)
        try {
            const result = await ContractService.leaveLockStaking(signer);
            console.log(result)
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"success"} 
                    title={"Unstaked!"} 
                    description={"Your funds have been unstaked."} />)
              })
            location.reload();
        } catch(err) {
            console.log('unstaking', err);
            toast.closeAll();
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"error"} 
                    title={"Error"} 
                    description={"There has some issue happened."} />)
              })
        } finally {
            setInTransaction(false);
        }
    }

    return (<>
        <Button
            size="lg"
            fontSize={16}
            bg={bgBtn}
            color={"white"}
            borderColor={bgBtn}
            borderRadius={"22px"}
            height={"38px"}
            // bgImg={"linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)"}
            onClick={unstaking}
            disabled={inTransaction}
            // _hover={{ bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)" }}
            _active={{
                // bgImg: "linear-gradient(135deg, #1AC1CE 0%, #00B3EB 100%)",
                transform: "scale(0.98)",
            }}
        >
            Unstaking
        </Button>
    </>)
}

export default LockUnstakingButton