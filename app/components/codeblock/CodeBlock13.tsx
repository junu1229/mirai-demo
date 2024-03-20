import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock13 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`
const getAccountBalances = async () => {
  try {
    const nftList = await dataService.getNftsList(address, chainId, '');
  } catch (error) {
    console.error('Error getting native balance:', error);
  }
}
        `}
      </code>
    </pre>
  );
};

export default CodeBlock13;
