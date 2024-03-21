import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CheckWhitelistCodeBlock = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const checkWhitelist = async () => {

  const address = '0x...'; // user's address
  const chainId = 1; // chain id of the network
  const sponsorAddress = '0x...'; // sponsor wallet address

  try {
    const balance = await paymaster.checkWhitelist(address, chainId, sponsorAddress);
  } catch (error) {
    console.error('Error checking whitelist:', error);
  }
}`}
      </code>
    </pre>
  );
};

export default CheckWhitelistCodeBlock;
