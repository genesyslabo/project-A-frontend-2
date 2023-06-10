import { urlFetcher } from '../common/utils/http';
import { ContractService } from './contractService';
import { LandContractAddr } from '../common/constants';


// 最大值 left 
// 总的是 totalLeft
// 1000 是 ogRedeem
// 3000 是 ebRedeem
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

        let ogNumberValue = ogNumber.toNumber(); // ogRedeem
        let ebNumberValue = ebNumber.toNumber(); // ebRedeem
        let leftNumberValue = leftNumber.toNumber(); // totalLeft
        let NFTBalanceValue = NFTBalance.toNumber();

        let price = 5000;
        let maxNumber = 100;

        // 1000u
        if (ogNumberValue < 2000 && NFTBalanceValue > 0 && !redeemed) {
            price = 1000;
            maxNumber = ogNumberValue;
        }

        // 3000u
        else if (new Date() < new Date(2023, 6, 10) && ebNumberValue < 3000) {
            price = 3000;
            maxNumber = ebNumberValue;
            // if (maxNumber > 3000 - ebNumberValue) {
            //     maxNumber = 3000 - ebNumberValue
            // }
        }

        // 5000u
        else if (leftNumberValue > 0) {
            price = 5000;
            maxNumber = leftNumberValue;
            // if (maxNumber > leftNumberValue) {
            //     maxNumber = leftNumberValue
            // }
        }

        return { price, maxNumber }
    } catch (error) {
        console.error('getLandPriceAndNumber Error: ', error);
        throw error;
    }
};

const buyLand = async (signer, address, price, quantity) => {
    try {
        const result = await urlFetcher(process.env.NEXT_PUBLIC_BASE_URL + "/airdrop/getLandNftSignature", {
            price, amount: quantity, recipient: address
        }, {
            method: "POST"
        });
    
        if (result?.success) {
            const landContract = ContractService.getLandContract(signer);
            const usdtContract = ContractService.getUsdtContract(signer);
            const allowance =  await usdtContract.allowance(address, LandContractAddr);
            if (allowance < 5000) {
                const approveResult = await usdtContract.approve(address, quantity * 1000);
                console.log("approveResult", approveResult);
            }
            
            const redeemResult = await landContract.redeem(result.data);
            console.log("redeemResult", redeemResult);
        }
    } catch (error) {
        console.error('buyLand Error: ', error);
        throw error;
    }
}

export const LandService = { getLandPriceAndNumber, buyLand }
