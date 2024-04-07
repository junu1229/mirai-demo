import { useLoginStore } from "@/app/store/store";
import { useState } from "react";

const GetAccountAddress = () => {

  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { miraiInstance } = useLoginStore.getState();
  
  const getAccountAddress = async () => {
    try {
      setLoading(true);
      if (miraiInstance) {
        const address = await miraiInstance.getCounterFactualAddress();
        console.log('Address:', address);
        setAddress(address);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting Address:', error);
    }
  }

  return (
    <div className='text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col justify-center items-center'>
      <h2 className='text-[1.5vw] my-5'>Get Account Address</h2>
      <div className='text-[0.7vw] my-5'>{address}</div>
      <button onClick={getAccountAddress} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Get Address'}
      </button>
    </div>
  );
}

export default GetAccountAddress;