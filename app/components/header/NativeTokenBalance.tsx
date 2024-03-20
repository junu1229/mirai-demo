'use client';

import { useEffect } from "react";
import { useLoginStore } from "../../store/store";

const NativeTokenBalance = () => {

  const { miraiInstance, setNativeTokenBalance, nativeTokenBalance } = useLoginStore();

  const getAndSetNativeTokenBalance = async () => {
    try {
      // get the native token balance and set it in the store
      if (miraiInstance === null) {
        console.error('Mirai instance is null');
        return;
      }
      console.log('getNativeBalance');
      const balance = await miraiInstance.getNativeBalance();
      
      // set the native token balance in the store
      setNativeTokenBalance(parseFloat(balance));
      console.log('Native token balance:', balance);
    } catch (error) {
      console.error('Error fetching native token balance:', error);
    }
  };

  useEffect(() => {
    getAndSetNativeTokenBalance();
  }, [miraiInstance, setNativeTokenBalance, nativeTokenBalance]);

  return (
    <div>
      <div className="items-center flex justify-center text-[2vw]">
        Native Token Balance
      </div>
      <div className="items-center flex justify-center text-[1vw]">
        {nativeTokenBalance}
      </div>
    </div>
  );
};


export default NativeTokenBalance;