import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  return (
    <div className="fixed top-0 h-[64px] w-full flex justify-center shadow-md bg-white">
      <div className="flex items-center w-[90%] max-w-page">
        <div className="w-full flex justify-between items-center">
          <img className="h-[24px]" src="deli_orange.png" alt="logo" />
          {isLoggedIn && (
            <button
              className="bg-primary text-white p-3 rounded"
              onClick={logout}
            >
              CERRAR SESIÓN
            </button>
          )}
        </div>
      </div>
      {/* <h1>My App</h1> */}
    </div>
  );
};

export default Header;
