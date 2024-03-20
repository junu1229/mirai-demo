'use client';

import { useLoginStore } from "../../store/store";

const Logout = () => {

  const { miraiInstance, setIsLoggedIn, setMiraiInstance } = useLoginStore();
  
  const logout = async () => {
    try {
      // logout from the web3auth instance and destroy the mirai instance
      await miraiInstance?.destroy();

      // set the logged in state to false and reset the web3auth and mirai instance
      setIsLoggedIn(false);
      setMiraiInstance(null);
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <div onClick={logout} className="w-full h-full flex justify-center items-center cursor-pointer text-[3vw]">
        Logout
      </div>
    );
  };


export default Logout;