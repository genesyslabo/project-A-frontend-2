import { urlFetcher } from '../common/utils/http';
import { ethers } from 'ethers';
import { ContractService } from './contractService';

const getLandPriceAndNumber = async (signer, address) => {
    try {
        const landContract = ContractService.getLandContract(signer);
        const NFTContract = ContractService.getNftContract(signer);

        const [result1, result2, result3, result4, result5] = await Promise.all([
            landContract.ogRedeem(), 
            landContract.ebRedeem(),
            landContract.totalLeft(),
            NFTContract.balanceOf(address),
            landContract.redeemed(address)
        ]);

        let price = 5000;
        let maxNumber = 0;

        // 检查是否符合1000u的标准
        if (result1 <= 2000 && result4 > 0 && result5) {
            price = 1000;
            maxNumber = result1;
        }

        // 如果不符合，检查是否符合3000u的标准
        else if (new Date() < new Date(2023, 6, 10) && result2 <= 3000) {
            price = 3000;
            maxNumber = result2;
        }

        // 如果还不符合，检查是否符合5000u的标准
        else if (result3 > 0) {
            price = 5000;
            maxNumber = result3;
        }

        return { price, maxNumber }
    } catch (error) {
        console.error('getLandPriceAndNumber Error: ', error);
        throw error;
    }
};

const buyLand = async (signer, price, quantity) => {
    return true
}

export const LandService = { getLandPriceAndNumber, buyLand }
