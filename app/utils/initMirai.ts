import { NetworkNames, initializeSdkGateway } from '@kanalabs/mirai'

const initMirai = async (networkName: NetworkNames) => {

  const sdk = await initializeSdkGateway(
    { privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string },
    {
      networks: [networkName],
      projectKey: process.env.NEXT_PUBLIC_PROJECT_KEY,
      bundlerApiKey: process.env.NEXT_PUBLIC_BUNDLER_API_KEY
    },
  );
  console.log("sdk: ", sdk);

  // set mumbai as default current instance
  const miraiInstance = sdk.setCurrentInstance(networkName);
  console.log("networkInstance: ", miraiInstance);

  return { sdk, miraiInstance };
}

export default initMirai;