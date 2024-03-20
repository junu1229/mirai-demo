import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock2 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.7vw]'>
      <code className={`language-typescript`} >
        {`const transferNonNativeToken = async () => {

  const address = '0x123...'; // recipient address
  const amount = '0.01'; // amount to transfer
  const tokenId = '0x123...'; // Non-Native token id
  const tokenDecimals = '18'; // token decimals

  try {

    // initialize erc20 sdk instance
    const erc20 = miraiSDK.erc20(tokenId, NetworkNames.name); 

    // clear any previous transactions in batch
    await miraiInstance.clearUserOpsFromBatch();

    // add erc20 transfer function to the batch
    await erc20.transfer(address, utils.parseUnits(amount, tokenDecimals));

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await miraiInstance.estimate();

    // sign the UserOp and sending to the bundler...
    const uoHash = await miraiInstance.send(op);
    
    let userOpsReceipt = null;
    const timeout = Date.now() + 60000 // 1 minute timeout

    // wait for getting the transaction receipt
    while (userOpsReceipt == null && Date.now() < timeout) {
        await sleep(2);
        userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
    }
    
  } catch (error) {
    console.error('Error transferring non-native token:', error);
  }
};`}
      </code>
    </pre>
  );
};

export default CodeBlock2;
