import { ethers } from 'ethers';
import contractABI from '../contracts/contract.json'
import { MetaflareContractAddr, StakingFlexibleContractAddr, StakingLockContractAddr, MinStakingAmount, MinLockStakingAmount, NftContractAddr, LandContractAddr, UsdtContractAddr, RPC_URL} from '../common/constants';
// import { useSigner } from 'wagmi';

// const getSigner = async () => {
//     // const {data: signer} = useSigner();
//     const signer = null
//     console.log('singer', signer)
//     // if (!window.ethereum) {
//     //     throw new Error("Please connect to your wallet first.");
//     // }
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // const signer = provider.getSigner();
//     return signer;
// };

const getProvider = () => {
    return new ethers.providers.JsonRpcProvider(RPC_URL);
}

const getMetaflareContract = (signer) => {
    if (signer) {
        return new ethers.Contract(MetaflareContractAddr, contractABI.MetaflareContractABI, signer);
    }
    return new ethers.Contract(MetaflareContractAddr, contractABI.MetaflareContractABI, getProvider());
}

const getNftContract = (signer) => {
    if (signer) {
        return new ethers.Contract(NftContractAddr, contractABI.OGContract, signer);
    }
    return new ethers.Contract(NftContractAddr, contractABI.OGContract, getProvider());
}

const getStakingFlexibleContract = (signer) => {
    if (signer) {
        return new ethers.Contract(StakingFlexibleContractAddr, contractABI.StakingFlexibleContractABI, signer);
    }

    return new ethers.Contract(StakingFlexibleContractAddr, contractABI.StakingFlexibleContractABI, getProvider());
}

const getStakingLockContract = (signer) => {
    if (signer) {
        return new ethers.Contract(StakingLockContractAddr, contractABI.StakingLockContractABI, signer);
    }

    return new ethers.Contract(StakingLockContractAddr, contractABI.StakingLockContractABI, getProvider());
}

const getLandContract = (signer) => {
    if (signer) {
        return new ethers.Contract(LandContractAddr, contractABI.LandContractABI, signer);
    }

    return new ethers.Contract(LandContractAddr, contractABI.LandContractABI, getProvider());
}

const getUsdtContract = (signer) => {
    if (signer) {
        return new ethers.Contract(UsdtContractAddr, contractABI.UsdtContractABI, signer);
    }

    return new ethers.Contract(UsdtContractAddr, contractABI.UsdtContractABI, getProvider());
}

const withdrawReward = async (signer) => {
    try {
        const contract = getStakingFlexibleContract(signer);
        const result = await contract.withdrawReward();
        console.log('withdrawReward: ', result);
    } catch (error) {
        console.error('withdrawReward Error: ', error);
        throw error;
    }
}

const withdrawRewardLock = async (signer) => {
    try {
        const contract = getStakingLockContract(signer);
        const result = await contract.withdrawReward();
        console.log('withdrawReward: ', result);
    } catch (error) {
        console.error('withdrawReward Error: ', error);
        throw error;
    }
}

const redeem = async (voucher, signer) => {
    try {
        const metaflareContract = getMetaflareContract(signer);
        const result = await metaflareContract.redeem(voucher);
        console.log('redeem: ', result);
    } catch (error) {
        console.error('redeem Error: ', error);
        throw error;
    }
};

const redeemNft = async (voucher, signer) => {
    try {
        const nftContract = getNftContract(signer);
        const result = await nftContract.redeem(voucher);
        console.log('redeemNft: ', result);
    } catch (error) {
        console.error('redeemNft Error: ', error);
        throw error;
    }
};

const redeemed = async (address, signer) => {
    try {
        const metaflareContract = getMetaflareContract(signer);
        const result = await metaflareContract.redeemed(address);
        console.log('redeemed: ', result);
        return result;
    } catch (error) {
        console.error('redeemed Error: ', error);
        throw error;
    }
};

const redeemedNft = async (address, signer) => {
    try {
        const metaflareContract = getNftContract(signer);
        const result = await metaflareContract.redeemed(address);
        console.log('redeemed nft: ', result);
        return result;
    } catch (error) {
        console.error('redeemed nft Error: ', error);
        throw error;
    }
};

const balanceOf = async (address, signer) => {
    try {
        const metaflareContract = getMetaflareContract(signer);
        const balance = await metaflareContract.balanceOf(address);
        const balanceNumber = ethers.utils.formatUnits(balance, 18);
        // console.log('Balance: ', balanceNumber);
        return parseFloat(balanceNumber);
    } catch (error) {
        console.error('BalanceOf Error: ', error);
        throw error;
    }
};

const approve = async (amount, address, spender, signer) => {
    try {
        // const balanceNumber = await balanceOf(address, signer);
        // if (balanceNumber < amount) {
        //     console.log('balanceNumber', balanceNumber, 'amount', amount)
        //     throw new Error('Insufficient balance');
        // }
        const metaflareContract = getMetaflareContract(signer);
        const tx = await metaflareContract.approve(spender, ethers.utils.parseUnits(amount.toString(), 'wei'));
        console.log('Approve: ', tx);
        await tx.wait();
        console.log('Approve Completed.');
    } catch (error) {
        console.error('Approve Error: ', error);
        throw error;
    }
};

const allowance = async (address, signer) => {
    try {
        const metaflareContract = getMetaflareContract(signer);
        const spender = StakingFlexibleContractAddr;
        const allowance = await metaflareContract.allowance(address, spender);
        const allowanceNumber = ethers.utils.formatUnits(allowance, 18);
        console.log('Allowance: ', allowanceNumber);
        return parseFloat(allowanceNumber);
    } catch (error) {
        console.error('Allowance Error: ', error);
        throw error;
    }
};

const pendingFlare = async (address, signer) => {
    try {
        const stakingContract = getStakingFlexibleContract(signer);
        const pendingFlare = await stakingContract.pendingFlare(address);
        const pendingFlareNumber = ethers.utils.formatUnits(pendingFlare, 18);
        // console.log('pendingFlare: ', pendingFlareNumber);
        return parseFloat(pendingFlareNumber);
    } catch (error) {
        console.error('pendingFlare Error: ', error);
        return 0;
    }
};

const getTotalVeToken = async (signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const totalVeToken = await stakingContract.totalVeToken();
        const totalVeTokenNumber = ethers.utils.formatUnits(totalVeToken, 18);
        // console.log('totalVeToken: ', totalVeTokenNumber);
        return parseFloat(totalVeTokenNumber);
    } catch (error) {
        console.error('totalVeToken Error: ', error);
        return 0;
    }
};

const enterStaking = async (amount, address, signer) => {
    try {
        // const allowanceNumber = await allowance(address, signer);
        // if (allowanceNumber < amount) {
            const approveResult = await approve(parseFloat(amount), address, StakingFlexibleContractAddr, signer)
            console.log("approve", approveResult)
            // throw new Error('Insufficient allowance');
        // }
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        if (amountInWei.lte(MinStakingAmount)) {
            throw new Error('Insufficient amount');
        }
        const stakingContract = getStakingFlexibleContract(signer);
        const tx = await stakingContract.enterStaking(amountInWei);
        console.log('EnterStaking: ', tx);
        await tx.wait();
        console.log('EnterStaking Completed.');
    } catch (error) {
        console.error('EnterStaking Error: ', error);
        throw error;
    }
};

const leaveStaking = async (amount, signer) => {
    try {
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        if (amountInWei.lte(MinStakingAmount)) {
            throw new Error('Insufficient amount');
        }
        const stakingContract = getStakingFlexibleContract(signer);
        const tx = await stakingContract.leaveStaking(amountInWei);
        console.log('LeaveStaking: ', tx);
        await tx.wait();
        console.log('LeaveStaking Completed.');
    } catch (error) {
        console.error('LeaveStaking Error: ', error);
        throw error;
    }
};

const enterLockStaking = async (amount, weeks, address, signer) => {
    try {
        // const allowanceNumber = await allowance(address, signer);
        // if (allowanceNumber < amount) {
            const approveResult = await approve(parseFloat(amount), address, StakingLockContractAddr, signer)
            console.log("approve", approveResult)
            // throw new Error('Insufficient allowance');
        // }
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        if (amountInWei.lte(MinLockStakingAmount)) {
            throw new Error('Insufficient amount');
        }
        const stakingContract = getStakingLockContract(signer);
        const tx = await stakingContract.enterLockStaking(amountInWei, weeks);
        console.log('EnterLockStaking: ', tx);
        await tx.wait();
        console.log('EnterLockStaking Completed.');
    } catch (error) {
        console.error('EnterLockStaking Error: ', error);
        throw error;
    }
};

const reEnterLockStaking = async (amount, weeks, address, signer) => {
    try {
        // const allowanceNumber = await allowance(address, signer);
        // if (allowanceNumber < amount) {
        //     throw new Error('Insufficient allowance');
        // }
        const approveResult = await approve(parseFloat(amount), address, StakingLockContractAddr, signer)
        console.log("approve", approveResult)
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        // if (amountInWei.lte(MinLockStakingAmount)) {
        //     throw new Error('Insufficient amount');
        // }
        const stakingContract = getStakingLockContract(signer);
        const tx = await stakingContract.reEnterLockStaking(amountInWei, weeks);
        console.log('ReEnterLockStaking: ', tx);
        await tx.wait();
        console.log('ReEnterLockStaking Completed.');
    } catch (error) {
        console.error('ReEnterLockStaking Error: ', error);
        throw error;
    }
};

const leaveLockStaking = async (signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const tx = await stakingContract.leaveLockStaking();
        console.log('LeaveLockStaking: ', tx);
        await tx.wait();
        console.log('LeaveLockStaking Completed.');
    } catch (error) {
        console.error('LeaveLockStaking Error: ', error);
        throw error;
    }
};

const calculateBoost = async (weeks, signer) => {
    if (!weeks) return 0
    try {
        const stakingContract = getStakingLockContract(signer);
        const boost = await stakingContract.calculateBoost(weeks);
        const boostNumber = parseFloat(boost.toString()) / 1000;
        console.log('Boost: ', weeks, boostNumber);
        return +boostNumber.toFixed(2);
    } catch (error) {
        console.error('Boost Error: ', error);
        throw error;
    }
};

const userStakingAmount = async (address, signer) => {
    try {
        const stakingContract = getStakingFlexibleContract(signer);
        const userInfo = await stakingContract.userInfo(0, address);
        const amount = ethers.utils.formatUnits(userInfo.amount, 18);
        // console.log('userStakingAmount: ', amount);
        return parseFloat(amount);
    } catch (error) {
        console.error('userStakingAmount Error: ', error);
        return 0;
    }
};

const userLockStakingAmount = async (address, signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const userInfo = await stakingContract.userInfo(address);
        const amount = ethers.utils.formatUnits(userInfo.amount, 18);
        // console.log('userLockStakingAmount: ', amount);
        return parseFloat(amount);
    } catch (error) {
        console.error('userLockStakingAmount Error: ', error);
        return 0;
    }
};

const userLockStakingAmountVe = async (address, signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const userInfo = await stakingContract.userInfo(address);
        const amount = ethers.utils.formatUnits(userInfo.amountVe, 18);
        // console.log('userLockStakingAmountVe: ', amount);
        return parseFloat(amount);
    } catch (error) {
        console.error('userLockStakingAmountVe Error: ', error);
        return 0;
    }
};

const userLockStakingTime = async (address, signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const userInfo = await stakingContract.userInfo(address);
        const startTime = userInfo?.startTime || 0;
        const endTime = userInfo.endTime;

        const provider = signer ? signer.provider : getProvider()
        const currentTime = (await provider.getBlock('latest')).timestamp;
        console.log(startTime, currentTime, endTime.toNumber())
        return [startTime, currentTime, endTime];
    } catch (error) {
        console.error('userLockStakingTime Error: ', error);
        return [0, 0, 0];
    }
};

const lockUserInfo = async (address, signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const userInfo = await stakingContract.userInfo(address);
        return userInfo;
    } catch (error) {
        console.error('lockUserInfo Error: ', error);
        return {};
    }
};

const totalAllocPoint = async (signer) => {
    try {
        const stakingContract = getStakingFlexibleContract(signer);
        const totalAllocPoint = await stakingContract.totalAllocPoint();
        // console.log('totalAllocPoint: ', totalAllocPoint);
        return totalAllocPoint;
    } catch (error) {
        console.error('totalAllocPoint Error: ', error);
        return 0;
    }
}

const stakingROI = async (amount, signer) => {
    if (!amount) return 0
    try {
        const stakingContract = getStakingFlexibleContract(signer);
        const totalAllocPointBoost = await stakingContract.totalAllocPoint();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const roi = (flarePerSecond * secondsPerYear * amount / totalAllocPointBoost / 1000);
        // console.log(flarePerSecond.toString(), secondsPerYear, amount, totalAllocPointBoost.toString())
        // console.log('stakingROI: ', roi);
        return roi;
    } catch (error) {
        console.error('stakingROI Error: ', error);
        return 0;
    }
};

// const lockStakingROI = async (amount, week, address, signer) => {
//     if (!amount || !week) return 0
//     try {
//         const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
//         const stakingContract = getStakingLockContract(signer);
//         const boost = await stakingContract.calculateBoost(address, amountInWei, week);
//         const totalAllocPointBoost = await stakingContract.totalAllocPointBoost();
//         const flarePerSecond = await stakingContract.flarePerBlock();
//         const roi = (boost * flarePerSecond * week * amount / totalAllocPointBoost / 1000);
//         // console.log('lockStakingROI: ', roi);
//         return roi;
//     } catch (error) {
//         console.error('lockStakingROI Error: ', error);
//         return -1
//     }
// };

// APR = flarePerTime * Time * (amount / totalAllocPointBoost) / amount
const stakingAPR = async (signer) => {
    try {
        const stakingContract = getStakingFlexibleContract(signer);
        const totalAllocPointBoost = await stakingContract.totalAllocPoint();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const apr = (flarePerSecond * secondsPerYear / totalAllocPointBoost / 1000);
        // console.log('StakingAPR: ', apr);
        return apr;
    } catch (error) {
        console.error('StakingAPR Error: ', error);
        return 0;
    }
};

// APR = boost * flarePerTime * Time * (amount / totalAllocPointBoost) / amount
const lockStakingAPR = async (amount, week, address, signer) => {
    if (!amount || !week) return 0
    try {
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        const stakingContract = getStakingLockContract(signer);
        const boost = await stakingContract.calculateBoost(address, amountInWei, week);
        const totalAllocPointBoost = await stakingContract.totalAllocPoint();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const apr = (boost * flarePerSecond * secondsPerYear / totalAllocPointBoost / 1000);
        // console.log('LockStakingAPR: ', apr);
        return apr;
    } catch (error) {
        console.error('LockStakingAPR Error: ', error);
        return 0
    }
};

// boost = calculatBoost(address, amount + user.amount, weeks + (user.endtime-time))
// APR = boost * flarePerTime * Time * (amount / totalAllocPointBoost) / amount
const reEnterLockStakingAPR = async (amount, weeks, address, signer) => {
    if (!amount || !weeks) return 0
    try {
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        const stakingContract = getStakingLockContract(signer);

        const timestamp = (await signer.provider.getBlock('latest')).timestamp;
        const userInfo = await stakingContract.userInfo(address);
        const userAmount = userInfo.amount;
        const userEndTime = userInfo.endTime;
        const restWeeks =  Math.floor((userEndTime - timestamp) / 604800);
        const boost = await stakingContract.calculateBoost(address, amountInWei.add(userAmount), weeks+restWeeks);

        const totalAllocPointBoost = await stakingContract.totalAllocPoint();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const apr = (boost * flarePerSecond * secondsPerYear / totalAllocPointBoost / 1000);
        // console.log('ReEnterLockStakingAPR: ', apr);
        return apr;
    } catch (error) {
        console.error('ReEnterLockStakingAPR Error: ', error);
        throw error;
    }
};

const getMaxWeeks = async (signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const weeks = await stakingContract.MAX_WEEKS();
        return +weeks.toString();
    } catch (error) {
        console.error('getMaxWeeks Error: ', error);
        throw error;
    }
};

const getMinLockAmount = async (signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const result = await stakingContract.MIN_LOCK_AMOUNT();
        const amount = ethers.utils.formatUnits(result, 18);
        return +amount;
    } catch (error) {
        console.error('getMinLockAmount Error: ', error);
        throw error;
    }
};

const calcWeeksAfterExtend = async (weeks, address, signer) => {
    try {
        const stakingContract = getStakingLockContract(signer);
        const extendWeeks = await stakingContract.weeksAfterExtend(address, weeks);
        console.log('calcWeeksAfterExtend: ', extendWeeks);
        return extendWeeks.toNumber();
    } catch (error) {
        console.error('calcWeeksAfterExtend Error: ', error);
        return 0;
    }
}

export const ContractService = {
    getNftContract,
    getLandContract,
    getUsdtContract,
    getMaxWeeks,
    getMinLockAmount,
    withdrawReward,
    balanceOf, 
    approve, 
    redeem,
    redeemNft,
    redeemed,
    redeemedNft,
    allowance,
    pendingFlare,
    enterStaking,
    leaveStaking,
    enterLockStaking, 
    reEnterLockStaking,
    leaveLockStaking,
    calculateBoost,
    userStakingAmount,
    userLockStakingAmount,
    userLockStakingTime,
    stakingAPR,
    getTotalVeToken,
    totalAllocPoint,
    lockStakingAPR,
    withdrawRewardLock,
    userLockStakingAmountVe,
    reEnterLockStakingAPR,
    // lockStakingROI,
    stakingROI,
    calcWeeksAfterExtend,
    lockUserInfo
};
