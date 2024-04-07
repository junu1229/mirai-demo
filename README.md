# Mirai Demo

## Index

### [1. Settings](#settings)
### [2. Mirai SDK Structure](#2-mirai-sdk-structure)
- [initializeSdkGateway](#1-initializesdkgateway)
- [SDK](#2-sdk)
- [DataService](#3-dataservice)
- [Paymaster](#4-paymaster)
### [3. Examples](#examples)
- [1. How to initialize Instance](#how-to-initialize-instance)
- [2. Data Service](#data-services)
  - [Get Account Address](#get-account-address)
  - [Get Account Balances](#get-account-balances)
  - [Get Native Balances](#get-native-balances)
  - [Get NFT List](#get-nft-list)
  - [Get Transaction Details](#get-transaction-details)
- [3. Transfer](#transfer)
  - [Transfer Native Token](#transfer-native-token)
  - [Transfer Non-Native Token (ERC-20)](#transfer-non-native-token-erc-20)
  - [Transfer ERC-721](#transfer-erc-721)
  - [Transfer ERC-1155](#transfer-erc-1155)
- [4. Paymaster Dashboard](#paymaster-dashboard)
  - [Add to whitelist](#add-to-whitelist)
  - [Check Whitelisted or not](#check-whitelisted-or-not)
  - [Deposit to whitelist](#deposit-to-whitelist)
  - [Get Sponsor Balance](#get-sponsor-balance)

- [5. Interacting with contract](#interacting-with-contract)
- [6. how to use Sponsor transaction](#how-to-use-sponsor-transaction)
## Settings 

- need to set .env

```
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=
NEXT_PUBLIC_PAYMASTER_API_KEY=
NEXT_PUBLIC_BUNDLER_API_KEY=
NEXT_PUBLIC_PROJECT_KEY=
```

[Back to index](#mirai-demo)

## Mirai SDK Structure

<image src='./MiraiStructure.png'>

### 1. initializeSdkGateway

you can make Mirai SDK with this function

``` typescript
const miraiSDK = await initializeSdkGateway(

  { privateKey: `your Private key here` },
  {
    networks: [NetworkNames.Polygon],
    projectKey: process.env.NEXT_PUBLIC_PROJECT_KEY,
    bundlerApiKey: process.env.NEXT_PUBLIC_BUNDLER_API_KEY
  },
);
```

### 2. SDK

#### setCurrentInstance: use this function to use Instance

```typescript
const miraiInstance = miraiSDK.setCurrentInstance(NetworkNames.Polygon);
```

#### erc20: use this while transfer Non-Native Token

```typescript
const erc20 = miraiSDK.erc20(tokenId, NetworkNames.Polygon);
```

#### erc721: use this while transfer ERC-721

```typescript
const erc721 = miraiSDK.erc721(ERC721Address, NetworkNames.Polygon);
```

#### erc1155: use this while transfer ERC-1155

```typescript
const erc1155 = miraiSDK.erc1155(ERC1155Address, NetworkNames.Polygon);
```

### 3. DataService

#### getAccountBalances: Get all account balances including non-native tokens

```typescript
const balances = await dataService.getAccountBalances('Account Address', chainId, 'your data Api Key');
```

#### getTransaction: Get transaction details

```typescript
const transactionDetails = await dataService.getTransaction(transactionHash, chainId, 'your data Api Key');
```

#### getNftList: Get NFT list that account has

```typescript
const nftList = await dataService.getNftsList(address, chainId, 'your data Api Key');
```

### 4. Paymaster

#### addWhitelist: Whitelist address for sponsor transaction

```typescript
const result = await paymaster.adddWhitelist(address, chainId);
```

#### checkWhitelist: Check if the address is whitelisted or not
```typescript
const result = await paymaster.checkWhitelist(address, chainId as number, paymasterAddress);
```

#### deposit: Deposit to whitelist contract
```typescript
const result = await paymaster.deposit(amount, chainId as number);
```

#### getSponsorBalance: Check the balance of the sponsor contract
```typescript
const balance = await paymaster.getSponsorBalance(paymasterAddress, chainId as number);
```

[Back to index](#mirai-demo)

## Examples

### How to initialize Instance

```typescript
const initMirai = async () => {
  try{
    const network = Network.Polygon; // you can set network Network.{{here}}
    
    const sdk = await initializeSdkGateway(
      { privateKey: `your Private key` },
      {
        networks: [network],
        projectKey: process.env.NEXT_PUBLIC_PROJECT_KEY,
        bundlerApiKey: process.env.NEXT_PUBLIC_BUNDLER_API_KEY
      },
    );
    
    const miraiInstance = sdk.setCurrentInstance(network);
  } catch(error) {
    console.log('Error initializing Mirai: ', error)
  }
}
```

### Data Services

#### Get Account Address

- Get account address
- need Mirai Instance to get address

```typescript
const getAccountAddress = async () => {
  try {
    const address = await miraiInstance.getCounterFactualAddress();
  } catch (error) {
    console.log('Error getting Address:', error);
  }
}
```

#### Get Account Balances
- Get all account balances including non-native tokens
- This is an additional feature of Mirai, so there are some networks that don't support it.
- need DataService 

```typescript
const getAccountBalances = async () => {
  try {
    const balances = await dataService.getAccountBalances(address, chainId, 'your data API key');
  } catch (error) {
    console.error('Error getting account balances:', error);
  }
}
```

#### Get Native Balances

- get Native Token Balances
- need Mirai Instance

```typescript
const getNativeBalance = async () => {
  try {
    const balance = await miraiInstance.getNativeBalance();
  } catch (error) {
    console.error('Error getting native balance:', error);
  }
}
```

#### Get NFT List

- get NFT List of Accounts
- This is an additional feature of Mirai, so there are some networks that don't support it.
- need DataService

```typescript
const getNftList = async () => {
  try {
    const nftList = await dataService.getNftsList(address, chainId, 'your data API key');
  } catch (error) {
    console.error('Error getting nft list:', error);
  }
}
```

#### Get Transaction Details

- get Transaction Details
- This is an additional feature of Mirai, so there are some networks that don't support it.
- need DataService

```typescript
const getTransactionDetails = async () => {
  try {
    const transactionDetails = await dataService.getTransaction(transactionHash, chainId, 'your data API key');
  } catch (error) {
    console.error('Error getting transaction details:', error);
  }
}
```

[Back to index](#mirai-demo)

### Transfer

#### Transfer Native Token

- transfer native token
- need Mirai Instance

```typescript
import { utils } from 'ethers';

const transferNativeToken = async () => {
  try {
    // clear the batch
    await miraiInstance.clearUserOpsFromBatch();

    // add transactions to the batch
    await miraiInstance.addUserOpsToBatch({ to: recipientAddress, value: utils.parseEther(transferAmount) });

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await miraiInstance.estimate();

    // sign the UserOp and sending to the bundler...
    const uoHash = await miraiInstance.send(op);

    let userOpsReceipt = null;
    const timeout = Date.now() + 60000 // 1 minute timeout

    while (userOpsReceipt == null && Date.now() < timeout) {
      await sleep(2);
      // get the receipt of the UserOp
      userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
    }
    console.log( `Transaction Receipt: `, userOpsReceipt);
  } catch (error) {
    console.error('Error transferring native token:', error);
  }
};
```

#### Transfer Non-Native Token (ERC-20)

- transfer Non-Native token
- need miraiSDK(to init erc20) and miraiInstance

```typescript
import { utils } from 'ethers';

const transfer = async () => {
  try {
    // get the erc20 instance
    const erc20 = miraiSDK.erc20(tokenId, network);

    // clear any previous transactions in batch
    await miraiInstance.clearUserOpsFromBatch();

    // add erc20 transfer function to the batch
    await erc20.transfer(recipientAddress, utils.parseUnits(transferAmount, parseInt(decimals)));

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await miraiInstance.estimate();

    //sign the UserOp and sending to the bundler...
    const uoHash = await miraiInstance.send(op);
    
    // log the uoHash
    console.log(`UserOpHash: ${uoHash}`);
    let userOpsReceipt = null;
    const timeout = Date.now() + 60000 // 1 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
        await sleep(2);
        // get the receipt of the UserOp
        userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
    }
    console.log(`Transaction Receipt: `, userOpsReceipt);
  } catch (error) {
    console.error('Error transferring Non-Native token:', error);
  }
};
```

#### Transfer ERC-721

- Transfer ERC-721
- need miraiSDK(to initialize erc721) and miraiInstance

```typescript
const transfer = async () => {
  try {
    const sender = await miraiInstance.getCounterFactualAddress();

    //initialize erc721 sdk instance
    const erc721 = miraiSDK.erc721(ERC721Address, network);

    // clear any previous transactions in batch
    await miraiInstance.clearUserOpsFromBatch();

    // add erc721 transferFrom function to the batch
    await erc721.transferFrom(sender, recipientAddress, tokenId);

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await miraiInstance.estimate();

    // sign the UserOp and sending to the bundler...
    const uoHash = await miraiInstance.send(op);
    
    // log the uoHash
    console.log(`UserOpHash: ${uoHash}`);
    let userOpsReceipt = null;
    const timeout = Date.now() + 60000 // 1 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
        await sleep(2);
        userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
    }
    console.log(`Transaction Receipt: `, userOpsReceipt);
  } catch (error) {
    console.error('Error transferring ERC-721:', error);
  }
};
```

#### Transfer ERC-1155

- Transfer ERC-1155
- need miraiSDK(to init erc1155) and miraiInstance

```typescript
const transfer = async () => {
  try {
    //initialize erc1155 sdk instance
    const erc1155 = miraiSDK.erc1155(contractAddress, network);

    // clear any previous transactions in batch
    await miraiInstance.clearUserOpsFromBatch();

    // add 1155 transferFrom function to the batch
    await erc1155.safeTransferFrom(address, targetAddress, tokenId, amount, '0x');

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await miraiInstance.estimate();

    // sign the UserOp and sending to the bundler...
    const uoHash = await miraiInstance.send(op);
    
    // log the uoHash
    let userOpsReceipt = null;
    const timeout = Date.now() + 60000 // 1 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
        await sleep(2);
        userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
    }
    console.log(`Transaction Receipt: `, userOpsReceipt);
  } catch (error) {
    console.error('Error transferring ERC-1155:', error);
  }
};
```



[Back to index](#mirai-demo)

### Paymaster Dashboard

#### Add to whitelist

- Add to whitelist for sponsor transaction
- need Paymaster

```typescript
const addToWhiteList = async () => {
  try {
    const result = await paymaster.adddWhitelist(address, chainId as number);
    console.log(result);
  } catch (error) {
    console.error('Error whitelisting:', error);
  }
}
```

#### Check Whitelisted or not

- check whitelisted or not
- need Paymaster

```typescript
const checkWhitelisted = async () => {
  try {
    const result = await paymaster.checkWhitelist(address, chainId as number, paymasterAddress);
  } catch (error) {
    console.error('Error checking whitelisted:', error);
  }
}
```

#### Deposit to whitelist

- Transfer native token for sponsor TX from paymaster wallet to paymaster contract
- need Paymaster
 
 ```typescript
const depositWhitelist = async () => {
  try {
    const result = await paymaster.deposit(amount, chainId as number);
  } catch (error) {
    console.error('Deposit error:', error);
  }
}
```

#### Get Sponsor Balance

- checking paymaster contract balance
- need Paymaster

```typescript
const getSponsorBalance = async () => {
  try {
    const balance = await paymaster.getSponsorBalance(paymasterAddress, chainId as number);
  } catch (error) {
    console.error('Error getting sponsor balance:', error);
  }
}
```

[Back to index](#mirai-demo)

### Interacting with contract

- how to interact with contract
- need miraiInstance

```typescript
const init = async () => {
  const contract = new ethers.Contract(
    'ContarctAddress',
    abi,
  );

  const transactionData = contract.interface.encodeFunctionData('function in here', ['inputA', 'inputB']);

  await miraiInstance.clearUserOpsFromBatch();

  // add transactions to the batch
  await miraiInstance.addUserOpsToBatch({ to: 'ContractAddress', data: transactionData, value: amountInWei});

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await miraiInstance.estimate();

  // sign the UserOp and sending to the bundler...
  const uoHash = await miraiInstance.send(op);

  let userOpsReceipt = null;
  const timeout = Date.now() + 60000 // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
      await sleep(2);
      userOpsReceipt = await miraiInstance.getUserOpReceipt(uoHash);
  }
  console.log(`Transaction Receipt: `, userOpsReceipt);
}
```

[Back to index](#mirai-demo)

### how to use Sponsor transaction

- you can change this for sponsor transaction

```typescript
const op = await miraiInstance.estimate();
```

->

```typescript
const op = await miraiInstance.estimate({
  paymasterDetails: {
    url: `https://arka.etherspot.io?apiKey=${process.env.NEXT_PUBLIC_PAYMASTER_API_KEY}&chainId=${chainId}`,
    context: { mode: 'sponsor' },
  },
});
```

[Back to index](#mirai-demo)