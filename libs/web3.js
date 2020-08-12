import Web3 from 'web3';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

let web3;
// 浏览器环境且已经安装了 Metamask
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);

  // 服务器环境或者没有安装 Metamask
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/50929eb1bcc34ac38a8c392dc9fa475c'));
}

export default web3;
