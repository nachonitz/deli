import { useContext } from "react";
import Header from "./components/shared/header";
import Footer from "./components/shared/footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import { UserContext } from "./context/UserContext";

function App() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      <Header />
      <div className="mt-[64px]">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="*" element={<Navigate to="/welcome" />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
