import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock9 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`
const getNativeBalance = async () => {
  try {
    const balance = await miraiInstance.getNativeBalance();
  } catch (error) {
    console.error('Error getting native balance:', error);
  }
}
        `}
      </code>
    </pre>
  );
};

export default CodeBlock9;
