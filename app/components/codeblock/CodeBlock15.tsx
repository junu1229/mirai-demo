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
        {`
const getAccountBalances = async () => {
  try {
    setLoading(true);
    const balance = await paymaster.deposit(amount, chainId);
    console.log(balance);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('Error getting native balance:', error);
  }
}
        `}
      </code>
    </pre>
  );
};

export default CodeBlock15;
