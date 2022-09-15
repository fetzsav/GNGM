import { target1, target2, target3 } from "./targets.module.js";
import { getDiff, mintNFT } from "./ethers.module.js";
import { getTotalCurrent } from "./alchemy.module.js";

let current_block: number;
let current_ttd: bigint;
let suggested_gwei : number;

const tickerA = async () => {
    if(target3.a_done == false){
        let current_difficulty = await getTotalCurrent();
        console.log("❌ current difficulty", current_difficulty);
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
            await new Promise(resolve => setTimeout(resolve, 10000));
            await mintNFT(target1.contract);
            target1.b_done = true;
        }
        if(target2.a_done && !target2.b_done){
            //mint_CONTRACT1B
            await new Promise(resolve => setTimeout(resolve, 10000));
            await mintNFT(target2.contract);
            target2.b_done = true;
        }
        if(target3.a_done && !target3.b_done){
            //mint_CONTRACT1B
            await new Promise(resolve => setTimeout(resolve, 10000));
            await mintNFT(target3.contract);
            target3.b_done = true;
        }
    }
};

// let repeat1 = new Promise((resolve) => {
//     console.log("repeat 1: tick");
//     tickerA().then(async  () => {
//         console.log("resolving");
//         resolve(setTimeout(() => repeat1, 750));
//     }).catch(async (err) => {
//         console.log("repeat1 error:",err);
//         resolve(await repeat1)
//     })
// });

let repeat2 = Promise.resolve().then(function resolver() {
    return tickerA()
    .then(() => console.log("👍 waiting 3 seconds..."))
    .then(() => setTimeout(resolver, 3000));
}).catch((error) => {
    console.log("Error: " + error);
});


repeat2;