import { BigNumber, Contract, ContractInterface, ethers } from "ethers";
import { privKey, signer, abi } from "./ethers.module.js";
const pubKey = "0x42AcB9d50DF9Ff4ECF191b3a18884AFBA94a0A09";
// 58750000000000000000000
// 20000000000000000

interface targetType {
    address: string,
    contract: Contract,
    ttd_a: bigint,
    ttd_b: bigint,
    a_done: boolean,
    b_done: boolean,
}

export const target1: targetType = {
    address: "0x43eEF4333ba8211fAea15b70d2197687f500025B",
    init: function() {
        this.contract = new ethers.Contract(this.address, abi, signer);
        return this;
    },
    ttd_a: BigInt(58652539881322889083690),
    // ttd_a: BigInt(58749980000000000000000),
    ttd_b: BigInt(5000000),
    a_done: false,
    b_done: false,
}.init();

export const target2: targetType = {
    address: "0xe3ffa3515511ab327340b33bdacb7e841d8bfe12",
    init: function() {
        this.contract = new ethers.Contract(this.address, abi, signer);
        return this;
    },
    ttd_a: BigInt(58749960000000000000000),
    ttd_b: BigInt(5000000),
    a_done: false,
    b_done: false,
}.init();


export const target3: targetType = {
    address: "0xe3ffa3515511ab327340b33bdacb7e841d8bfe12",
    init: function() {
        this.contract = new ethers.Contract(this.address, abi, signer);
        return this;
    },
    ttd_a: BigInt(58749920000000000000000),
    ttd_b: BigInt(5000000),
    a_done: false,
    b_done: false,
}.init();
