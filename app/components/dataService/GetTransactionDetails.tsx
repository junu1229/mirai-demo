import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { DataService } from "@kanalabs/mirai";

const GetTransactionDetails = () => {

  const [transactionHash, setTransactionHash] = useState('');

  const [loading, setLoading] = useState(false);

  const dataService = new DataService();
  const chainId = 137;

  const getAccountBalances = async () => {
    try {
      setLoading(true);
      const transactionDetails = await dataService.getTransaction(transactionHash, chainId, '');
      console.log(transactionDetails);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className='text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[40%] flex flex-col justify-center items-center'>
      <div className='text-[1.5vw] my-5'>Get Transaction Details</div>
      <div className="my-5">
          <label>Transaction Hash: </label>
          <input
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
          />
      </div>
      <button onClick={getAccountBalances} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Get Transaction Details'}
      </button>
    </div>
  );
}

export default GetTransactionDetails;