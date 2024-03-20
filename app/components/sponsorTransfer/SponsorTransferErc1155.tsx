import { utils } from 'ethers';
import { useState } from "react";
import { useLoginStore } from "../../store/store";
import { sleep } from '@etherspot/prime-sdk/dist/sdk/common';
import { NetworkNames } from '@kanalabs/mirai/lib/prime/network';

const SponsorTransferErc1155 = () => {
  const [targetAddress, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [loading, setLoading] = useState(false);
  const { miraiInstance, miraiSDK, address } = useLoginStore();

  const transfer = async () => {
    try {
      if (miraiSDK === null || miraiInstance === null) {
        return;
      }
      setLoading(true);

      //initialize erc721 sdk instance
      const erc1155 = miraiSDK.erc1155(contractAddress, NetworkNames.Polygon);
  
      // clear any previous transactions in batch
      await miraiInstance.clearUserOpsFromBatch();
  
      // add erc721 transferFrom function to the batch
      await erc1155.safeTransferFrom(address, targetAddress, tokenId, amount, '0x');
  
      // estimate transactions added to the batch and get the fee data for the UserOp
      const op = await miraiInstance.estimate({
        paymasterDetails: {
          url: `${process.env.NEXT_PUBLIC_PAYMASTER_URL}?apiKey=${process.env.NEXT_PUBLIC_PAYMASTER_API_KEY}&chainId=137`,
          context: { mode: 'sponsor' },
        },
      });
  
      // sign the UserOp and sending to the bundler...
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
      <h2 className='text-[1.5vw] my-5'>Transfer ERC-1155</h2>
      <div className='gap-6 flex flex-col justify-center items-center text-[1vw] my-5'>
        <div>
          <label>Send To: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={targetAddress}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>contract Address: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress((e.target.value))}
          />
        </div>
        <div>
          <label>Token Id: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>amount: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button onClick={transfer} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl w-[50%] text-[1.2vw] my-5'>
        {loading ? 'Loading...' : 'Transfer'}
      </button>
    </div>
  );
}

export default SponsorTransferErc1155;