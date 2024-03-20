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
        {`
const getAccountBalances = async () => {
  try {
    const transactionDetails = await dataService.getTransaction(transactionHash, chainId, '');
  } catch (error) {
    console.log('Error getting transaction Details', error);
  }
}
        `}
      </code>
    </pre>
  );
};

export default CodeBlock12;
