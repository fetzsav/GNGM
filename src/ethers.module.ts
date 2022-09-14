import * as dotenv from 'dotenv'
import { BigNumber, Contract, ContractInterface, ethers } from "ethers";
import abijson from '../contract/contract.abi.json' assert { type: 'json' };
dotenv.config()
export const alchemyKey = process.env.ALCHEMY_KEY;
export const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.AlchemyProvider("homestead", alchemyKey);
const pubKey = "0x42AcB9d50DF9Ff4ECF191b3a18884AFBA94a0A09";
export const signer = new ethers.Wallet(privateKey, provider);
export const abi = new ethers.utils.Interface(abijson);



export const mintNFT = async (contract: Contract) => {
    let multiplier = BigNumber.from(2);
    let gas_p = await provider.getGasPrice();
    console.log(contract.address);
    console.log(gas_p);
    let gwei = ethers.utils.formatUnits(gas_p, "gwei");
    console.log(gwei);
    let txn = await contract.mintForAddress(1, pubKey, {gasPrice: gas_p.mul(multiplier)})
    // let txn = await contract.setPaused(false, {gasPrice: gas_p.mul(multiplier)})
    // await txn.wait();
    // console.log(`NFT Minted! Txn Hash: ${txn.hash}`)
}

export const getDiff = async (): Promise<bigint> => {
    let current_block = await provider.getBlockNumber();
    let current_difficulty = await (await provider.getBlock(current_block))._difficulty;
    return current_difficulty.toBigInt();
}
