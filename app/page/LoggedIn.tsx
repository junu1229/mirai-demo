import { useState } from "react";
import Header from "../components/common/Header";
import TransferNativeToken from "../components/normalTransfer/TransferNativeToken";
import CodeBlock1 from "../components/codeblock/CodeBlock1";
import GetNativeBalances from "../components/dataService/GetNativeBalances";
import GetAccountAddress from "../components/dataService/GetAccountAddress";
import GetAccountBalances from "../components/dataService/GetAccountBalances";
import GetTransactionDetails from "../components/dataService/GetTransactionDetails";
import GetNftList from "../components/dataService/GetNfftList";
import GetSponsorBalance from "../components/paymasterDashboard/GetSponsorBalance";
import DepositWhitelist from "../components/paymasterDashboard/DepositWhitelist";
import CheckWhitelisted from "../components/paymasterDashboard/CheckWhitelisted";
import AddToWhitelist from "../components/paymasterDashboard/AddToWhitelist";
import TransferNonNativeToken from "../components/normalTransfer/TransferNonNativeToken";
import TransferErc721 from "../components/normalTransfer/TransferErc721";
import TransferErc1155 from "../components/normalTransfer/TransferErc1155";
import SponsorTransferNativeToken from "../components/sponsorTransfer/SponsorTransferNativeToken";
import SponsorTransferNonNativeToken from "../components/sponsorTransfer/SponsorTransferNonNativeToken";
import SponsorTransferErc721 from "../components/sponsorTransfer/SponsorTransferErc721";
import SponsorTransferErc1155 from "../components/sponsorTransfer/SponsorTransferErc1155";
import CodeBlock2 from "../components/codeblock/CodeBlock2";
import CodeBlock3 from "../components/codeblock/CodeBlock3";
import CodeBlock4 from "../components/codeblock/CodeBlock4";
import CodeBlock5 from "../components/codeblock/CodeBlock5";
import CodeBlock6 from "../components/codeblock/CodeBlock6";
import CodeBlock7 from "../components/codeblock/CodeBlock7";
import CodeBlock8 from "../components/codeblock/CodeBlock8";
import CodeBlock9 from "../components/codeblock/CodeBlock9";
import CodeBlock10 from "../components/codeblock/CodeBlock10";
import CodeBlock11 from "../components/codeblock/CodeBlock11";
import CodeBlock12 from "../components/codeblock/CodeBlock12";
import CodeBlock13 from "../components/codeblock/CodeBlock13";
import CodeBlock14 from "../components/codeblock/CodeBlock14";
import CodeBlock15 from "../components/codeblock/CodeBlock15";
import CodeBlock16 from "../components/codeblock/CodeBlock16";
import CodeBlock17 from "../components/codeblock/CodeBlock17";

const LoggedIn = () => {

  const [functionNumber, setFunctionNumber] = useState(0);

  return (
    <div className="w-[100vw] h-[100vh] bg-[#0C0C0D] flex">
      <Header />
      <div className="h-full">
        <div className="w-[20vw] h-full border-r-2 border-[rgba(255,255,255,0.10)] flex flex-col">
          <div className=" w-full flex flex-col justify-start items-center px-4 mt-[10vh] text-[rgba(255,255,255,0.50)] overflow-y-scroll">
            <div className="text-[1.5vw] mt-[2vh]">
              Normal Transfer
            </div>
            <div className=" w-full mt-2 border-[1px] border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 0 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(0)}>
                Transfer Native Token
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 1 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(1)}>
                Transfer Non-Native Token
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 2 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(2)}>
                Transfer ERC-721
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 3 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(3)}>
                Transfer ERC-1155
              </div>
            </div>
            <div className="text-[1.5vw] mt-[2vh]">
              Sponsor Transfer
            </div>
            <div className=" w-full mt-2 border-[1px] border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 4 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(4)}>
                Transfer Native Token
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 5 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(5)}>
                Transfer Non-Native Token
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 6 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(6)}>
                Transfer ERC-721
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 7 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(7)}>
                Transfer ERC-1155
              </div>
            </div>
            <div className="text-[1.5vw] mt-[2vh]">
              Data Service
            </div>
            <div className=" w-full mt-2 border-[1px] border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 8 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(8)}>
                Get Native Balances
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 9 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(9)}>
                Get Account Address
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 10 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(10)}>
                Get Account Balances
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 11 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(11)}>
                Get Transactions Details
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 12 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(12)}>
                Get NFT List
              </div>
            </div>
            <div className="text-[1.5vw] mt-[2vh]">
              Paymaster Dashboard
            </div>
            <div className=" w-full mt-2 border-[1px] border-[rgba(255,255,255,0.10)] rounded-2xl p-4 mb-[2vh]">
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 13 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(13)}>
                get sponsor balance
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 14 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(14)}>
                deposit whitelist
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] my-4 rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 15 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(15)}>
                check whitelist
              </div>
              <div className={`flex justify-center text-[1.2vw] h-[6vh] rounded-xl items-center cursor-pointer hover:text-[rgba(255,255,255,0.50)] ${functionNumber === 16 ? 'bg-[#1D1E20] text-[rgba(255,255,255,0.50)]' : 'bg-[#1d1e2083] text-[rgba(255,255,255,0.3)]'}`} onClick={() => setFunctionNumber(16)}>
                add to whitelist
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 0 ? '' : 'hidden'}`}>
        <TransferNativeToken />
        <CodeBlock1 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 1 ? '' : 'hidden'}`}>
        <TransferNonNativeToken />
        <CodeBlock2 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 2 ? '' : 'hidden'}`}>
        <TransferErc721 />
        <CodeBlock3 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 3 ? '' : 'hidden'}`}>
        <TransferErc1155 />
        <CodeBlock4 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 4 ? '' : 'hidden'}`}>
        <SponsorTransferNativeToken />
        <CodeBlock5 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 5 ? '' : 'hidden'}`}>
        <SponsorTransferNonNativeToken />
        <CodeBlock6 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 6 ? '' : 'hidden'}`}>
        <SponsorTransferErc721 />
        <CodeBlock7 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 7 ? '' : 'hidden'}`}>
        <SponsorTransferErc1155 />
        <CodeBlock8 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 8 ? '' : 'hidden'}`}>
        <GetNativeBalances />
        <CodeBlock9 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 9 ? '' : 'hidden'}`}>
        <GetAccountAddress />
        <CodeBlock10 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 10 ? '' : 'hidden'}`}>
        <GetAccountBalances />
        <CodeBlock11 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 11 ? '' : 'hidden'}`}>
        <GetTransactionDetails />
        <CodeBlock12 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 12 ? '' : 'hidden'}`}>
        <GetNftList />
        <CodeBlock13 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 13 ? '' : 'hidden'}`}>
        <GetSponsorBalance />
        <CodeBlock14 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 14 ? '' : 'hidden'}`}>
        <DepositWhitelist />
        <CodeBlock15 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 15 ? '' : 'hidden'}`}>
        <CheckWhitelisted />
        <CodeBlock16 />
      </div>
      <div className={`mt-[10vh] flex items-center w-full justify-between px-[5%] ${functionNumber === 16 ? '' : 'hidden'}`}>
        <AddToWhitelist />
        <CodeBlock17 />
      </div>

    </div>
  );
}

export default LoggedIn;