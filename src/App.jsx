import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
// import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NavigatorSetter from "./routers/NavigatorSetter";

import CursorWaterDrop from "./component/ClickRipple";
import Loader from "./utils/Loader";

function App() {

  const { isLoggedIn } = useAuth()
  console.log({isLoggedIn})

  return (isLoggedIn ? <Navigate to="/dashboard" replace /> :

    <>

      <CursorWaterDrop />
        <Navbar />

        <Outlet />
        <Footer />
    </>

  );
}

export default App;
