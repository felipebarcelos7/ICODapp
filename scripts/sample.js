// 往 ProjectList 合约实例写入示例数据
const Web3 = require('web3');
const config = require('config');
const HDWalletProvider = require('truffle-hdwallet-provider');
const ProjectList = require('../compiled/ProjectList.json');
const address = require('../address.json');

const web3 = new Web3(new HDWalletProvider(
  'spy yellow senior steel chicken average deal boss ripple sausage nose bus',
  'https://ropsten.infura.io/v3/50929eb1bcc34ac38a8c392dc9fa475c',
));
const contract = new web3.eth.Contract(JSON.parse(ProjectList.interface), address);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const projects = [
    {
      description: 'Ethereum CryptoKitty',
      minInvest: web3.utils.toWei('0.01', 'ether'),
      maxInvest: web3.utils.toWei('0.1', 'ether'),
      goal: web3.utils.toWei('1', 'ether'),
    },
    {
      description: 'Ethereum MakerDao',
      minInvest: web3.utils.toWei('0.1', 'ether'),
      maxInvest: web3.utils.toWei('1', 'ether'),
      goal: web3.utils.toWei('5', 'ether'),
    },
  ];
  console.log(projects);

  const owner = accounts[0];
  const results = await Promise.all(projects.map(x =>
    contract
      .methods.createProject(x.description, x.minInvest, x.maxInvest, x.goal)
      .send({ from: owner, gas: '5000000' })
    )
  );

  console.log(results);
})();
