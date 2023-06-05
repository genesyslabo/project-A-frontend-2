import { urlFetcher } from '../common/utils/http';
import { ethers } from 'ethers';

const getNFTs = async (sortOrder = 'asc') => {
    try {
        const result = await urlFetcher(process.env.NEXT_PUBLIC_BASE_URL + "/flareNft/getFlareListing", {}, {
            method: "GET"
        });

        if (result?.success) {
            let nftList = result.data.map(nft => {
                const priceInBNB = ethers.utils.formatUnits(nft.price.value, nft.price.decimals);
                return {
                    image: nft.images,
                    id: nft.tokenId,
                    price: priceInBNB,
                    priceWithSymbol: `${priceInBNB} BNB`,
                    purchaseLink: `https://opensea.io/assets/ethereum/${nft.tokenAddress}/${nft.tokenId}/`
                };
            });

            nftList = nftList.sort((a, b) => {
                const priceA = parseFloat(a.price);
                const priceB = parseFloat(b.price);
                if (sortOrder === 'asc') {
                    return priceA - priceB;
                } else if (sortOrder === 'desc') {
                    return priceB - priceA;
                } else {
                    throw new Error('Invalid sort order');
                }
            });

            return nftList;
        }
    } catch (error) {
        console.error(error);
    }
    return null
}

export const MarketService = { getNFTs }
