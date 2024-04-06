import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { NetworkNames, Paymaster } from "@kanalabs/mirai";

const CheckWhitelisted = () => {

  const { address, chainId, network } = useLoginStore();
  const [loading, setLoading] = useState(false);
  const paymaster = new Paymaster();

  const paymasterAddress = network === NetworkNames.Bifrost ? '0x8ffdf51ebf23761d762f028a6e1cb88db25a85bf' : '0x7305B1a9bDD8247DeB288BC2d271626159cB8c4c';

  const checkWhitelisted = async () => {
    try {
      setLoading(true);
      const balance = await paymaster.checkWhitelist(address, chainId as number, paymasterAddress);
      console.log(balance);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className={`text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col items-center gap-[5%]`}>
      <div className='text-[1.5vw] my-5'>Check Whitelist</div>
      <button onClick={checkWhitelisted} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Check Whitelist'}
      </button>
    </div>
  );
}

export default CheckWhitelisted;