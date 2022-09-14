import axios from "axios";
import { target1, target2, target3 } from "./targets.module.js";
import { getDiff, mintNFT } from "./ethers.module.js";

//ttd change: +12574725867831296
//1 block before: 46286596601044660


let current_block: number;
let current_ttd: bigint;
let suggested_gwei : number;

const  mainTicker = async () => {
    
}

let repeat1 = new Promise((resolve) => {
    tickerA().then(async  () => {
        resolve(await repeat1);
    }).catch(async (err) => {
        console.log(err);
        resolve(await repeat1)
    })
});

await repeat1;





const tickerA = async () => {
    if(target3.a_done == false){
        let current_difficulty = await getDiff();
        current_ttd = current_difficulty;
        if(!target1.a_done &&(current_difficulty >= target1.ttd_a)){
            await mintNFT(target1.contract);
            target1.a_done = true;
        }
        if(!target2.a_done &&(current_ttd >= target2.ttd_a)){
            await mintNFT(target2.contract);
            target2.a_done = true;
        }
        if(!target3.a_done &&(current_ttd >= target3.ttd_a)){
            await mintNFT(target3.contract);
            target3.a_done = true;
        }

        if(target1.a_done && !target1.b_done){
            //mint_CONTRACT1B
            setTimeout(async () => {await mintNFT(target1.contract)}, 20000);
            target1.b_done = true;
        }
        if(!target2.b_done &&(current_ttd >= target2.ttd_b)){
            //mint_CONTRACT2
            setTimeout(async () => {await mintNFT(target2.contract)}, 20000);
            target2.b_done = true;
        }
        if(!target3.b_done &&(current_ttd >= target3.ttd_b)){
            //mint_CONTRACT3
            setTimeout(async () => {await mintNFT(target3.contract)}, 20000);
            target3.b_done = true;
        }
    } 
};
