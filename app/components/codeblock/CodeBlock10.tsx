import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 

const CodeBlock10 = () => {

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className=' text-[0.8vw]'>
      <code className={`language-typescript`} >
        {`const getAccountAddress = async () => {
  try {
    const address = await miraiInstance.getCounterFactualAddress();
  } catch (error) {
    console.log('Error getting address:', error);
  }
}`}
      </code>
    </pre>
  );
};

export default CodeBlock10;
