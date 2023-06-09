import { urlFetcher } from '../common/utils/http';
import { ethers } from 'ethers';

const getLandPriceAndNumber = async () => {
    return { price: 10, maxNumber: 10 }
}

const buyLand = async (price, quantity) => {
    return true
}

export const LandService = { getLandPriceAndNumber, buyLand }
