import React, { useEffect } from 'react';
import { useLoginStore } from '../store/store';
import { NetworkNames, initializeSdkGateway, networkNameToChainId } from '@kanalabs/mirai'
import { Web3AuthNoModal } from "@web3auth/no-modal";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string;

// chain config is not important because all private key will be same
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", 
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

  const [selectedNetwork, setSelectedNetwork] = React.useState<string>('Polygon');

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork(e.target.value);

    const network = 
    e.target.value === 'polygon' ? NetworkNames.Polygon : 
    e.target.value === 'klaytn' ? NetworkNames.Klaytn : 
    e.target.value === 'mainnet' ? NetworkNames.Mainnet :
    e.target.value === 'bifrost' ? NetworkNames.Bifrost : NetworkNames.Avalanche;
    setNetwork(network);
    setChainId(networkNameToChainId(network) as number);
  }

  useEffect(() => {
    const initWeb3Auth = async () => {
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
    initWeb3Auth();
  }
  , []);

  const { setMiraiSDK, setMiraiInstance, setIsLoggedIn, setWeb3Auth, setNetwork, setChainId, network } = useLoginStore();
  

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
        networks: [network],
        projectKey: process.env.NEXT_PUBLIC_PROJECT_KEY,
        bundlerApiKey: process.env.NEXT_PUBLIC_BUNDLER_API_KEY
      },
    );
    console.log("sdk: ", sdk);

    const miraiInstance = sdk.setCurrentInstance(network);
    console.log("networkInstance: ", miraiInstance);

    setMiraiSDK(sdk);
    setMiraiInstance(miraiInstance);
    setIsLoggedIn(true);
  }

  return (
    <div className='bg-black w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
      <div onClick={init} className=' w-[10%] h-[10%] bg-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.50)] rounded-xl flex items-center justify-center'>
        Google Login
      </div>
      <div className=' mt-4'>
        <label htmlFor="network-select" className='text-[rgba(255,255,255,0.50)] mr-2'>Select Network:</label>
        <select id="network-select" value={selectedNetwork} onChange={handleNetworkChange}>
          <option value="polygon">Polygon</option>
          <option value="klaytn">Klaytn</option>
          <option value="bifrost">Bifrost</option>
          <option value="avalanche">Avalanche</option>
          <option value="mainnet">Mainnet</option>
        </select>
      </div>
    </div>
  );
};


export default UnLoggedIn;