console.log('The app.js is started..');
const contractAddress='0x12B3aB7A9cea5158Ab1781Aa5f73D1C94520a335';
// To get actual smartcontract address, we have to first deploy it on remix platform
// after deployment we get address in deployed contract section
const abi=[[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_goal",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contributors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "goal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raisedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]]; // Our ABI of actual smart contract inside brackets
const web3 = new Web3(Web3.givenProvider || 'http://localhost: 8545');
const contract=new web3.eth.Contract(abi,contractAddress);

async function updateInfo(){
    const goal=await contract.methods.goal().call();
    const raisedAmount = await contract.methods.raisedAmount().call();
    document.getElementById('goal').textContent=web3.utils.fromWei(goal,'ether');
    document.getElementById('raised').textContent=web3.utils.fromWei(raisedAmount,'ether');
}

async function contribute(){
    if (window.ethereum){
        try{
            await window.ethereum.enable();
            const accounts=await web3.eth.getAccounts();
            await contract.methods.contribute().send({from: accounts[0],value: web3.utils.toWei('1','ether')});
            updateInfo();
        } catch (error){
            console.log('The error in contribute() is: ');
            console.error(error);
        }
    }
}

async function withdrawFunds(){
    if (window.ethereum){
        try{
            await window.ethereum.enable();
            const accounts=await web3.eth.getAccounts();
            await contract.methods.withdrawFunds().send({from: accounts[0]});
            updateInfo();
        } catch (error){
            console.log('The error in withdrawFunds() is: ');
            console.error(error);
        }
    }
}

window.addEventListener('load',async () =>{updateInfo();});