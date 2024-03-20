import Logout from "../header/Logout";
import NativeTokenBalance from "../header/NativeTokenBalance";
import UserAddress from "../header/UserAddress";
import KanaLogo from '../../assets/icons/kana_logo.svg'

const Header = () => {
  return (
    <div className='w-[100vw] fixed h-[10vh] bg-[#0C0C0D] top-0 flex border-b-[1px] border-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.50)]'>
      <div className="flex items-center justify-center w-[20vw]">
        <KanaLogo />
      </div>
      <div className="w-[80vw] flex justify-end">
        <div className="bg-[#1D1E20] w-[33%] h-[90%] items-center flex justify-center mx-4 my-auto rounded-2xl">
          <UserAddress />
        </div>
        <div className="bg-[#1D1E20] w-[33%] h-[90%] items-center flex justify-center my-auto rounded-2xl">
          <NativeTokenBalance />
        </div>
        <div className="bg-[#1D1E20] w-[33%] h-[90%] items-center flex justify-center mx-4 my-auto rounded-2xl">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Header;