import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PrimaryButton from "./primaryButton";

const Header = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  return (
    <div className="fixed top-0 h-[64px] w-full flex justify-center shadow-md bg-white">
      <div className="flex items-center w-[90%] max-w-page">
        <div className="w-full flex justify-between items-center">
          <img className="h-[24px]" src="deli_orange.png" alt="logo" />
          {isLoggedIn && (
            <PrimaryButton text="CERRAR SESIÓN" onClick={logout} />
          )}
        </div>
      </div>
      {/* <h1>My App</h1> */}
    </div>
  );
};

export default Header;
