import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock12 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const getTransactionDetails = async () => {

  const transactionHash = '0x123...'; // transaction hash
  const chainId = 1; // chain id of the network

  try {
    const transactionDetails = await dataService.getTransaction(transactionHash, chainId, '');
  } catch (error) {
    console.log('Error getting transaction Details: ', error);
  }
}`}
      </code>
    </pre>
  );
};

export default CodeBlock12;
