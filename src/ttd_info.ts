import { BigNumber, Contract, ContractInterface, ethers } from "ethers";

const catrussel = "";
const provider = new ethers.providers.AlchemyProvider("homestead", "OaboX6k_zMdyP0YmoVIt3Coz6r7UBgox");
const privKey = "0x7t"
// const signer = new ethers.Wallet(privKey, provider);
let global_current_block: number;
let global_current_ttd: bigint;
let suggested_gwei : number;

interface targetType {
    address: string,
    contract: Contract,
    ttd_a: bigint,
    ttd_b: bigint,
    a_done: boolean,
    b_done: boolean,
}
const getDiff = async (block: number): Promise<bigint> => {
    let current_difficulty = await (await provider.getBlock(block))._difficulty;
    return current_difficulty.toBigInt();
}


const tickerA = async () => {
        let this_current_block = await provider.getBlockNumber();
        if(!global_current_ttd) {
            let this_ttd = await getDiff(this_current_block);
            global_current_ttd = this_ttd;
            return
        }
        if(this_current_block > global_current_block){
            let this_ttd: bigint = await getDiff(this_current_block);
                console.log(this_ttd, "minus", global_current_ttd )
                let ttd_per_block = this_ttd - global_current_ttd;
                console.log("TTD change in block", this_current_block, "is:", ttd_per_block);
            }
        
global_current_block = this_current_block
console.log("tick", this_current_block);
}

console.log(58578181362687988943481n - 58578168929000318250341n);

await tickerA();
setInterval(tickerA, 2000);