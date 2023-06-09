import { urlFetcher } from '../common/utils/http';
import { ethers } from 'ethers';
import { ContractService } from './contractService';

const getLandPriceAndNumber = async (signer) => {
    try {
        const landContract = ContractService.getLandContract(signer);
        const result = landContract.totalLeft();
        console.log('getLandPriceAndNumber: ', result);
        return { price: 10, maxNumber: 10 }
    } catch (error) {
        console.error('getLandPriceAndNumber Error: ', error);
        throw error;
    }
}

const buyLand = async (signer, price, quantity) => {
    return true
}

export const LandService = { getLandPriceAndNumber, buyLand }
