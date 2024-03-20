import React, { useEffect } from 'react';
import { useLoginStore } from '../store/store';
import { NetworkNames, initializeSdkGateway } from '@kanalabs/mirai'
import { Web3AuthNoModal } from "@web3auth/no-modal";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);

const UnLoggedIn = () => {

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setWeb3Auth(web3auth);

        if (web3auth.connected) {
          console.log("Connected to web3auth");
        }
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }
  , []);

  const { setMiraiSDK, setMiraiInstance, setIsLoggedIn, setWeb3Auth } = useLoginStore();
  

  const init = async () => {

    if (!web3auth.connected) {
      console.log("Connected to web3auth");
      const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
      });
    }
   

    const privateKey = (await web3auth.provider?.request({
      method: "private_key",
    })) as string;

    const sdk = await initializeSdkGateway(
      { privateKey: privateKey.startsWith("0x") ? privateKey : `0x${privateKey}` },
      {
        networks: [NetworkNames.Polygon],
        projectKey: process.env.NEXT_PUBLIC_PROJECT_KEY,
        bundlerApiKey: process.env.NEXT_PUBLIC_BUNDLER_API_KEY
      },
    );
    console.log("sdk: ", sdk);

    const miraiInstance = sdk.setCurrentInstance(NetworkNames.Polygon);
    console.log("networkInstance: ", miraiInstance);

    setMiraiSDK(sdk);
    setMiraiInstance(miraiInstance);
    setIsLoggedIn(true);
  }

  return (
    <div className='bg-black w-[100vw] h-[100vh] flex justify-center items-center'>
      <div onClick={init} className=' w-[10%] h-[10%] bg-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.50)] rounded-xl flex items-center justify-center'>
        Google Login
      </div>
    </div>
  );
};


export default UnLoggedIn;