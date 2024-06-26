import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { Paymaster } from "@kanalabs/mirai";

const AddToWhiteList = () => {

  const { address, chainId } = useLoginStore();
  const [loading, setLoading] = useState(false);
  const paymaster = new Paymaster();

  const addToWhiteList = async () => {
    try {
      setLoading(true);
      const result = await paymaster.adddWhitelist(address, chainId as number);
      console.log(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className={`text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col items-center gap-[5%]`}>
      <div className='text-[1.5vw] my-5'>Add To Whitelist</div>
      <button onClick={addToWhiteList} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Add To Whitelist'}
      </button>
    </div>
  );
}

export default AddToWhiteList;