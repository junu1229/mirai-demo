import { useState } from "react";
import { Paymaster } from "@kanalabs/mirai";
import { useLoginStore } from "@/app/store/store";

const DepositWhitelist = () => {

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const paymaster = new Paymaster();
  const { chainId } = useLoginStore();

  const depositWhitelist = async () => {
    try {
      setLoading(true);
      const balance = await paymaster.deposit(amount, chainId as number);
      console.log(balance);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting native balance:', error);
    }
  }

  return (
    <div className={`text-[rgba(255,255,255,0.50)] bg-[#1D1E20] rounded-xl w-[30%] flex flex-col items-center`}>
      <div className='text-[1.5vw] my-5'>Deposit Whitelist</div>
      <div className="my-5 text-[0.9vw]">
          <label>Deposit Amount: </label>
          <input 
            className='text-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.10)] rounded'
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
      </div>
      <button onClick={depositWhitelist} disabled={loading} className='bg-[rgba(255,255,255,0.10)] rounded-xl text-[1.2vw] my-5 p-3'>
        {loading ? 'Loading...' : 'Deposit Whitelist'}
      </button>
    </div>
  );
}

export default DepositWhitelist;