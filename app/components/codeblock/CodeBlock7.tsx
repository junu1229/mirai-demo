import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock7 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.7vw]'>
      <code className={`language-typescript`} >
        {`const transferErc721 = async () => {

  const senderAddress = '0x123...'; // User address
  const address = '0x123...'; // recipient address
  const contractAddress = '0x123...'; // erc721 contract address
  const tokenId = '1'; // tokenId to transfer

  try {

    //initialize erc721 sdk instance
    const erc721 = miraiSDK.erc721(contractAddress, NetworkNames.name);

    // clear any previous transactions in batch
    await miraiInstance.clearUserOpsFromBatch();

    // add erc721 transferFrom function to the batch
    await erc721.transferFrom(senderAddress, address, tokenId);

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await miraiInstance.estimate({
      paymasterDetails: {
        url: 'https://arka.etherspot.io?apiKey=YOUR_API_KEY&chainId=CHAIN_ID', 
        context: { mode: 'sponsor' },
      },
    });

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
    console.error('Error transferring erc721:', error);
  }
};`}
      </code>
    </pre>
  );
};

export default CodeBlock7;
