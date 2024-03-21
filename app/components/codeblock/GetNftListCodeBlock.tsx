import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const GetNftListCodeBlock = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const getNftList = async () => {

  const address = '0x...'; // user's address
  const chainId = 1; // chain id of the network
  
  try {
    const nftList = await dataService.getNftsList(address, chainId, '');
  } catch (error) {
    console.error('Error getting nft list:', error);
  }
}`}
      </code>
    </pre>
  );
};

export default GetNftListCodeBlock;
