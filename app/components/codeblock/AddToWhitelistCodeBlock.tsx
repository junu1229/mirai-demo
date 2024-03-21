import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const AddToWhitelistCodeBlock = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const addToWhitelist = async () => {
  
  const address = '0x...'; // user's address
  const chainId = 1; // chain id of the network
  
  try {
    const balance = await paymaster.adddWhitelist(address, chainId);
  } catch (error) {
    console.error('Error adding to whitelist:', error);
  }
}`}
      </code>
    </pre>
  );
};

export default AddToWhitelistCodeBlock;
