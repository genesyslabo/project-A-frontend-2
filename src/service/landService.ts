import { urlFetcher } from '../common/utils/http';
import { ethers } from 'ethers';
import { ContractService } from './contractService';

const getLandPriceAndNumber = async (signer, address) => {
    try {
        const landContract = ContractService.getLandContract(signer);
        const NFTContract = ContractService.getNftContract(signer);

        const [ogNumber, ebNumber, leftNumber, NFTBalance, redeemed] = await Promise.all([
            landContract.ogRedeem(), 
            landContract.ebRedeem(),
            landContract.totalLeft(),
            NFTContract.balanceOf(address),
            landContract.redeemed(address)
        ]);

        let ogNumberValue = ogNumber.toNumber();
        let ebNumberValue = ebNumber.toNumber();
        let leftNumberValue = leftNumber.toNumber();
        let NFTBalanceValue = NFTBalance.toNumber();

        let price = 5000;
        let maxNumber = 100;

        // 检查是否符合1000u的标准
        if (ogNumberValue < 2000 && NFTBalanceValue > 0 && !redeemed) {
            price = 1000;
            maxNumber = 1;
        }

        // 如果不符合，检查是否符合3000u的标准
        else if (new Date() < new Date(2023, 6, 10) && ebNumberValue < 3000) {
            price = 3000;
            if (maxNumber > 3000 - ebNumberValue) {
                maxNumber = 3000 - ebNumberValue
            }
        }

        // 如果还不符合，检查是否符合5000u的标准
        else if (leftNumberValue > 0) {
            price = 5000;
            if (maxNumber > leftNumberValue) {
                maxNumber = leftNumberValue
            }
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
