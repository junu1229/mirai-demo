import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const UniSwapCodeBlock = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.7vw]'>
      <code className={`language-typescript`} >
        {`const init = async () => {
  const weth = WETH[chainId];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 5; // 5 minutes from the current Unix time
  const path = [weth.address, tokenAddress];

  const amountInWei = Web3.utils.toWei(amount, 'ether');
  const uniswap = new ethers.Contract(
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    abi,
  );

  const transactionData = uniswap.interface.encodeFunctionData(
    'swapExactETHForTokens', 
    [Web3.utils.toHex(0), 
    path, 
    address, 
    Web3.utils.toHex(deadline)]
  );

  console.log('transactionData:', transactionData);
  if (miraiInstance === null) {
    return;
  }
  await miraiInstance.clearUserOpsFromBatch();

  await miraiInstance.addUserOpsToBatch({ 
    to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 
    data: transactionData, 
    value: amountInWei
  });

  const op = await miraiInstance.estimate();

  const uoHash = await miraiInstance.send(op);

  let userOpsReceipt = null;
  const timeout = Date.now() + 60000 // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
      await sleep(2);
      userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', \`Transaction Receipt: \`, userOpsReceipt);
}`}
      </code>
    </pre>
  );
};

export default UniSwapCodeBlock;
