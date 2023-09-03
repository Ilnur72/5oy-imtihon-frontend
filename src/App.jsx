import jwtDecode from "jwt-decode";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadState } from "./Utils/storage";
import MainLayout from "./layout/MainLayout";
import Guides from "./pages/Guides/Guides";
import Login from "./pages/Login/Login";
import ProfileMe from "./pages/ProfileMe/ProfileMe";
import User from "./pages/Stuff/User";
import Profile from "./pages/Stuff/components/Profile";
import { jwtToken } from "./store/jwtTokenSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = loadState("token");
  React.useEffect(() => {
    if (!token) navigate("/login");
    else {
      const { user } = jwtDecode(token);
      dispatch(jwtToken(user));
    }
  }, [token]);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<User />} />
          <Route path="/profile/me" element={<ProfileMe />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/guides" element={<Guides />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <h1>404: Page Not Page</h1>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
