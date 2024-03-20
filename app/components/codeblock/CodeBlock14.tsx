import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock14 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const getSponsorBalance = async () => {

  const sponsorAddress = '0x...'; // sponsor wallet address
  const chainId = 1; // chain id of the network

  try {
    const balance = await paymaster.getSponsorBalance(sponsorAddress, chainId);
  } catch (error) {
    console.error('Error getting sponsor balance:', error);
  }
}`}
      </code>
    </pre>
  );
};

export default CodeBlock14;
