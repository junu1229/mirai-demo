import { useState } from "react";
import { useLoginStore } from "../../store/store";
import { sleep } from '@etherspot/prime-sdk/dist/sdk/common';
import { NetworkNames } from '@kanalabs/mirai/lib/prime/network';

const SponsorTransferErc721 = () => {
  const [address, setAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [loading, setLoading] = useState(false);
  const { miraiInstance, miraiSDK, network, chainId } = useLoginStore();

  const transfer = async () => {
    try {
      if (miraiSDK === null || miraiInstance === null) {
        return;
      }
      setLoading(true);
      const sender = await miraiInstance.getCounterFactualAddress();

      //initialize erc721 sdk instance
      const erc721 = miraiSDK.erc721(contractAddress, network);
  
      // clear any previous transactions in batch
      await miraiInstance.clearUserOpsFromBatch();
      console.log("cleared");
  
      // add erc721 transferFrom function to the batch
      await erc721.transferFrom(sender, address, tokenId);
      console.log("added");
  
      // estimate transactions added to the batch and get the fee data for the UserOp
      const op = await miraiInstance.estimate({
        paymasterDetails: {
          url: `https://arka.etherspot.io?apiKey=${process.env.NEXT_PUBLIC_PAYMASTER_API_KEY}&chainId=${chainId as number}`,
          context: { mode: 'sponsor' },
        },
      });
      console.log("op: ", op);
  
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
      <h2 className='text-[1.5vw] my-5'>Transfer ERC-721</h2>
      <div className='gap-6 flex flex-col justify-center items-center text-[0.9vw] my-5'>
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
      </div>
      <button onClick={transfer} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Transfer'}
      </button>
    </div>
  );
}

export default SponsorTransferErc721;