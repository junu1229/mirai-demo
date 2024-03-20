import { utils } from 'ethers';
import { useState } from "react";
import { useLoginStore } from "../../store/store";
import { sleep } from '@etherspot/prime-sdk/dist/sdk/common';
import { NetworkNames } from '@kanalabs/mirai/lib/prime/network';

const TransferNonNativeToken = () => {
  const [address, setAddress] = useState('');
  const [decimals, setDecimals] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [loading, setLoading] = useState(false);
  const { miraiInstance, miraiSDK } = useLoginStore();

  const transfer = async () => {
    try {
      if (miraiSDK === null || miraiInstance === null) {
        return;
      }
      setLoading(true);
      const erc20 = miraiSDK.erc20(tokenId, NetworkNames.Polygon);

      // clear any previous transactions in batch
      await miraiInstance.clearUserOpsFromBatch();

      // add erc20 transfer function to the batch
      await erc20.transfer(address, utils.parseUnits(amount, parseInt(decimals)));

      // estimate transactions added to the batch and get the fee data for the UserOp
      const op = await miraiInstance.estimate();
      console.log('op: ', op);

      //sign the UserOp and sending to the bundler...
      const uoHash = await miraiInstance.send(op);
      
      // log the uoHash
      console.log(`UserOpHash: ${uoHash}`);
      let userOpsReceipt = null;
      const timeout = Date.now() + 60000 // 1 minute timeout
      while (userOpsReceipt == null && Date.now() < timeout) {
          await sleep(2);
          userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
      }
      console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
      setLoading(false);
    } catch (error) {
      console.error('Error transferring native token:', error);
      setLoading(false);
    }
  };

  return (
    <div className='text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col justify-center items-center'>
      <h2 className='text-[1.5vw] my-5'>Transfer Non Native Token</h2>
      <div className='gap-6 flex flex-col justify-center items-center text-[1vw] my-5'>
        <div>
          <label>Send To: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Amount: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Token Id: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </div>
        <div>
          <label>Decimals: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
          />
        </div>
      </div>
      <button onClick={transfer} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl w-[50%] my-5 text-[1.2vw]'>
        {loading ? 'Loading...' : 'Transfer'}
      </button>
    </div>
  );
}

export default TransferNonNativeToken;