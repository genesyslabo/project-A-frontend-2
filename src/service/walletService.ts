import { urlFetcher } from '../common/utils/http';

const getTokenSignature = async (address) => {
    const result = await urlFetcher(process.env.NEXT_PUBLIC_BASE_URL + "/airdrop/getTokenSignature", {
        address
    }, {
        method: "GET"
    });

    if (result?.success) {
        return result.data
    }
    return null
}

const getTokenNftSignature = async (address) => {
    const result = await urlFetcher(process.env.NEXT_PUBLIC_BASE_URL + "/airdrop/getTokenNftSignature", {
        address
    }, {
        method: "GET"
    });

    if (result?.success) {
        return result.data
    }
    return null
}

export const WalletService = { getTokenSignature, getTokenNftSignature }
