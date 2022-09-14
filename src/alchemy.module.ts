import axios, { Axios, AxiosStatic } from "axios";
import { alchemyKey } from "./ethers.module.js";

export const instance = axios.default.create({
    baseURL: 'https://eth-mainnet.g.alchemy.com/v2/'
})

const options = {
    method: 'POST',
    url: 'https://eth-mainnet.alchemyapi.io/v2/'+alchemyKey,
    headers: {'Content-Type': 'application/json'},
    data: {id: 0, jsonrpc: '2.0', method: 'eth_getBlockByNumber', params: ["5000", true]}
  };

// axios.default.request(options).then(function(res) {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err);
// })

export const getTotalDiff = async (blockNumber) => { 
   let res = await axios.default.post("https://eth-mainnet.g.alchemy.com/v2/"+alchemyKey, {
        jsonrpc:"2.0",method:"eth_getBlockByNumber",params:[blockNumber, true],id:0
        }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return(res.data.result.totalDifficulty);
}

export const getCurrBlock = async () => {
    let res = await axios.default.post("https://eth-mainnet.g.alchemy.com/v2/"+alchemyKey, {
        jsonrpc:"2.0",method:"eth_blockNumber"
        }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return(res.data.result);
}

export const getTotalCurrent = async () => {
    let current_block = await getCurrBlock();
    let res = await getTotalDiff(current_block);
    return BigInt(res);
}


let last_block;
let last_ttd;
export const tick = async () => {
    let current_block = await getCurrBlock();
    if(!last_block){
        last_block = current_block;
    }
    if(!last_ttd){
        last_ttd = BigInt(await getTotalDiff(current_block));
    }
    if(current_block > last_block) {
        let curr_ttd = BigInt(await getTotalDiff(current_block))
        console.log(curr_ttd, last_ttd)
        console.log("change:", (curr_ttd - last_ttd));
        last_ttd = 0n;
    }
}


export const tick2 = async () => {
    console.log(BigInt(await getTotalCurrent()));
}



// url = "https://eth-mainnet.alchemyapi.io/v2/demo"
// payload = {
//     "id": 1,
//     "jsonrpc": "2.0",
//     "method": "eth_getBlockByNumber"
// }
// headers = {
//     "Accept": "application/json",
//     "Content-Type": "application/json"
// }