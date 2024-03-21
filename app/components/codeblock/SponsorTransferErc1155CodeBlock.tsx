import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const SponsorTransferErc1155CodeBlock = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.65vw]'>
      <code className={`language-typescript`} >
        {`const transferErc1155 = async () => {

  const senderAddress = '0x123...'; // User address
  const address = '0x123...'; // recipient address
  const contractAddress = '0x123...'; // erc1155 contract address
  const tokenId = '1'; // tokenId to transfer
  const amount = '1'; // amount to transfer

  try {

    // initialize erc1155 sdk instance
    const erc1155 = miraiSDK.erc1155(contractAddress, NetworkNames.name);

    // clear any previous transactions in batch
    await miraiInstance.clearUserOpsFromBatch();

    // add erc1155 safeTransferFrom function to the batch
    await erc1155.safeTransferFrom(senderAddress, Address, tokenId, amount, '0x');

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
    console.error('Error transferring erc1155:', error);
  }
};`}
      </code>
    </pre>
  );
};

export default SponsorTransferErc1155CodeBlock;
