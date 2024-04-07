import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { DataService } from "@kanalabs/mirai";

const GetNftList = () => {

  const [loading, setLoading] = useState(false);
  const { address, chainId } = useLoginStore.getState();
  const dataService = new DataService();

  const getNftList = async () => {
    try {
      setLoading(true);
      const nftList = await dataService.getNftsList(address, chainId as number, '');
      console.log(nftList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting nft list:', error);
    }
  }

  return (
    <div className={`text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col items-center`}>
      <div className='text-[1.5vw] my-5'>Get Nft List</div>
      <button onClick={getNftList} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Get Nft List'}
      </button>
    </div>
  );
}

export default GetNftList;