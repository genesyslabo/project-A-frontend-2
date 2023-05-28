import { ethers } from 'ethers';
import contractABI from '../contracts/contract.json'
import { MetaflareContractAddr, StakingContractAddr, MinStakingAmount, MinLockStakingAmount} from '../common/constants';

const getSigner = async () => {
    if (!window.ethereum) {
        throw new Error("Please connect to your wallet first.");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
};

const getMetaflareContract = (signer) => {
    return new ethers.Contract(MetaflareContractAddr, contractABI.MetaflareContractABI, signer);
}

const getStakingContract = (signer) => {
    return new ethers.Contract(StakingContractAddr, contractABI.StakingContractABI, signer);
}

const balanceOf = async () => {
    try {
        const signer = await getSigner();
        const metaflareContract = getMetaflareContract(signer);
        const address = await signer.getAddress();
        const balance = await metaflareContract.balanceOf(address);
        const balanceNumber = ethers.utils.formatUnits(balance, 18);
        console.log('Balance: ', balanceNumber);
        return parseFloat(balanceNumber);
    } catch (error) {
        console.error('BalanceOf Error: ', error);
        throw error;
    }
};

const getAddress = async () => {
    try {
        const signer = await getSigner();
        const address = await signer.getAddress();
        console.log('address: ', address);
        return address;
    } catch (error) {
        console.error('address Error: ', error);
        throw error;
    }
};

const approve = async (amount) => {
    try {
        const balanceNumber = await balanceOf();
        if (balanceNumber < amount) {
            console.log('balanceNumber', balanceNumber, 'amount', amount)
            throw new Error('Insufficient balance');
        }
        const signer = await getSigner();
        const metaflareContract = getMetaflareContract(signer);
        const spender = StakingContractAddr;
        const tx = await metaflareContract.approve(spender, ethers.utils.parseUnits(amount.toString(), 'wei'));
        console.log('Approve: ', tx);
        await tx.wait();
        console.log('Approve Completed.');
    } catch (error) {
        console.error('Approve Error: ', error);
        throw error;
    }
};

const allowance = async () => {
    try {
        const signer = await getSigner();
        const metaflareContract = getMetaflareContract(signer);
        const address = await signer.getAddress();
        const spender = StakingContractAddr;
        const allowance = await metaflareContract.allowance(address, spender);
        const allowanceNumber = ethers.utils.formatUnits(allowance, 18);
        console.log('Allowance: ', allowanceNumber);
        return parseFloat(allowanceNumber);
    } catch (error) {
        console.error('Allowance Error: ', error);
        throw error;
    }
};

const pendingFlare = async (pid) => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();
        const pendingFlare = await stakingContract.pendingFlare(address, pid);
        const pendingFlareNumber = ethers.utils.formatUnits(pendingFlare, 18);
        // console.log('pendingFlare: ', pendingFlareNumber);
        return parseFloat(pendingFlareNumber);
    } catch (error) {
        console.error('pendingFlare Error: ', error);
        return -1;
    }
};

const enterStaking = async (amount) => {
    try {
        const allowanceNumber = await allowance();
        if (allowanceNumber < amount) {
            const approveResult = await approve(parseFloat(amount) * 10)
            console.log("approve", approveResult)
            // throw new Error('Insufficient allowance');
        }
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        if (amountInWei.lte(MinStakingAmount)) {
            throw new Error('Insufficient amount');
        }
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const tx = await stakingContract.enterStaking(amountInWei);
        console.log('EnterStaking: ', tx);
        await tx.wait();
        console.log('EnterStaking Completed.');
    } catch (error) {
        console.error('EnterStaking Error: ', error);
        throw error;
    }
};

const leaveStaking = async (amount) => {
    try {
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        if (amountInWei.lte(MinStakingAmount)) {
            throw new Error('Insufficient amount');
        }
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const tx = await stakingContract.leaveStaking(amountInWei);
        console.log('LeaveStaking: ', tx);
        await tx.wait();
        console.log('LeaveStaking Completed.');
    } catch (error) {
        console.error('LeaveStaking Error: ', error);
        throw error;
    }
};

const enterLockStaking = async (amount, weeks) => {
    try {
        const allowanceNumber = await allowance();
        if (allowanceNumber < amount) {
            const approveResult = await approve(parseFloat(amount) * 10)
            console.log("approve", approveResult)
            // throw new Error('Insufficient allowance');
        }
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        if (amountInWei.lte(MinLockStakingAmount)) {
            throw new Error('Insufficient amount');
        }
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const tx = await stakingContract.enterLockStaking(amountInWei, weeks);
        console.log('EnterLockStaking: ', tx);
        await tx.wait();
        console.log('EnterLockStaking Completed.');
    } catch (error) {
        console.error('EnterLockStaking Error: ', error);
        throw error;
    }
};

const reEnterLockStaking = async (amount, weeks) => {
    try {
        const allowanceNumber = await allowance();
        if (allowanceNumber < amount) {
            throw new Error('Insufficient allowance');
        }
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        // if (amountInWei.lte(MinLockStakingAmount)) {
        //     throw new Error('Insufficient amount');
        // }
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const tx = await stakingContract.reEnterLockStaking(amountInWei, weeks);
        console.log('ReEnterLockStaking: ', tx);
        await tx.wait();
        console.log('ReEnterLockStaking Completed.');
    } catch (error) {
        console.error('ReEnterLockStaking Error: ', error);
        throw error;
    }
};

const leaveLockStaking = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const tx = await stakingContract.leaveLockStaking();
        console.log('LeaveLockStaking: ', tx);
        await tx.wait();
        console.log('LeaveLockStaking Completed.');
    } catch (error) {
        console.error('LeaveLockStaking Error: ', error);
        throw error;
    }
};

const calculateBoost = async (amount, weeks) => {
    if (!amount || !weeks) return 0
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();
        const boost = await stakingContract.calculateBoost(address, amount, weeks);
        const boostNumber = parseFloat(boost.toString()) / 1000;
        console.log('Boost: ', boostNumber, boost.toString());
        return +boostNumber.toFixed(2);
    } catch (error) {
        console.error('Boost Error: ', error);
        throw error;
    }
};

const userStakingAmount = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();
        const userInfo = await stakingContract.userInfo(0, address);
        const amount = ethers.utils.formatUnits(userInfo.amount, 18);
        console.log('userStakingAmount: ', amount);
        return parseFloat(amount);
    } catch (error) {
        console.error('userStakingAmount Error: ', error);
        throw -1;
    }
};

const userLockStakingAmount = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();
        const userInfo = await stakingContract.userInfo(1, address);
        const amount = ethers.utils.formatUnits(userInfo.amount, 18);
        console.log('userLockStakingAmount: ', amount);
        return parseFloat(amount);
    } catch (error) {
        console.error('userLockStakingAmount Error: ', error);
        return -1;
    }
};

const userLockStakingTime = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();
        const userInfo = await stakingContract.userInfo(1, address);
        const startTime = userInfo.startTime;
        const endTime = userInfo.endTime;
        const currentTime = (await signer.provider.getBlock('latest')).timestamp;
        return [startTime, currentTime, endTime];
    } catch (error) {
        console.error('userLockStakingTime Error: ', error);
        return [0, 0, 0];
    }
};

const totalAllocPoint = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const totalAllocPoint = await stakingContract.totalAllocPoint();
        console.log('totalAllocPoint: ', totalAllocPoint);
        return totalAllocPoint;
    } catch (error) {
        console.error('totalAllocPoint Error: ', error);
        return -1;
    }
}

const stakingROI = async (amount) => {
    if (!amount) return 0
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const totalAllocPointBoost = await stakingContract.totalAllocPointBoost();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const roi = (flarePerSecond * secondsPerYear * amount / totalAllocPointBoost);
        // console.log(flarePerSecond.toString(), secondsPerYear, amount, totalAllocPointBoost.toString())
        console.log('stakingROI: ', roi);
        return roi;
    } catch (error) {
        console.error('stakingROI Error: ', error);
        return -1;
    }
};

const lockStakingROI = async (amount, week) => {
    if (!amount || !week) return 0
    try {
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();
        const boost = await stakingContract.calculateBoost(address, amountInWei, week);
        const totalAllocPointBoost = await stakingContract.totalAllocPointBoost();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const roi = (boost * flarePerSecond * week * amount / totalAllocPointBoost);
        console.log('lockStakingROI: ', roi);
        return roi;
    } catch (error) {
        console.error('lockStakingROI Error: ', error);
        return -1
    }
};

// APR = flarePerTime * Time * (amount / totalAllocPointBoost) / amount
const stakingAPR = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const totalAllocPointBoost = await stakingContract.totalAllocPointBoost();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const apr = (flarePerSecond * secondsPerYear / totalAllocPointBoost);
        console.log('StakingAPR: ', apr);
        return apr;
    } catch (error) {
        console.error('StakingAPR Error: ', error);
        return -1;
    }
};

// APR = boost * flarePerTime * Time * (amount / totalAllocPointBoost) / amount
const lockStakingAPR = async (amount, week) => {
    if (!amount || !week) return 0
    try {
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();
        const boost = await stakingContract.calculateBoost(address, amountInWei, week);
        const totalAllocPointBoost = await stakingContract.totalAllocPointBoost();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const apr = (boost * flarePerSecond * secondsPerYear / totalAllocPointBoost);
        console.log('LockStakingAPR: ', apr);
        return apr;
    } catch (error) {
        console.error('LockStakingAPR Error: ', error);
        return -1
    }
};

// boost = calculatBoost(address, amount + user.amount, weeks + (user.endtime-time))
// APR = boost * flarePerTime * Time * (amount / totalAllocPointBoost) / amount
const reEnterLockStakingAPR = async (amount, weeks) => {
    if (!amount || !weeks) return 0
    try {
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const address = await signer.getAddress();

        const timestamp = (await signer.provider.getBlock('latest')).timestamp;
        const userInfo = await stakingContract.userInfo(1, address);
        const userAmount = userInfo.amount;
        const userEndTime = userInfo.endTime;
        const restWeeks =  Math.floor((userEndTime - timestamp) / 604800);
        const boost = await stakingContract.calculateBoost(address, amountInWei.add(userAmount), weeks+restWeeks);

        const totalAllocPointBoost = await stakingContract.totalAllocPointBoost();
        const flarePerSecond = await stakingContract.flarePerBlock();
        const secondsPerYear = 365 * 24 * 60 * 60;
        const apr = (boost * flarePerSecond * secondsPerYear / totalAllocPointBoost);
        console.log('ReEnterLockStakingAPR: ', apr);
        return apr;
    } catch (error) {
        console.error('ReEnterLockStakingAPR Error: ', error);
        throw error;
    }
};

const getMaxWeeks = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const weeks = await stakingContract.MAX_WEEKS();
        return +weeks.toString();
    } catch (error) {
        console.error('getMaxWeeks Error: ', error);
        throw error;
    }
};

const getMinLockAmount = async () => {
    try {
        const signer = await getSigner();
        const stakingContract = getStakingContract(signer);
        const result = await stakingContract.MIN_LOCK_AMOUNT();
        const amount = ethers.utils.formatUnits(result, 18);
        return +amount;
    } catch (error) {
        console.error('getMinLockAmount Error: ', error);
        throw error;
    }
};

export const ContractService = {
    getMaxWeeks,
    getMinLockAmount,
    balanceOf, 
    approve, 
    allowance,
    getAddress, 
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
    totalAllocPoint,
    lockStakingAPR,
    reEnterLockStakingAPR,
    lockStakingROI,
    stakingROI
};
