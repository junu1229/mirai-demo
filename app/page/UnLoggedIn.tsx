import React from 'react';
import initMirai from '../utils/initMirai';
import { NetworkNames } from '@kanalabs/mirai';
import { useLoginStore } from '../store/store';

const UnLoggedIn = () => {

  const { setMiraiSDK, setMiraiInstance, setIsLoggedIn } = useLoginStore();

  const getMirai = async () => {
    const { sdk, miraiInstance } = await initMirai(NetworkNames.Polygon);
    setMiraiInstance(miraiInstance);
    setMiraiSDK(sdk);
    setIsLoggedIn(true);
  }
  return (
    <div className='bg-black w-[100vw] h-[100vh]'>
      <div onClick={getMirai} className=' w-10 h-5'>
        LogIn
      </div>
    </div>
  );
}

export default UnLoggedIn;