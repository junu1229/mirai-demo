import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock11 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const getAccountBalances = async () => {

  const address = '0x...'; // user's address
  const chainId = 1; // chain id of the network

  try {
    const balances = await dataService.getAccountBalances(address, chainId, '');
  } catch (error) {
    console.log('Error getting Account Balances:', error);
  }
}`}
      </code>
    </pre>
  );
};

export default CodeBlock11;
