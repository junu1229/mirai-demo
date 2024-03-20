import { PrimeSdk } from '@etherspot/prime-sdk';
import { NetworkNames, SDKGateway } from '@kanalabs/mirai';
import { create } from 'zustand';

interface LoginState {
  miraiSDK: SDKGateway | null;
  miraiInstance: PrimeSdk | null;
  address: string;
  nativeTokenBalance: number;
  isLoggedIn: boolean;
  setMiraiSDK: (miraiSDK: any) => void;
  setMiraiInstance: (miraiInstance: any) => void;
  setAddress: (address: string) => void;
  setNativeTokenBalance: (nativeTokenBalance: number) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useLoginStore = create<LoginState>(set => ({
  miraiSDK: null,
  miraiInstance: null,
  address: '',
  nativeTokenBalance: 0,
  isLoggedIn: false,
  setMiraiSDK: miraiSDK => set({ miraiSDK: miraiSDK }),
  setMiraiInstance: miraiInstance => set({ miraiInstance: miraiInstance }),
  setAddress: address => set({ address: address }),
  setNativeTokenBalance: nativeTokenBalance => set({ nativeTokenBalance: nativeTokenBalance }),
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn: isLoggedIn }),
}));