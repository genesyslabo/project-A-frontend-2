import { Button, Circle, Flex, Image, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { FramePage } from "../components/FramePage"
import { Balance } from "../components/Balance"
import React, { useEffect, useState } from "react"
import { useAccount, useSigner } from "wagmi"
import { WalletService } from "../service/walletService"
import { ContractService } from "../service/contractService"
import CustomToast from "../components/CustomToast"


const Airdrop = () => {
    const { address } = useAccount();
    const toast = useToast()
    const {data: signer} = useSigner();

    const [account, setAccount] = useState("")

    const bgHeader = useColorModeValue('white', '#242A33')
    const bgPanel = useColorModeValue('#ECFDFF', '#1B2026')
    const bgAvator = useColorModeValue('#20B4CA', '#0084FF')
    const bgBorder = useColorModeValue('#DAF7FF', '')
    const colorHeader = useColorModeValue('black', 'white')
    const colorTitle = useColorModeValue('darkgreen', '#0084FF')
    const bgBtn = useColorModeValue('darkgreen', '#0084FF')

    const [tokenSignature, setTokenSignature] = useState(null);
    const [tokenNftSignature, setTokenNftSignature] = useState(null);
    const [inTransaction, setInTransaction] = useState(false);
    const [redeemStatus, setRedeemStatus] = useState(false);
    const [redeemNftStatus, setRedeemNftStatus] = useState(false);

    const getToken = async () => {
        const result = await WalletService.getTokenSignature(address);
        console.log(result, 'result')
        setTokenSignature(result);
    }

    const getNftToken = async () => {
        const result = await WalletService.getTokenNftSignature(address);
        console.log(result, 'result')
        setTokenNftSignature(result);
    }

    const getReedmStatus = async () => {
        const result = await ContractService.redeemed(address, signer);
        setRedeemStatus(result);
    }

    const getReedmNftStatus = async () => {
        const result = await ContractService.redeemedNft(address, signer);
        setRedeemNftStatus(result);
    }

    const redeemToken = async () => {
        toast({
            position: 'top-right',
            duration: 1000000,
            render: () => (<CustomToast status={"info"} 
                title={"Transacting!"} 
                description={"The transaction is in progress, please waiting..."} />)
          })
        
        try {
            setInTransaction(true);
            const result = await ContractService.redeem(tokenSignature, signer);
            
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"success"} 
                    title={"Staked!"} 
                    description={"Claim success."} />)
              })
            setTimeout(function() {
                location.reload();
            }, 30000);
        } catch(err) {
            console.log('staking', err);
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"error"} 
                    title={"Error"} 
                    description={"There has some issue happened."} />)
              })
        }
    }

    const redeemNftToken = async () => {
        toast({
            position: 'top-right',
            duration: 1000000,
            render: () => (<CustomToast status={"info"} 
                title={"Transacting!"} 
                description={"The transaction is in progress, please waiting..."} />)
          })
        
        try {
            setInTransaction(true);
            const result = await ContractService.redeemNft(tokenNftSignature, signer);
            
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"success"} 
                    title={"Staked!"} 
                    description={"Claim success."} />)
              })
            setTimeout(function() {
                location.reload();
            }, 30000);
        } catch(err) {
            console.log('staking', err);
            toast({
                position: 'top-right',
                render: () => (<CustomToast status={"error"} 
                    title={"Error"} 
                    description={"There has some issue happened."} />)
              })
        }
    }

    const RedeemComponent = () => {
        if (redeemStatus) {
            return <Text>
                Successfully claimed!
            </Text>
        } else if (tokenSignature) {
            return (
                <Button
                    size="lg"
                    bg={bgBtn}
                    color={"white"}
                    borderColor={bgBtn}
                    borderRadius={"22px"}
                    height={"38px"}
                    disabled={inTransaction}
                    onClick={redeemToken}
                    _active={{
                        transform: "scale(0.98)",
                    }}
                >
                    Claim
                </Button>
            )
        } else {
            return <Text>
                Tokens are currently not claimable.
            </Text>
        }
    }

    const RedeemNftComponent = () => {
        if (redeemNftStatus) {
            return <Text>
                Successfully claimed! Go to OpenSea to check the detail.
            </Text>
        } else if (tokenNftSignature) {
            return (
                <Button
                    size="lg"
                    bg={bgBtn}
                    color={"white"}
                    borderColor={bgBtn}
                    borderRadius={"22px"}
                    height={"38px"}
                    disabled={inTransaction}
                    onClick={redeemNftToken}
                    _active={{
                        transform: "scale(0.98)",
                    }}
                >
                    Claim
                </Button>
            )
        } else {
            return <Text>
                You are not on the whitelist.
            </Text>
        }
    }

    useEffect(() => {
        setAccount(address)

        if (address) {
            getReedmStatus();
            getReedmNftStatus();
        }
    }, [address])

    useEffect(() => {
        if (!redeemStatus) {
            getToken();
        }
    }, [redeemStatus])

    useEffect(() => {
        if (!redeemNftStatus) {
            getNftToken();
        }
    }, [redeemNftStatus])
   
    return (<>
        <FramePage menu="airdrop">
            <Flex className="flex flex-col justify-center items-center pt-4 gap-6">
                <Flex color={colorTitle} className="w-full text-2xl font-bold items-start">MF AIRDROP CHECK</Flex>

                <Flex className="w-full flex-col">
                    <Flex className="justify-end pr-1">
                        <Image src="/assets/images/bot1.png" />
                    </Flex>
                    <Flex className="w-full flex-col gap-2 rounded-xl p-[2px]" bg={bgHeader} color={colorHeader}>
                        <Flex className="flex-col md:flex-row gap-8 p-4 rounded-t-2xl border-b" bg={bgPanel} borderColor={bgBorder}>
                            <Flex className="flex-col gap-2 grow">
                                <Text className="text-[#6E8A99] text-sm font-bold">
                                    ACCOUNT
                                </Text>
                                <Text className="text-base" color={colorHeader}>
                                    {account}
                                </Text>
                            </Flex>
                            <Flex className="flex-col gap-2">
                                <Text className="text-[#6E8A99] text-sm font-bold">
                                    BALANCE
                                </Text>
                                <Flex className="flex-row items-center text-base" color={colorHeader}>
                                    <Balance />
                                    <Circle size='16px' bg={bgAvator} color='white' className="ml-1" />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex className="items-center text-base p-3 pb-8">
                            <RedeemComponent />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex className="flex-col md:flex-row items-center text-[#6E8A99] text-xs gap-2">
                    <Text className="font-medium">VERIFIED SMART CONTRACT ADDRESS:</Text>
                    <Text className="">0x025C6da5BD0e6A5dd1350fda9e3B6a614B205a1F</Text>
                </Flex>

                <Flex className="w-full flex-col gap-2">
                    <Flex color={colorTitle} className="w-full text-2xl font-bold items-start">NFT CLAIM CHECK</Flex>

                    <Text className="text-base text-[#666666]">
                        Enter the Token ID to see if a OG NFT is eligible for a one-time claim of Flare NFT.
                    </Text>

                    <Flex className="flex-col">
                        <Flex className="justify-end pr-1">
                            <Image src="/assets/images/bot2.png" />
                        </Flex>
                        <Flex className="items-center text-base p-3 pb-8 rounded-xl" bg={bgHeader} color={colorHeader}>
                            <RedeemNftComponent />
                        </Flex>
                    </Flex>

                    {/* <Text className="text-xs text-[#6E8A99]">
                    Please note: this checker updates in real time as tokens are claimed. If you are purchasing a Bored Ape, Mutant, or Kennel Club NFT on the secondary market, keep in mind that it’s possible for someone to claim immediately after you have checked, making the Bored Ape, Mutant Ape, or Kennel Club NFT no longer eligible.F
                    </Text> */}
                </Flex>
            </Flex>
        </FramePage>
    </>)
}

export default Airdrop