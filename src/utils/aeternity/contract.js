import { CONTRACT_ADDRESS, CONTRACT_SOURCE } from './configs'
import {aeWallet} from "./wallet";
import {reactive} from "vue";

export const aeContract = reactive({
  instance : null,
  address : "",
  name : "",
  symbol: "",
  decimals : 0,
  owner : "",
  totalSupply: 0,
  balances : null,
  balance : 0
})

export async function initContract(){
  aeContract.address = CONTRACT_ADDRESS;
  if(!aeWallet || !aeWallet.sdk){
    console.error(`Failed to get contract ${aeContract.address} instance : AeWallet not initialized`);
    return;
  }
  try {
    console.log(`Getting contract ${aeContract.address} instance`);
    aeContract.instance = await aeWallet.sdk.getContractInstance({
      source : CONTRACT_SOURCE,
      contractAddress: aeContract.address
    });
  }
  catch (err){
    console.error(`Failed to get contract ${aeContract.address} instance : ${err}`);
  }

  try{
    console.log(`Getting contract ${aeContract.address} info`);
    let res = await aeContract.instance.call("meta_info",[],{callStatic : true});
    console.log(res.decodedResult);
    aeContract.name = res.decodedResult.name;
    aeContract.symbol = res.decodedResult.symbol;
    aeContract.decimals = res.decodedResult.decimals;

    console.log(`Getting contract ${aeContract.address} owner`);
    res = await aeContract.instance.call("owner",[],{callStatic : true});
    aeContract.owner = res.decodedResult;
    console.log(res);
    console.log(`Getting contract ${aeContract.address} supply`);
    res = await aeContract.instance.call("total_supply",[],{callStatic : true});
    aeContract.totalSupply = Number(res.decodedResult);
    console.log(Number(res.decodedResult));
    console.log(res);
  }
  catch (err){
    console.error(`Failed to get contract ${aeContract.address} info : ${err}`);
  }
}

export async function getBalance(address){
  try {
    console.log(`Getting contract balance for ${address}...`);
    let res = await aeContract.instance.call("balance",[address],{callStatic : true});
    return Number(res.decodedResult);
  }
  catch (err){
    console.error(`Failed to get balance for ${address} : ${err}`);
  }
  return 0;
}

export async function getBalances(){
  try {
    console.log(`Getting contract ${aeContract.address} balances...`);
    let res = await aeContract.instance.call("balances",[],{callStatic : true});
    aeContract.balances = res.decodedResult;
  }
  catch (err){
    console.error(`Failed to get balances for contract : ${err}`);
  }
}

export async function transferTokens(address, amount){
  try {
    console.log(`Sending ${amount} tokens to ${address}...`);
    return await aeContract.instance.call("transfer",[address, amount]);
  }
  catch (err){
    console.error(`Failed to transfer ${amount} tokens to ${address} : ${err}`);
  }
}
