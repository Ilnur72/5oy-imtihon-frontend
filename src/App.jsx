import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loadState } from "./Utils/storage";
import { useAxios } from "./hooks/useAxios";
import MainLayout from "./layout/MainLayout";
import Guides from "./pages/Guides/Guides";
import ShowGuide from "./pages/Guides/components/ShowGuide";
import Login from "./pages/Login/Login";
import Notification from "./pages/Notification/Notification";
import ProfileMe from "./pages/ProfileMe/ProfileMe";
import User from "./pages/Stuff/User";
import Profile from "./pages/Stuff/components/Profile";
import { jwtToken, userTodoGuide } from "./store/userDataSlice.js";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = loadState("token");
  const { data, loading, refetch } = useAxios({
    url: "/users/me",
    method: "get",
  });
  React.useEffect(() => {
    if (!token) navigate("/login");
    else {
      dispatch(jwtToken({ id: data.data?.id, role: data.data?.role }));
      dispatch(userTodoGuide(data.data?.todo_guides));
      refetch();
    }
  }, [token, data]);
  if (loading) return;
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<User />} />
          <Route path="/profile/me" element={<ProfileMe />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:guide_id" element={<ShowGuide />} />
          <Route path="/notification" element={<Notification />} />
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
