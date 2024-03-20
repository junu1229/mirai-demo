import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock1 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const transferNativeToken = async () => {

  const address = '0x123...'; // recipient address
  const amount = '0.01'; // amount to transfer

  try {

    // clear the batch
    await miraiInstance.clearUserOpsFromBatch();

    // add transactions to the batch
    await miraiInstance.addUserOpsToBatch({ to: address, value: utils.parseEther(amount) });

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
    console.error('Error transferring native token:', error);
  }
};`}
      </code>
    </pre>
  );
};

export default CodeBlock1;
