import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { Paymaster } from "@kanalabs/mirai";

const AddToWhiteList = () => {

  const { address } = useLoginStore();
  const [loading, setLoading] = useState(false);
  const paymaster = new Paymaster();

  const getAccountBalances = async () => {
    try {
      setLoading(true);
      const balance = await paymaster.adddWhitelist(address, 137);
      console.log(balance);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className={`text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[40%] flex flex-col items-center gap-[5%]`}>
      <div className='text-[1.5vw] my-5'>Add To Whitelist</div>
      <button onClick={getAccountBalances} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl w-[50%] h-10 text-[1.2vw] my-5'>
        {loading ? 'Loading...' : 'Get Transaction Details'}
      </button>
    </div>
  );
}

export default AddToWhiteList;