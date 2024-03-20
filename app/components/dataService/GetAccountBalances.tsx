import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { DataService } from "@kanalabs/mirai";

interface Balances {
  token: string;
  balance: string;
}

const GetAccountBalances = () => {

  const [loading, setLoading] = useState(false);

  const { address } = useLoginStore.getState();

  const dataService = new DataService();
  const chainId = 137;

  const getAccountBalances = async () => {
    try {
      setLoading(true);
      const balances = await dataService.getAccountBalances(address, chainId, '');
      console.log(balances.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className='text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col justify-center items-center'>
      <h2 className='text-[1.5vw] my-5'>Get Account Balances</h2>
      <button onClick={getAccountBalances} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl w-[50%] h-15 text-[1.2vw] my-5'>
        {loading ? 'Loading...' : 'Get Balances'}
      </button>
    </div>
  );
}

export default GetAccountBalances;