'use client';

import { useEffect } from "react";
import { useLoginStore } from "../../store/store";

const UserAddress = () => {

  const { miraiInstance, setAddress, address } = useLoginStore();

  
  const getUserAddress = async () => {
    try {
      if (miraiInstance === null) {
        return;
      }
      // get the user address
      const address = await miraiInstance.getCounterFactualAddress();

      // set the user address in the store
      setAddress(address);
    } catch (error) {
      console.error('Error fetching user address:', error);      
    }
  };

  useEffect(() => {
    getUserAddress();
  }
  , [miraiInstance]);

  return (
    <div>
      <div className="items-center flex justify-center text-[2vw]">
        User Address
      </div>
      <div className=" items-center flex justify-center text-[0.9vw]">
        {address ? address : 'Loading...'}
      </div>
    </div>
  );
};


export default UserAddress;