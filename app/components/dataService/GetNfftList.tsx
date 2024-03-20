import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { DataService } from "@kanalabs/mirai";

const GetNftList = () => {

  const [loading, setLoading] = useState(false);
  const { address } = useLoginStore.getState();
  const dataService = new DataService();
  const chainId = 137;

  const getAccountBalances = async () => {
    try {
      setLoading(true);
      console.log('address: ', address);
      const nftList = await dataService.getNftsList(address, chainId, '');
      console.log(nftList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className={`text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[40%] flex flex-col items-center`}>
      <div className='text-[1.5vw] my-5'>Get Nft List</div>
      <button onClick={getAccountBalances} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl w-[50%] h-10 text-[1.2vw] my-5'>
        {loading ? 'Loading...' : 'Get Transaction Details'}
      </button>
    </div>
  );
}

export default GetNftList;