import { ChainId, Fetcher, WETH } from "@uniswap/sdk";
import { ethers } from "ethers";
import abi from './abi.json'
import { useLoginStore } from "@/app/store/store";
import Web3 from "web3";
import { sleep } from '@etherspot/prime-sdk/dist/sdk/common';
import { useState } from "react";


const Swap = () => {

  const { address, miraiInstance } = useLoginStore();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(''); // 0.001 ETH
  const chainId = ChainId.MAINNET;
  const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC address

  const init = async () => {
    setLoading(true);
    const weth = WETH[chainId];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 5; // 5 minutes from the current Unix time
    const path = [weth.address, tokenAddress];
    
    const amountInWei = Web3.utils.toWei(amount, 'ether');
    const uniswap = new ethers.Contract(
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      abi,
    );

    // encode the function data
    const transactionData = uniswap.interface.encodeFunctionData('swapExactETHForTokens', [Web3.utils.toHex(0), path, address, Web3.utils.toHex(deadline)]);

    console.log('transactionData:', transactionData);
    if (miraiInstance === null) {
      return;
    }
    await miraiInstance.clearUserOpsFromBatch();
    console.log("cleared");

    // add transactions to the batch
    await miraiInstance.addUserOpsToBatch({ to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', data: transactionData, value: amountInWei});
    console.log("added");

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await miraiInstance.estimate();
    console.log("op: ", op);

    // sign the UserOp and sending to the bundler...
    const uoHash = await miraiInstance.send(op);

    // log the uoHash
    console.log(`UserOpHash: ${uoHash}`)

    let userOpsReceipt = null;
    const timeout = Date.now() + 60000 // 1 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
        await sleep(2);
        userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
    }
    console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
    setLoading(false);
  }

  return (
    <div className='text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col justify-center items-center'>
      <h2 className='text-[1.5vw] my-5'>ETH to USDC</h2>
      <div>
        <label>Amount: </label>
        <input 
          className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={init} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Transfer'}
      </button>
    </div>
  )
}

export default Swap;