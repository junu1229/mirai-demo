import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock15 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const depositWhitelist = async () => {

  const amount = 100; // amount to deposit
  const chainId = 1; // chain id of the network

  try {
    const result = await paymaster.deposit(amount, chainId);
  } catch (error) {
    console.error('Error deposit whitelist:', error);
  }
}`}
      </code>
    </pre>
  );
};

export default CodeBlock15;
