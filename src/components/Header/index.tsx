import { useState } from "react";
import Avt from "../../assets/avt.jpeg";
import { useUserStore } from "../../store/useUserStore";
import { useSignOut } from "../../api/auth/query";

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useUserStore();
  //@ts-ignore
  const profile: User = user?.user;
  const signOut = useSignOut();

  const handleUserIconClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogoutClick = () => {
    signOut.mutate();
  };

  return (
    <div className=" p-4 fixed left-0 right-0 bg-black z-50 w-full">
      <header className="flex justify-between text-white items-center">
        <div className=" flex items-center space-x-2  md:space-x-4 ml-2">
          <a href="/tasks" className="font-bold text-2xl">
            Logo
          </a>
        </div>

        <div className="mr-2">
          <div>
            <button
              className="flex justify-center items-center"
              onClick={handleUserIconClick}
            >
              <div className="w-10 h-10 rounded-full ">
                <img
                  className="w-full h-full rounded-full"
                  src={Avt}
                  alt="avatar"
                />
              </div>
              <span className="ml-2">{profile?.email || "Guest"}</span>
            </button>
            {isUserMenuOpen && (
              <div className="mr-5 absolute right-0 py-5 border-slate-300 border-solid border-[1px] bg-black rounded-lg min-w-[300px] text-black">
                <ul className="border-slate-300 border-solid">
                  <li className="py-3 w-full px-5 text-white hover:text-black hover:bg-white font-medium hover:cursor-pointer transition-all duration-300">
                    <a href="/profile">Your profile</a>
                  </li>
                  <li className="py-3 w-full px-5 text-white hover:text-black hover:bg-white font-medium hover:cursor-pointer transition-all duration-300">
                    <a>Change password</a>
                  </li>
                  <li
                    className="py-3 w-full px-5 text-white hover:text-black hover:bg-white font-medium hover:cursor-pointer transition-all duration-300"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
