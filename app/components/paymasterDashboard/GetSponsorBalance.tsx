import { useLoginStore } from "@/app/store/store";
import { useState } from "react";
import { NetworkNames, Paymaster } from "@kanalabs/mirai";

const GetSponsorBalance = () => {

  const [sponsorBalance, setSponsorBalance] = useState('');
  const { network, chainId } = useLoginStore();
  const [loading, setLoading] = useState(false);
  const paymaster = new Paymaster();
  const paymasterAddress = network === NetworkNames.Bifrost ? '0x8ffdf51ebf23761d762f028a6e1cb88db25a85bf' : '0x7305B1a9bDD8247DeB288BC2d271626159cB8c4c';

  const getSponsorBalance = async () => {
    try {
      setLoading(true);
      const balance = await paymaster.getSponsorBalance(paymasterAddress, chainId as number);
      console.log(balance.sponsorBalance);
      setSponsorBalance(balance.sponsorBalance);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className={`text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col items-center`}>
      <div className='text-[1.5vw] my-5'>Get Sponsor Balance</div>
      <div className='text-[1.5vw] my-5'>Balance: {sponsorBalance}</div>
      <button onClick={getSponsorBalance} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Get Sponsor Balance'}
      </button>
    </div>
  );
}

export default GetSponsorBalance;