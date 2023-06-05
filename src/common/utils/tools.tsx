import { BigNumber, ethers } from 'ethers'

export const weiToEther = (num: BigNumber) => {
    return ethers.utils.formatEther(num)
}

export const weiToEtherFixed = (num: BigNumber, n: number = 4) => {
    return +parseFloat(ethers.utils.formatEther(num)).toFixed(n)
}

export const etherToWei = (n: any) => {
    const weiBigNumber = ethers.utils.parseEther(n)
    return weiBigNumber.toString()
}

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
const truncateEthAddress = (address: string) => {
    const match = address.match(truncateRegex)
    if (!match) return address
    return `${match[1]}…${match[2]}`
}

/**
 * 根据host返回根域名
 * @param  {[string]} host [window.location.host]
 * @return {[string]}      [如果不是域名则返回IP]
 */
export const getDomain = (host: String) => {
    host = host.split(':')[0]
    return isNaN(host.substring(host.lastIndexOf('.')) as any) ? 
        host.substring(host.substring(0, host.lastIndexOf('.')).lastIndexOf('.') + 1) : host
}

export const getCookie = (cookieName: String) => {
    let cookie: {[key: string]: any} = {};
    document.cookie.split(';').forEach(function(el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName as string];
}

export const setCookie = (cName: String, cValue: String, expDays: any) => {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; domain=" + getDomain(document.domain) + "; " + expires + "; path=/";
}

export const toNFix = (number: string | number, decimal: number) => {
    if (number) {
      return +parseFloat(number + "").toFixed(decimal);
    }
    return 0;
  }

const Tools = {
    truncateEthAddress, getDomain, getCookie, setCookie
}

export default Tools


export const isPCView  = () => {
    if (typeof window !== 'undefined') {
        return window.innerWidth >= 768;
    }
    return false;
}

export function timeDown(time: any) {
    if (time > 0) {
      //判断剩余倒计时时间如果大于0就执行倒计时否则就结束
      var dd = Math.floor(time / 1000 / 60 / 60 / 24);
      var hh =
        Math.floor((time / 1000 / 60 / 60)) < 10
          ? "0" + Math.floor((time / 1000 / 60 / 60))
          : Math.floor((time / 1000 / 60 / 60)) + "";
      var mm =
        Math.floor((time / 1000 / 60) % 60) < 10
          ? "0" + Math.floor((time / 1000 / 60) % 60)
          : Math.floor((time / 1000 / 60) % 60).toString();
      var ss =
        Math.floor((time / 1000) % 60) < 10
          ? "0" + Math.floor((time / 1000) % 60)
          : Math.floor((time / 1000) % 60).toString();
      return `${dd}d:${hh}h:${mm}m`;
    }
    return "0d:00h:00m"
}

export function formatNumber(number) {
    return Number(ethers.utils.formatEther(number)).toLocaleString("en-US");
}

export function isDev() {
    if (typeof window !== 'undefined') {
        return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    }
    return false;
}

export function isMainnet() {
    if (typeof window !== 'undefined') {
        return window.location.hostname.indexOf("metaflare.vip") >= 0;
    }
    return false;
}