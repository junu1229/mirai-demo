import { useLoginStore } from "@/app/store/store";
import { useState } from "react";

const GetNativeBalances = () => {

  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  const { miraiInstance } = useLoginStore.getState();
  const getNativeBalance = async () => {
    try {
      setLoading(true);
      if (miraiInstance) {
        const balance = await miraiInstance.getNativeBalance();
        console.log('Balance:', balance);
        setBalance(balance);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className='text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col justify-center items-center'>
      <h2 className='text-[1.5vw] my-5'>Get Native Balances</h2>
      <div className='text-[1.5vw] my-5'>{balance}</div>
      <button onClick={getNativeBalance} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Get Balance'}
      </button>
    </div>
  );
}

export default GetNativeBalances;